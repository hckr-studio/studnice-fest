import { take } from "@thi.ng/transducers";

async function getNewsIndex(env) {
  const items = (await env.NEWS.get("/news", "json")) ?? [];
  return items;
}

async function getNewsPost(env, postId) {
  const item = await env.NEWS.get(`/news/${postId}`, "json");
  return item;
}

/**
 * @param {EventContext<Env>} context
 */
export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "5");
  const items = await getNewsIndex(env);
  const resultsP = [];
  for (const item of take(pageSize, items)) {
    result.push(getNewsPost(env, item.postId));
  }
  const result = await Promise.all(resultsP);
  return Response.json(result);
}
