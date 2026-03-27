import React, { useMemo, useState } from "react";
import rockCalendarData from "./data/rockCalendarData";

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function sortEntries(entries) {
  return [...entries].sort((a, b) => {
    if (a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
  });
}

function formatDate(day, month, year) {
  const dd = String(day).padStart(2, "0");
  const mm = String(month).padStart(2, "0");
  return `${dd}.${mm}.${year}`;
}

function getInitialIndex(entries, now) {
  const month = now.getMonth() + 1;
  const day = now.getDate();

  const exactIndex = entries.findIndex(
    (entry) => entry.month === month && entry.day === day
  );

  if (exactIndex !== -1) return exactIndex;

  const fallbackIndex = entries.findIndex(
    (entry) =>
      entry.month > month || (entry.month === month && entry.day >= day)
  );

  return fallbackIndex !== -1 ? fallbackIndex : 0;
}

export default function App() {
  const now = new Date();
  const currentYear = now.getFullYear();

  const entries = useMemo(() => {
    const sorted = sortEntries(rockCalendarData);

    if (isLeapYear(currentYear)) return sorted;

    return sorted.filter((entry) => !(entry.month === 2 && entry.day === 29));
  }, [currentYear]);

  const todayIndex = useMemo(() => getInitialIndex(entries, now), [entries]);
  const [currentIndex, setCurrentIndex] = useState(todayIndex);

  const entry = entries[currentIndex];

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? entries.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === entries.length - 1 ? 0 : prev + 1));
  };

  const goToday = () => {
    setCurrentIndex(todayIndex);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #24356b 0%, #10182d 34%, #070b16 62%, #04060d 100%)",
        color: "#fff",
        padding: "16px",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          borderRadius: "28px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background:
            "linear-gradient(180deg, rgba(17,22,37,0.96) 0%, rgba(7,10,18,0.98) 100%)",
          boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              fontWeight: 800,
            }}
          >
            The Rock Calendar
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button onClick={goPrev} style={navButtonStyle}>
              ← Zurück
            </button>
            <button onClick={goToday} style={todayButtonStyle}>
              Heute
            </button>
            <button onClick={goNext} style={navButtonStyle}>
              Weiter →
            </button>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
          }}
        >
          <div style={{ padding: "34px 28px" }}>
            <div
              style={{
                fontSize: "18px",
                letterSpacing: "3px",
                opacity: 0.7,
                marginBottom: "10px",
                fontWeight: 700,
              }}
            >
              HEUTE IN DER ROCKGESCHICHTE
            </div>

            <div
              style={{
                fontSize: "58px",
                fontWeight: 900,
                lineHeight: 1,
                marginBottom: "18px",
              }}
            >
              {formatDate(entry.day, entry.month, entry.year)}
            </div>

            <div
              style={{
                fontSize: "14px",
                letterSpacing: "3px",
                opacity: 0.6,
                marginBottom: "10px",
              }}
            >
              {entry.type.toUpperCase()}
            </div>

            <h1
              style={{
                fontSize: "68px",
                lineHeight: 0.95,
                margin: "0 0 8px 0",
              }}
            >
              {entry.artist}
            </h1>

            <h2
              style={{
                fontSize: "38px",
                lineHeight: 1,
                margin: "0 0 18px 0",
              }}
            >
              {entry.title}
            </h2>

            <p
              style={{
                fontSize: "22px",
                lineHeight: 1.5,
                maxWidth: "760px",
                marginBottom: "24px",
              }}
            >
              {entry.text}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginBottom: "28px",
              }}
            >
              {entry.songs.map((song) => (
                <div
                  key={song}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.18)",
                    fontSize: "14px",
                    background: "rgba(255,255,255,0.03)",
                  }}
                >
                  {song}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <a
                href={entry.playUrl}
                target="_blank"
                rel="noreferrer"
                style={playButtonStyle}
              >
                Play
              </a>

              <a
                href={entry.buyUrl}
                target="_blank"
                rel="noreferrer"
                style={buyButtonStyle}
              >
                Buy
              </a>
            </div>
          </div>

          <div
            style={{
              padding: "28px",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                background: "#111",
              }}
            >
              <img
                src={entry.cover}
                alt={entry.title}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.jpg";
                }}
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
                  top: "18px",
                  right: "18px",
                  width: "104px",
                  height: "104px",
                  borderRadius: "999px",
                  background: "rgba(0,0,0,0.78)",
                  border: "2px solid rgba(255,255,255,0.24)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: "10px",
                  fontWeight: 900,
                  letterSpacing: "1px",
                  lineHeight: 1.2,
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
                  padding: "18px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.82), transparent)",
                }}
              >
                <div style={{ fontSize: "30px", fontWeight: 900 }}>
                  {formatDate(entry.day, entry.month, entry.year)}
                </div>
                <div style={{ fontWeight: 800, fontSize: "18px" }}>
                  {entry.artist}
                </div>
                <div style={{ fontSize: "14px", opacity: 0.92 }}>
                  {entry.title}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "16px",
                fontSize: "14px",
                opacity: 0.72,
              }}
            >
              Eintrag {currentIndex + 1} von {entries.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const navButtonStyle = {
  padding: "10px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer",
};

const todayButtonStyle = {
  padding: "10px 16px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.14)",
  background: "#fff",
  color: "#000",
  fontWeight: 800,
  cursor: "pointer",
};

const playButtonStyle = {
  padding: "16px 22px",
  background: "#fff",
  color: "#000",
  borderRadius: "14px",
  fontWeight: 800,
  textDecoration: "none",
};

const buyButtonStyle = {
  padding: "16px 22px",
  background: "linear-gradient(135deg, #d2a44a 0%, #f2d07a 100%)",
  color: "#111",
  borderRadius: "14px",
  fontWeight: 900,
  textDecoration: "none",
};