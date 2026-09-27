import { Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";
import { useSession } from "@/hooks/useSession";

export function CandleLogo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
      <span className="flex size-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card">
        <Flame className="size-5" />
      </span>
      <span className="text-lg">Candle</span>
    </Link>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const { user } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <CandleLogo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="#how" className="transition-colors hover:text-foreground">
            {t("nav.how")}
          </a>
          <a href="#features" className="transition-colors hover:text-foreground">
            {t("nav.features")}
          </a>
          <a href="#pricing" className="transition-colors hover:text-foreground">
            {t("nav.pricing")}
          </a>
          <a href="#faq" className="transition-colors hover:text-foreground">
            {t("nav.faq")}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          {user ? (
            <Button asChild size="sm">
              <Link to="/dashboard">{t("nav.dashboard")}</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth">{t("nav.signin")}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/auth" search={{ mode: "signup" }}>
                  {t("cta.trial")}
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
