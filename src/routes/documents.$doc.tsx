import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { documents } from "@/data/documents";

export const Route = createFileRoute("/documents/$doc")({
  loader: ({ params }) => {
    const doc = documents[params.doc];
    if (!doc) throw notFound();
    return doc;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.title} — andyy dz` : "Document — andyy dz" },
      {
        name: "description",
        content:
          loaderData?.description ??
          "Certificate and recommendation documents from Andrew Vinston D'Souza's cybersecurity portfolio.",
      },
    ],
  }),
  component: DocumentViewer,
});

function DocumentViewer() {
  const doc = Route.useLoaderData();

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border bg-background/95 px-4 py-2 backdrop-blur sm:px-6">
        <div className="min-w-0">
          <a
            href={doc.backTo}
            className="inline-flex min-h-11 items-center gap-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft aria-hidden="true" /> {doc.backLabel}
          </a>
          <p className="truncate font-mono text-xs text-primary sm:text-sm">{doc.title}</p>
          <p className="font-mono text-[10px] text-muted-foreground">{doc.issuer}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={doc.file}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-colors duration-200 hover:border-border-strong hover:text-primary active:translate-y-px"
          >
            <ExternalLink aria-hidden="true" /> Open PDF
          </a>
          <a
            href={doc.file}
            download={doc.downloadName}
            className="inline-flex min-h-11 items-center gap-2 border border-border-strong px-4 py-2 font-mono text-xs text-primary transition-colors duration-200 hover:bg-primary hover:text-primary-foreground active:translate-y-px"
          >
            <Download aria-hidden="true" /> Download PDF
          </a>
        </div>
      </header>

      <main className="flex-1 px-3 py-4 sm:px-6">
        <div className="mx-auto h-[calc(100dvh-11rem)] max-w-5xl border border-border bg-card shadow-terminal animate-fade-in">
          <iframe src={doc.file} title={doc.title} className="h-full w-full" />
        </div>
        <aside className="mx-auto mt-3 max-w-5xl border border-border bg-card px-4 py-4 sm:px-5">
          <p className="font-mono text-xs tracking-wide text-accent">HAVING TROUBLE VIEWING THIS DOCUMENT?</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            If the PDF doesn&apos;t display correctly in your browser, you can open it in a new tab or
            download a copy using the button above.
          </p>
        </aside>
      </main>
    </div>
  );
}
