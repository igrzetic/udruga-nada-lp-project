import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import nadaLogo from "@/assets/nada-logo-30.avif";

export const LP_NAV_SECTION_IDS = [
  "why-movement",
  "recommendations",
  "getting-started",
  "quiz",
  "resources",
] as const;

export type LpNavSectionId = (typeof LP_NAV_SECTION_IDS)[number];

const NAV_ITEMS: (
  | { kind: "route"; key: "about"; to: "/o-nama"; label: string }
  | { kind: "section"; id: LpNavSectionId; label: string }
)[] = [
  { kind: "route", key: "about", to: "/o-nama", label: "O nama" },
  { kind: "section", id: "why-movement", label: "Zašto kretanje?" },
  { kind: "section", id: "recommendations", label: "Preporuke" },
  { kind: "section", id: "getting-started", label: "Kako početi?" },
  { kind: "section", id: "quiz", label: "Kviz: Moj stil" },
  { kind: "section", id: "resources", label: "Resursi & Kontakt" },
];

export type LpHeaderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  /** Samo na početnici: id sekcije u vidu (IntersectionObserver). */
  sectionActiveId: string;
  /** Skrol do sekcije kad smo već na `/`. */
  onHomeSectionNavigate?: (id: LpNavSectionId) => void;
};

export function LpHeader({ open, setOpen, sectionActiveId, onHomeSectionNavigate }: LpHeaderProps) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const highlight = pathname === "/o-nama" ? "about" : sectionActiveId;

  const goSection = (id: LpNavSectionId) => {
    if (pathname === "/") {
      onHomeSectionNavigate?.(id);
    } else {
      void navigate({ to: "/", hash: id });
    }
  };

  return (
    <>
      <header className="lp-site-header">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between lp-site-header__bar">
          <Link
            to="/"
            className="flex items-center shrink-0 lp-logo-btn"
            aria-label="Udruga Nada Rijeka — početna stranica"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src={nadaLogo}
              alt="Udruga Nada Rijeka"
              className="lp-nav-brand-logo"
              width={180}
              height={48}
              decoding="async"
            />
          </Link>

          <nav className="lp-nav-desktop">
            {NAV_ITEMS.map((item) =>
              item.kind === "route" ? (
                <Link
                  key={item.key}
                  to={item.to}
                  className={`lp-nav-pill ${
                    highlight === item.key ? "lp-nav-pill--active" : "lp-nav-pill--idle"
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goSection(item.id)}
                  className={`lp-nav-pill ${
                    highlight === item.id ? "lp-nav-pill--active" : "lp-nav-pill--idle"
                  }`}
                >
                  {item.label}
                </button>
              ),
            )}
          </nav>

          <button
            type="button"
            className="lg:hidden lp-menu-toggle"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-nav-panel"
        aria-hidden={!open}
        className={`lp-mobile-panel ${open ? "lp-mobile-panel--open lp-animate-fade-in" : ""}`}
      >
        <div className="lp-mobile-panel__glass" aria-hidden />
        <div className="lp-mobile-panel__content max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) =>
            item.kind === "route" ? (
              <Link
                key={item.key}
                to={item.to}
                className={`lp-mobile-nav-link ${
                  highlight === item.key ? "lp-mobile-nav-link--active" : "lp-mobile-nav-link--idle"
                }`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  goSection(item.id);
                  setOpen(false);
                }}
                className={`lp-mobile-nav-link ${
                  highlight === item.id ? "lp-mobile-nav-link--active" : "lp-mobile-nav-link--idle"
                }`}
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      </div>
    </>
  );
}
