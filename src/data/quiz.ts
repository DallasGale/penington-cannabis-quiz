type Comparison = {
  penington: number;
  victorians: number;
  exAfp: number;
  blazeHeads: number;
  religious: number;
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
      "We don’t think so.<br /><br />We think only adults over 18 should be allowed to purchase cannabis from strictly regulated outlets.",
    ifYes: {
      penington: 0,
      victorians: 0,
      exAfp: 0,
      blazeHeads: 0,
      religious: 0,
    },
    ifNo: {
      penington: 0,
      victorians: 0,
      exAfp: 0,
      blazeHeads: 0,
      religious: 0,
    },
  },
  {
    id: 2,
    question:
      "Do you think people should be able to consume cannabis wherever they want?",
    answer:
      "We don’t think so.<br /><br />We think a regulated cannabis framework needs to work for everybody, which means keeping cannabis use in private, and away from public spaces.",
    ifYes: {
      penington: 0,
      victorians: 0,
      exAfp: 0,
      blazeHeads: 0,
      religious: 0,
    },
    ifNo: {
      penington: 0,
      victorians: 0,
      exAfp: 0,
      blazeHeads: 0,
      religious: 0,
    },
  },
  {
    id: 3,
    question:
      "Do you think there should be restrictions on the branding of cannabis products?",
    answer:
      "We think so.<br /><br />We think cannabis products should be in standardised, uniform packaging, free from colours or branding, with clearly labelled product ingredients.",
    ifYes: {
      penington: 0,
      victorians: 0,
      exAfp: 0,
      blazeHeads: 0,
      religious: 0,
    },
    ifNo: {
      penington: 0,
      victorians: 0,
      exAfp: 0,
      blazeHeads: 0,
      religious: 0,
    },
  },
  {
    id: 4,
    question:
      "Do you think there should be limits on how strong cannabis should be when sold under a regulated framework?",
    answer:
      "We think so.<br /><br />We think the safest way is to cap the maximum amount of THC in products to a sensible limit.",
    ifYes: {
      penington: 0,
      victorians: 0,
      exAfp: 0,
      blazeHeads: 0,
      religious: 0,
    },
    ifNo: {
      penington: 0,
      victorians: 0,
      exAfp: 0,
      blazeHeads: 0,
      religious: 0,
    },
  },
  {
    id: 5,
    question:
      "Do you think advertising should be allowed for cannabis retailers or products?",
    answer:
      "We don’t think so.<br /><br />We think all forms of advertising and promotion should be strictly prohibited (under a safely regulated framework).",
    ifYes: {
      penington: 0,
      victorians: 0,
      exAfp: 0,
      blazeHeads: 0,
      religious: 0,
    },
    ifNo: {
      penington: 0,
      victorians: 0,
      exAfp: 0,
      blazeHeads: 0,
      religious: 0,
    },
  },
];
