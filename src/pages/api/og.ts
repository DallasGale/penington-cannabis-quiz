import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import React from "react";

export const GET: APIRoute = async ({ request }): Promise<Response> => {
  try {
    const url = new URL(request.url);

    const answers = Array.from({ length: 2 }, (_, i) => {
      const result = url.searchParams.get(`r${i + 1}`);
      if (!result) return null;

      const [value] = result.split(",");
      const percentage = parseInt(value);

      return {
        percent: isNaN(percentage) ? 0 : percentage / 2,
        number: i + 1,
        value: result,
        result: value || "N/A",
      };
    });

    console.log({ answers });
    const element = React.createElement(
      "div",
      {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#067000",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            width: "100%",
            gap: "20px",
            borderRadius: "20px",
            flex: 1,
          },
        },
        React.createElement(
          "h1",
          {
            style: {
              fontSize: "48px",
              color: "#ffffff",
              textAlign: "center",
              fontWeight: "bold",
              position: "absolute",
              fontFamily: "inter",
              justifyContent: "center",
              display: "flex",
              width: "100%",
              top: 30,
              lineHeight: "100%",
              margin: "auto",
              padding: "0 150px",
              left: "0",
              right: "0",
            },
          },
          "This is where I stand on cannabis regulation.",
        ),

        answers.map((answer, index) => {
          if (!answer) return null;
          return React.createElement(
            "div",
            {
              key: index,
              style: {
                display: "flex",
                width: "50%",
                maxWidth: "50%",
                flexDirection: "column",
                marginTop: "70px",
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
              React.createElement("span", {
                style: {
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#ffffff",
                },
              }),
              React.createElement(
                "div",
                {
                  style: {
                    position: "absolute",
                    width: "300px",
                    height: "150px",
                    display: "flex",
                    justifyContent: "center",
                    margin: "auto",
                    left: 110,
                    right: 0,
                    top: -100,
                    alignItems: "center",
                  },
                },
                React.createElement("span", {
                  style: {
                    transform: `translateX(${answer.percent}%)`,
                    position: "absolute",
                    fontWeight: "bold",
                    height: "150px",
                    left: "0",
                    width: "150px",
                    color: "#ffffff",
                    borderRadius: "150px",
                    backgroundColor: "#ffffff",
                    opacity: 0.3,
                  },
                }),
                React.createElement("span", {
                  style: {
                    transform: `translateX(-${answer.percent}%)`,
                    position: "absolute",
                    height: "150px",
                    right: "0",
                    width: "150px",
                    color: "#ffffff",
                    borderRadius: "150px",
                    backgroundColor: "#ffffff",
                    opacity: 0.3,
                  },
                }),
              ),
            ),
            React.createElement(
              "p",
              {
                style: {
                  fontSize: "34px",
                  position: "absolute",
                  top: 80,
                  color: "#ffffff",
                  margin: "10px 0 0 0",
                  padding: "0 50px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  lineHeight: "100%",
                  alignItems: "center",
                },
              },
              `I'm ${answer.result} aligned with ${answer.number === 1 ? "Penington" : "other Victorians"}`,
            ),
          );
        }),
      ),
      React.createElement(
        "p",
        {
          style: {
            fontSize: "24px",
            position: "relative",
            color: "#ffffff",
            margin: "10px 0 0 0",
            padding: "0 300px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            lineHeight: "100%",
            alignItems: "center",
          },
        },
        `Take the test and find out where you stand on safe cannabis regulation.`,
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
