/**
 * @param {EventContext<Env>} context
 * @returns {Promise<Response>}
 */
export async function onRequestGet({ params, request, env }) {
  const API_KEY = "S9n6dfE_8AfjsNvRxSwAmFV4-1z5tfk5W7IUajp2D3I";
  const { z, x, y } = params;
  const key = `maptiles/outdoor/256/${z}/${x}/${y}`;

  const { value, metadata } = await env.MAPTILES_CACHE.getWithMetadata(key, "stream");
  if (value) {
    return new Response(value, metadata);
  }

  const url = `https://api.mapy.cz/v1/${key}?apikey=${API_KEY}`;
  const resp = await fetch(url, request);
  const result = resp.clone(); // keep the response unconsumed for return, because cache will consume the body stream
  await env.MAPTILES_CACHE.put(key, resp.body, {
    expirationTtl: 60 * 60 * 24, // one day
    metadata: {
      status: resp.status,
      headers: Array.from(resp.headers.entries())
    }
  });
  return result;
}
