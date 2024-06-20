import { take } from "@thi.ng/transducers";

async function getNewsIndex(env) {
  const items = (await env.NEWS.get("/news", "json")) ?? [];
  return items;
}

async function getNewsPost(env, postId) {
  const item = await env.NEWS.get(`/news/${postId}`, "json");
  return item;
}

export async function onRequestGet({ env, request }) {
  const url = new URL(request.url);
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "5");
  const items = await getNewsIndex(env);
  const result = [];
  for (const item of take(pageSize, items)) {
    result.push(await getNewsPost(env, item.postId));
  }
  return Response.json(result);
}
