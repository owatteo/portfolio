// src/components/mobile/MobileHeader.jsx
import React, { useState } from "react";

export default function MobileHeader() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div
        className="mobile-header"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: "fixed",
          top: "30px",
          left: "30px",
          zIndex: 999,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 18"
          style={{
            width: "137px",
            height: "24px",
            transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Полный логотип */}
          <g
            style={{
              opacity: isCollapsed ? 0 : 1,
              transform: isCollapsed ? "scale(0.3)" : "scale(1)",
              transformOrigin: "0 9px",
              transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <polygon
              points="8,3 15.5,16 0.5,16"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <text
              x="17"
              y="15"
              fontFamily="'Helvetica Neue', Arial, sans-serif"
              fontSize="21"
              fontWeight="400"
              fill="white"
              letterSpacing="0.8"
            >
              watteo.
            </text>
          </g>

          {/* Мини-логотип */}
          <g
            style={{
              opacity: isCollapsed ? 1 : 0,
              transform: isCollapsed ? "scale(1)" : "scale(0.3)",
              transformOrigin: "8px 9px",
              transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <polygon
              points="8,3 15.5,16 0.5,16"
              fill="none"
              stroke="white"
              strokeWidth="2"
            />
            <text
              x="13"
              y="13"
              fontFamily="Arial, sans-serif"
              fontSize="16.5"
              fontWeight="400"
              fill="white"
              style={{ fontFeatureSettings: '"sups" 1' }}
            >
              ²
            </text>
          </g>
        </svg>
      </div>
    </>
  );
}
