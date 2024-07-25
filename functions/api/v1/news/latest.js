import { take } from "@thi.ng/transducers";

async function getNewsIndex(env) {
  return (await env.NEWS.get("/news", "json")) ?? [];
}

async function getNewsPost(env, postId) {
  return env.NEWS.get(`/news/${postId}`, "json");
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
    resultsP.push(getNewsPost(env, item.postId));
  }
  const result = await Promise.all(resultsP);
  return Response.json(result);
}
