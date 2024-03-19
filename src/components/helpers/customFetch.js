// Fetches the url and returns the JSON version of the response
export default async function customFetch(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();
  return data;
}