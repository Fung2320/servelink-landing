"use client";

import { useRef, useCallback } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { useLang } from "./LanguageContext";

const QR_URL = "https://www.servelinkapp.com";
const QR_COLOR = "#00342a";

interface QRCodeBlockProps {
  label: string;
  size?: number;
  showDownload?: boolean;
}

export default function QRCodeBlock({
  label,
  size = 150,
  showDownload = false,
}: QRCodeBlockProps) {
  const { t } = useLang();
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "servelink-qr.png";
    a.click();
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-xl bg-white p-3 shadow-lg">
        <QRCodeSVG
          value={QR_URL}
          size={size}
          fgColor={QR_COLOR}
          bgColor="#FFFFFF"
          level="M"
        />
      </div>
      <p className="text-sm font-medium text-white/70">{label}</p>

      {showDownload && (
        <>
          {/* Hidden canvas for download */}
          <div ref={canvasRef} className="hidden">
            <QRCodeCanvas
              value={QR_URL}
              size={512}
              fgColor={QR_COLOR}
              bgColor="#FFFFFF"
              level="H"
              includeMargin
            />
          </div>
          <button
            onClick={handleDownload}
            className="mt-1 rounded-lg bg-white/10 border border-white/20 px-4 py-2 text-xs font-medium text-white/80 transition-all hover:bg-white/20 hover:text-white"
          >
            {t("qrDownload")}
          </button>
        </>
      )}
    </div>
  );
}
