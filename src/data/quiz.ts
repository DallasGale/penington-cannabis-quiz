export type Comparison = {
  answer: string;
  penington: number;
  victorians: number;
};

type QuizData = {
  id: number;
  question: string;
  answer: string;
  ifYes: Comparison;
  ifNo: Comparison;
};

export const quizData: QuizData[] = [
  {
    id: 1,
    question:
      "Do you think people under the age of 18 should be able to buy cannabis?",
    answer:
      "We think only adults over 18 should be allowed to purchase cannabis from strictly regulated outlets.",
    ifYes: {
      answer: "We don’t think so.",
      penington: 0,
      victorians: 0,
    },
    ifNo: {
      answer: "We don’t think so either",
      penington: 20,
      victorians: 20,
    },
  },
  {
    id: 2,
    question:
      "Do you think people should be able to consume cannabis wherever they want?",
    answer:
      "We think a regulated cannabis framework needs to work for everybody, which means keeping cannabis use in private, and away from public spaces.",
    ifYes: {
      answer: "We don’t think so.",
      penington: 0,
      victorians: 0,
    },
    ifNo: {
      answer: "We don’t think so either",
      penington: 20,
      victorians: 20,
    },
  },
  {
    id: 3,
    question:
      "Do you think there should be restrictions on the branding of cannabis products?",
    answer:
      "We think cannabis products should be in standardised, uniform packaging, free from colours or branding, with clearly labelled product ingredients.",
    ifYes: {
      answer: "We think so too.",
      penington: 20,
      victorians: 20,
    },
    ifNo: {
      answer: "We think so.",
      penington: 0,
      victorians: 0,
    },
  },
  {
    id: 4,
    question:
      "Do you think there should be limits on how strong cannabis sold under a regulated framework should be?",
    answer:
      "We think the safest way is to cap the maximum amount of THC in products at a sensible limit.",
    ifYes: {
      answer: "We think so too.",
      penington: 20,
      victorians: 20,
    },
    ifNo: {
      answer: "We think so.",
      penington: 0,
      victorians: 0,
    },
  },
  {
    id: 5,
    question:
      "Do you think advertising should be allowed for cannabis retailers or products?",
    answer:
      "We think all forms of advertising and promotion should be strictly prohibited under a safely regulated framework.",
    ifYes: {
      answer: "We don’t think so.",
      penington: 0,
      victorians: 20,
    },
    ifNo: {
      answer: "We don’t think so either",
      penington: 20,
      victorians: 0,
    },
  },
];

export const explanationData = {
  penington: {
    title: "Penington Institute",
    description:
      "Independent drug policy non-profit Penington Institute is developing a regulatory framework for safe adult-use cannabis in Victoria that prioritises community safety and health. Community views like yours help to shape this work.",
  },
  victorians: {
    title: "Other Victorians",
    description:
      "We polled a representative selection of people across Victoria, asking them the same questions you just responded to. You’re all helping us get a better idea of what safe regulation means to the community.",
  },
};
