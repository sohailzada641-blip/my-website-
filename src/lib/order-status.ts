import * as React from "react";

export type OrderStatusValue = "Open" | "Kitchen Preparing";

export interface RestaurantOrderStatus {
  isOpen: boolean;
  status: OrderStatusValue;
  weekday: string;
  currentTimePkt: string;
  todayHours: string;
  transitionText: string;
  expectationText: string;
}

interface DaySchedule {
  openMinutes: number;
  closeMinutes: number;
  hoursLabel: string;
}

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const PKT_SCHEDULE: Record<(typeof WEEKDAYS)[number], DaySchedule> = {
  Sunday: { openMinutes: 12 * 60, closeMinutes: 23 * 60, hoursLabel: "12:00 PM – 11:00 PM" },
  Monday: { openMinutes: 12 * 60, closeMinutes: 23 * 60, hoursLabel: "12:00 PM – 11:00 PM" },
  Tuesday: { openMinutes: 12 * 60, closeMinutes: 23 * 60, hoursLabel: "12:00 PM – 11:00 PM" },
  Wednesday: { openMinutes: 12 * 60, closeMinutes: 23 * 60, hoursLabel: "12:00 PM – 11:00 PM" },
  Thursday: { openMinutes: 12 * 60, closeMinutes: 23 * 60, hoursLabel: "12:00 PM – 11:00 PM" },
  Friday: { openMinutes: 13 * 60 + 30, closeMinutes: 23 * 60 + 30, hoursLabel: "1:30 PM – 11:30 PM" },
  Saturday: { openMinutes: 12 * 60, closeMinutes: 23 * 60 + 30, hoursLabel: "12:00 PM – 11:30 PM" },
};

function formatMinutes12h(totalMinutes: number): string {
  const hour24 = Math.floor(totalMinutes / 60) % 24;
  const minute = totalMinutes % 60;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  const minStr = minute.toString().padStart(2, "0");
  return `${hour12}:${minStr} ${period}`;
}

export function getRestaurantOrderStatus(now: Date = new Date()): RestaurantOrderStatus {
  const partsFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = partsFormatter.formatToParts(now);
  const partValue = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  const rawWeekday = partValue("weekday");
  const weekday = WEEKDAYS.includes(rawWeekday as (typeof WEEKDAYS)[number])
    ? (rawWeekday as (typeof WEEKDAYS)[number])
    : "Saturday";

  const rawHour = Number(partValue("hour"));
  const hour24 = Number.isFinite(rawHour) ? rawHour % 24 : 12;
  const rawMinute = Number(partValue("minute"));
  const minute = Number.isFinite(rawMinute) ? rawMinute : 0;

  const currentMinutes = hour24 * 60 + minute;
  const currentTimePkt = `${formatMinutes12h(currentMinutes)} PKT`;

  const schedule = PKT_SCHEDULE[weekday];
  const isOpen =
    currentMinutes >= schedule.openMinutes && currentMinutes < schedule.closeMinutes;

  let transitionText: string;
  if (isOpen) {
    transitionText = `Closes ${formatMinutes12h(schedule.closeMinutes)} PKT`;
  } else if (currentMinutes < schedule.openMinutes) {
    transitionText = `Opens today at ${formatMinutes12h(schedule.openMinutes)} PKT`;
  } else {
    const todayIdx = WEEKDAYS.indexOf(weekday);
    const tomorrow = WEEKDAYS[(todayIdx + 1) % WEEKDAYS.length];
    const tomorrowSchedule = PKT_SCHEDULE[tomorrow];
    transitionText = `Opens tomorrow at ${formatMinutes12h(tomorrowSchedule.openMinutes)} PKT`;
  }

  const expectationText = isOpen
    ? "Live charcoal grill is active — fresh platters & naan cooked to order."
    : `Outside service hours — orders placed now are queued for opening (${transitionText}).`;

  return {
    isOpen,
    status: isOpen ? "Open" : "Kitchen Preparing",
    weekday,
    currentTimePkt,
    todayHours: schedule.hoursLabel,
    transitionText,
    expectationText,
  };
}

export function useRestaurantOrderStatus(): RestaurantOrderStatus {
  const [status, setStatus] = React.useState<RestaurantOrderStatus>(() =>
    getRestaurantOrderStatus()
  );

  React.useEffect(() => {
    const refresh = () => setStatus(getRestaurantOrderStatus());

    const intervalId = window.setInterval(refresh, 30_000);
    const onVisibility = () => {
      if (!document.hidden) refresh();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return status;
}
