import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#0d1117",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#58a6ff",
          fontWeight: 800,
          borderRadius: 6,
          border: "2px solid #30363d",
        }}
      >
        D
      </div>
    ),
    {
      ...size,
    }
  );
}
