import { useEffect, useState } from "react";

/** Terminal-styled QR code rendered client-side to a data URL. */
export function SiteQrCode({ targetUrl, caption }: { targetUrl: string; caption: string }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        const dataUrl = await QRCode.toDataURL(targetUrl, {
          margin: 1,
          width: 220,
          errorCorrectionLevel: "M",
          color: { dark: "#33ff66ff", light: "#070907ff" },
        });
        if (!cancelled) setSrc(dataUrl);
      } catch {
        /* QR unavailable — the printed caption still explains the target */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [targetUrl]);

  return (
    <figure className="flex items-center gap-4 border-l border-border pl-5">
      <div className="border border-border-strong bg-background p-1.5 shadow-terminal">
        {src ? (
          <img
            src={src}
            alt={`QR code linking to ${targetUrl}`}
            width={88}
            height={88}
            className="block h-[88px] w-[88px]"
          />
        ) : (
          <div className="h-[88px] w-[88px] bg-background" aria-hidden="true" />
        )}
      </div>
      <figcaption className="max-w-40 font-mono text-[10px] leading-relaxed text-muted-foreground">
        <span className="text-primary">$ qrencode -o linkedin.png</span>
        <br />
        {caption}
      </figcaption>
    </figure>
  );
}
