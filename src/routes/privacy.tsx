import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — Candle" },
      {
        name: "description",
        content:
          "How Candle handles employee celebration data: birth year hidden by default, employee-controlled preferences, company data export and deletion.",
      },
      { property: "og:title", content: "Privacy policy — Candle" },
      {
        name: "description",
        content: "Candle's GDPR-first approach to employee celebration data.",
      },
      { property: "og:description", content: "Candle's GDPR-first approach to employee data." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-14">
        <h1 className="text-4xl font-extrabold">Privacy policy</h1>
        <p className="text-muted-foreground">
          Candle is built for European teams and follows GDPR principles by design.
        </p>
        <section className="space-y-3">
          <h2 className="text-xl font-bold">What we store</h2>
          <p className="text-sm text-muted-foreground">
            Name, work email, celebration dates, office or home delivery address, dietary needs and
            celebration preferences. Birth year is hidden by default — only the day and month are
            used to schedule celebrations.
          </p>
          <h2 className="text-xl font-bold">Employee control</h2>
          <p className="text-sm text-muted-foreground">
            Every employee fills in and edits their own profile, chooses their celebration style and
            can select quiet mode to opt out of celebrations entirely.
          </p>
          <h2 className="text-xl font-bold">Company control</h2>
          <p className="text-sm text-muted-foreground">
            Company admins can export all company data and delete the company account, which removes
            all employee records.
          </p>
          <h2 className="text-xl font-bold">Cookies</h2>
          <p className="text-sm text-muted-foreground">
            We use essential cookies for sign-in and language preference only.
          </p>
          <h2 className="text-xl font-bold">Contact</h2>
          <p className="text-sm text-muted-foreground">
            Data requests: hello@candle.team. This page is a draft — have it reviewed by your legal
            team before launch.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
