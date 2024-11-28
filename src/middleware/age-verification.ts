// src/middleware/age-verification.ts
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  // List of public routes that don't require age verification
  const publicRoutes = ["/"];
  const isPublicRoute = publicRoutes.some(
    (route) => context.url.pathname === route,
  );

  if (isPublicRoute) {
    return next();
  }

  // For all other routes, we'll inject a verification check that runs immediately
  const verificationScript = `
    <script>
      (function() {
        const isVerified = localStorage.getItem('ageVerified') === 'true';
        if (!isVerified) {
          // Redirect immediately if not verified
          window.location.replace('/?restricted=true');
        }
      })();
    </script>
  `;

  // Get the response from the page
  const response = await next();

  // Only proceed if we got an HTML response
  if (response.headers.get("content-type")?.includes("text/html")) {
    const html = await response.text();

    // Insert our verification script at the start of the head
    // This ensures it runs before any other scripts or content loads
    const modifiedHtml = html.replace("<head>", `<head>${verificationScript}`);

    // Also add a no-cache header to prevent browsers from caching the protected content
    const headers = new Headers(response.headers);
    headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    headers.set("Pragma", "no-cache");
    headers.set("Expires", "0");

    return new Response(modifiedHtml, {
      status: 200,
      headers,
    });
  }

  return response;
});
