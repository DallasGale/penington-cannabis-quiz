export function generateSharingImage(results: any[]) {
  const baseUrl = "/";
  const params = new URLSearchParams();

  results.forEach((result, index) => {
    params.set(`q${index + 1}`, `${result.score},${result.description}`);
  });

  return `${baseUrl}?${params.toString()}`;
}
