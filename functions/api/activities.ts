import {
  dateOnly,
  dateRange,
  type Env,
  filesUrl,
  queryDataSource,
  richText,
  title,
} from "./_lib/notion";

const CACHE_TTL_SECONDS = 120;

type Context = {
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
};

export type ActivityListItem = {
  id: string;
  slug: string;
  title: string;
  applyStartDate: string;
  applyEndDate: string;
  activityStartDate: string;
  activityEndDate: string;
  location: string;
  description: string;
  imageUrl: string;
};

export async function onRequestGet(context: Context) {
  const { env } = context;

  // `caches.default` is a Cloudflare Workers runtime extension, not in the DOM lib types.
  const cache = (caches as unknown as { default: Cache }).default;
  const cacheKey = new Request("https://cache.local/activities");
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const { results } = await queryDataSource(env, env.NOTION_ACTIVITY_DATA_SOURCE_ID, {
    filter: { property: "상태", select: { does_not_equal: "초안" } },
    sorts: [{ property: "신청기간", direction: "descending" }],
  });

  const activities: ActivityListItem[] = results.map((page) => {
    const applyPeriod = dateRange("신청기간", page);
    const activityPeriod = dateRange("활동기간", page);
    const applyStartDate = dateOnly(applyPeriod.start);
    const activityStartDate = dateOnly(activityPeriod.start);

    return {
      id: page.id,
      slug: richText("slug", page),
      title: title("활동명", page),
      applyStartDate,
      applyEndDate: applyPeriod.end ? dateOnly(applyPeriod.end) : applyStartDate,
      activityStartDate,
      activityEndDate: activityPeriod.end ? dateOnly(activityPeriod.end) : activityStartDate,
      location: richText("장소", page),
      description: richText("설명", page),
      imageUrl: filesUrl("포스터", page),
    };
  });

  const response = Response.json(
    { activities },
    { headers: { "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}` } }
  );
  context.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}
