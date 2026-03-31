"use client";

import { useRef, useCallback } from "react";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

const QR_URL = "https://www.servelinkapp.com";
const QR_COLOR = "#1B6B7B";

export default function QRPage() {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadPNG = useCallback((size: number, filename: string) => {
    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.left = "-9999px";
    document.body.appendChild(wrapper);

    // Create temporary canvas at the desired size
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = size;
    tempCanvas.height = size;
    const ctx = tempCanvas.getContext("2d");
    if (!ctx) return;

    // Get source canvas
    const sourceCanvas = canvasRef.current?.querySelector("canvas");
    if (!sourceCanvas) return;

    // Draw white background + scaled QR
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(sourceCanvas, 0, 0, size, size);

    const url = tempCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    wrapper.remove();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
        <h1
          className="text-2xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          ServeLink QR Code
        </h1>
        <p className="text-gray-500 mb-8">
          Scan to visit{" "}
          <a
            href={QR_URL}
            className="text-[#1B6B7B] font-medium hover:underline"
          >
            servelinkapp.com
          </a>
        </p>

        {/* Display QR */}
        <div className="inline-block rounded-xl border-2 border-gray-100 p-4 mb-8">
          <QRCodeSVG
            value={QR_URL}
            size={250}
            fgColor={QR_COLOR}
            bgColor="#FFFFFF"
            level="H"
            includeMargin
          />
        </div>

        {/* Hidden high-res canvas for downloads */}
        <div ref={canvasRef} className="hidden">
          <QRCodeCanvas
            value={QR_URL}
            size={1024}
            fgColor={QR_COLOR}
            bgColor="#FFFFFF"
            level="H"
            includeMargin
          />
        </div>

        {/* Download buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => downloadPNG(512, "servelink-qr-512.png")}
            className="rounded-xl bg-[#1B6B7B] px-6 py-3 text-white font-semibold hover:bg-[#145A68] transition-colors"
          >
            Download for Social Media (512px)
          </button>
          <button
            onClick={() => downloadPNG(1024, "servelink-qr-1024.png")}
            className="rounded-xl bg-[#E85D04] px-6 py-3 text-white font-semibold hover:bg-[#C94608] transition-colors"
          >
            Download for Print (1024px)
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-400">
          Use these QR codes on flyers, WhatsApp, Instagram, and social media
          posts.
        </p>
      </div>
    </div>
  );
}
