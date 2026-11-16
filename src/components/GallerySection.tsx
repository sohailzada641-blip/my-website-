import * as React from "react";
import { X, ZoomIn } from "lucide-react";
import { GALLERY_PHOTOS, type GalleryCategory, type GalleryPhoto } from "../data/restaurant-data";

const GALLERY_CATEGORIES: GalleryCategory[] = [
  "All",
  "Platters & Karahi",
  "Barbecue",
  "Vibe & Drinks",
];

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = React.useState<GalleryCategory>("All");
  const [lightboxPhoto, setLightboxPhoto] = React.useState<GalleryPhoto | null>(null);

  const visiblePhotos = React.useMemo(() => {
    if (selectedCategory === "All") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((photo) => photo.category === selectedCategory);
  }, [selectedCategory]);

  React.useEffect(() => {
    if (!lightboxPhoto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxPhoto(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxPhoto]);

  return (
    <section id="gallery" className="border-b border-border/60 bg-transparent py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-6 rounded-2xl border border-border/80 bg-background/82 dark:bg-background/84 backdrop-blur-md p-6 shadow-sm sm:p-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Photos &amp; Kitchen Gallery
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              From the Live Charcoal Grill to Your Table
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Sizzling karahis, slow-steamed mutton raan, charcoal seekh kababs, and steaming cups of Dhood Patti served daily in Mardan.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Photo gallery categories"
            className="flex flex-wrap items-center gap-1 self-start rounded-lg bg-muted p-1 lg:self-auto"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visiblePhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              onClick={() => setLightboxPhoto(photo)}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card text-left transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
                photo.featured && selectedCategory === "All"
                  ? "sm:col-span-2 lg:col-span-2"
                  : ""
              }`}
            >
              <div
                className={`w-full overflow-hidden bg-muted ${
                  photo.featured && selectedCategory === "All"
                    ? "aspect-[16/10]"
                    : "aspect-[4/3]"
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4">
                <div>
                  <p className="text-xs font-medium text-white/75">{photo.category}</p>
                  <h3 className="text-sm font-semibold text-white">{photo.title}</h3>
                  <p className="mt-0.5 line-clamp-1 text-xs text-white/80">{photo.caption}</p>
                </div>
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
                  <ZoomIn aria-hidden="true" className="size-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxPhoto.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setLightboxPhoto(null)}
          />
          <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <button
              type="button"
              aria-label="Close photo preview"
              onClick={() => setLightboxPhoto(null)}
              className="absolute right-3 top-3 z-20 inline-flex size-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm hover:bg-black/80 cursor-pointer"
            >
              <X className="size-4" />
            </button>
            <div className="aspect-[4/3] w-full bg-muted">
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.title}
                referrerPolicy="no-referrer"
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <p className="text-xs font-medium text-accent">{lightboxPhoto.category}</p>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {lightboxPhoto.title}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{lightboxPhoto.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
