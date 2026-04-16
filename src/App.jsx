import React, { useMemo, useState, useEffect } from "react";
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

function getDateFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const d = params.get("date");
  if (!d) return null;

  const [day, month] = d.split("-").map(Number);
  return { day, month };
}

function clampText(value) {
  if (!value) return "";
  return String(value).trim();
}

export default function App() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const entries = useMemo(() => {
    const sorted = sortEntries(rockCalendarData);

    if (isLeapYear(currentYear)) return sorted;

    return sorted.filter((entry) => !(entry.month === 2 && entry.day === 29));
  }, [currentYear]);

  const todayIndex = useMemo(() => {
    const urlDate = getDateFromUrl();

    if (urlDate) {
      const i = entries.findIndex(
        (e) => e.day === urlDate.day && e.month === urlDate.month
      );
      if (i !== -1) return i;
    }

    return getInitialIndex(entries, now);
  }, [entries]);

  const [currentIndex, setCurrentIndex] = useState(todayIndex);

  useEffect(() => {
    setCurrentIndex(todayIndex);
  }, [todayIndex]);

  const entry = entries[currentIndex];
  const imageSrc = `${window.location.origin}${entry.cover}`;
  const songs = Array.isArray(entry.songs) ? entry.songs : [];

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? entries.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === entries.length - 1 ? 0 : prev + 1));
  };

  const goToday = () => {
    setCurrentIndex(todayIndex);
  };

  const accentDate = `${String(entry.day).padStart(2, "0")}.${String(
    entry.month
  ).padStart(2, "0")}.`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050b19",
        color: "#fff",
        padding: isMobile ? "10px" : "16px",
        fontFamily: "Inter, Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1460px",
          margin: "0 auto",
          borderRadius: isMobile ? "24px" : "30px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          background:
            "radial-gradient(circle at top left, rgba(15,34,73,0.28), transparent 28%), linear-gradient(180deg, #07101f 0%, #050b19 100%)",
          boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
        }}
      >
        <div
          style={{
            padding: isMobile ? "12px 14px" : "18px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: isMobile ? "nowrap" : "wrap",
          }}
        >
          {!isMobile && (
            <div
              style={{
                fontSize: isMobile ? "20px" : "22px",
                textTransform: "uppercase",
                fontWeight: 900,
                color: "#f4bc10",
                letterSpacing: "-0.5px",
              }}
            >
              Rock Calendar
            </div>
          )}

          <div
            style={{
              display: "flex",
              gap: isMobile ? "8px" : "12px",
              width: isMobile ? "100%" : "auto",
              justifyContent: isMobile ? "space-between" : "flex-end",
            }}
          >
            <button onClick={goPrev} style={navButtonStyle(isMobile)}>
              ← Zurück
            </button>
            <button onClick={goToday} style={todayButtonStyle(isMobile)}>
              Heute
            </button>
            <button onClick={goNext} style={navButtonStyle(isMobile, true)}>
              Weiter →
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
            gap: isMobile ? 0 : "24px",
            minHeight: isMobile ? "auto" : "calc(100vh - 130px)",
          }}
        >
          <div
            style={{
              width: isMobile ? "100%" : "56%",
              order: isMobile ? 2 : 1,
              padding: isMobile ? "14px 20px 20px" : "44px 24px 40px 56px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: isMobile ? "8px" : "12px",
                marginBottom: isMobile ? "8px" : "18px",
              }}
            >
              <span
                style={{
                  fontSize: isMobile ? "66px" : "82px",
                  fontWeight: 900,
                  lineHeight: 0.9,
                  color: "#f4bc10",
                  letterSpacing: "-2px",
                }}
              >
                {accentDate}
              </span>
              <span
                style={{
                  fontSize: isMobile ? "66px" : "82px",
                  fontWeight: 900,
                  lineHeight: 0.9,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "-2px",
                }}
              >
                {entry.year}
              </span>
            </div>

            <h1
              style={{
                fontSize: isMobile ? "74px" : "112px",
                lineHeight: isMobile ? 0.9 : 0.88,
                letterSpacing: "-3px",
                fontWeight: 900,
                margin: 0,
                textTransform: "uppercase",
                maxWidth: isMobile ? "100%" : "7ch",
              }}
            >
              {entry.artist}
            </h1>

            <h2
              style={{
                fontSize: isMobile ? "34px" : "64px",
                lineHeight: 0.95,
                letterSpacing: "-1.5px",
                fontWeight: 900,
                margin: isMobile ? "8px 0 0 0" : "14px 0 0 0",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.38)",
                maxWidth: isMobile ? "100%" : "8ch",
              }}
            >
              {entry.title}
            </h2>

            <p
              style={{
                fontSize: isMobile ? "17px" : "20px",
                lineHeight: isMobile ? 1.55 : 1.6,
                maxWidth: "760px",
                margin: isMobile ? "20px 0 0 0" : "28px 0 0 0",
                color: "rgba(255,255,255,0.78)",
              }}
            >
              {clampText(entry.text)}
            </p>

            <div
              style={{
                marginTop: isMobile ? "10px" : "14px",
                color: "#f4bc10",
                fontWeight: 800,
                fontSize: isMobile ? "14px" : "15px",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Mehr erfahren ↗
            </div>

            {songs.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: isMobile ? "18px" : "22px",
                }}
              >
                {songs.map((song) => (
                  <div
                    key={song}
                    style={{
                      padding: isMobile ? "8px 14px" : "10px 16px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.14)",
                      fontSize: isMobile ? "13px" : "14px",
                      background: "rgba(255,255,255,0.03)",
                      color: "rgba(255,255,255,0.92)",
                    }}
                  >
                    {song}
                  </div>
                ))}
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: isMobile ? "12px" : "16px",
                flexWrap: isMobile ? "nowrap" : "wrap",
                marginTop: isMobile ? "22px" : "30px",
              }}
            >
              <a
                href={entry.playUrl}
                target="_blank"
                rel="noreferrer"
                style={playButtonStyle(isMobile)}
              >
                ▶ Play
              </a>

              <a
                href={entry.buyUrl}
                target="_blank"
                rel="noreferrer"
                style={buyButtonStyle(isMobile)}
              >
                🛒 Buy
              </a>
            </div>
          </div>

          <div
            style={{
              width: isMobile ? "100%" : "44%",
              order: isMobile ? 1 : 2,
              padding: isMobile ? "18px 18px 0" : "24px 42px 24px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: isMobile ? "stretch" : "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: isMobile ? "420px" : "520px",
                margin: isMobile ? "0 auto" : "0",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: isMobile ? "10px" : "18px",
                  top: isMobile ? "22px" : "34px",
                  width: isMobile ? "86%" : "88%",
                  height: isMobile ? "86%" : "88%",
                  borderRadius: isMobile ? "22px" : "30px",
                  background: "rgba(7,13,25,0.88)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  right: isMobile ? "8px" : "16px",
                  top: isMobile ? "56px" : "78px",
                  width: isMobile ? "54%" : "56%",
                  aspectRatio: "1 / 1",
                  borderRadius: "999px",
                  background:
                    "radial-gradient(circle, rgba(18,18,18,0.12) 0%, rgba(10,10,10,0.72) 56%, rgba(0,0,0,0.95) 100%)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.45)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: isMobile ? "-2px" : "6px",
                  bottom: isMobile ? "28px" : "38px",
                  width: isMobile ? "48px" : "70px",
                  height: isMobile ? "116px" : "136px",
                  borderRadius: "18px",
                  background: "rgba(244,188,16,0.12)",
                }}
              />

              <div
                style={{
                  position: "relative",
                  padding: isMobile ? "24px" : "32px",
                  borderRadius: isMobile ? "24px" : "28px",
                  background: "rgba(0,0,0,0.18)",
                }}
              >
                <div
                  style={{
                    overflow: "hidden",
                    borderRadius: isMobile ? "6px" : "8px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={entry.title}
                    onError={(e) => {
                      e.currentTarget.src = `${window.location.origin}/placeholder.jpg`;
                    }}
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>

                <div
                  style={{
                    position: "absolute",
                    top: isMobile ? "8px" : "4px",
                    right: isMobile ? "10px" : "-6px",
                    width: isMobile ? "106px" : "136px",
                    height: isMobile ? "106px" : "136px",
                    borderRadius: "999px",
                    background: "rgba(158,0,60,0.88)",
                    border: "2px dashed rgba(255,125,183,0.34)",
                    color: "#ffd7e8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontSize: isMobile ? "10px" : "13px",
                    fontWeight: 900,
                    letterSpacing: "1.4px",
                    lineHeight: 1.35,
                    textTransform: "uppercase",
                    boxShadow: "0 10px 30px rgba(158,0,60,0.3)",
                    padding: "10px",
                  }}
                >
                  Classic Rock
                  <br />
                  Approved
                  <br />
                  Gold Edition
                </div>
              </div>
            </div>

            <div
              style={{
                width: "100%",
                maxWidth: isMobile ? "360px" : "520px",
                margin: isMobile ? "18px auto 0" : "30px 0 0",
              }}
            >
              <div
                style={{
                  borderRadius: isMobile ? "18px" : "22px",
                  border: "1px solid rgba(244,188,16,0.14)",
                  background: isMobile ? "rgba(244,188,16,0.08)" : "transparent",
                  padding: isMobile ? "16px 18px" : 0,
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "13px" : "15px",
                    textTransform: "uppercase",
                    letterSpacing: isMobile ? "0.28em" : "0.34em",
                    color: "#f0d06c",
                  }}
                >
                  Eintrag {currentIndex + 1} von {entries.length}
                </div>
                <div
                  style={{
                    width: isMobile ? "170px" : "280px",
                    height: "4px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.12)",
                    margin: isMobile ? "12px auto 0" : "16px 0 0",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${((currentIndex + 1) / entries.length) * 100}%`,
                      height: "100%",
                      background: "#f4bc10",
                      borderRadius: "999px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function navButtonStyle(isMobile, isNext = false) {
  return {
    padding: isMobile ? "10px 12px" : "12px 18px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.02)",
    color: isNext ? "#f4bc10" : "rgba(255,255,255,0.86)",
    fontWeight: 700,
    cursor: "pointer",
    fontSize: isMobile ? "15px" : "16px",
    minWidth: isMobile ? "auto" : "unset",
    flex: isMobile ? 1 : "unset",
  };
}

function todayButtonStyle(isMobile) {
  return {
    padding: isMobile ? "10px 18px" : "12px 24px",
    borderRadius: "16px",
    border: "1px solid rgba(244,188,16,0.24)",
    background: "#f4bc10",
    color: "#151515",
    fontWeight: 900,
    cursor: "pointer",
    fontSize: isMobile ? "15px" : "16px",
    boxShadow: "0 0 24px rgba(244,188,16,0.26)",
    flex: isMobile ? 1 : "unset",
  };
}

function playButtonStyle(isMobile) {
  return {
    padding: isMobile ? "18px 0" : "18px 30px",
    background: "#f4bc10",
    color: "#111",
    borderRadius: "999px",
    fontWeight: 900,
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    boxShadow: "0 0 28px rgba(244,188,16,0.22)",
    textAlign: "center",
    flex: isMobile ? 1 : "unset",
    minWidth: isMobile ? 0 : "170px",
  };
}

function buyButtonStyle(isMobile) {
  return {
    padding: isMobile ? "18px 0" : "18px 30px",
    background: "transparent",
    color: "#f4bc10",
    borderRadius: "999px",
    fontWeight: 900,
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    border: "2px solid #f4bc10",
    textAlign: "center",
    flex: isMobile ? 1 : "unset",
    minWidth: isMobile ? 0 : "170px",
  };
}
