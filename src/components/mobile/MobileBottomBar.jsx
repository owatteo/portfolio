// src/components/mobile/MobileBottomBar.jsx
import React, { useState } from "react";
import { FaEnvelope, FaTelegram, FaInstagram } from "react-icons/fa";

export default function MobileBottomBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* === БУРГЕР СПРАВА ВВЕРХУ === */}
      <div
        style={{
          position: "fixed",
          top: "28px",
          right: "30px",
          zIndex: 999,
        }}
      >
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="control-btn"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className={`hamburger ${isMenuOpen ? "active" : ""}`}>
            <span></span><span></span><span></span>
          </div>
        </button>

        {/* === ВЫПАДАЮЩИЕ СОЦСЕТИ (ТЕПЕРЬ ВНИЗ) === */}
        <div className={`social-drawer ${isMenuOpen ? "open" : ""}`}>
          <a href="mailto:owatteo@gmail.com" className="social-link">
            <FaEnvelope size={24} />
          </a>
          <a href="https://t.me/owatteo" className="social-link">
            <FaTelegram size={26} />
          </a>
          <a href="https://instagram.com/owatteo" className="social-link">
            <FaInstagram size={26} />
          </a>
        </div>
      </div>

      {/* === СТИЛИ ДЛЯ БУРГЕРА И МЕНЮ === */}
      <style jsx>{`
        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          transition: all 0.3s ease;
        }

        .hamburger span {
          width: 22px;
          height: 3px;
          background: white;
          border-radius: 2px;
          transition: all 0.35s ease;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }
        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(4px, -4px);
        }

        .social-drawer {
          position: absolute;
          top: 55px; /* теперь вниз */
          right: 1.5px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-10px);
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-drawer.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .social-link {
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          transition: opacity 0.2s, transform 0.25s ease;
        }

        .social-link:hover {
          opacity: 0.7;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
