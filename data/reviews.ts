/*
  PLACEHOLDER REVIEWS — swap these for real ones.
  FIT College has 500+ Trustpilot reviews (4★ average). Trustpilot blocks
  automated access, so these ten are illustrative composites written in the
  voice of the four buyer personas. Replace each entry's text/name/detail
  with real recent 5-star Trustpilot reviews before launch — the layout
  doesn't change.
*/
export interface Review {
  name: string;
  detail: string; // course / campus / study mode line under the name
  text: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Tahlia",
    detail: "Cert III & IV · Gold Coast – Nerang",
    text: "Qualified and on the gym floor within four months. The trainers treat you like a colleague, not a student — and the weekly payment plan meant I didn't need savings to start.",
  },
  {
    name: "Marcus",
    detail: "FIT Elite™ · Brisbane – Fortitude Valley",
    text: "The disability stream was the smartest thing I did. I was earning in support work three weeks after finishing while I built my PT client base on the side.",
  },
  {
    name: "Renee",
    detail: "Cert IV · Online",
    text: "Studied at 9pm after the kids went down and did my practicals on weekends. Every assessment came back marked within the week — the support team actually answers.",
  },
  {
    name: "Jack",
    detail: "Cert III · Sydney – Parramatta",
    text: "Straight out of school and no idea what I was doing — the campus being inside a real gym made it click. Learning on actual equipment with actual members beats a classroom.",
  },
  {
    name: "Priya",
    detail: "Cert III & IV · Melbourne – South Melbourne",
    text: "Left a corporate job at 38 and was terrified. My career advisor was honest about the industry and helped me plan a part-time start. Best decision I've made.",
  },
  {
    name: "Dylan",
    detail: "Cert IV · Perth North – Joondalup",
    text: "Already worked front desk at a gym, so they fast-tracked what I could already do. No time wasted repeating basics — just the ticket I needed to start taking clients.",
  },
  {
    name: "Sophie",
    detail: "FIT Elite™ · Adelaide – Glenelg",
    text: "The strength and conditioning stream got me coaching my footy club's juniors the same year I qualified. The ASCA accreditation opened doors a standard PT cert wouldn't.",
  },
  {
    name: "Liam",
    detail: "Cert III · Cairns – City Centre",
    text: "Used the Queensland funding, so it cost me a fraction of what mates paid elsewhere. Enrolment sorted the paperwork for me — I just had to show up and train.",
  },
  {
    name: "Emma",
    detail: "Cert III & IV · Newcastle",
    text: "Five-day marking is real. Nothing kills momentum like waiting a month for feedback, and I never waited more than a week. Finished part-time around my shifts.",
  },
  {
    name: "Nathan",
    detail: "Cert IV · Canberra – Deakin",
    text: "The careers team lined up interviews at two gyms before I'd even graduated. Walked into paid work the week my certificate arrived.",
  },
];
