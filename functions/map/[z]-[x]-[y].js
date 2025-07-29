/**
 * @param {EventContext<Env>} context
 * @returns {Promise<Response>}
 */
export async function onRequestGet({ params, request }) {
  const API_KEY = "S9n6dfE_8AfjsNvRxSwAmFV4-1z5tfk5W7IUajp2D3I";
  const { z, x, y } = params;
  const url = `https://api.mapy.cz/v1/maptiles/outdoor/256/${z}/${x}/${y}?apikey=${API_KEY}`;
  return fetch(url, request);
}
