export const APTITUDE_QUESTIONS = [
  // Quantitative Aptitude (8)
  {
    id: 1,
    question: "A product is sold for $480 at a profit of 20%. What was the original cost price?",
    options: ["$380", "$400", "$420", "$440"],
    correctAnswer: "$400",
    explanation: "Selling Price = Cost Price × (1 + Profit%). $480 = CP × 1.20 => CP = 480 / 1.20 = $400.",
    category: "Quantitative"
  },
  {
    id: 2,
    question: "A and B can complete a work in 12 days and 16 days respectively. Working together, how many days will they take?",
    options: ["6.85 days", "7.14 days", "8 days", "9.2 days"],
    correctAnswer: "6.85 days",
    explanation: "1 day work = (1/12 + 1/16) = 7/48. Total time = 48 / 7 ≈ 6.85 days.",
    category: "Quantitative"
  },
  {
    id: 3,
    question: "A train 150 meters long passes a telegraph pole in 9 seconds. What is the speed of the train in km/h?",
    options: ["50 km/h", "60 km/h", "65 km/h", "70 km/h"],
    correctAnswer: "60 km/h",
    explanation: "Speed = 150m / 9s = 50/3 m/s. In km/h: (50/3) × (18/5) = 60 km/h.",
    category: "Quantitative"
  },
  {
    id: 4,
    question: "The average age of 5 employees is 28 years. If a new employee aged 34 joins, what is the new average age?",
    options: ["29 years", "29.5 years", "30 years", "31 years"],
    correctAnswer: "29 years",
    explanation: "Total age of 5 = 140. New total = 140 + 34 = 174. New average = 174 / 6 = 29 years.",
    category: "Quantitative"
  },
  {
    id: 5,
    question: "The ratio of two numbers is 3:5 and their HCF is 8. What is their LCM?",
    options: ["96", "120", "144", "160"],
    correctAnswer: "120",
    explanation: "Numbers are 24 and 40. LCM(24, 40) = 120.",
    category: "Quantitative"
  },
  {
    id: 6,
    question: "If 15% of a number is equal to 45, what is 40% of that same number?",
    options: ["100", "120", "150", "180"],
    correctAnswer: "120",
    explanation: "0.15 × N = 45 => N = 300. 40% of 300 = 120.",
    category: "Quantitative"
  },
  {
    id: 7,
    question: "A sum of money doubles itself at simple interest in 8 years. What is the annual interest rate?",
    options: ["10%", "12.5%", "15%", "16.6%"],
    correctAnswer: "12.5%",
    explanation: "Interest = Principal => 8 × R = 100 => R = 12.5%.",
    category: "Quantitative"
  },
  {
    id: 8,
    question: "A pipe can fill a tank in 6 hours and a leak empties it in 10 hours. How long to fill the tank if both are open?",
    options: ["12 hours", "15 hours", "18 hours", "20 hours"],
    correctAnswer: "15 hours",
    explanation: "Net rate per hour = 1/6 - 1/10 = 2/30 = 1/15. Total time = 15 hours.",
    category: "Quantitative"
  },

  // Logical Reasoning (8)
  {
    id: 9,
    question: "Find the next number in the series: 3, 7, 15, 31, 63, ?",
    options: ["95", "115", "127", "131"],
    correctAnswer: "127",
    explanation: "Pattern is (x × 2) + 1. (63 × 2) + 1 = 127.",
    category: "Logical Reasoning"
  },
  {
    id: 10,
    question: "If 'PENCIL' is coded as 'QFO DJM', how is 'PAPER' coded using the same rule?",
    options: ["QBQFS", "QBQES", "QCPFS", "PAQFS"],
    correctAnswer: "QBQFS",
    explanation: "Each letter is shifted forward by +1: P->Q, A->B, P->Q, E->F, R->S.",
    category: "Logical Reasoning"
  },
  {
    id: 11,
    question: "Pointing to a photograph, Rahul said: 'She is the daughter of my grandfather's only son.' How is the girl related to Rahul?",
    options: ["Mother", "Sister", "Cousin", "Aunt"],
    correctAnswer: "Sister",
    explanation: "Grandfather's only son = Rahul's father. Daughter of father = Rahul's sister.",
    category: "Logical Reasoning"
  },
  {
    id: 12,
    question: "Statements: All cars are vehicles. Some vehicles are electric. Conclusion I: Some cars are electric. Conclusion II: All electric items are vehicles.",
    options: ["Only I follows", "Only II follows", "Neither follows", "Both follow"],
    correctAnswer: "Neither follows",
    explanation: "No definite relationship between cars and electric is established in the premises.",
    category: "Logical Reasoning"
  },
  {
    id: 13,
    question: "A person walks 10m North, turns right and walks 15m, then turns right again and walks 10m. How far is he from his starting point?",
    options: ["10 meters", "15 meters", "20 meters", "25 meters"],
    correctAnswer: "15 meters",
    explanation: "North and South 10m cancel out. He is 15 meters East of the starting point.",
    category: "Logical Reasoning"
  },
  {
    id: 14,
    question: "Find the odd one out: 27, 64, 125, 144, 216",
    options: ["27", "64", "144", "216"],
    correctAnswer: "144",
    explanation: "27 (3³), 64 (4³), 125 (5³), and 216 (6³) are perfect cubes. 144 is a square (12²).",
    category: "Logical Reasoning"
  },
  {
    id: 15,
    question: "If A is taller than B, B is taller than C, and D is taller than A, who is the shortest?",
    options: ["A", "B", "C", "D"],
    correctAnswer: "C",
    explanation: "Order from tallest to shortest: D > A > B > C. C is shortest.",
    category: "Logical Reasoning"
  },
  {
    id: 16,
    question: "Five friends A, B, C, D, E sit in a row. C is in the middle. A is at an extreme end and B is immediately right of C. Who is at index 4?",
    options: ["A", "B", "D", "E"],
    correctAnswer: "B",
    explanation: "C is in position 3. B sits immediately to the right of C, placing B in position 4.",
    category: "Logical Reasoning"
  },

  // Verbal Ability (8)
  {
    id: 17,
    question: "Choose the word most nearly OPPOSITE in meaning to 'OPTIMISTIC':",
    options: ["Cheerful", "Pessimistic", "Confident", "Hopeful"],
    correctAnswer: "Pessimistic",
    explanation: "Optimistic means hopeful. Pessimistic is the antonym.",
    category: "Verbal Ability"
  },
  {
    id: 18,
    question: "Identify the grammatically correct sentence:",
    options: [
      "Neither of the boys were present.",
      "Neither of the boys was present.",
      "Neither of the boys are present.",
      "Neither of the boy were present."
    ],
    correctAnswer: "Neither of the boys was present.",
    explanation: "'Neither' is singular and requires the singular verb 'was'.",
    category: "Verbal Ability"
  },
  {
    id: 19,
    question: "Select the word closest in meaning to 'METICULOUS':",
    options: ["Careless", "Thorough & Precise", "Hasty", "Indifferent"],
    correctAnswer: "Thorough & Precise",
    explanation: "Meticulous means showing great attention to detail; very careful.",
    category: "Verbal Ability"
  },
  {
    id: 20,
    question: "Fill in the blank: The manager insisted _______ receiving a written report before Friday.",
    options: ["on", "at", "with", "for"],
    correctAnswer: "on",
    explanation: "The verb 'insist' takes the preposition 'on'.",
    category: "Verbal Ability"
  },
  {
    id: 21,
    question: "Choose the correct idiom meaning for 'Spill the beans':",
    options: ["To cook dinner", "To reveal a secret", "To waste food", "To make a mistake"],
    correctAnswer: "To reveal a secret",
    explanation: "'Spill the beans' means to disclose secret information prematurely.",
    category: "Verbal Ability"
  },
  {
    id: 22,
    question: "Choose the correctly spelled word:",
    options: ["Accomodate", "Accommodate", "Acommodate", "Accomodait"],
    correctAnswer: "Accommodate",
    explanation: "'Accommodate' has double 'c' and double 'm'.",
    category: "Verbal Ability"
  },
  {
    id: 23,
    question: "Substitute one word for: 'A person who looks at the bright side of things'",
    options: ["Pessimist", "Optimist", "Altruist", "Egoist"],
    correctAnswer: "Optimist",
    explanation: "An optimist is a person who tends to be hopeful about the future.",
    category: "Verbal Ability"
  },
  {
    id: 24,
    question: "Select the passive form: 'The engineer fixed the bug.'",
    options: [
      "The bug is fixed by the engineer.",
      "The bug was fixed by the engineer.",
      "The bug had been fixed by engineer.",
      "The engineer was fixing the bug."
    ],
    correctAnswer: "The bug was fixed by the engineer.",
    explanation: "Simple past active ('fixed') becomes simple past passive ('was fixed').",
    category: "Verbal Ability"
  },

  // Data Interpretation (6)
  {
    id: 25,
    question: "In a company of 200 employees, 60% are in Engineering, 25% in Sales, and the rest in HR. How many employees are in HR?",
    options: ["20", "30", "40", "50"],
    correctAnswer: "30",
    explanation: "HR percentage = 100% - (60% + 25%) = 15%. 15% of 200 = 30 employees.",
    category: "Data Interpretation"
  },
  {
    id: 26,
    question: "The sales of Company X in 4 quarters were: Q1=$10k, Q2=$15k, Q3=$20k, Q4=$35k. What is the average quarterly sales?",
    options: ["$18k", "$20k", "$22.5k", "$25k"],
    correctAnswer: "$20k",
    explanation: "Total sales = 10 + 15 + 20 + 35 = $80k. Average = 80 / 4 = $20k.",
    category: "Data Interpretation"
  },
  {
    id: 27,
    question: "A pie chart shows budget distribution: Marketing 30%, R&D 40%, Ops 20%, Legal 10%. If total budget is $500,000, how much is allocated to R&D?",
    options: ["$150,000", "$200,000", "$250,000", "$100,000"],
    correctAnswer: "$200,000",
    explanation: "R&D budget = 40% of $500,000 = 0.40 × 500,000 = $200,000.",
    category: "Data Interpretation"
  },
  {
    id: 28,
    question: "If revenue increased from $80,000 to $100,000 in one year, what was the percentage growth?",
    options: ["20%", "25%", "30%", "15%"],
    correctAnswer: "25%",
    explanation: "Growth = [(100,000 - 80,000) / 80,000] × 100 = (20,000 / 80,000) × 100 = 25%.",
    category: "Data Interpretation"
  },
  {
    id: 29,
    question: "A table shows student scores: Math 80, Physics 70, Chemistry 90. What is the weighted average if weights are 3, 2, 1 respectively?",
    options: ["76.5", "78.3", "80.0", "81.6"],
    correctAnswer: "78.3",
    explanation: "Weighted total = (80×3 + 70×2 + 90×1) = 240 + 140 + 90 = 470. Sum of weights = 6. Average = 470 / 6 = 78.33.",
    category: "Data Interpretation"
  },
  {
    id: 30,
    question: "In a survey of 500 users, 300 use Product A and 250 use Product B. If 100 use both, how many use neither?",
    options: ["30", "50", "70", "100"],
    correctAnswer: "50",
    explanation: "Users of A or B = 300 + 250 - 100 = 450. Users of neither = 500 - 450 = 50.",
    category: "Data Interpretation"
  }
];
