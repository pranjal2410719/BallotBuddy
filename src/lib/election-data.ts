export interface ElectionStep {
  id: number;
  title: string;
  description: string;
  details: {
    whatHappens: string;
    whatToBring?: string;
    whatToExpect: string;
    dos: string[];
    donts: string[];
  };
  icon: string;
  duration: string;
}

export interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
  status: "past" | "current" | "upcoming";
  category: "registration" | "nomination" | "campaign" | "voting" | "results";
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface EligibilityQuestion {
  id: number;
  question: string;
  type: "radio" | "select";
  options: { value: string; label: string }[];
  nextStep: (answer: string) => number | null;
}

export const electionSteps: ElectionStep[] = [
  {
    id: 1,
    title: "Voter Registration",
    description: "Register yourself as a voter in your constituency.",
    icon: "📝",
    duration: "2-4 weeks",
    details: {
      whatHappens:
        "Citizens fill out Form 6 (Form 6A for overseas citizens) to register as voters. The form can be submitted online via the NVSP portal or offline at the local ERO office.",
      whatToExpect:
        "After submission, your application is verified by the Electoral Registration Officer. You'll receive a voter ID card if approved.",
      whatToBring: "Proof of age (birth certificate, passport), proof of residence (utility bill, Aadhaar), passport-sized photograph.",
      dos: [
        "Register well before elections",
        "Keep documents ready",
        "Check your constituency details",
        "Register online at nvsp.in for convenience",
      ],
      donts: [
        "Don't wait until the last minute",
        "Don't submit false information",
        "Don't register in multiple constituencies",
      ],
    },
  },
  {
    id: 2,
    title: "Verification",
    description: "Your application is verified by election officials.",
    icon: "🔍",
    duration: "1-2 weeks",
    details: {
      whatHappens:
        "The Electoral Registration Officer (ERO) verifies your application. Field verification may be conducted to confirm your residence and identity.",
      whatToExpect:
        "If verified successfully, your name is added to the electoral roll. If there are discrepancies, you may be asked to provide additional documents.",
      dos: [
        "Keep your application reference number",
        "Respond promptly to any verification requests",
        "Check your name on the electoral roll online",
      ],
      donts: [
        "Don't panic if verification takes time",
        "Don't ignore requests for additional documents",
      ],
    },
  },
  {
    id: 3,
    title: "Candidate Nomination",
    description: "Candidates file their nominations for election.",
    icon: "📋",
    duration: "1-2 weeks",
    details: {
      whatHappens:
        "Interested candidates file nomination papers with the Returning Officer. They must submit an affidavit declaring criminal cases, assets, and liabilities.",
      whatToExpect:
        "The scrutiny process ensures candidates meet eligibility criteria. Valid nominations are accepted, and candidates receive a symbol allotment.",
      dos: [
        "Research candidates in your constituency",
        "Review candidate affidavits",
        "Check candidate background and track record",
      ],
      donts: [
        "Don't rely solely on party affiliation",
        "Don't skip reading candidate manifests",
      ],
    },
  },
  {
    id: 4,
    title: "Campaign Period",
    description: "Candidates campaign to win votes.",
    icon: "📢",
    duration: "2-4 weeks",
    details: {
      whatHappens:
        "Political parties and candidates conduct rallies, door-to-door campaigns, social media outreach, and public meetings. The Model Code of Conduct comes into effect.",
      whatToExpect:
        "You'll see increased political activity, advertisements, debates, and public discussions. Media coverage intensifies.",
      dos: [
        "Attend public meetings to hear candidates",
        "Fact-check claims made during campaigns",
        "Encourage others to vote",
        "Report violations of the Model Code of Conduct",
      ],
      donts: [
        "Don't share unverified political content",
        "Don't engage in hate speech or violence",
        "Don't accept gifts or inducements from candidates",
      ],
    },
  },
  {
    id: 5,
    title: "Voting Day",
    description: "The day you cast your vote!",
    icon: "🗳️",
    duration: "1 day",
    details: {
      whatHappens:
        "Polling stations are open from 7 AM to 6 PM (may vary). Voters cast their votes using EVM (Electronic Voting Machine) with VVPAT (Voter Verifiable Paper Audit Trail).",
      whatToBring: "Voter ID card (EPIC) or any valid photo ID - Aadhaar, passport, driving license, PAN card, or MGNREGA job card.",
      whatToExpect:
        "You'll go through identity verification, get your finger inked, and press the button next to your chosen candidate on the EVM. The VVPAT will print a slip for verification.",
      dos: [
        "Carry a valid photo ID",
        "Check your polling booth location in advance",
        "Vote during off-peak hours to avoid long queues",
        "Encourage friends and family to vote",
        "Keep your voter ID safe after voting",
      ],
      donts: [
        "Don't carry campaign materials to the booth",
        "Don't take photos of your vote (it's illegal)",
        "Don't influence other voters inside the booth",
        "Don't share your voting decision on social media with photos of marked fingers (optional but recommended to maintain secrecy)",
      ],
    },
  },
  {
    id: 6,
    title: "Vote Counting",
    description: "Votes are counted and tallied.",
    icon: "🔢",
    duration: "1 day",
    details: {
      whatHappens:
        "Counting begins at designated counting centers under strict security. EVMs are opened in the presence of candidates, their agents, and election officials. VVPAT slips may be counted for verification.",
      whatToExpect:
        "Results for each constituency are declared as counting progresses. The process is transparent with live updates available on the ECI website.",
      dos: [
        "Follow official results from ECI website",
        "Be patient as counting takes time",
        "Respect the democratic process regardless of outcome",
      ],
      donts: [
        "Don't spread unverified result claims",
        "Don't create unrest based on preliminary trends",
      ],
    },
  },
  {
    id: 7,
    title: "Results",
    description: "Election results are declared.",
    icon: "🏆",
    duration: "Declared on counting day",
    details: {
      whatHappens:
        "The Election Commission of India officially declares results. Winning candidates are announced, and the party/coalition with majority forms the government.",
      whatToExpect:
        "The President invites the leader of the majority party to form the government. The new government takes oath and begins its term.",
      dos: [
        "Respect the mandate of the people",
        "Stay informed about your new representatives",
        "Continue to engage with the democratic process",
      ],
      donts: [
        "Don't engage in post-result violence or unrest",
        "Don't spread misinformation about results",
      ],
    },
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "Electoral Roll Revision",
    date: "January 1 - March 31",
    description: "Annual revision of electoral rolls. Citizens can register, update details, or apply for corrections.",
    status: "upcoming",
    category: "registration",
  },
  {
    id: 2,
    title: "Voter Registration Deadline",
    date: "10 days before nomination",
    description: "Last date to register as a voter for upcoming elections.",
    status: "upcoming",
    category: "registration",
  },
  {
    id: 3,
    title: "Candidate Nomination Period",
    date: "Starts 21 days before polling",
    description: "Candidates file nomination papers with the Returning Officer.",
    status: "upcoming",
    category: "nomination",
  },
  {
    id: 4,
    title: "Scrutiny of Nominations",
    date: "Day after nomination deadline",
    description: "Returning Officer examines all nomination papers for validity.",
    status: "upcoming",
    category: "nomination",
  },
  {
    id: 5,
    title: "Campaign Period",
    date: "48 hours before polling",
    description: "Active campaigning period. Campaigning stops 48 hours before polling.",
    status: "upcoming",
    category: "campaign",
  },
  {
    id: 6,
    title: "Model Code of Conduct",
    date: "From election announcement",
    description: "ECI's Model Code of Conduct comes into effect for all parties and candidates.",
    status: "upcoming",
    category: "campaign",
  },
  {
    id: 7,
    title: "Polling Day",
    date: "Announced by ECI",
    description: "Voting takes place from 7 AM to 6 PM at designated polling stations.",
    status: "upcoming",
    category: "voting",
  },
  {
    id: 8,
    title: "Result Declaration",
    date: "Counting Day",
    description: "Votes are counted and results declared for all constituencies.",
    status: "upcoming",
    category: "results",
  },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the minimum voting age in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correctAnswer: 1,
    explanation: "The 61st Constitutional Amendment Act of 1988 lowered the voting age from 21 to 18 years, making it effective from 1989.",
    difficulty: "easy",
  },
  {
    id: 2,
    question: "What does NOTA stand for?",
    options: [
      "None of The Above",
      "National Option for Transparent Application",
      "None Of The Available",
      "National Organization for True Action",
    ],
    correctAnswer: 0,
    explanation: "NOTA stands for 'None of The Above'. It was introduced in 2013 following a Supreme Court ruling. It allows voters to reject all candidates.",
    difficulty: "easy",
  },
  {
    id: 3,
    question: "What does EVM stand for?",
    options: [
      "Electronic Voting Machine",
      "Election Verification Module",
      "Electronic Verification Method",
      "Election Vote Monitor",
    ],
    correctAnswer: 0,
    explanation: "EVM stands for Electronic Voting Machine. It is used for voting in elections in India, introduced in 1982.",
    difficulty: "easy",
  },
  {
    id: 4,
    question: "Who is responsible for conducting elections in India?",
    options: [
      "The Prime Minister",
      "The Supreme Court",
      "The Election Commission of India",
      "The Parliament",
    ],
    correctAnswer: 2,
    explanation: "The Election Commission of India (ECI) is an autonomous constitutional body responsible for administering elections in India.",
    difficulty: "easy",
  },
  {
    id: 5,
    question: "What is VVPAT?",
    options: [
      "Voter Verification Paper Audit Trail",
      "Verified Vote Paper Audit Tool",
      "Voter Verifiable Paper Audit Trail",
      "Voting Verification Process and Audit Technology",
    ],
    correctAnswer: 2,
    explanation: "VVPAT stands for Voter Verifiable Paper Audit Trail. It prints a paper slip that allows voters to verify their vote was correctly recorded.",
    difficulty: "medium",
  },
  {
    id: 6,
    question: "How many phases can Indian elections be conducted in?",
    options: [
      "Maximum 3 phases",
      "Maximum 5 phases",
      "Maximum 7 phases",
      "As many as needed",
    ],
    correctAnswer: 3,
    explanation: "The Election Commission decides the number of phases based on security, logistics, and other factors. Elections have been conducted in up to 7 phases.",
    difficulty: "medium",
  },
  {
    id: 7,
    question: "What is the Model Code of Conduct?",
    options: [
      "A guide for voters on how to vote",
      "A set of rules for political parties and candidates during elections",
      "The constitution of the Election Commission",
      "A code for police during elections",
    ],
    correctAnswer: 1,
    explanation: "The Model Code of Conduct is a set of guidelines issued by the ECI for political parties and candidates to ensure free and fair elections.",
    difficulty: "medium",
  },
  {
    id: 8,
    question: "What document is primarily used as voter identification in India?",
    options: [
      "Driving License",
      "Aadhaar Card",
      "EPIC (Electors Photo Identity Card)",
      "Passport",
    ],
    correctAnswer: 2,
    explanation: "EPIC (Electors Photo Identity Card), commonly known as Voter ID, is the primary voter identification document in India.",
    difficulty: "easy",
  },
  {
    id: 9,
    question: "What is a 'Swing' in election terminology?",
    options: [
      "The change in voter turnout",
      "The change in vote share between two elections for a party",
      "The rotation of polling booths",
      "The transfer of votes between candidates",
    ],
    correctAnswer: 1,
    explanation: "A swing refers to the change in percentage of vote share for a party between two consecutive elections in a constituency or region.",
    difficulty: "hard",
  },
  {
    id: 10,
    question: "Who appoints the Chief Election Commissioner of India?",
    options: [
      "The Prime Minister",
      "The Parliament",
      "The President of India",
      "The Supreme Court Chief Justice",
    ],
    correctAnswer: 2,
    explanation: "The Chief Election Commissioner and other Election Commissioners are appointed by the President of India.",
    difficulty: "medium",
  },
];

export const eligibilityQuestions: EligibilityQuestion[] = [
  {
    id: 1,
    question: "What is your age?",
    type: "radio",
    options: [
      { value: "under18", label: "Under 18 years" },
      { value: "18orAbove", label: "18 years or above" },
    ],
    nextStep: (answer) => (answer === "under18" ? 100 : 2),
  },
  {
    id: 2,
    question: "Are you an Indian citizen?",
    type: "radio",
    options: [
      { value: "yes", label: "Yes, I am an Indian citizen" },
      { value: "no", label: "No" },
    ],
    nextStep: (answer) => (answer === "no" ? 101 : 3),
  },
  {
    id: 3,
    question: "Are you a resident of the constituency where you want to register?",
    type: "radio",
    options: [
      { value: "yes", label: "Yes, I reside here" },
      { value: "temporarily", label: "Temporarily residing here" },
      { value: "no", label: "No, I live elsewhere" },
    ],
    nextStep: (answer) => (answer === "no" ? 4 : 4),
  },
  {
    id: 4,
    question: "Are you already registered as a voter?",
    type: "radio",
    options: [
      { value: "yes", label: "Yes, I'm already registered" },
      { value: "no", label: "No, I'm not registered yet" },
      { value: "unsure", label: "I'm not sure" },
    ],
    nextStep: () => 5,
  },
  {
    id: 5,
    question: "Do you have a valid photo ID for registration?",
    type: "radio",
    options: [
      { value: "yes", label: "Yes (Aadhaar, Passport, etc.)" },
      { value: "no", label: "No, I need to get one" },
    ],
    nextStep: () => null,
  },
];

export interface VoterTurnoutData {
  year: string;
  turnout: number;
  registered: number;
  voters: number;
}

export interface PartyResult {
  name: string;
  seats: number;
  color: string;
}

export interface VoterDemographic {
  category: string;
  percentage: number;
  color: string;
}

export const voterTurnoutData: VoterTurnoutData[] = [
  { year: "1962", turnout: 61.0, registered: 216, voters: 132 },
  { year: "1967", turnout: 61.3, registered: 275, voters: 168 },
  { year: "1971", turnout: 61.3, registered: 321, voters: 197 },
  { year: "1977", turnout: 60.5, registered: 371, voters: 225 },
  { year: "1980", turnout: 56.9, registered: 400, voters: 228 },
  { year: "1984", turnout: 59.4, registered: 464, voters: 276 },
  { year: "1989", turnout: 59.7, registered: 499, voters: 298 },
  { year: "1991", turnout: 55.9, registered: 517, voters: 289 },
  { year: "1996", turnout: 57.9, registered: 593, voters: 343 },
  { year: "1998", turnout: 58.4, registered: 625, voters: 365 },
  { year: "1999", turnout: 56.7, registered: 650, voters: 369 },
  { year: "2004", turnout: 58.0, registered: 676, voters: 392 },
  { year: "2009", turnout: 58.0, registered: 717, voters: 416 },
  { year: "2014", turnout: 66.4, registered: 834, voters: 554 },
  { year: "2019", turnout: 67.4, registered: 912, voters: 614 },
];

export const loksabhaPartyResults: PartyResult[] = [
  { name: "BJP", seats: 240, color: "#FF6B2B" },
  { name: "INC", seats: 99, color: "#00BFFF" },
  { name: "SP", seats: 37, color: "#E91E63" },
  { name: "INC+ (Allies)", seats: 23, color: "#4FC3F7" },
  { name: "DMK", seats: 22, color: "#FF4081" },
  { name: "TMC", seats: 29, color: "#00897B" },
  { name: "Others", seats: 100, color: "#9E9E9E" },
];

export const voterDemographics: VoterDemographic[] = [
  { category: "18-25", percentage: 22, color: "#6366F1" },
  { category: "26-35", percentage: 28, color: "#8B5CF6" },
  { category: "36-50", percentage: 25, color: "#A78BFA" },
  { category: "51-65", percentage: 15, color: "#C4B5FD" },
  { category: "65+", percentage: 10, color: "#DDD6FE" },
];

export const electionMyths = [
  {
    myth: "I can vote without any ID",
    fact: "You need a valid photo ID (EPIC, Aadhaar, Passport, etc.) to vote. Keep your Voter ID ready.",
    isTrue: false,
  },
  {
    myth: "My vote can be seen by politicians",
    fact: "Voting is secret. No one can see who you voted for. EVMs ensure complete secrecy.",
    isTrue: false,
  },
  {
    myth: "Votes can be changed after voting",
    fact: "Once you press the button on the EVM, your vote is final and cannot be changed or deleted.",
    isTrue: false,
  },
  {
    myth: "I can vote in multiple places",
    fact: "Voting in multiple constituencies is a criminal offense. You can only vote from your registered constituency.",
    isTrue: false,
  },
  {
    myth: "NOTA can make a candidate lose",
    fact: "If NOTA gets the most votes, the candidate with the second-highest votes still wins. NOTA does not affect the result directly.",
    isTrue: false,
  },
  {
    myth: "Young people's votes don't matter",
    fact: "Every single vote counts equally! In many elections, margins of victory are very thin. Your vote can decide the outcome.",
    isTrue: false,
  },
];
