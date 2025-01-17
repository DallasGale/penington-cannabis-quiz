export function generateSharingUrl(results: any[]) {
  console.log({ results });
  const baseUrl = "https://www.regulateit.com.au/";
  const params = new URLSearchParams();

  results.forEach((result, index) => {
    params.set(`r${index + 1}`, `${result.score}`);
  });

  return `${baseUrl}?${params.toString()}`;
}
