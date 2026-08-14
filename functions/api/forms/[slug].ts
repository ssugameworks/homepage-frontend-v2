import { getActivityFieldSpecs } from "../_lib/activityForm";
import {
  dateRange,
  type Env,
  findActivityBySlug,
  formatDateRange,
  richText,
  title,
} from "../_lib/notion";

const CACHE_TTL_SECONDS = 120;

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

  const fields = await getActivityFieldSpecs(env, activity.id);

  const schema = {
    slug,
    title: title("활동명", activity),
    activity: {
      applyPeriod: formatDateRange(dateRange("신청기간", activity)),
      activityPeriod: formatDateRange(dateRange("활동기간", activity)),
      location: richText("장소", activity),
      description: richText("설명", activity),
    },
    // 질문 DB가 없는 간단한 활동은 빈 배열을 반환한다.
    fields,
  };

  const response = Response.json(schema, {
    headers: { "Cache-Control": `public, max-age=${CACHE_TTL_SECONDS}` },
  });
  context.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}
