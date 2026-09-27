import { Link } from "@tanstack/react-router";
import { CandleLogo } from "@/components/site/SiteHeader";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border/70 bg-card/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <CandleLogo />
          <p className="text-sm text-muted-foreground">{t("footer.tag")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground">
            {t("footer.privacy")}
          </Link>
          <Link to="/terms" className="hover:text-foreground">
            {t("footer.terms")}
          </Link>
          <a href="mailto:hello@candle.team" className="hover:text-foreground">
            {t("footer.contact")}
          </a>
          <LanguageSwitcher />
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Candle. Made in the Baltics.
      </p>
    </footer>
  );
}
