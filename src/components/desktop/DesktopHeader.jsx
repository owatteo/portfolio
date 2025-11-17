// src/components/desktop/DesktopHeader.jsx
import React, { useState } from 'react';
import { FaEnvelope, FaTelegram, FaInstagram } from 'react-icons/fa';

export default function DesktopHeader() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Анимированный логотип */}
      <div
        className="header-logo"
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ cursor: 'pointer', userSelect: 'none' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 18"
          style={{
            width: '137px',
            height: '24px',
            transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Полное слово: △watteo. */}
          <g
            className="text-full"
            style={{
              opacity: isCollapsed ? 0 : 1,
              transform: isCollapsed ? 'scale(0.3)' : 'scale(1)',
              transformOrigin: '0 9px',
              transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
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

          {/* Мини-логотип: △² */}
          <g
            className="favicon-group"
            style={{
              opacity: isCollapsed ? 1 : 0,
              transform: isCollapsed ? 'scale(1)' : 'scale(0.3)',
              transformOrigin: '8px 9px',
              transition: 'all 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
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

      {/* Соцсети */}
      <div className="social-icons">
        <a href="mailto:owatteo@gmail.com" aria-label="Email">
          <FaEnvelope size={26} />
        </a>
        <a href="https://t.me/owatteo" aria-label="Telegram">
          <FaTelegram size={24}/>
        </a>
        <a href="https://instagram.com/owatteo" aria-label="Instagram">
          <FaInstagram size={26}/>
        </a>
      </div>

      {/* Стили */}
      <style jsx>{`
        .header-logo {
          position: absolute !important;
          top: 30px !important;
          left: 40px !important;
          z-index: 10 !important;
        }
        .social-icons {
          position: absolute !important;
          top: 30.5px !important;
          right: 40px !important;
          z-index: 10 !important;
          height: 28px;
          display: flex !important;
          align-items: center;
          gap: 16px !important;
        }
        .social-icons a {
          color: white !important;
          text-decoration: none !important;
          cursor: pointer !important;
        }
        .social-icons a:hover {
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
}