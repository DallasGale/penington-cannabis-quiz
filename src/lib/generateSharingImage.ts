export function generateSharingImage(results: any[]) {
  const baseUrl = "https://regulateit.com.au/";
  const params = new URLSearchParams();

  results.forEach((result, index) => {
    params.set(`r${index + 1}`, `${result.score},${result.description}`);
  });

  return `${baseUrl}?${params.toString()}`;
}
