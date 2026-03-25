import React, { useEffect, useState } from "react";

const today = {
  brand: "THE ROCK CALENDAR",
  day: "14",
  monthYear: "03 · 1973",
  artist: "PINK FLOYD",
  title: "THE DARK SIDE OF THE MOON",
  type: "RELEASE",
  text: "Pink Floyd veröffentlichen The Dark Side of the Moon — ein Monument der Albumgeschichte und einer der größten Meilensteine des Classic Rock.",
  songs: ["Time", "Money", "Us and Them"],
  cover:
    "https://m.media-amazon.com/images/I/31%2BszRBlJyL._SY300_SX300_QL70_ML2_.jpg",
  playUrl:
    "https://open.spotify.com/search/Pink%20Floyd%20The%20Dark%20Side%20of%20the%20Moon",
  buyUrl:
    "https://www.amazon.de/Dark-Side-Moon-Vinyl-LP/dp/B01LTHN0DG",
};

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #24356b 0%, #10182d 34%, #070b16 62%, #04060d 100%)",
        color: "#fff",
        padding: isMobile ? "12px" : "24px",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1450px",
          margin: "0 auto",
          borderRadius: isMobile ? "22px" : "34px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background:
            "linear-gradient(180deg, rgba(17,22,37,0.96) 0%, rgba(7,10,18,0.98) 100%)",
          boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            padding: isMobile ? "14px 16px" : "18px 22px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            fontSize: isMobile ? "12px" : "15px",
            letterSpacing: isMobile ? "3px" : "4px",
            textTransform: "uppercase",
            fontWeight: 800,
          }}
        >
          {today.brand}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
          }}
        >
          <div style={{ padding: isMobile ? "22px 16px" : "42px 34px" }}>
            <div
              style={{
                display: "flex",
                gap: isMobile ? "12px" : "18px",
                alignItems: "end",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontSize: isMobile ? "88px" : "140px",
                  fontWeight: 900,
                  letterSpacing: isMobile ? "-4px" : "-6px",
                  lineHeight: 0.9,
                }}
              >
                {today.day}
              </div>

              <div style={{ paddingBottom: isMobile ? "10px" : "20px" }}>
                <div
                  style={{
                    fontSize: isMobile ? "14px" : "18px",
                    letterSpacing: isMobile ? "3px" : "4px",
                    opacity: 0.7,
                    fontWeight: 700,
                  }}
                >
                  HEUTE
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "28px" : "42px",
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {today.monthYear}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                fontSize: isMobile ? "12px" : "14px",
                letterSpacing: "3px",
                opacity: 0.6,
                fontWeight: 700,
              }}
            >
              {today.type}
            </div>

            <h1
              style={{
                fontSize: isMobile ? "54px" : "86px",
                lineHeight: 0.95,
                margin: "10px 0 0 0",
              }}
            >
              {today.artist}
            </h1>

            <h2
              style={{
                fontSize: isMobile ? "32px" : "48px",
                lineHeight: 0.95,
                margin: "0 0 20px 0",
              }}
            >
              {today.title}
            </h2>

            <p
              style={{
                fontSize: isMobile ? "18px" : "22px",
                lineHeight: 1.5,
                maxWidth: "700px",
                marginBottom: "24px",
              }}
            >
              {today.text}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              {today.songs.map((song) => (
                <div
                  key={song}
                  style={{
                    padding: isMobile ? "9px 14px" : "10px 16px",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontSize: isMobile ? "13px" : "14px",
                  }}
                >
                  {song}
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "28px",
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <a
                href={today.playUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: isMobile ? "16px 22px" : "18px 26px",
                  background: "#fff",
                  color: "#000",
                  borderRadius: "14px",
                  fontWeight: 800,
                  textDecoration: "none",
                  fontSize: isMobile ? "16px" : "18px",
                }}
              >
                Play
              </a>

              <a
                href={today.buyUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  padding: isMobile ? "18px 24px" : "22px 32px",
                  background:
                    "linear-gradient(135deg, #d2a44a 0%, #f2d07a 100%)",
                  color: "#111",
                  borderRadius: "18px",
                  fontWeight: 900,
                  fontSize: isMobile ? "18px" : "20px",
                  textDecoration: "none",
                }}
              >
                Buy Now
              </a>
            </div>
          </div>

          <div
            style={{
              padding: isMobile ? "0 16px 16px 16px" : "30px",
              borderLeft: isMobile
                ? "none"
                : "1px solid rgba(255,255,255,0.06)",
              borderTop: isMobile
                ? "1px solid rgba(255,255,255,0.06)"
                : "none",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: isMobile ? "22px" : "28px",
                overflow: "hidden",
                maxWidth: isMobile ? "100%" : "none",
              }}
            >
              <img
                src={today.cover}
                alt={today.title}
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: isMobile ? "14px" : "20px",
                  right: isMobile ? "14px" : "20px",
                  width: isMobile ? "92px" : "110px",
                  height: isMobile ? "92px" : "110px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.78)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: isMobile ? "9px" : "11px",
                  fontWeight: 900,
                  letterSpacing: "1px",
                  lineHeight: "1.2",
                  padding: "10px",
                }}
              >
                CLASSIC ROCK
                <br />
                APPROVED
              </div>

              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  padding: isMobile ? "16px" : "20px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "22px" : "30px",
                    fontWeight: 900,
                  }}
                >
                  {today.day}.{today.monthYear.replace(" · ", ".")}
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: isMobile ? "16px" : "18px",
                  }}
                >
                  {today.artist}
                </div>
                <div style={{ fontSize: isMobile ? "12px" : "14px" }}>
                  {today.title}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}