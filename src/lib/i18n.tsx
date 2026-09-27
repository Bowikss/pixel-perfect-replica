import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "lv";

const dict = {
  en: {
    "nav.features": "Features",
    "nav.how": "How it works",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.signin": "Sign in",
    "nav.dashboard": "Dashboard",
    "cta.trial": "Start free 14-day trial",
    "hero.title": "Never miss a moment that matters to your team.",
    "hero.sub":
      "Birthdays, anniversaries and name days, celebrated automatically. Your team signs the card, we deliver the cake.",
    "hero.note": "No card required. Set up in 10 minutes.",
    "how.title": "How Candle works",
    "how.1.t": "Invite your team",
    "how.1.d": "Share one link. Everyone fills in their own dates and preferences.",
    "how.2.t": "Set your celebration rules",
    "how.2.d": "Budget, occasions and delivery windows — once. Candle follows them forever.",
    "how.3.t": "We handle the rest",
    "how.3.d": "Cards go out 5 days ahead, cakes and gifts arrive on the day.",
    "features.title": "Everything a thoughtful team needs",
    "f.cards.t": "Group cards",
    "f.cards.d": "Coworkers add messages, emoji and photos from their phone. Revealed on the day.",
    "f.remote.t": "Remote-friendly delivery",
    "f.remote.d": "Office cake or a home delivery — Candle picks the right one automatically.",
    "f.slack.t": "Slack & Teams",
    "f.slack.d": "Announcements and card reminders posted to your channel.",
    "f.privacy.t": "Privacy first",
    "f.privacy.d": "Birth year hidden by default. Quiet mode is always respected.",
    "pricing.title": "Simple pricing",
    "pricing.sub": "14-day free trial, no card required.",
    "pricing.month": "/month",
    "pricing.starter": "Up to 25 employees",
    "pricing.team": "Up to 100 employees",
    "pricing.business": "Unlimited employees",
    "faq.title": "Frequently asked questions",
    "testimonials.title": "Loved by people teams",
    "footer.privacy": "Privacy policy",
    "footer.terms": "Terms",
    "footer.contact": "Contact",
    "footer.tag": "Celebration autopilot for teams.",
  },
  lv: {
    "nav.features": "Iespējas",
    "nav.how": "Kā tas darbojas",
    "nav.pricing": "Cenas",
    "nav.faq": "BUJ",
    "nav.signin": "Ieiet",
    "nav.dashboard": "Panelis",
    "cta.trial": "Sākt bezmaksas 14 dienu izmēģinājumu",
    "hero.title": "Nekad nepalaid garām savai komandai svarīgu mirkli.",
    "hero.sub":
      "Dzimšanas dienas, darba jubilejas un vārda dienas — automātiski. Komanda paraksta kartīti, mēs piegādājam torti.",
    "hero.note": "Karte nav nepieciešama. Uzstādīšana 10 minūtēs.",
    "how.title": "Kā Candle darbojas",
    "how.1.t": "Uzaicini komandu",
    "how.1.d": "Dalies ar vienu saiti. Katrs pats ievada datumus un vēlmes.",
    "how.2.t": "Iestati svinību noteikumus",
    "how.2.d": "Budžets, notikumi un piegādes laiks — vienreiz. Candle tos ievēro vienmēr.",
    "how.3.t": "Pārējo darām mēs",
    "how.3.d": "Kartītes 5 dienas iepriekš, tortes un dāvanas — īstajā dienā.",
    "features.title": "Viss, kas vajadzīgs gādīgai komandai",
    "f.cards.t": "Kopīgās kartītes",
    "f.cards.d": "Kolēģi pievieno vēlējumus, emocijzīmes un foto telefonā. Atklāj svinību dienā.",
    "f.remote.t": "Piegāde arī attālinātajiem",
    "f.remote.d": "Torte uz biroju vai sūtījums uz mājām — Candle izvēlas pareizo.",
    "f.slack.t": "Slack un Teams",
    "f.slack.d": "Paziņojumi un atgādinājumi tieši jūsu kanālā.",
    "f.privacy.t": "Privātums vispirms",
    "f.privacy.d": "Dzimšanas gads pēc noklusējuma paslēpts. Klusais režīms vienmēr tiek ievērots.",
    "pricing.title": "Vienkāršas cenas",
    "pricing.sub": "14 dienas bez maksas, bez kartes.",
    "pricing.month": "/mēnesī",
    "pricing.starter": "Līdz 25 darbiniekiem",
    "pricing.team": "Līdz 100 darbiniekiem",
    "pricing.business": "Neierobežots darbinieku skaits",
    "faq.title": "Bieži uzdotie jautājumi",
    "testimonials.title": "Personāla komandu iemīļots",
    "footer.privacy": "Privātuma politika",
    "footer.terms": "Noteikumi",
    "footer.contact": "Kontakti",
    "footer.tag": "Svinību autopilots komandām.",
  },
} as const;

export type TKey = keyof (typeof dict)["en"];

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: TKey) => string;
}>({ lang: "en", setLang: () => {}, t: (k) => dict.en[k] });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("candle.lang");
    if (stored === "lv" || stored === "en") setLangState(stored);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("candle.lang", l);
  }, []);

  const t = useCallback((k: TKey) => dict[lang][k] ?? dict.en[k], [lang]);

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
