export function generateSharingUrl(results: any[]) {
  const baseUrl = "http://localhost:4321/";
  const params = new URLSearchParams();

  results.forEach((result, index) => {
    params.set(`q${index + 1}`, `${result.score},${result.description}`);
  });

  return `${baseUrl}?${params.toString()}`;
}
