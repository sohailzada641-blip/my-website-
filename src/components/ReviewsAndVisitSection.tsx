import * as React from "react";
import { Check, ChevronDown, Clock, Copy, ExternalLink, MapPin, Phone, Star, Users } from "lucide-react";
import {
  BUSINESS_INFO,
  INITIAL_REVIEWS,
  POPULAR_TIMES,
  RATING_DISTRIBUTION,
  REVIEW_TOPICS,
  type GuestReview,
} from "../data/restaurant-data";

export function ReviewsAndVisitSection() {
  const [reviews, setReviews] = React.useState<GuestReview[]>(INITIAL_REVIEWS);
  const [selectedTopic, setSelectedTopic] = React.useState<string>("all");
  const [showReviewForm, setShowReviewForm] = React.useState(false);
  const [reviewName, setReviewName] = React.useState("");
  const [reviewRating, setReviewRating] = React.useState(5);
  const [reviewTopic, setReviewTopic] = React.useState<GuestReview["topic"]>("platter");
  const [reviewText, setReviewText] = React.useState("");

  const [selectedDay, setSelectedDay] = React.useState<string>("Saturday");
  const [hoursExpanded, setHoursExpanded] = React.useState(false);
  const [copiedPlus, setCopiedPlus] = React.useState(false);

  // Family table reservation state
  const [guestName, setGuestName] = React.useState("");
  const [guestPhone, setGuestPhone] = React.useState("");
  const [partySize, setPartySize] = React.useState("4");
  const [reserveTime, setReserveTime] = React.useState("8:00 PM");
  const [seatingPref, setSeatingPref] = React.useState("Family Hall");
  const [reservationConfirmed, setReservationConfirmed] = React.useState<string | null>(null);
  const [reserveError, setReserveError] = React.useState<string | null>(null);

  const visibleReviews = React.useMemo(() => {
    if (selectedTopic === "all") return reviews;
    return reviews.filter((r) => r.topic === selectedTopic);
  }, [reviews, selectedTopic]);

  const handleCopyPlusCode = () => {
    navigator.clipboard?.writeText(BUSINESS_INFO.plusCode);
    setCopiedPlus(true);
    window.setTimeout(() => setCopiedPlus(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewText.trim()) return;
    const next: GuestReview = {
      id: `rev-${Date.now()}`,
      author: reviewName.trim(),
      badge: "Verified Website Guest",
      rating: reviewRating,
      date: "Just now",
      topic: reviewTopic,
      comment: reviewText.trim(),
    };
    setReviews((prev) => [next, ...prev]);
    setReviewName("");
    setReviewText("");
    setReviewRating(5);
    setShowReviewForm(false);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || guestPhone.trim().length < 7) {
      setReserveError("Please enter your name and a valid Pakistani phone number.");
      return;
    }
    setReserveError(null);
    const code = `PH-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationConfirmed(
      `Table confirmed (${code}) for ${partySize} guests at ${reserveTime} in ${seatingPref}. We look forward to hosting ${guestName.trim()}.`
    );
  };

  const dayBars = POPULAR_TIMES[selectedDay] ?? POPULAR_TIMES.Saturday;

  return (
    <section id="reviews" className="bg-transparent py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Reviews & Guest Sentiment */}
          <div className="space-y-8 lg:col-span-7">
            <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-border/80 bg-background/82 dark:bg-background/84 backdrop-blur-md p-5 shadow-sm sm:p-6">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Guest Reviews
                </p>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
                  Rated {BUSINESS_INFO.rating} across {BUSINESS_INFO.reviewCount.toLocaleString()} reviews
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setShowReviewForm((prev) => !prev)}
                className="inline-flex h-10 items-center rounded-lg border border-border bg-card px-4 text-xs font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring whitespace-nowrap shrink-0 cursor-pointer"
              >
                {showReviewForm ? "Cancel Review" : "Write a Review"}
              </button>
            </div>

            {/* Rating breakdown */}
            <div className="grid items-center gap-6 rounded-xl border border-border bg-card p-6 sm:grid-cols-[160px_1fr]">
              <div className="text-center sm:border-r sm:border-border sm:pr-6">
                <p className="font-display text-5xl font-semibold tabular-nums text-foreground">
                  {BUSINESS_INFO.rating}
                </p>
                <div className="mt-2 flex items-center justify-center gap-1" aria-label="4.1 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      aria-hidden="true"
                      className={`size-4 ${
                        n <= 4 ? "fill-amber-500 text-amber-500" : "fill-muted text-muted-foreground/40"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground tabular-nums">
                  {BUSINESS_INFO.reviewCount.toLocaleString()} Google reviews
                </p>
              </div>

              <div className="space-y-2">
                {RATING_DISTRIBUTION.map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 text-xs">
                    <span className="w-4 font-mono tabular-nums text-muted-foreground">{row.stars}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-amber-500"
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                    <span className="w-9 text-right font-mono tabular-nums text-muted-foreground">
                      {row.percent}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {showReviewForm && (
              <form
                onSubmit={handleSubmitReview}
                className="space-y-4 rounded-xl border border-border bg-card p-6"
              >
                <h3 className="text-base font-semibold text-foreground">Share Your Experience</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="rev-name" className="block text-xs font-medium text-muted-foreground">
                      Your Name
                    </label>
                    <input
                      id="rev-name"
                      type="text"
                      required
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. Tariq Khan"
                      className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label htmlFor="rev-topic" className="block text-xs font-medium text-muted-foreground">
                      Dish Highlight
                    </label>
                    <select
                      id="rev-topic"
                      value={reviewTopic}
                      onChange={(e) => setReviewTopic(e.target.value as GuestReview["topic"])}
                      className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="platter">Platter</option>
                      <option value="Mixed BBQ Platter Rice">Mixed BBQ Platter Rice</option>
                      <option value="Kabuli Pulao">Kabuli Pulao</option>
                      <option value="well-marinated meat">Well-marinated meat</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="rev-rating" className="block text-xs font-medium text-muted-foreground">
                      Rating
                    </label>
                    <select
                      id="rev-rating"
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="mt-1.5 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value={5}>5 Stars — Excellent</option>
                      <option value={4}>4 Stars — Very Good</option>
                      <option value={3}>3 Stars — Good</option>
                      <option value={2}>2 Stars — Fair</option>
                      <option value={1}>1 Star — Needs Work</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="rev-body" className="block text-xs font-medium text-muted-foreground">
                    Review Comment
                  </label>
                  <textarea
                    id="rev-body"
                    rows={3}
                    required
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Tell other Mardan diners about the platter, marinade, or service..."
                    className="mt-1.5 w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center rounded-lg bg-foreground px-5 text-xs font-semibold text-background hover:bg-foreground/90 cursor-pointer"
                >
                  Post Review
                </button>
              </form>
            )}

            {/* Topic filter buttons */}
            <div className="flex flex-wrap gap-2">
              {REVIEW_TOPICS.map((topic) => {
                const active = selectedTopic === topic.id;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {topic.label} <span className="ml-1 font-mono opacity-75">{topic.count}</span>
                  </button>
                );
              })}
            </div>

            {/* Review list */}
            <div className="divide-y divide-border rounded-xl border border-border bg-card">
              {visibleReviews.map((review) => (
                <article key={review.id} className="space-y-2.5 p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{review.author}</h3>
                      <p className="text-xs text-muted-foreground">
                        {review.badge ? `${review.badge} · ` : ""}
                        {review.date}
                        {review.priceNote ? ` · ${review.priceNote}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star
                          key={n}
                          aria-hidden="true"
                          className={`size-3.5 ${
                            n <= review.rating
                              ? "fill-amber-500 text-amber-500"
                              : "fill-muted text-muted-foreground/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-foreground/90">{review.comment}</p>
                </article>
              ))}
            </div>

            {/* Hospitality Pledge responding to guest feedback */}
            <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Family Dining &amp; Hospitality Standard</p>
              <p className="mt-1 leading-relaxed">
                We welcome feedback from our Mardan community. Dedicated private family seating and courteous staff etiquette training are actively enforced every evening so every guest dines comfortably.
              </p>
            </div>
          </div>

          {/* Right Column: Location, Popular Times & Table Reservation */}
          <div id="visit" className="space-y-6 lg:col-span-5">
            {/* Address & Hours Card */}
            <div className="space-y-5 rounded-xl border border-border bg-card p-6">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Visit Us in Mardan
                </p>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Nowshera Road &amp; Ring Road
                </h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                  <div>
                    <p className="font-medium text-foreground">{BUSINESS_INFO.address}</p>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono">{BUSINESS_INFO.plusCode}</span>
                      <button
                        type="button"
                        onClick={handleCopyPlusCode}
                        className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline cursor-pointer"
                      >
                        {copiedPlus ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy code</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone aria-hidden="true" className="size-4 shrink-0 text-accent" />
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="font-mono font-medium text-foreground hover:underline tabular-nums"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>

                <div className="border-t border-border pt-3">
                  <button
                    type="button"
                    onClick={() => setHoursExpanded((prev) => !prev)}
                    className="flex w-full items-center justify-between text-left cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2.5 font-medium text-foreground">
                      <Clock aria-hidden="true" className="size-4 text-accent" />
                      <span>{BUSINESS_INFO.hoursSummary}</span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 text-muted-foreground transition-transform ${
                        hoursExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {hoursExpanded && (
                    <dl className="mt-3 space-y-1.5 border-t border-border pt-3 text-xs">
                      {BUSINESS_INFO.weeklyHours.map((row) => (
                        <div key={row.day} className="flex justify-between">
                          <dt className="text-muted-foreground">{row.day}</dt>
                          <dd className="font-mono tabular-nums text-foreground">{row.hours}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 text-xs font-semibold text-foreground transition-colors hover:bg-muted whitespace-nowrap"
                >
                  <span>Get Directions</span>
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-foreground px-4 text-xs font-semibold text-background transition-colors hover:bg-foreground/90 whitespace-nowrap"
                >
                  <Phone aria-hidden="true" className="size-3.5" />
                  <span>Call Restaurant</span>
                </a>
              </div>
            </div>

            {/* Popular Times Chart */}
            <div className="space-y-4 rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Popular Dining Times</h3>
                  <p className="text-xs text-muted-foreground">
                    Saturdays 7–9 PM are typically busiest for family platters
                  </p>
                </div>
                <select
                  aria-label="Select day for popular times"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="h-8 rounded-md border border-border bg-background px-2.5 text-xs font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {Object.keys(POPULAR_TIMES).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex h-24 items-end gap-1.5 pt-2" role="img" aria-label={`Popular dining times for ${selectedDay}`}>
                {dayBars.map((bar) => (
                  <div key={bar.slot} className="flex flex-1 flex-col items-center gap-1.5">
                    <div className="flex h-16 w-full items-end">
                      <div
                        className={`w-full rounded-t-sm transition-all ${
                          bar.load >= 85 ? "bg-accent" : "bg-foreground/25"
                        }`}
                        style={{ height: `${bar.load}%` }}
                        title={`${bar.slot}: ${bar.load}% busy`}
                      />
                    </div>
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                      {bar.slot}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Reservation Form */}
            <form
              onSubmit={handleReserveSubmit}
              className="space-y-4 rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-foreground">Reserve a Table</h3>
                  <p className="text-xs text-muted-foreground">
                    Skip the weekend wait — family hall &amp; open-air BBQ seating
                  </p>
                </div>
                <Users aria-hidden="true" className="size-4 text-muted-foreground" />
              </div>

              {reservationConfirmed ? (
                <div className="space-y-3 rounded-lg border border-border bg-muted/60 p-4 text-sm">
                  <p className="font-semibold text-foreground">Reservation Confirmed</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{reservationConfirmed}</p>
                  <button
                    type="button"
                    onClick={() => setReservationConfirmed(null)}
                    className="text-xs font-semibold text-accent underline underline-offset-4 cursor-pointer"
                  >
                    Book another table
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="res-name" className="block text-xs font-medium text-muted-foreground">
                        Guest Name
                      </label>
                      <input
                        id="res-name"
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Full name"
                        className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                    <div>
                      <label htmlFor="res-phone" className="block text-xs font-medium text-muted-foreground">
                        Mobile Number
                      </label>
                      <input
                        id="res-phone"
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="03XX XXXXXXX"
                        className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="res-guests" className="block text-xs font-medium text-muted-foreground">
                        Guests
                      </label>
                      <select
                        id="res-guests"
                        value={partySize}
                        onChange={(e) => setPartySize(e.target.value)}
                        className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm text-foreground"
                      >
                        <option value="2">2 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8+">8+ Group</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="res-time" className="block text-xs font-medium text-muted-foreground">
                        Evening Time
                      </label>
                      <select
                        id="res-time"
                        value={reserveTime}
                        onChange={(e) => setReserveTime(e.target.value)}
                        className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm text-foreground"
                      >
                        <option value="1:30 PM">1:30 PM</option>
                        <option value="6:30 PM">6:30 PM</option>
                        <option value="7:30 PM">7:30 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="res-seating" className="block text-xs font-medium text-muted-foreground">
                        Section
                      </label>
                      <select
                        id="res-seating"
                        value={seatingPref}
                        onChange={(e) => setSeatingPref(e.target.value)}
                        className="mt-1 h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm text-foreground"
                      >
                        <option value="Family Hall">Family Hall</option>
                        <option value="Main Dining">Main Dining</option>
                        <option value="Outdoor BBQ">Outdoor BBQ</option>
                      </select>
                    </div>
                  </div>

                  {reserveError && (
                    <p className="text-xs font-medium text-red-600">{reserveError}</p>
                  )}

                  <button
                    type="submit"
                    className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90 cursor-pointer"
                  >
                    Confirm Family Table
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
