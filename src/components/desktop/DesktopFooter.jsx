// src/components/desktop/DesktopFooter.jsx
export default function DesktopFooter() {
  return (
    <div className="footer">
      Designed by owatteo<br />© 2025 owatteo
      <style jsx>{`
        .footer {
          position: absolute !important;
          bottom: 30px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          color: white !important;
          font-family: 'Helvetica Neue', Arial, sans-serif !important;
          font-weight: lighter !important;
          font-size: 12px !important;
          letter-spacing: 1px !important;
          z-index: 10 !important;
          text-align: center !important;
        }
      `}</style>
    </div>
  );
}