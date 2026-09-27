import { createFileRoute, Link } from "@tanstack/react-router";
import { Cake, Gift, Heart, Lock, MessageSquareHeart, Sparkles, Truck, Check } from "lucide-react";
import heroImage from "@/assets/hero-celebration.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Candle — never miss a moment that matters to your team" },
      {
        name: "description",
        content:
          "Candle organises birthdays, work anniversaries and name days for your team automatically. Coworkers sign a group card, we deliver the cake — to the office or to remote homes.",
      },
      { property: "og:title", content: "Candle — celebration autopilot for teams" },
      {
        property: "og:description",
        content:
          "Set your team up once. Candle handles group cards, cakes and gifts for every birthday and milestone.",
      },
    ],
  }),
  component: Landing,
});

const plans = [
  { name: "Starter", price: "€29", key: "pricing.starter" as const },
  { name: "Team", price: "€79", key: "pricing.team" as const, featured: true },
  { name: "Business", price: "€199", key: "pricing.business" as const },
];

function Landing() {
  const { t } = useI18n();

  const steps = [
    { icon: Heart, t: t("how.1.t"), d: t("how.1.d") },
    { icon: Sparkles, t: t("how.2.t"), d: t("how.2.d") },
    { icon: Cake, t: t("how.3.t"), d: t("how.3.d") },
  ];

  const features = [
    { icon: MessageSquareHeart, t: t("f.cards.t"), d: t("f.cards.d") },
    { icon: Truck, t: t("f.remote.t"), d: t("f.remote.d") },
    { icon: Gift, t: t("f.slack.t"), d: t("f.slack.d") },
    { icon: Lock, t: t("f.privacy.t"), d: t("f.privacy.d") },
  ];

  const faqs = [
    {
      q: "Do employees have to share their birth year?",
      a: "No. The birth year is hidden by default — Candle only uses the day and month to schedule celebrations.",
    },
    {
      q: "What about people who don't want a fuss?",
      a: "Everyone chooses their celebration style: celebrate me loudly, keep it small, or quiet mode with no celebration at all.",
    },
    {
      q: "How do remote teammates get their cake?",
      a: "Remote employees automatically receive a home delivery or a digital gift card instead of an office cake.",
    },
    {
      q: "Which countries do you deliver to?",
      a: "We start in the Baltics with local bakery partners, and expand across Europe as demand grows.",
    },
    {
      q: "How is the group card kept a secret?",
      a: "The celebrated person never sees the card before the day. On the day they get an animated card with every message.",
    },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="surface-warm relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="space-y-6">
            <Badge className="rounded-full bg-accent text-accent-foreground hover:bg-accent">
              Celebration autopilot for teams
            </Badge>
            <h1 className="text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">{t("hero.sub")}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full shadow-lift">
                <Link to="/auth" search={{ mode: "signup" }}>
                  {t("cta.trial")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href="#how">{t("nav.how")}</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{t("hero.note")}</p>
          </div>
          <div className="relative">
            <div className="confetti-dots absolute -inset-6 -z-10 rounded-3xl opacity-50" />
            <img
              src={heroImage}
              alt="Coworkers celebrating a colleague with a cake and a signed group card"
              width={1280}
              height={960}
              className="w-full rounded-3xl border border-border/60 shadow-soft"
            />
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">{t("how.title")}</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <Card key={s.t} className="rounded-3xl border-border/70 shadow-card">
              <CardContent className="space-y-3 p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                    <s.icon className="size-5" />
                  </span>
                  <span className="text-sm font-bold text-primary">Step {i + 1}</span>
                </div>
                <h3 className="text-xl font-bold">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="features" className="bg-card/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">{t("features.title")}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.t}
                className="flex gap-4 rounded-3xl border border-border/70 bg-background p-6 shadow-card"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <f.icon className="size-5" />
                </span>
                <div className="space-y-1">
                  <h3 className="font-bold">{f.t}</h3>
                  <p className="text-sm text-muted-foreground">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("pricing.title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("pricing.sub")}</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map((p) => (
            <Card
              key={p.name}
              className={
                p.featured
                  ? "relative rounded-3xl border-primary/40 shadow-lift"
                  : "rounded-3xl border-border/70 shadow-card"
              }
            >
              <CardContent className="space-y-4 p-7">
                {p.featured ? (
                  <Badge className="rounded-full">Most popular</Badge>
                ) : (
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    {p.name}
                  </span>
                )}
                <div>
                  <h3 className="text-2xl font-bold">{p.name}</h3>
                  <p className="mt-1 text-3xl font-extrabold">
                    {p.price}
                    <span className="text-base font-medium text-muted-foreground">
                      {t("pricing.month")}
                    </span>
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">{t(p.key)}</p>
                <ul className="space-y-2 text-sm">
                  {["Group cards", "Automatic cake & gift delivery", "Slack / Teams announcements"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="size-4 text-primary" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
                <Button
                  asChild
                  className="w-full rounded-full"
                  variant={p.featured ? "default" : "outline"}
                >
                  <Link to="/auth" search={{ mode: "signup" }}>
                    {t("cta.trial")}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Cakes and gifts are billed at cost plus a service fee, shown clearly before each month.
        </p>
      </section>

      <section className="bg-card/60 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-3xl font-bold">{t("testimonials.title")}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="rounded-3xl border-dashed border-border shadow-none">
                <CardContent className="space-y-3 p-7 text-sm text-muted-foreground">
                  <div className="h-2 w-24 rounded-full bg-muted" />
                  <p>“Testimonial coming soon — we're collecting stories from our first teams.”</p>
                  <div className="h-2 w-16 rounded-full bg-muted" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 md:py-20">
        <h2 className="text-center text-3xl font-bold">{t("faq.title")}</h2>
        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="px-4 pb-20">
        <div className="surface-warm mx-auto max-w-5xl rounded-3xl border border-border/70 p-10 text-center shadow-soft">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{t("hero.title")}</h2>
          <Button asChild size="lg" className="mt-6 rounded-full shadow-lift">
            <Link to="/auth" search={{ mode: "signup" }}>
              {t("cta.trial")}
            </Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
