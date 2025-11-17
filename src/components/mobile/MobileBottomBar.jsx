// src/components/mobile/MobileBottomBar.jsx
import React, { useState } from 'react';
import MobileHeader from './MobileHeader';
import { FaEnvelope, FaTelegram, FaInstagram } from 'react-icons/fa';

export default function MobileBottomBar({ isPlaying, onTogglePlay }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  return (
    <>
      {/* === НИЖНЯЯ ПАНЕЛЬ === */}
      <div className="mobile-bottom-bar">
        {/* === Play / Pause === */}
        <button onClick={onTogglePlay} className={`control-btn play-btn ${isPlaying ? 'active' : ''}`}>
          <div className="icon-wrapper">
            {isPlaying ? (
              <svg className="pause-icon" width="28" height="28" viewBox="0 0 24 24" fill="white">
                <rect x="5.5" y="3.5" width="5" height="17" rx="1.5" />
                <rect x="13.5" y="3.5" width="5" height="17" rx="1.5" />
              </svg>
            ) : (
              <svg className="play-icon" width="28" height="28" viewBox="0 0 24 24" fill="white">
                <polygon points="7,3 19,12 7,21" />
              </svg>
            )}
          </div>
        </button>

        {/* === КНОПКА ЛОГОТИПА (УЖЕ НЕ pointer-events:none) === */}
        <div
          className="logo-icon"
          onClick={() => setIsHeaderVisible(prev => !prev)}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"
            width="110" height="21" fill="none">
            <polygon points="8,3 15.5,16 0.5,16" stroke="white" strokeWidth="2"/>
            <text
              x="13"
              y="13"
              fontFamily="Arial, sans-serif"
              fontSize="16.5"
              fontWeight="400"
              fill="white"
              style={{ fontFeatureSettings: '"sups" 1' }}
            >²</text>
          </svg>
        </div>

        {/* === БУРГЕР + СОЦИАЛКИ === */}
        <div className="burger-wrapper">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="control-btn">
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* === ВЫПАДАЮЩЕЕ МЕНЮ === */}
          <div className={`social-drawer ${isMenuOpen ? 'open' : ''}`}>
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
      </div>
      
      {/* === ВСТАВКА МОБИЛЬНОГО ХЭДЕРА === */}
      <MobileHeader visible={isHeaderVisible} />

      {/* === СТИЛИ === */}
      <style jsx>{`
        .mobile-bottom-bar {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 150px;
          height: 55px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 24px;
          z-index: 1000;
          margin-bottom: env(safe-area-inset-bottom, 12px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .control-btn {
          position: relative;
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          width: 42px;
          height: 42px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.25s ease;
          z-index: 1;
        }

        .control-btn:active {
          transform: scale(0.9);
        }

        /* === Play/Pause анимация === */
        .play-btn .icon-wrapper {
          position: relative;
          width: 28px;
          height: 28px;
        }

        .play-icon,
        .pause-icon {
          position: absolute;
          top: 0;
          left: 0;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .play-btn .play-icon {
          opacity: 1;
          transform: scale(1);
        }

        .play-btn.active .play-icon {
          opacity: 0;
          transform: scale(0.6) rotate(15deg);
        }

        .play-btn .pause-icon {
          opacity: 0;
          transform: scale(0.6) rotate(-15deg);
        }

        .play-btn.active .pause-icon {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        /* === Логотип === */
        .logo-icon {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: auto;
          cursor: pointer;
        }

        /* === БУРГЕР === */
        .burger-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          transition: all 0.3s ease;
        }

        .hamburger span {
          width: 20px;
          height: 2.5px;
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

        /* === ВЫПАДАЮЩИЕ СОЦИАЛКИ === */
        .social-drawer {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 18px;
          opacity: 0;
          pointer-events: none;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-drawer.open {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
          pointer-events: auto;
        }

        .social-link {
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s, transform 0.25s ease;
        }

        .social-link:hover {
          opacity: 0.8;
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
