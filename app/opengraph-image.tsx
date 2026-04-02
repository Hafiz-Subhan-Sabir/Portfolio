import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background:
            "radial-gradient(circle at 25% 20%, rgba(34,197,94,0.35), transparent 45%), radial-gradient(circle at 80% 20%, rgba(34,211,238,0.28), transparent 48%), #07001f",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            padding: "64px 72px",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, rgba(16,185,129,1), rgba(34,211,238,1))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#041018",
                fontWeight: 700,
                fontSize: 32,
              }}
            >
              H
            </div>
            <div style={{ fontSize: 34, fontWeight: 700 }}>Hafiz Subhan</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                fontSize: 86,
                lineHeight: 1,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                background:
                  "linear-gradient(90deg, rgba(16,185,129,1), rgba(56,189,248,1))",
                color: "transparent",
                backgroundClip: "text",
              }}
            >
              Full-Stack Engineer
            </div>
            <div style={{ fontSize: 34, color: "rgba(235,245,255,0.92)" }}>
              React • Next.js • TypeScript • Python • FastAPI
            </div>
          </div>

          <div style={{ fontSize: 26, color: "rgba(220,240,255,0.86)" }}>
            Hire-ready portfolio and production-grade projects
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

