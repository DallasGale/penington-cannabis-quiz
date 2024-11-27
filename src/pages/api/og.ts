// src/pages/api/og.ts
import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import React from "react";

export const GET: APIRoute = async ({ request }): Promise<Response> => {
  try {
    const url = new URL(request.url);

    function safeDecodeURIComponent(str: string): string {
      try {
        const firstDecode = decodeURIComponent(str);
        if (firstDecode.includes("%")) {
          return decodeURIComponent(firstDecode);
        }
        return firstDecode;
      } catch (e) {
        console.error("Error decoding:", str, e);
        return str;
      }
    }

    const answers = Array.from({ length: 3 }, (_, i) => {
      const result = url.searchParams.get(`r${i + 1}`);
      if (!result) return null;
      const decoded = safeDecodeURIComponent(result);
      return decoded;
    });

    const element = React.createElement(
      "div",
      {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000000",
          padding: "40px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            flex: 1,
          },
        },
        React.createElement(
          "h1",
          {
            style: {
              fontSize: "48px",
              fontFamily: "system-ui",
              color: "#1a1a1a",
              textAlign: "center",
              margin: "0 0 40px 0",
            },
          },
          "Quiz Results",
        ),
        answers.map((answer, index) => {
          const [result, description] = (answer || ",").split(",");
          return React.createElement(
            "div",
            {
              key: index,
              style: {
                display: "flex",
                flexDirection: "column",
                borderTop: index > 0 ? "1px solid #e5e5e5" : "none",
                paddingTop: "20px",
                marginTop: index > 0 ? "20px" : "0",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                },
              },
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#0066cc",
                  },
                },
                `Question ${index + 1}`,
              ),
              React.createElement(
                "span",
                {
                  style: {
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#0066cc",
                  },
                },
                result || "N/A",
              ),
            ),
            React.createElement(
              "p",
              {
                style: {
                  fontSize: "24px",
                  color: "#4a4a4a",
                  margin: "10px 0 0 0",
                },
              },
              description || "",
            ),
          );
        }),
      ),
    );

    return new ImageResponse(element, {
      width: 1200,
      height: 630,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Error generating image", {
      status: 500,
      statusText: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
