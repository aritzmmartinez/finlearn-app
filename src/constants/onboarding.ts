export interface OnboardingSlide {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  accent: string;
}

export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: "1",
    emoji: "📊",
    title: "Your portfolio,\nexplained.",
    subtitle:
      "Import your investments and understand what you have, why it matters, and how it performs.",
    accent: "explained",
  },
  {
    id: "2",
    emoji: "🧠",
    title: "Learn\nby doing.",
    subtitle:
      "Each financial concept appears in the context of your real portfolio. No empty theory.",
    accent: "doing",
  },
  {
    id: "3",
    emoji: "📸",
    title: "Import with\na photo.",
    subtitle:
      "Take a snapshot of your broker and the app automatically detects your assets.",
    accent: "photo",
  },
  {
    id: "4",
    emoji: "🌍",
    title: "Made for\nEurope.",
    subtitle:
      "Native support for ETFs, European brokers, and EUR currency. No commitment.",
    accent: "Europe",
  },
];
