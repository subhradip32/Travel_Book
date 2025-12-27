export async function HandleLocationQuery(query: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
    {
      headers: {
        "User-Agent": "MyProject/1.0 (subhradip@email.com)",
        "Accept": "application/json"
      }
    }
  );

  const data = await response.json();
  console.log(data);
}
