export type Review = { id: string; quote: string; rating: number; date: string };

export const REVIEWS: Review[] = [
  {
    id: "r1",
    quote: "Wow what an amazing experience. It was the best massage I have ever had.",
    rating: 5,
    date: "2026-08-14",
  },
  { id: "r2", quote: "Best.", rating: 5, date: "2026-08-04" },
  { id: "r3", quote: "Very good service, thanks.", rating: 5, date: "2026-07-23" },
  {
    id: "r4",
    quote: "I enjoyed every moment and the treatment, special thanks a lot.",
    rating: 5,
    date: "2026-07-23",
  },
  {
    id: "r5",
    quote: "It was so exceptional and overwhelming.",
    rating: 5,
    date: "2026-07-08",
  },
];
