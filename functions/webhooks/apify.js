export async function onRequestPost({ env, request, data }) {
  const body = await request.json();
  const {defaultDatasetId} = body.resource;
  const resp = await fetch(`https://api.apify.com/v2/datasets/${defaultDatasetId}/items`, {
    headers: {
      "Authorization": env.APIFY_TOKEN
    }
  });
  const items = await resp.json();
  console.log({ items, defaultDatasetId });
  return new Response(null, { status: 200 });
}
