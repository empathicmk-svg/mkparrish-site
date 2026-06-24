import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MK Parrish - Growth Marketing, Positioning & Brand Strategy";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080808",
          color: "#F0F0EE",
          padding: "72px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div
            style={{
              color: "#F2AFC6",
              fontSize: "28px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            MK Parrish
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: "920px",
              fontSize: "88px",
              fontWeight: 800,
              lineHeight: 0.92,
              textTransform: "uppercase",
            }}
          >
            Turn how you are seen into revenue.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "2px solid #2C2C2C",
            paddingTop: "28px",
            fontSize: "26px",
            color: "#B0B0B0",
          }}
        >
          <span>Growth audits. Positioning. Websites. Outbound.</span>
          <span style={{ color: "#F2AFC6" }}>mkparrish.com</span>
        </div>
      </div>
    ),
    size
  );
}
