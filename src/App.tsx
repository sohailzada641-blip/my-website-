/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from "react";
import { MotionConfig } from "motion/react";
import { Moon, Sun } from "lucide-react";
import SushiConveyorMenu, { type ConveyorDish } from "@/components/ui/sushi-conveyor-menu";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MenuSection } from "./components/MenuSection";
import { GallerySection } from "./components/GallerySection";
import { ReviewsAndVisitSection } from "./components/ReviewsAndVisitSection";
import { OrderDrawer, type CartItem } from "./components/OrderDrawer";
import {
  BUSINESS_INFO,
  PLATTER_BELT_DISHES,
  PLATTER_BELT_LEGEND,
} from "./data/restaurant-data";

function parsePrice(price: string): number {
  const digits = price.replace(/[^0-9]/g, "");
  return digits ? Number(digits) : 0;
}

export default function App() {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [addedToast, setAddedToast] = React.useState<string | null>(null);
  const [darkMode, setDarkMode] = React.useState(false);
  const toastTimer = React.useRef<number>(0);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  React.useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const showToast = (name: string) => {
    setAddedToast(`${name} added to tray`);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setAddedToast(null), 2600);
  };

  const addToCart = (item: {
    id: string;
    name: string;
    price: string;
    priceNum: number;
    image?: string;
  }) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(item.name);
  };

  const handleBeltAdd = (dish: ConveyorDish) => {
    addToCart({
      id: dish.id,
      name: dish.name,
      price: dish.price,
      priceNum: parsePrice(dish.price),
      image: dish.image,
    });
  };

  const addManyToCart = (incoming: CartItem[]) => {
    if (incoming.length === 0) return;
    setCart((prev) => {
      const next = [...prev];
      for (const item of incoming) {
        const idx = next.findIndex((entry) => entry.id === item.id);
        if (idx >= 0) {
          next[idx] = {
            ...next[idx],
            quantity: next[idx].quantity + item.quantity,
          };
        } else {
          next.push({ ...item });
        }
      }
      return next;
    });
    const totalAdded = incoming.reduce((sum, item) => sum + item.quantity, 0);
    setAddedToast(
      incoming.length === 1 && totalAdded === 1
        ? `${incoming[0].name} added to tray`
        : `${totalAdded} items added to tray`
    );
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setAddedToast(null), 2600);
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen text-foreground">
        {/* Website Background: Uploaded Restaurant Photo Clearly Visible Behind Content */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
          <img
            src="/assets/aistudio/download_c3f7e900.jpg"
            alt=""
            referrerPolicy="no-referrer"
            className="size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-background/18 dark:bg-background/34" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-transparent to-background/45" />
        </div>

        <Navbar cartCount={totalCount} onOpenCart={() => setDrawerOpen(true)} />

        <main>
          <HeroSection />

          {/* Interactive Revolving Platter Showcase powered by SushiConveyorMenu */}
          <div id="platters" className="border-b border-border/60 bg-transparent py-10 lg:py-14">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-background/80 dark:bg-background/82 backdrop-blur-md shadow-lg">
                <SushiConveyorMenu
                  className="!bg-transparent !py-8 lg:!py-10"
                  items={PLATTER_BELT_DISHES}
                  legend={PLATTER_BELT_LEGEND}
                  eyebrow="Signature Revolving Platter Pass"
                  heading="Pick a hot platter straight off the pass."
                  caption="Hover or drag to spin the showcase, then click any platter to inspect portions or add to your order."
                  autoplay={true}
                  onAdd={handleBeltAdd}
                  labels={{
                    add: "Add to order",
                    close: "Close",
                    previous: "Previous platter",
                    next: "Next platter",
                    pause: "Pause platter belt",
                  }}
                  action={
                    <a
                      href="#menu"
                      className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background shadow-sm transition-[translate,box-shadow] hover:-translate-y-px hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap shrink-0"
                    >
                      Browse Full Kitchen Menu
                    </a>
                  }
                />
              </div>
            </div>
          </div>

          <MenuSection onAddItem={addToCart} />

          <GallerySection />

          <ReviewsAndVisitSection />
        </main>

        <footer className="border-t border-border bg-background/85 backdrop-blur-md py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <div className="space-y-1">
            <p className="font-display text-lg font-semibold text-foreground">
              {BUSINESS_INFO.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {BUSINESS_INFO.address} ·{" "}
              <a href={BUSINESS_INFO.phoneHref} className="font-mono hover:text-foreground">
                {BUSINESS_INFO.phone}
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span>{BUSINESS_INFO.hoursSummary}</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 font-medium text-foreground hover:bg-muted cursor-pointer"
            >
              {darkMode ? (
                <>
                  <Sun aria-hidden="true" className="size-3.5" />
                  <span>Light Dining Mode</span>
                </>
              ) : (
                <>
                  <Moon aria-hidden="true" className="size-3.5" />
                  <span>Evening Charcoal Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </footer>

      {/* Live non-blocking toast when adding items */}
      {addedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-xl border border-border bg-foreground px-4 py-3 text-xs font-medium text-background shadow-xl"
        >
          <span>{addedToast}</span>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="underline underline-offset-4 cursor-pointer"
          >
            View Tray
          </button>
        </div>
      )}

      <OrderDrawer
        open={drawerOpen}
        items={cart}
        onClose={() => setDrawerOpen(false)}
        onUpdateQty={updateQty}
        onRemove={removeItem}
        onClear={() => setCart([])}
        onAddItems={addManyToCart}
      />
      </div>
    </MotionConfig>
  );
}
