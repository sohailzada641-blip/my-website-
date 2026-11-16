import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus, Receipt, Search } from "lucide-react";
import { FULL_MENU_ITEMS, type MenuCategory } from "../data/restaurant-data";

interface MenuSectionProps {
  onAddItem: (item: { id: string; name: string; price: string; priceNum: number; image?: string }) => void;
}

const CATEGORIES: ("All" | MenuCategory)[] = [
  "All",
  "BBQ Platters",
  "Rice & Grill",
  "Naan & Sides",
  "Drinks & Tea",
];

export function MenuSection({ onAddItem }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<"All" | MenuCategory>("All");
  const [query, setQuery] = React.useState("");
  const [showPhotoMenu, setShowPhotoMenu] = React.useState(false);
  const [justAddedId, setJustAddedId] = React.useState<string | null>(null);
  const addedTimerRef = React.useRef<number>(0);

  React.useEffect(() => () => window.clearTimeout(addedTimerRef.current), []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return FULL_MENU_ITEMS.filter((item) => {
      const catMatch = selectedCategory === "All" || item.category === selectedCategory;
      const qMatch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [selectedCategory, query]);

  const handleAdd = (item: {
    id: string;
    name: string;
    price: string;
    priceNum: number;
    image?: string;
  }) => {
    onAddItem(item);
    setJustAddedId(item.id);
    window.clearTimeout(addedTimerRef.current);
    addedTimerRef.current = window.setTimeout(() => setJustAddedId(null), 1100);
  };

  return (
    <section id="menu" className="border-b border-border/60 bg-transparent py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 rounded-2xl border border-border/80 bg-background/82 dark:bg-background/84 backdrop-blur-md p-6 shadow-sm sm:p-7 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Complete Kitchen &amp; Tandoor Menu
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
              From Charcoal Platters to Tandoori Tea
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Every platter, freshly baked naan, and pot of Peshawari green tea priced transparently in Pakistani Rupees.
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => setShowPhotoMenu((prev) => !prev)}
            className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-border bg-card/90 backdrop-blur-sm px-4 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap shrink-0 cursor-pointer lg:self-auto"
          >
            <Receipt aria-hidden="true" className="size-3.5 text-muted-foreground" />
            <span>{showPhotoMenu ? "Hide Printed Menu Photo" : "View Printed Drinks & Naan Menu"}</span>
          </motion.button>
        </motion.div>

        <AnimatePresence initial={false}>
          {showPhotoMenu && (
            <motion.div
              key="printed-menu-card"
              initial={{ opacity: 0, y: -10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 grid items-center gap-6 rounded-2xl border border-border bg-card/92 backdrop-blur-md p-5 sm:grid-cols-[260px_1fr] sm:p-6"
            >
              <div className="overflow-hidden rounded-xl border border-border bg-muted">
                <img
                  src="/assets/aistudio/unnamed_7017a142.jpg"
                  alt="Printed Drinks, Tea, and Naan menu card from Platter House Restaurant Mardan"
                  referrerPolicy="no-referrer"
                  className="w-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">In-House Menu Reference</p>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Verified Tandoor &amp; Beverage Pricing
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  All Naan (Plain 130gm Rs 15, Plain 230gm Rs 30, Garlic Rs 60, Kalwanji Rs 70, Roghani Rs 80), Hot Teas (Green Tea Rs 30, Black Tea Rs 100, Dhood Patti Rs 150, Tandoori &amp; Kashmiri Tea Rs 200), and Chilled Cold Drinks match our in-restaurant menu card.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Filter bar + search */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-border/70 bg-muted/85 backdrop-blur-sm p-1"
          >
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`relative rounded-md px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="menu-active-tab"
                      transition={{ type: "spring", stiffness: 460, damping: 34 }}
                      className="absolute inset-0 rounded-md bg-card shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search dishes, naan, tea..."
              aria-label="Search menu items"
              className="h-10 w-full rounded-lg border border-border bg-card/90 backdrop-blur-sm pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Animated Menu Grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 rounded-xl border border-border bg-card/92 backdrop-blur-md p-10 text-center"
          >
            <p className="text-sm font-medium text-foreground">No dishes match &ldquo;{query}&rdquo;.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedCategory("All");
              }}
              className="mt-3 text-xs font-semibold text-accent underline underline-offset-4 cursor-pointer"
            >
              Reset menu filters
            </button>
          </motion.div>
        ) : (
          <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, idx) => {
                const isJustAdded = justAddedId === item.id;
                return (
                  <motion.article
                    key={item.id}
                    layout="position"
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.24,
                      delay: Math.min(idx * 0.025, 0.18),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ y: -3 }}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card/92 backdrop-blur-md shadow-sm transition-shadow duration-200 hover:shadow-md"
                  >
                    {item.image && (
                      <div className="aspect-[4/3] w-full overflow-hidden border-b border-border bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{item.category}</span>
                          {item.tag && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-medium text-accent">{item.tag}</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-base font-semibold tracking-tight text-foreground">
                          {item.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-border pt-4">
                        <span className="font-mono text-base font-semibold tabular-nums text-foreground">
                          {item.price}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() =>
                            handleAdd({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              priceNum: item.priceNum,
                              image: item.image,
                            })
                          }
                          className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap shrink-0 cursor-pointer ${
                            isJustAdded
                              ? "bg-emerald-700 text-white"
                              : "bg-foreground text-background hover:bg-foreground/90"
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check aria-hidden="true" className="size-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus aria-hidden="true" className="size-3.5" />
                              <span>Add to Tray</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
