import { ArrowDownRight, Clock, Flame, MapPin, Phone, Star } from "lucide-react";
import { BUSINESS_INFO } from "../data/restaurant-data";
import { useRestaurantOrderStatus } from "../lib/order-status";

export function HeroSection() {
  const orderStatus = useRestaurantOrderStatus();

  return (
    <section className="relative border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
        <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left editorial proposition */}
          <div className="flex flex-col justify-between gap-8 rounded-2xl border border-border/80 bg-background/82 dark:bg-background/84 backdrop-blur-md p-6 shadow-lg sm:p-8 lg:col-span-6">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium text-muted-foreground">
                <span>{BUSINESS_INFO.category}</span>
                <span aria-hidden="true">·</span>
                <span>{BUSINESS_INFO.city}</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-foreground tabular-nums">
                  <Star aria-hidden="true" className="size-3.5 fill-amber-500 text-amber-500" />
                  {BUSINESS_INFO.rating} ({BUSINESS_INFO.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              {/* Live PKT Order Status Row */}
              <div
                role="status"
                aria-live="polite"
                className="flex flex-wrap items-center gap-x-2.5 gap-y-1 border-y border-border/70 py-2.5 text-xs"
              >
                <span
                  className={`inline-flex items-center gap-1.5 font-semibold ${
                    orderStatus.isOpen
                      ? "text-emerald-700 dark:text-emerald-400"
                      : "text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {orderStatus.isOpen ? (
                    <Flame aria-hidden="true" className="size-3.5 shrink-0" />
                  ) : (
                    <Clock aria-hidden="true" className="size-3.5 shrink-0" />
                  )}
                  <span>Order Status: {orderStatus.status}</span>
                </span>
                <span aria-hidden="true" className="text-muted-foreground">·</span>
                <span className="font-mono tabular-nums text-foreground">
                  {orderStatus.currentTimePkt}
                </span>
                <span aria-hidden="true" className="text-muted-foreground">·</span>
                <span className="text-muted-foreground">{orderStatus.transitionText}</span>
              </div>

              <h1 className="font-display text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
                Charcoal BBQ &amp; Kabuli Platters, Served Fresh in Mardan.
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Well-marinated mutton, tender chicken boti, and hand-minced seekh kababs pulled straight from live hardwood embers onto steaming Kabuli pulao. Built for family dinners, group feasts, and late-night cravings on Nowshera Road.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#platters"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap shrink-0"
                >
                  <span>Explore Signature Platters</span>
                  <ArrowDownRight aria-hidden="true" className="size-4" />
                </a>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-border bg-card/90 backdrop-blur-sm px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap shrink-0 tabular-nums"
                >
                  <Phone aria-hidden="true" className="size-4 text-muted-foreground" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 text-foreground font-medium">
                  <MapPin aria-hidden="true" className="size-3.5 text-accent" />
                  {BUSINESS_INFO.address}
                </span>
              </div>
            </div>
          </div>

          {/* Right hero imagery */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[300px] overflow-hidden rounded-2xl border border-border bg-muted shadow-lg shadow-black/5 sm:min-h-[380px] lg:min-h-[430px]">
              <img
                src="/assets/aistudio/unnamed__1__a65a311a.jpg"
                alt="Mixed BBQ Platter with spiced Kabuli rice, seekh kabab, chicken tikka, naan, and raita at Platter House Restaurant Mardan"
                referrerPolicy="no-referrer"
                className="size-full object-cover lg:h-full"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 sm:p-6">
                <p className="text-sm font-medium text-white">
                  Mixed BBQ Platter with Kabuli Rice
                </p>
                <p className="mt-0.5 text-xs text-white/80">
                  Served hot with fresh tandoori naan, house zeera raita, and slaw
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column vital info strip */}
        <div className="mt-10 grid grid-cols-1 divide-y divide-border rounded-xl border border-border bg-card/85 backdrop-blur-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="p-4 sm:px-5">
            <p className="text-xs font-medium text-muted-foreground">
              Order Status ({orderStatus.weekday})
            </p>
            <p className="mt-1 flex flex-wrap items-baseline gap-1.5 text-sm font-semibold text-foreground">
              <span
                className={
                  orderStatus.isOpen
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-amber-700 dark:text-amber-400"
                }
              >
                {orderStatus.status}
              </span>
              <span aria-hidden="true" className="font-normal text-muted-foreground">·</span>
              <span className="font-mono text-xs font-normal tabular-nums text-muted-foreground">
                {orderStatus.todayHours}
              </span>
            </p>
          </div>
          <div className="p-4 sm:px-5">
            <p className="text-xs font-medium text-muted-foreground">Service Options</p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {BUSINESS_INFO.services.join(" · ")}
            </p>
          </div>
          <div className="p-4 sm:px-5">
            <p className="text-xs font-medium text-muted-foreground">Typical Spend</p>
            <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-foreground">
              {BUSINESS_INFO.priceRange} / person
            </p>
          </div>
          <div className="p-4 sm:px-5">
            <p className="text-xs font-medium text-muted-foreground">Directions Code</p>
            <p className="mt-1 font-mono text-sm font-semibold tabular-nums text-foreground">
              {BUSINESS_INFO.plusCode}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
