export function generateSharingUrl(results: any[]) {
  console.log({ results });
  const baseUrl = "/";
  const params = new URLSearchParams();

  results.forEach((result, index) => {
    params.set(`r${index + 1}`, `${result.score},${result.description}`);
  });

  return `${baseUrl}?${params.toString()}`;
}
