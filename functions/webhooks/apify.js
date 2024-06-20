async function getAllNewsIndex(env) {
  const items = (await env.NEWS.get("/news", "json")) ?? [];
  return new Map(items.map(({ timestamp, postId }) => [postId, { timestamp, postId }]));
}

async function saveAllNewsIndex(env, allNews) {
  // sort news by date desc so we can easily fetch them
  const items = Array.from(allNews.values()).sort((a, b) => b.timestamp - a.timestamp);
  await env.NEWS.put("/news", JSON.stringify(items));
  return items;
}

async function fetchScrapeResults(env, defaultDatasetId) {
  const resp = await fetch(`https://api.apify.com/v2/datasets/${defaultDatasetId}/items`, {
    headers: { "Authorization": env.APIFY_TOKEN }
  });
  const items = await resp.json();
  // ignore updates without text
  return items.filter(x => x.text);
}

function updateNews(allNews, items) {
  const news = items.map(({ timestamp, postId }) => ({ timestamp, postId }));
  for (const { timestamp, postId } of news) {
    allNews.set(postId, { timestamp, postId });
  }
  return allNews;
}

async function saveNewsEntries(env, items) {
  for (const item of items) {
    await env.NEWS.put(`/news/${item.postId}`, JSON.stringify(item));
  }
  return items;
}

export async function onRequestPost({ env, request }) {
  const url = new URL(request.url);
  if (url.searchParams.get("secret") !== env.APIFY_WEBHOOK_SECRET) {
    return new Response("Invalid secret", { status: 403 });
  }

  const body = await request.json();
  const { defaultDatasetId } = body.resource;
  const items = await fetchScrapeResults(env, defaultDatasetId);
  const allNews = await getAllNewsIndex(env);
  updateNews(allNews, items);
  await saveAllNewsIndex(env, allNews);
  await saveNewsEntries(env, items);
  return new Response(null, { status: 200 });
}
