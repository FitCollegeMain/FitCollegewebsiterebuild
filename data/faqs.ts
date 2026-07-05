/*
  FAQs carried over from fitcollege.edu.au/faqs, lightly edited for brand
  tone and to match the 2026 Course Guide (durations are stated per
  certificate, consistent with the course pages).
*/
export interface Faq {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  faqs: Faq[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Courses & qualifications",
    faqs: [
      {
        question: "Are FIT College courses nationally recognised and fully accredited Australia-wide?",
        answer:
          "Yes. All of our fitness courses are nationally recognised. FIT College is a Registered Training Organisation (RTO 31903) and complies with the current Standards for RTOs and the Australian Qualifications Framework (AQF).",
      },
      {
        question: "What qualifications do I graduate with?",
        answer:
          "You graduate with the SIS30321 Certificate III in Fitness and the SIS40221 Certificate IV in Fitness — the qualifications you need to work as a Gym Instructor, Personal Trainer, or run your own PT business. Most students take both together as the Complete PT package.",
      },
      {
        question: "Is there practical application and work experience in the courses?",
        answer:
          "Yes. Rather than sit back and observe others do the work of a fitness professional, you'll perform many practical tasks throughout the course — our campuses are inside real, working gyms, so you train with real equipment and real members.",
      },
      {
        question: "Will I really be ready to start work when I've completed the course?",
        answer:
          "That's the goal of everything we do. We continually improve our courses so graduates leave humble yet confident, knowledgeable, and with a great attitude — and every campus has a Careers Liaison who connects you with local job opportunities.",
      },
    ],
  },
  {
    title: "Studying with us",
    faqs: [
      {
        question: "How long do the face-to-face courses take?",
        answer:
          "Full-time day classes run Monday to Thursday, 10am–1pm, and take about 7 weeks per certificate — roughly 16 weeks from beginner to fully qualified Personal Trainer. Part-time evening classes run two nights a week, 6pm–9pm, and take about 14 weeks per certificate.",
      },
      {
        question: "How long do the online courses take to complete?",
        answer:
          "Each qualification allows up to 12 months, and you set the pace. Students who allocate 25–30 hours a week have completed the full Personal Trainer qualification in as little as 6 months.",
      },
      {
        question: "Is an online qualification the same as studying face-to-face?",
        answer:
          "Yes — the qualification you graduate with is identical. The difference is delivery: online is self-paced independent study with virtual support, face-to-face is classroom-based. You can also switch modes after enrolling, or drop into a campus as an online student.",
      },
      {
        question: "How does online study work? Are there loads of textbooks?",
        answer:
          "No textbooks required. Everything is provided online through our dedicated cloud learning platform, aXcelerate — all of your fitness education resources, lecture notes and assessments in one place, on any device.",
      },
      {
        question: "I've studied fitness before — does RPL or skills recognition apply?",
        answer:
          "It can. Prior formal fitness education can count toward your qualification through Recognition of Prior Learning (RPL) and credit transfer. Tell a Career Advisor what you've done and we'll assess what credit applies — no repeating what you already know.",
      },
    ],
  },
  {
    title: "Fees & payment",
    faqs: [
      {
        question: "How can I pay for the course? Are there flexible payment options?",
        answer:
          "Yes. Interest-free payment plans are customised to your budget via direct debit, or you can pay in full upfront. Eligible Queenslanders may also qualify for Career Start government funding on the Certificate III.",
      },
      {
        question: "Are there any additional costs involved?",
        answer:
          "On campus, you only need your own stationery and a device. Studying online, you'll need to complete your First Aid certification at your own expense, and you'll need access to gym equipment or a fitness facility for practical demonstrations (or visit one of our campuses).",
      },
    ],
  },
  {
    title: "Careers in fitness",
    faqs: [
      {
        question: "Is there plenty of work when I become a Personal Trainer?",
        answer:
          "There is always plenty of work for the right person with the right attitude and work ethic. Many graduates start part-time or build their own client base — and FIT Elite™ graduates can add disability support work for paid hours from week one.",
      },
      {
        question: "Am I too old to become a Personal Trainer?",
        answer:
          "No. The fitness industry is crying out for real people who understand real clients — career changers and parents returning to work are some of our most successful graduates. There are no age boundaries to the fitness industry.",
      },
    ],
  },
];
