import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Challenge My Beliefs — test beliefs against reality";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #020617 0%, #0f172a 55%, #0c4a6e 100%)",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#7dd3fc",
            fontWeight: 600,
            fontFamily: "sans-serif",
          }}
        >
          Challenge My Beliefs
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.1,
              color: "#f8fafc",
              fontWeight: 600,
              maxWidth: 900,
            }}
          >
            Test beliefs against objective reality.
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.4,
              color: "#cbd5e1",
              maxWidth: 820,
              fontFamily: "sans-serif",
            }}
          >
            Structured challenges. Contextual honesty. Public rulings.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#94a3b8",
            fontFamily: "sans-serif",
          }}
        >
          Unchanged · Refined · Changed
        </div>
      </div>
    ),
    { ...size },
  );
}
