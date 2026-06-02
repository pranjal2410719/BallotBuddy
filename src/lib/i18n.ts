export type Language = "en" | "hi";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.journey": "Election Journey",
    "nav.eligibility": "Eligibility Check",
    "nav.timeline": "Timeline",
    "nav.quiz": "Quiz",
    "nav.myths": "Myth Buster",
    "nav.simulation": "Simulation",
    "nav.roadmap": "My Roadmap",

    // Home Page
    "home.badge": "Your Friendly AI Election Assistant",
    "home.title.line1": "Make Democracy",
    "home.title.line2": "Easy to Understand",
    "home.description":
      "BallotBuddy helps citizens understand voting processes, eligibility, election timelines, and civic responsibilities through interactive guidance and AI-powered explanations.",
    "home.cta.explore": "Explore Election Journey",
    "home.cta.check": "Check Eligibility",
    "home.features.title": "Everything You Need to Vote Confidently",
    "home.features.subtitle":
      "From registration to results, BallotBuddy guides you through every step of the election process.",
    "home.audience.title": "Built for Every Citizen",
    "home.audience.subtitle":
      "Whether you're a first-time voter or helping someone understand elections, BallotBuddy is for you.",
    "home.cta.title": "Ready to Become Election Smart?",
    "home.cta.subtitle":
      "Start your journey to understanding democracy. It takes just a few minutes.",
    "home.cta.quiz": "Take the Election Quiz",
    "home.cta.timeline": "View Election Timeline",

    // Features
    "feature.journey": "Election Journey",
    "feature.journey.desc":
      "Explore the complete election process step-by-step with interactive visual roadmaps.",
    "feature.eligibility": "Eligibility Checker",
    "feature.eligibility.desc":
      "Find out if you're eligible to vote and get personalized next steps for registration.",
    "feature.timeline": "Election Timeline",
    "feature.timeline.desc":
      "Visualize election stages, deadlines, and important milestones on an interactive timeline.",
    "feature.quiz": "Election Quiz",
    "feature.quiz.desc":
      "Test your election knowledge with fun quizzes and earn your Election Literacy Score.",
    "feature.myths": "Myth Buster",
    "feature.myths.desc":
      "Discover the truth behind common election myths and misconceptions.",
    "feature.simulation": "Election Simulation",
    "feature.simulation.desc":
      "Experience a mock election from registration to results in an interactive walkthrough.",
    "feature.roadmap": "My Voting Roadmap",
    "feature.roadmap.desc":
      "Get a personalized election roadmap based on your profile and eligibility status.",

    // Audience
    "audience.students": "Students & First-Time Voters",
    "audience.students.desc":
      "Learn how democracy works before casting your first vote.",
    "audience.citizens": "General Citizens",
    "audience.citizens.desc":
      "Stay informed about election processes and your civic duties.",
    "audience.rural": "Rural & Senior Citizens",
    "audience.rural.desc":
      "Simple explanations in your language, designed for easy understanding.",

    // Stats
    "stat.voters": "First-time voters need guidance",
    "stat.confused": "Citizens find govt. sites confusing",
    "stat.stages": "Stages in the election process",
    "stat.goal": "Goal: Informed democracy",

    // Footer
    "footer.description":
      "Your Friendly AI Election Assistant. Empowering citizens with accessible, understandable, and engaging election education.",
    "footer.built": "Built for Hackathon 2026 🚀",
    "footer.copyright": "Made with ❤️ for democracy.",

    // Chat
    "chat.greeting":
      "Hi! 👋 I'm BallotBuddy, your election education assistant. Ask me anything about elections, voting, or civic duties!",
    "chat.placeholder": "Ask about elections...",
    "chat.suggestion.1": "How do I register to vote?",
    "chat.suggestion.2": "What is NOTA?",
    "chat.suggestion.3": "What documents do I need for voting?",
    "chat.offline": "Sorry, I'm having trouble connecting. Please try again.",
    "chat.error": "Sorry, I couldn't process that.",

    // Eligibility
    "eligibility.title": "✅ Eligibility Checker",
    "eligibility.subtitle":
      "Answer a few questions to check if you're eligible to vote and get personalized next steps.",
    "eligibility.question": "Question",
    "eligibility.of": "of",
    "eligibility.back": "Back",
    "eligibility.next": "Next",
    "eligibility.check": "Check Result",
    "eligibility.startOver": "Start Over",

    // Journey
    "journey.title": "🗳️ Interactive Election Journey",
    "journey.subtitle":
      "Explore the complete election process step by step. Click on any stage to learn more.",
    "journey.selectStep": "Select a Step",
    "journey.selectStepDesc":
      "Click on any step in the election process to learn what happens, what to bring, and important do's and don'ts.",
    "journey.whatHappens": "What Happens",
    "journey.whatToExpect": "What to Expect",
    "journey.whatToBring": "What to Bring",
    "journey.dos": "Do's",
    "journey.donts": "Don'ts",
    "journey.previous": "Previous",
    "journey.next": "Next",

    // Timeline
    "timeline.title": "📅 Election Timeline",
    "timeline.subtitle":
      "Visualize election stages, deadlines, and important milestones.",
    "timeline.all": "All",
    "timeline.legend": "Legend",

    // Quiz
    "quiz.title": "🎯 Election Quiz",
    "quiz.subtitle":
      "Test your election knowledge and earn your Election Literacy Score.",
    "quiz.score": "Score",
    "quiz.correct": "correct",
    "quiz.nextQuestion": "Next Question",
    "quiz.seeResults": "See Results",
    "quiz.complete": "Quiz Complete!",
    "quiz.tryAgain": "Try Again",
    "quiz.review": "Review Your Answers",
    "quiz.correctAnswer": "Correct:",

    // Myths
    "myths.title": "🔍 Election Myth Buster",
    "myths.subtitle":
      "Don't fall for misinformation! Tap each card to reveal the truth behind common election myths.",
    "myths.revealAll": "Reveal All Facts",
    "myths.hideAll": "Hide All Facts",
    "myths.myth": "Myth",
    "myths.fact": "Fact",
    "myths.tapHint": "👆 Tap to reveal the truth",
    "myths.busted": "myths busted",

    // Simulation
    "simulation.title": "🗳️ Election Simulation",
    "simulation.subtitle":
      "Experience a mock election from start to finish. Walk through each step of the democratic process.",
    "simulation.start": "Start Simulation",
    "simulation.restart": "Restart Simulation",
    "simulation.complete": "🎉 Simulation Complete!",
    "simulation.completeDesc":
      "You've successfully experienced the entire election process!",
    "simulation.congrats": "Congratulations!",
    "simulation.step": "Step",
    "simulation.of": "of",
    "simulation.continue": "Continue",
    "simulation.finish": "Finish",

    // Roadmap
    "roadmap.title": "🗺️ My Voting Roadmap",
    "roadmap.subtitle":
      "Get a personalized election roadmap based on your profile.",
    "roadmap.name": "Your Name",
    "roadmap.age": "Your Age",
    "roadmap.state": "Your State",
    "roadmap.registered": "Already registered to vote?",
    "roadmap.hasId": "Do you have a Voter ID?",
    "roadmap.generate": "Generate My Roadmap",
    "roadmap.reset": "Start Over",
    "roadmap.nextSteps": "Your Next Steps",
    "roadmap.eligible": "Eligibility Status",
    "roadmap.registration": "Registration Status",
    "roadmap.estimated": "Estimated Time",
    "roadmap.minutes": "minutes",

    // Voice
    "voice.start": "Start Voice",
    "voice.stop": "Stop Voice",
    "voice.listening": "Listening...",

    // Language
    "lang.en": "English",
    "lang.hi": "Hindi",
  },

  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.journey": "चुनाव यात्रा",
    "nav.eligibility": "पात्रता जाँच",
    "nav.timeline": "समयरेखा",
    "nav.quiz": "क्विज़",
    "nav.myths": "मिथक भंडार",
    "nav.simulation": "सिमुलेशन",
    "nav.roadmap": "मेरा रोडमैप",

    // Home Page
    "home.badge": "आपका मित्रवत AI चुनाव सहायक",
    "home.title.line1": "लोकतंत्र को बनाएं",
    "home.title.line2": "समझने में आसान",
    "home.description":
      "बैलेटबडी नागरिकों को मतदान प्रक्रियाओं, पात्रता, चुनाव समयरेखा और नागरिक जिम्मेदारियों को समझने में मदद करता है।",
    "home.cta.explore": "चुनाव यात्रा देखें",
    "home.cta.check": "पात्रता जाँचें",
    "home.features.title": "आत्मविश्वास से मतदान के लिए सब कुछ",
    "home.features.subtitle":
      "पंजीकरण से लेकर परिणामों तक, बैलेटबडी आपको चुनाव प्रक्रिया के हर चरण में मार्गदर्शन करता है।",
    "home.audience.title": "हर नागरिक के लिए बनाया गया",
    "home.audience.subtitle":
      "चाहे आप पहली बार मतदाता हों या किसी को चुनाव समझा रहे हों, बैलेटबडी आपके लिए है।",
    "home.cta.title": "चुनाव स्मार्ट बनने के लिए तैयार?",
    "home.cta.subtitle":
      "लोकतंत्र को समझने की यात्रा शुरू करें। बस कुछ मिनट लगते हैं।",
    "home.cta.quiz": "चुनाव क्विज़ लें",
    "home.cta.timeline": "चुनाव समयरेखा देखें",

    // Features
    "feature.journey": "चुनाव यात्रा",
    "feature.journey.desc":
      "इंटरैक्टिव विजुअल रोडमैप के साथ पूरी चुनाव प्रक्रिया को चरण दर चरण जानें।",
    "feature.eligibility": "पात्रता जाँच",
    "feature.eligibility.desc":
      "जानें कि क्या आप मतदान के लिए पात्र हैं और पंजीकरण के लिए अगले कदम प्राप्त करें।",
    "feature.timeline": "चुनाव समयरेखा",
    "feature.timeline.desc":
      "चुनाव चरणों, समय सीमा और महत्वपूर्ण मील के पत्थर की कल्पना करें।",
    "feature.quiz": "चुनाव क्विज़",
    "feature.quiz.desc":
      "मजेदार क्विज़ के साथ अपने चुनाव ज्ञान का परीक्षण करें और अपना स्कोर प्राप्त करें।",
    "feature.myths": "मिथक भंडार",
    "feature.myths.desc":
      "सामान्य चुनाव मिथकों और गलतफहमियों के पीछे की सच्चाई जानें।",
    "feature.simulation": "चुनाव सिमुलेशन",
    "feature.simulation.desc":
      "पंजीकरण से परिणामों तक एक मॉक चुनाव का अनुभव करें।",
    "feature.roadmap": "मेरा मतदान रोडमैप",
    "feature.roadmap.desc":
      "अपनी प्रोफ़ाइल और पात्रता स्थिति के आधार पर व्यक्तिगत चुनाव रोडमैप प्राप्त करें।",

    // Audience
    "audience.students": "छात्र और पहली बार मतदाता",
    "audience.students.desc":
      "पहला वोट डालने से पहले जानें कि लोकतंत्र कैसे काम करता है।",
    "audience.citizens": "सामान्य नागरिक",
    "audience.citizens.desc":
      "चुनाव प्रक्रियाओं और अपने नागरिक कर्तव्यों के बारे में जानकारी रखें।",
    "audience.rural": "ग्रामीण और वरिष्ठ नागरिक",
    "audience.rural.desc":
      "आसान समझ के लिए डिज़ाइन की गई आपकी भाषा में सरल व्याख्या।",

    // Stats
    "stat.voters": "पहली बार मतदाताओं को मार्गदर्शन चाहिए",
    "stat.confused": "नागरिक सरकारी साइट्स को भ्रमित पाते हैं",
    "stat.stages": "चुनाव प्रक्रिया में चरण",
    "stat.goal": "लक्ष्य: सूचित लोकतंत्र",

    // Footer
    "footer.description":
      "आपका मित्रवत AI चुनाव सहायक। सुलभ, समझने योग्य और आकर्षक चुनाव शिक्षा के साथ नागरिकों को सशक्त बनाना।",
    "footer.built": "हैकाथॉन 2026 के लिए बनाया गया 🚀",
    "footer.copyright": "लोकतंत्र के लिए ❤️ से बनाया गया।",

    // Chat
    "chat.greeting":
      "नमस्ते! 👋 मैं बैलेटबडी हूँ, आपका चुनाव शिक्षा सहायक। चुनाव, मतदान या नागरिक कर्तव्यों के बारे में कुछ भी पूछें!",
    "chat.placeholder": "चुनाव के बारे में पूछें...",
    "chat.suggestion.1": "मैं मतदान के लिए कैसे पंजीकरण करूँ?",
    "chat.suggestion.2": "NOTA क्या है?",
    "chat.suggestion.3": "मतदान के लिए किन दस्तावेजों की आवश्यकता है?",
    "chat.offline": "क्षमा करें, मुझे कनेक्ट करने में समस्या हो रही है।",
    "chat.error": "क्षमा करें, मैं इसे संसाधित नहीं कर सका।",

    // Eligibility
    "eligibility.title": "✅ पात्रता जाँच",
    "eligibility.subtitle":
      "कुछ प्रश्नों के उत्तर देकर जानें कि क्या आप मतदान के लिए पात्र हैं।",
    "eligibility.question": "प्रश्न",
    "eligibility.of": "में से",
    "eligibility.back": "पीछे",
    "eligibility.next": "अगला",
    "eligibility.check": "परिणाम जाँचें",
    "eligibility.startOver": "फिर से शुरू करें",

    // Journey
    "journey.title": "🗳️ इंटरैक्टिव चुनाव यात्रा",
    "journey.subtitle":
      "चरण दर चरण पूरी चुनाव प्रक्रिया का अन्वेषण करें। किसी भी चरण पर क्लिक करें।",
    "journey.selectStep": "चरण चुनें",
    "journey.selectStepDesc":
      "चुनाव प्रक्रिया में किसी भी चरण पर क्लिक करें।",
    "journey.whatHappens": "क्या होता है",
    "journey.whatToExpect": "क्या उम्मीद करें",
    "journey.whatToBring": "क्या लाएँ",
    "journey.dos": "करें",
    "journey.donts": "न करें",
    "journey.previous": "पिछला",
    "journey.next": "अगला",

    // Timeline
    "timeline.title": "📅 चुनाव समयरेखा",
    "timeline.subtitle":
      "चुनाव चरणों, समय सीमा और महत्वपूर्ण मील के पत्थर की कल्पना करें।",
    "timeline.all": "सभी",
    "timeline.legend": "लीजेंड",

    // Quiz
    "quiz.title": "🎯 चुनाव क्विज़",
    "quiz.subtitle":
      "अपने चुनाव ज्ञान का परीक्षण करें और अपना स्कोर प्राप्त करें।",
    "quiz.score": "स्कोर",
    "quiz.correct": "सही",
    "quiz.nextQuestion": "अगला प्रश्न",
    "quiz.seeResults": "परिणाम देखें",
    "quiz.complete": "क्विज़ पूर्ण!",
    "quiz.tryAgain": "फिर से प्रयास करें",
    "quiz.review": "अपने उत्तर देखें",
    "quiz.correctAnswer": "सही:",

    // Myths
    "myths.title": "🔍 चुनाव मिथक भंडार",
    "myths.subtitle":
      "गलत सूचना से सावधान रहें! प्रत्येक कार्ड पर टैप करें।",
    "myths.revealAll": "सभी तथ्य दिखाएँ",
    "myths.hideAll": "सभी तथ्य छुपाएँ",
    "myths.myth": "मिथक",
    "myths.fact": "तथ्य",
    "myths.tapHint": "👆 सच्चाई जानने के लिए टैप करें",
    "myths.busted": "मिथक उजागर",

    // Simulation
    "simulation.title": "🗳️ चुनाव सिमुलेशन",
    "simulation.subtitle":
      "शुरू से अंत तक एक मॉक चुनाव का अनुभव करें।",
    "simulation.start": "सिमुलेशन शुरू करें",
    "simulation.restart": "सिमुलेशन फिर से शुरू करें",
    "simulation.complete": "🎉 सिमुलेशन पूर्ण!",
    "simulation.completeDesc":
      "आपने पूरी चुनाव प्रक्रिया का अनुभव कर लिया है!",
    "simulation.congrats": "बधाई हो!",
    "simulation.step": "चरण",
    "simulation.of": "में से",
    "simulation.continue": "जारी रखें",
    "simulation.finish": "समाप्त",

    // Roadmap
    "roadmap.title": "🗺️ मेरा मतदान रोडमैप",
    "roadmap.subtitle": "अपनी प्रोफ़ाइल के आधार पर व्यक्तिगत चुनाव रोडमैप।",
    "roadmap.name": "आपका नाम",
    "roadmap.age": "आपकी आयु",
    "roadmap.state": "आपका राज्य",
    "roadmap.registered": "पहले से मतदान के लिए पंजीकृत?",
    "roadmap.hasId": "क्या आपके पास मतदाता आईडी है?",
    "roadmap.generate": "मेरा रोडमैप बनाएँ",
    "roadmap.reset": "फिर से शुरू करें",
    "roadmap.nextSteps": "आपके अगले कदम",
    "roadmap.eligible": "पात्रता स्थिति",
    "roadmap.registration": "पंजीकरण स्थिति",
    "roadmap.estimated": "अनुमानित समय",
    "roadmap.minutes": "मिनट",

    // Voice
    "voice.start": "आवाज़ शुरू करें",
    "voice.stop": "आवाज़ बंद करें",
    "voice.listening": "सुन रहे हैं...",

    // Language
    "lang.en": "अंग्रेज़ी",
    "lang.hi": "हिंदी",
  },
};
