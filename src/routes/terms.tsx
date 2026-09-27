import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — Candle" },
      {
        name: "description",
        content:
          "Candle subscription plans, trial terms, cake and gift billing, and delivery responsibilities for company accounts.",
      },
      { property: "og:title", content: "Terms of service — Candle" },
      {
        property: "og:description",
        content: "Subscription, trial and delivery terms for Candle company accounts.",
      },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-14">
        <h1 className="text-4xl font-extrabold">Terms of service</h1>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>
            Candle is a subscription service for companies. Plans are Starter (€29/month, up to 25
            employees), Team (€79/month, up to 100 employees) and Business (€199/month, unlimited).
          </p>
          <p>
            Every new company starts with a 14-day free trial that requires no payment card. Cakes,
            gifts and deliveries are billed at cost plus a service fee, shown before each month.
          </p>
          <p>
            Deliveries are fulfilled by local bakery and gift partners. Candle coordinates the
            order, the delivery window and the celebration message.
          </p>
          <p>
            This page is a draft — have it reviewed by your legal team before launch. Questions:
            hello@candle.team.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
