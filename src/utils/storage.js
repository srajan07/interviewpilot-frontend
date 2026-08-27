const STORAGE_KEYS = {
  PROFILE: "interviewpilot_profile",
  DSA_PROGRESS: "interviewpilot_dsa_progress",
  APTITUDE_STATS: "interviewpilot_aptitude_stats",
  HISTORY: "interviewpilot_history",
};

// Default profile mock data
const DEFAULT_PROFILE = {
  fullName: "Srajan",
  email: "srajan@example.com",
  targetRole: "Backend Developer",
  experienceLevel: "Fresher",
  preferredLanguage: "C++",
  targetAreas: ["DSA", "Aptitude", "Technical Interview"],
  difficultyPreference: "Medium",
};

// Default DSA Progress mock data
const DEFAULT_DSA_PROGRESS = {
  exploredCount: 7,
  totalConcepts: 20,
  completedProblemIds: ["two-sum", "palindrome-check"],
  activeProblemId: "two-sum",
  activePattern: "Two Pointers",
  activeStep: "Visual Dry Run",
  conceptProgress: {
    "two-pointers": { status: "in-progress", step: "dry-run", score: 85 },
    "binary-search": { status: "completed", step: "transfer", score: 100 },
    "sliding-window": { status: "explored", step: "clues", score: 60 },
    "arrays": { status: "completed", step: "transfer", score: 90 },
    "sorting": { status: "completed", step: "transfer", score: 95 },
    "bfs": { status: "in-progress", step: "dry-run", score: 70 },
    "hashing": { status: "explored", step: "why-this-pattern", score: 75 },
  },
  thinkingSkills: {
    clueRecognition: 75,
    patternRecognition: 82,
    approachSelection: 68,
    complexityAwareness: 70,
    edgeCaseThinking: 60,
    invariantUnderstanding: 65,
    transferAbility: 78,
  },
};

// Default Aptitude Stats mock data
const DEFAULT_APTITUDE_STATS = {
  questionsPracticed: 42,
  accuracy: 82,
  strongestCategory: "Logical Reasoning",
  weakestCategory: "Verbal Ability",
  categoryStats: {
    "Quantitative Aptitude": { attempted: 12, correct: 10 },
    "Logical Reasoning": { attempted: 15, correct: 14 },
    "Verbal Ability": { attempted: 8, correct: 5 },
    "Technical Fundamentals": { attempted: 7, correct: 6 },
  },
};

// Default History mock data
const DEFAULT_HISTORY = {
  interviews: [
    {
      id: "int-1",
      date: "2026-08-25",
      role: "Backend Developer",
      difficulty: "Medium",
      score: 8.4,
      status: "completed",
    },
    {
      id: "int-2",
      date: "2026-08-20",
      role: "Frontend Developer",
      difficulty: "Easy",
      score: 7.8,
      status: "completed",
    },
  ],
  aptitude: [
    {
      id: "apt-1",
      date: "2026-08-26",
      category: "Logical Reasoning",
      questionsCount: 10,
      score: 9,
      accuracy: 90,
    },
    {
      id: "apt-2",
      date: "2026-08-24",
      category: "Quantitative Aptitude",
      questionsCount: 10,
      score: 8,
      accuracy: 80,
    },
  ],
  dsa: [
    {
      id: "dsa-1",
      date: "2026-08-26",
      concept: "Two Pointers",
      problem: "Two Sum (Sorted)",
      skill: "Eliminate possibilities",
      progress: "In Progress",
    },
    {
      id: "dsa-2",
      date: "2026-08-23",
      concept: "BFS & Shortest Path",
      problem: "Snakes & Ladders Showcase",
      skill: "Equal-cost steps suggest BFS",
      progress: "Completed",
    },
  ],
};

export const getStoredProfile = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : DEFAULT_PROFILE;
  } catch (e) {
    return DEFAULT_PROFILE;
  }
};

export const saveStoredProfile = (profileData) => {
  try {
    const current = getStoredProfile();
    const updated = { ...current, ...profileData };
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save profile:", e);
    return profileData;
  }
};

export const getStoredDSAProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.DSA_PROGRESS);
    return data ? JSON.parse(data) : DEFAULT_DSA_PROGRESS;
  } catch (e) {
    return DEFAULT_DSA_PROGRESS;
  }
};

export const updateStoredDSAProgress = (conceptId, updates) => {
  try {
    const current = getStoredDSAProgress();
    const updated = {
      ...current,
      conceptProgress: {
        ...current.conceptProgress,
        [conceptId]: {
          ...(current.conceptProgress[conceptId] || {}),
          ...updates,
        },
      },
    };
    localStorage.setItem(STORAGE_KEYS.DSA_PROGRESS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save DSA progress:", e);
    return DEFAULT_DSA_PROGRESS;
  }
};

export const getStoredAptitudeStats = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.APTITUDE_STATS);
    return data ? JSON.parse(data) : DEFAULT_APTITUDE_STATS;
  } catch (e) {
    return DEFAULT_APTITUDE_STATS;
  }
};

export const recordStoredAptitudeAttempt = (category, total, correct) => {
  try {
    const stats = getStoredAptitudeStats();
    const newAttempted = stats.questionsPracticed + total;
    const prevCorrect = Math.round((stats.questionsPracticed * stats.accuracy) / 100);
    const newCorrect = prevCorrect + correct;
    const newAccuracy = Math.round((newCorrect / newAttempted) * 100);

    const catStats = stats.categoryStats[category] || { attempted: 0, correct: 0 };
    const updatedCatStats = {
      ...stats.categoryStats,
      [category]: {
        attempted: catStats.attempted + total,
        correct: catStats.correct + correct,
      },
    };

    const updated = {
      ...stats,
      questionsPracticed: newAttempted,
      accuracy: newAccuracy,
      categoryStats: updatedCatStats,
    };

    localStorage.setItem(STORAGE_KEYS.APTITUDE_STATS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to record aptitude attempt:", e);
    return DEFAULT_APTITUDE_STATS;
  }
};

export const getStoredHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return data ? JSON.parse(data) : DEFAULT_HISTORY;
  } catch (e) {
    return DEFAULT_HISTORY;
  }
};

export const clearStoredData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.DSA_PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.APTITUDE_STATS);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    return true;
  } catch (e) {
    return false;
  }
};
