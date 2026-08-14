import {
  checkbox,
  dateRange,
  type Env,
  findActivityBySlug,
  findChildDataSourceId,
  formatDateRange,
  type NotionPage,
  queryDataSource,
  richText,
  select,
  title,
} from "../_lib/notion";

const CACHE_TTL_SECONDS = 120;

function toFieldSpec(row: NotionPage) {
  const kind = select("타입", row) ?? "short_text";
  const options = richText("옵션", row);
  return {
    id: row.id,
    label: title("라벨", row),
    hint: richText("힌트", row) || undefined,
    required: checkbox("필수여부", row),
    kind,
    options: options ? options.split(",").map((o) => o.trim()) : undefined,
  };
}

type Context = {
  params: { slug: string };
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
};

export async function onRequestGet(context: Context) {
  const { slug } = context.params;
  const env = context.env;

  // `caches.default` is a Cloudflare Workers runtime extension, not in the DOM lib types.
  const cache = (caches as unknown as { default: Cache }).default;
  const cacheKey = new Request(`https://cache.local/forms/${slug}`);
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const activity = await findActivityBySlug(env, slug);
  if (!activity) {
    return Response.json({ error: "폼을 찾을 수 없어요" }, { status: 404 });
  }

  const stepsDataSourceId = await findChildDataSourceId(env, activity.id);
  const steps = stepsDataSourceId
    ? await queryDataSource(env, stepsDataSourceId, {
        sorts: [{ property: "순서", direction: "ascending" }],
      })
    : { results: [] };

  const schema = {
    slug,
    title: title("활동명", activity),
    activity: {
      applyPeriod: formatDateRange(dateRange("신청기간", activity)),
      activityPeriod: formatDateRange(dateRange("활동기간", activity)),
      location: richText("장소", activity),
      description: richText("설명", activity),
    },
    fields: steps.results.map(toFieldSpec),
  };

  const response = Response.json(schema, {
    headers: { "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}` },
  });
  context.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}
