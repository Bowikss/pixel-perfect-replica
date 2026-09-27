import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Cake, Users, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CandleLogo } from "@/components/site/SiteHeader";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { formatEur, nextOccurrence, daysUntil, formatDateEU } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Candle" },
      {
        name: "description",
        content: "Upcoming team celebrations, spend against budget and profile completion.",
      },
      { property: "og:title", content: "Dashboard — Candle" },
      { property: "og:description", content: "Your team's upcoming celebrations at a glance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, full_name, email, company_id")
        .maybeSingle();
      const companyId = profile?.company_id ?? null;
      const company = companyId
        ? (
            await supabase
              .from("companies")
              .select("*")
              .eq("id", companyId)
              .maybeSingle()
          ).data
        : null;
      const employees = companyId
        ? ((
            await supabase
              .from("employee_profiles")
              .select("*")
              .eq("company_id", companyId)
          ).data ?? [])
        : [];
      return { profile, company, employees };
    },
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const employees = data?.employees ?? [];
  const upcoming = employees
    .filter((e) => e.birth_date && e.celebration_style !== "quiet")
    .map((e) => {
      const d = new Date(e.birth_date as string);
      const next = nextOccurrence(d.getMonth() + 1, d.getDate());
      return { name: `${e.first_name} ${e.last_name ?? ""}`.trim(), next, days: daysUntil(next) };
    })
    .filter((e) => e.days <= 30)
    .sort((a, b) => a.days - b.days);

  const incomplete = employees.filter((e) => !e.profile_complete).length;

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/70 bg-card/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <CandleLogo />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-6 px-4 py-10">
        <div>
          <h1 className="text-3xl font-extrabold">
            {data?.company?.name ? `${data.company.name} celebrations` : "Your dashboard"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Loading your team…"
              : data?.company
                ? `Trial ends ${formatDateEU(data.company.trial_ends_at)}`
                : "Finish setting up your company to start celebrating."}
          </p>
        </div>

        {!isLoading && !data?.company ? (
          <Card className="rounded-3xl border-primary/40 shadow-card">
            <CardContent className="flex flex-wrap items-center justify-between gap-4 p-7">
              <div>
                <h2 className="text-lg font-bold">Set up your company</h2>
                <p className="text-sm text-muted-foreground">
                  Company details, offices, budget and occasions — about 5 minutes.
                </p>
              </div>
              <Button className="rounded-full" disabled>
                Onboarding wizard coming next
              </Button>
            </CardContent>
          </Card>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-3">
          <StatCard
            icon={<Cake className="size-5" />}
            label="Celebrations next 30 days"
            value={String(upcoming.length)}
          />
          <StatCard
            icon={<Users className="size-5" />}
            label="Team members"
            value={String(employees.length)}
            hint={incomplete ? `${incomplete} profiles pending` : "All profiles complete"}
          />
          <StatCard
            icon={<Wallet className="size-5" />}
            label="Budget per celebration"
            value={data?.company ? formatEur(data.company.budget_cents) : "—"}
          />
        </div>

        <Card className="rounded-3xl border-border/70 shadow-card">
          <CardContent className="p-7">
            <h2 className="text-lg font-bold">Upcoming celebrations</h2>
            {upcoming.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                Nothing in the next 30 days yet — add your team to see celebrations here.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-border">
                {upcoming.map((u) => (
                  <li key={u.name + u.days} className="flex items-center justify-between py-3">
                    <span className="font-medium">{u.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDateEU(u.next)} · in {u.days} days
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="rounded-3xl border-border/70 shadow-card">
      <CardContent className="space-y-2 p-6">
        <span className="flex size-10 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          {icon}
        </span>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-extrabold">{value}</p>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </CardContent>
    </Card>
  );
}
