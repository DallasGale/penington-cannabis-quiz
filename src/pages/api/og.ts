// src/pages/api/og.ts
import type { APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";

export const GET: APIRoute = async ({ request }) => {
  console.log("OG Image API called:", request.url);

  const url = new URL(request.url);
  console.log(
    "Raw search params:",
    Object.fromEntries(url.searchParams.entries())
  );

  // Safely decode parameters with error handling
  function safeDecodeURIComponent(str: string): string {
    try {
      // First decode
      const firstDecode = decodeURIComponent(str);
      // Check if we need a second decode (for double-encoded strings)
      if (firstDecode.includes("%")) {
        return decodeURIComponent(firstDecode);
      }
      return firstDecode;
    } catch (e) {
      console.error("Error decoding:", str, e);
      return str;
    }
  }

  const answers = Array.from({ length: 5 }, (_, i) => {
    const result = url.searchParams.get(`q${i + 1}`);
    if (!result) return null;

    // Safely decode the parameter
    const decoded = safeDecodeURIComponent(result);
    console.log(`Decoded q${i + 1}:`, decoded);
    return decoded;
  });

  console.log("Processed answers:", answers);

  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <style>
        .title { fill: #1a1a1a; font-size: 48px; font-family: system-ui; }
        .result { fill: #0066cc; font-size: 36px; font-weight: bold; }
        .description { fill: #4a4a4a; font-size: 24px; font-family: system-ui; }
        .background { fill: #f5f5f5; }
        .card { fill: white; }
        .divider { stroke: #e5e5e5; stroke-width: 1; }
      </style>
      
      <rect width="1200" height="630" class="background"/>
      <rect x="100" y="50" width="1000" height="530" rx="20" class="card" 
            filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"/>
      
      <text x="600" y="110" text-anchor="middle" class="title">Quiz Results</text>

      ${answers
        .map((answer, index) => {
          const [result, description] = (answer || ",").split(",");
          const y = 180 + index * 80;
          return `
          ${
            index > 0
              ? `<line x1="200" y1="${y - 20}" x2="1000" y2="${
                  y - 20
                }" class="divider"/>`
              : ""
          }
          <text x="200" y="${y}" class="result">Question ${index + 1}</text>
          <text x="400" y="${y}" class="result">${result || "N/A"}</text>
          <text x="200" y="${y + 30}" class="description">${
            description || ""
          }</text>
        `;
        })
        .join("")}
    </svg>
  `;

  try {
    console.log("Converting SVG to PNG...");
    const resvg = new Resvg(svg, {
      font: {
        loadSystemFonts: true,
      },
      background: "white",
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    console.log("PNG generated successfully");

    return new Response(pngBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error generating PNG:", error);
    return new Response("Error generating image", {
      status: 500,
      statusText: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
