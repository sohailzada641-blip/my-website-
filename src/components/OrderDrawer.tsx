import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Check,
  CheckCircle2,
  Clock,
  Flame,
  History,
  Minus,
  Plus,
  RotateCcw,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import { BUSINESS_INFO, FULL_MENU_ITEMS } from "../data/restaurant-data";
import { useRestaurantOrderStatus } from "../lib/order-status";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  image?: string;
  quantity: number;
}

type FulfillmentMode = "Dine-in" | "Curbside pickup" | "No-contact delivery";
type DrawerTab = "tray" | "history";

export interface PreviousOrder {
  id: string;
  orderNo: string;
  placedAt: string;
  mode: FulfillmentMode;
  customerName?: string;
  items: CartItem[];
  deliveryFee: number;
  total: number;
  simulated?: boolean;
}

interface OrderDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onAddItems: (items: CartItem[]) => void;
}

const STORAGE_KEY = "platter_house_mardan_previous_orders_v1";

function toCartItem(menuId: string, quantity: number): CartItem | null {
  const found = FULL_MENU_ITEMS.find((entry) => entry.id === menuId);
  if (!found) return null;
  return {
    id: found.id,
    name: found.name,
    price: found.price,
    priceNum: found.priceNum,
    image: found.image,
    quantity,
  };
}

function buildSimulatedOrders(): PreviousOrder[] {
  const familyFeastItems = [
    toCartItem("menu-mixed-bbq-platter", 1),
    toCartItem("menu-roghani-naan", 3),
    toCartItem("menu-zeera-raita", 2),
    toCartItem("menu-green-tea", 3),
  ].filter((x): x is CartItem => x !== null);

  const eveningDuoItems = [
    toCartItem("menu-single-person-platter", 2),
    toCartItem("menu-tandoori-tea", 2),
    toCartItem("menu-garlic-naan", 2),
  ].filter((x): x is CartItem => x !== null);

  const karahiPickupItems = [
    toCartItem("menu-dum-mutton-karahi", 1),
    toCartItem("menu-kabuli-pulao", 1),
    toCartItem("menu-soft-drink-15", 1),
  ].filter((x): x is CartItem => x !== null);

  const sumTotal = (list: CartItem[]) =>
    list.reduce((acc, item) => acc + item.priceNum * item.quantity, 0);

  return [
    {
      id: "sim-ph-4812",
      orderNo: "PH-4812",
      placedAt: "Nov 10 · 8:45 PM",
      mode: "No-contact delivery",
      items: familyFeastItems,
      deliveryFee: 0,
      total: sumTotal(familyFeastItems),
      simulated: true,
    },
    {
      id: "sim-ph-4639",
      orderNo: "PH-4639",
      placedAt: "Nov 03 · 7:20 PM",
      mode: "Dine-in",
      items: eveningDuoItems,
      deliveryFee: 0,
      total: sumTotal(eveningDuoItems),
      simulated: true,
    },
    {
      id: "sim-ph-4490",
      orderNo: "PH-4490",
      placedAt: "Oct 26 · 9:10 PM",
      mode: "Curbside pickup",
      items: karahiPickupItems,
      deliveryFee: 0,
      total: sumTotal(karahiPickupItems),
      simulated: true,
    },
  ];
}

function loadPreviousOrders(): PreviousOrder[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === null) {
      const seeded = buildSimulatedOrders();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // Fallback cleanly if storage is blocked or malformed
  }
  return buildSimulatedOrders();
}

function persistPreviousOrders(orders: PreviousOrder[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // Ignore quota/storage errors silently
  }
}

function formatOrderTimestamp(date: Date): string {
  const monthDay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${monthDay} · ${time}`;
}

export function OrderDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemove,
  onClear,
  onAddItems,
}: OrderDrawerProps) {
  const orderStatus = useRestaurantOrderStatus();
  const [activeTab, setActiveTab] = React.useState<DrawerTab>("tray");
  const [mode, setMode] = React.useState<FulfillmentMode>("No-contact delivery");
  const [customerName, setCustomerName] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  const [deliveryAddress, setDeliveryAddress] = React.useState("");
  const [formError, setFormError] = React.useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = React.useState<{
    orderNo: string;
    total: number;
    mode: FulfillmentMode;
    name: string;
  } | null>(null);

  const [previousOrders, setPreviousOrders] = React.useState<PreviousOrder[]>(() =>
    loadPreviousOrders()
  );
  const [justAddedKey, setJustAddedKey] = React.useState<string | null>(null);
  const feedbackTimer = React.useRef<number>(0);

  React.useEffect(() => () => window.clearTimeout(feedbackTimer.current), []);

  React.useEffect(() => {
    if (!open) {
      setConfirmedOrder(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  React.useEffect(() => {
    if (items.length > 0 && confirmedOrder) {
      setConfirmedOrder(null);
    }
  }, [items.length, confirmedOrder]);

  if (!open) return null;

  const totalTrayCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.priceNum * item.quantity, 0);
  const deliveryFee = mode === "No-contact delivery" && subtotal > 0 && subtotal < 2500 ? 150 : 0;
  const grandTotal = subtotal + deliveryFee;

  const updateHistory = (next: PreviousOrder[]) => {
    setPreviousOrders(next);
    persistPreviousOrders(next);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || customerPhone.trim().length < 7) {
      setFormError("Please enter your name and mobile number (+92 / 03XX).");
      return;
    }
    if (mode === "No-contact delivery" && !deliveryAddress.trim()) {
      setFormError("Please provide your Mardan delivery address or landmark.");
      return;
    }
    setFormError(null);
    const orderNo = `PH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEntry: PreviousOrder = {
      id: `ord-${Date.now()}`,
      orderNo,
      placedAt: formatOrderTimestamp(new Date()),
      mode,
      customerName: customerName.trim(),
      items: items.map((item) => ({ ...item })),
      deliveryFee,
      total: grandTotal,
      simulated: false,
    };
    updateHistory([newEntry, ...previousOrders].slice(0, 12));

    setConfirmedOrder({
      orderNo,
      total: grandTotal,
      mode,
      name: customerName.trim(),
    });
    onClear();
  };

  const handleReorderAll = (order: PreviousOrder) => {
    onAddItems(order.items);
    setMode(order.mode);
    setConfirmedOrder(null);
    setActiveTab("tray");
  };

  const handleQuickAddSingle = (orderId: string, item: CartItem) => {
    onAddItems([{ ...item, quantity: 1 }]);
    const key = `${orderId}:${item.id}`;
    setJustAddedKey(key);
    window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setJustAddedKey(null), 1100);
  };

  const handleDeleteOrder = (orderId: string) => {
    updateHistory(previousOrders.filter((order) => order.id !== orderId));
  };

  const handleClearHistory = () => {
    updateHistory([]);
  };

  const handleRestoreSimulated = () => {
    updateHistory(buildSimulatedOrders());
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your Platter House order tray and previous orders"
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
      />

      <aside className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-2xl">
        {/* Drawer Header + Tabs */}
        <div className="border-b border-border px-5 pt-4 pb-3 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {activeTab === "tray" ? (
                <ShoppingBag aria-hidden="true" className="size-4 text-accent" />
              ) : (
                <History aria-hidden="true" className="size-4 text-accent" />
              )}
              <h2 className="font-display text-lg font-semibold text-foreground">
                {activeTab === "tray" ? "Your Order Tray" : "Previous Orders"}
              </h2>
            </div>
            <button
              type="button"
              aria-label="Close order drawer"
              onClick={onClose}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          <div
            role="tablist"
            aria-label="Order drawer views"
            className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1"
          >
            <button
              role="tab"
              aria-selected={activeTab === "tray"}
              type="button"
              onClick={() => setActiveTab("tray")}
              className={`relative flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "tray"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "tray" && (
                <motion.span
                  layoutId="order-drawer-tab"
                  transition={{ type: "spring", stiffness: 460, damping: 34 }}
                  className="absolute inset-0 rounded-md bg-card shadow-sm"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Current Tray</span>
                {totalTrayCount > 0 && (
                  <span className="inline-flex min-w-5 items-center justify-center rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-accent">
                    {totalTrayCount}
                  </span>
                )}
              </span>
            </button>

            <button
              role="tab"
              aria-selected={activeTab === "history"}
              type="button"
              onClick={() => setActiveTab("history")}
              className={`relative flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "history"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === "history" && (
                <motion.span
                  layoutId="order-drawer-tab"
                  transition={{ type: "spring", stiffness: 460, damping: 34 }}
                  className="absolute inset-0 rounded-md bg-card shadow-sm"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Previous Orders</span>
                {previousOrders.length > 0 && (
                  <span className="inline-flex min-w-5 items-center justify-center rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold tabular-nums text-foreground">
                    {previousOrders.length}
                  </span>
                )}
              </span>
            </button>
          </div>

          {/* Live Mardan PKT Order Status Bar in Drawer Header */}
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col gap-0.5 border-t border-border/70 pt-2.5 text-xs"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
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
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
                {orderStatus.currentTimePkt}
              </span>
            </div>
            <p className="text-[11px] leading-snug text-muted-foreground">
              {orderStatus.expectationText}
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <AnimatePresence mode="wait" initial={false}>
            {activeTab === "tray" ? (
              <motion.div
                key="tab-tray"
                role="tabpanel"
                aria-label="Current Tray"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                {confirmedOrder ? (
                  <div className="space-y-4 rounded-xl border border-border bg-card p-6 text-center">
                    <CheckCircle2 aria-hidden="true" className="mx-auto size-10 text-emerald-600" />
                    <div className="space-y-1">
                      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                        Order {confirmedOrder.orderNo} Confirmed
                      </p>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        Firing Your Charcoal Order
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Thank you, {confirmedOrder.name}. Your {confirmedOrder.mode.toLowerCase()} order totaling{" "}
                        <span className="font-mono font-semibold text-foreground">
                          Rs {confirmedOrder.total.toLocaleString()}
                        </span>{" "}
                        has been saved to Previous Orders and logged for preparation.
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      For urgent updates, call our kitchen desk directly at{" "}
                      <a href={BUSINESS_INFO.phoneHref} className="font-mono font-medium text-foreground underline">
                        {BUSINESS_INFO.phone}
                      </a>
                      .
                    </p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmedOrder(null);
                          setActiveTab("history");
                        }}
                        className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-border bg-background px-4 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer"
                      >
                        View in Previous Orders
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmedOrder(null);
                          onClose();
                        }}
                        className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-foreground px-4 text-xs font-semibold text-background cursor-pointer"
                      >
                        Back to Menu
                      </button>
                    </div>
                  </div>
                ) : items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center py-14 text-center">
                    <ShoppingBag aria-hidden="true" className="size-10 text-muted-foreground/40" />
                    <p className="mt-4 text-sm font-semibold text-foreground">Your tray is currently empty</p>
                    <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
                      Pick a sizzling platter off the revolving showcase, browse the kitchen menu, or quickly re-order a past favorite.
                    </p>
                    {previousOrders.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setActiveTab("history")}
                        className="mt-5 inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-4 text-xs font-semibold text-foreground transition-colors hover:bg-muted cursor-pointer"
                      >
                        <History aria-hidden="true" className="size-3.5 text-accent" />
                        <span>Browse {previousOrders.length} Previous Orders</span>
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Fulfillment Mode */}
                    <div>
                      <p className="mb-2 text-xs font-medium text-muted-foreground">Service Mode</p>
                      <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
                        {(["Dine-in", "Curbside pickup", "No-contact delivery"] as const).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setMode(option)}
                            className={`rounded-md px-2 py-2 text-[11px] font-medium transition-colors cursor-pointer ${
                              mode === option
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {option === "Curbside pickup"
                              ? "Curbside"
                              : option === "No-contact delivery"
                                ? "Delivery"
                                : "Dine-in"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Line items */}
                    <ul className="divide-y divide-border rounded-xl border border-border bg-card">
                      {items.map((item) => (
                        <li key={item.id} className="flex items-center justify-between gap-3 p-3.5">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
                            <p className="font-mono text-xs tabular-nums text-muted-foreground">
                              {item.price} each
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.name}`}
                              onClick={() => onUpdateQty(item.id, -1)}
                              className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted cursor-pointer"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-6 text-center font-mono text-xs font-semibold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.name}`}
                              onClick={() => onUpdateQty(item.id, 1)}
                              className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-muted cursor-pointer"
                            >
                              <Plus className="size-3" />
                            </button>
                            <button
                              type="button"
                              aria-label={`Remove ${item.name}`}
                              onClick={() => onRemove(item.id)}
                              className="ml-1 inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:text-red-600 cursor-pointer"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Customer Verification Form */}
                    <form id="checkout-form" onSubmit={handleCheckout} className="space-y-3">
                      <p className="text-xs font-medium text-muted-foreground">
                        Cash on Delivery / Pay at Counter Details
                      </p>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your full name"
                        aria-label="Your full name"
                        className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Mobile number (e.g. 0334 8998855)"
                        aria-label="Mobile number"
                        className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                      {mode === "No-contact delivery" && (
                        <input
                          type="text"
                          required
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          placeholder="Mardan address (Nowshera Rd, Sheikh Maltoon, Ring Rd...)"
                          aria-label="Delivery address"
                          className="h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      )}
                      {formError && <p className="text-xs font-medium text-red-600">{formError}</p>}
                    </form>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="tab-history"
                role="tabpanel"
                aria-label="Previous Orders"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted-foreground">
                    Saved locally on this device for 1-click re-ordering.
                  </p>
                  {previousOrders.length > 0 && (
                    <button
                      type="button"
                      onClick={handleClearHistory}
                      className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {previousOrders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-6 py-12 text-center">
                    <History aria-hidden="true" className="size-9 text-muted-foreground/40" />
                    <p className="mt-3 text-sm font-semibold text-foreground">No saved orders yet</p>
                    <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
                      Orders you place from your tray will appear here automatically for quick re-ordering.
                    </p>
                    <button
                      type="button"
                      onClick={handleRestoreSimulated}
                      className="mt-4 inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3.5 text-xs font-semibold text-foreground hover:bg-muted cursor-pointer"
                    >
                      <RotateCcw aria-hidden="true" className="size-3.5" />
                      <span>Load Sample Recent Orders</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {previousOrders.map((order) => (
                      <article
                        key={order.id}
                        className="overflow-hidden rounded-xl border border-border bg-card shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
                          <div className="space-y-0.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-mono text-xs font-semibold text-foreground">
                                #{order.orderNo}
                              </span>
                              <span aria-hidden="true" className="text-muted-foreground">·</span>
                              <span className="text-xs font-medium text-accent">{order.mode}</span>
                            </div>
                            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                              <Clock aria-hidden="true" className="size-3" />
                              <span>{order.placedAt}</span>
                              {order.customerName && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span>{order.customerName}</span>
                                </>
                              )}
                            </p>
                          </div>

                          <button
                            type="button"
                            aria-label={`Delete order ${order.orderNo} from history`}
                            onClick={() => handleDeleteOrder(order.id)}
                            className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-red-600 cursor-pointer"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>

                        <ul className="divide-y divide-border px-4">
                          {order.items.map((item) => {
                            const addedKey = `${order.id}:${item.id}`;
                            const isAdded = justAddedKey === addedKey;
                            return (
                              <li
                                key={addedKey}
                                className="flex items-center justify-between gap-3 py-2.5"
                              >
                                <div className="flex min-w-0 flex-1 items-center gap-2.5">
                                  {item.image && (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      referrerPolicy="no-referrer"
                                      className="size-9 shrink-0 rounded-md border border-border object-cover bg-muted"
                                    />
                                  )}
                                  <div className="min-w-0">
                                    <p className="truncate text-xs font-semibold text-foreground">
                                      <span className="font-mono text-muted-foreground mr-1">
                                        {item.quantity}×
                                      </span>
                                      {item.name}
                                    </p>
                                    <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
                                      Rs {(item.priceNum * item.quantity).toLocaleString()}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  aria-label={`Add one ${item.name} to tray`}
                                  onClick={() => handleQuickAddSingle(order.id, item)}
                                  className={`inline-flex h-7 items-center gap-1 rounded-md border px-2.5 text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                                    isAdded
                                      ? "border-emerald-700 bg-emerald-700 text-white"
                                      : "border-border bg-background text-foreground hover:bg-muted"
                                  }`}
                                >
                                  {isAdded ? (
                                    <>
                                      <Check aria-hidden="true" className="size-3" />
                                      <span>Added</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus aria-hidden="true" className="size-3" />
                                      <span>Add</span>
                                    </>
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>

                        <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/25 px-4 py-3">
                          <div>
                            <p className="text-[11px] text-muted-foreground">Order Total</p>
                            <p className="font-mono text-sm font-semibold tabular-nums text-foreground">
                              Rs {order.total.toLocaleString()}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleReorderAll(order)}
                            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-foreground px-3.5 text-xs font-semibold text-background transition-colors hover:bg-foreground/90 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <RotateCcw aria-hidden="true" className="size-3.5" />
                            <span>Re-order All</span>
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sticky Checkout Footer only in Current Tray when items exist */}
        {activeTab === "tray" && items.length > 0 && !confirmedOrder && (
          <div className="border-t border-border bg-card p-5 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums">Rs {subtotal.toLocaleString()}</span>
              </div>
              {mode === "No-contact delivery" && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Mardan Delivery {subtotal >= 2500 ? "(Free over Rs 2,500)" : ""}</span>
                  <span className="font-mono tabular-nums">
                    {deliveryFee === 0 ? "Free" : `Rs ${deliveryFee}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-foreground">
                <span>Total (Cash / Pay on Arrival)</span>
                <span className="font-mono tabular-nums">Rs {grandTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-accent px-5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 cursor-pointer"
            >
              {orderStatus.isOpen ? "Place" : "Schedule"}{" "}
              {mode === "No-contact delivery"
                ? "Delivery"
                : mode === "Curbside pickup"
                  ? "Pickup"
                  : "Dine-in"}{" "}
              {orderStatus.isOpen ? "Order" : "Order for Opening"}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
