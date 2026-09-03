import { useEffect, useState } from "react";

/** Terminal-styled QR code for the live site URL, rendered client-side to a data URL. */
export function SiteQrCode({ fallbackUrl }: { fallbackUrl: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [url, setUrl] = useState(fallbackUrl);

  useEffect(() => {
    let cancelled = false;
    const target = window.location.origin + "/";
    setUrl(target);
    void (async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        const dataUrl = await QRCode.toDataURL(target, {
          margin: 1,
          width: 220,
          errorCorrectionLevel: "M",
          color: { dark: "#33ff66ff", light: "#070907ff" },
        });
        if (!cancelled) setSrc(dataUrl);
      } catch {
        /* QR unavailable — the printed URL below still works */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <figure className="flex items-center gap-3">
      <div className="border border-border p-1">
        {src ? (
          <img src={src} alt={`QR code linking to ${url}`} width={88} height={88} className="h-22 w-22 block h-[88px] w-[88px]" />
        ) : (
          <div className="h-[88px] w-[88px] bg-background" aria-hidden="true" />
        )}
      </div>
      <figcaption className="font-mono text-[10px] leading-relaxed text-muted-foreground">
        <span className="text-primary">$ qrencode -o site.png</span>
        <br />
        scan to open this portfolio
      </figcaption>
    </figure>
  );
}
