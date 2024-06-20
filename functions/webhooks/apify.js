export async function onRequestPost({ env, request }) {
  const url = new URL(request.url);
  if (url.searchParams.get("secret") !== env.APIFY_WEBHOOK_SECRET) {
    return new Response("Invalid secret", { status: 403 });
  }

  const body = await request.json();
  const { defaultDatasetId } = body.resource;
  const resp = await fetch(`https://api.apify.com/v2/datasets/${defaultDatasetId}/items`, {
    headers: { "Authorization": env.APIFY_TOKEN }
  });
  const items = (await resp.json()).filter(x => x.text);
  const news = items.map(({ timestamp, postId }) => ({ timestamp, postId }));
  const xx = (await env.NEWS.get("/news", "json")) ?? [];
  const allNews = new Map(xx.map(({ timestamp, postId }) => [postId, { timestamp, postId }]));
  for (const { timestamp, postId } of news) {
    allNews.set(postId, { timestamp, postId });
  }
  const xxx = Array.from(allNews.values()).sort((a, b) => b.timestamp - a.timestamp);
  await env.NEWS.put("/news", JSON.stringify(xxx));
  for (const item of items) {
    await env.NEWS.put(`/news/${item.postId}`, JSON.stringify(item));
  }
  return new Response(null, { status: 200 });
}
