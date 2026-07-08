/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

import * as QRCode from "qrcode";

export default function TutorialGatePage() {
  const landingUrl = "https://ipgktb-library.vercel.app";

  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    const generate = async () => {
      const qr = await QRCode.toDataURL(landingUrl, {
        width: 220,
        margin: 2,
      });

      setQrUrl(qr);
    };

    generate();
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center px-6">
      <div className="w-full max-w-xl space-y-12">
        {/* Header */}
        <div className="space-y-2 text-center p-3.5">
          <h1 className="text-2xl font-semibold tracking-tight">
            Cara untuk bermula
          </h1>
          <p className="text-sm text-neutral-500">
            Panduan ringkas sebelum anda masuk ke sistem
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="text-sm text-neutral-400 w-6">01</div>
            <div>
              <p className="text-sm font-medium">Buka laman</p>
              <p className="text-sm text-neutral-500">
                Imbas QR atau buka pautan yang disediakan.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-sm text-neutral-400 w-6">02</div>
            <div>
              <p className="text-sm font-medium">Daftar akaun</p>
              <p className="text-sm text-neutral-500">
                Isi maklumat asas untuk mula menggunakan sistem.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-sm text-neutral-400 w-6">03</div>
            <div>
              <p className="text-sm font-medium">Mula guna sistem</p>
              <p className="text-sm text-neutral-500">
                Tiada pengesahan diperlukan. Terus boleh digunakan selepas
                daftar.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="text-sm text-neutral-400 w-6">04</div>
            <div>
              <p className="text-sm font-medium">Bantuan & sokongan</p>
              <p className="text-sm text-neutral-500">
                Jika ada masalah pendaftaran atau penggunaan, hubungi{" "}
                <a
                  href="https://instagram.com/raufsemi"
                  className="text-purple-600 hover:underline"
                >
                  @raufsemi
                </a>{" "}
                untuk bantuan.
              </p>
            </div>
          </div>
        </div>
        {/* QR + CTA */}
        <div className="border border-neutral-200 rounded-2xl p-6 flex flex-col items-center gap-4">
          {qrUrl && (
            <img
              src={qrUrl}
              alt="Kod QR"
              className="rounded-xl border border-neutral-100"
            />
          )}

          <a
            href={landingUrl}
            className="text-sm font-medium text-purple-600 hover:text-purple-500 transition"
          >
            Masuk ke Laman →
          </a>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-neutral-400 pb-2.5">
          <div>© Perpustakaan Za’ba IPG Kampus Tuanku Bainun</div>
        </p>
      </div>
    </div>
  );
}
