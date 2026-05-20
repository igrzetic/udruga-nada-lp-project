import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Heart,
  Shield,
  Activity,
  Sparkles,
  Sun,
  Users,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Dumbbell,
  Footprints,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Award,
  HandHeart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LpHeader, LP_NAV_SECTION_IDS } from "@/components/lp-header";
import heroImg from "@/assets/hero-walking.avif";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pokret kao tvoj štit — Udruga Nada Rijeka" },
      {
        name: "description",
        content:
          "Tjelesna aktivnost kao zaštitni faktor protiv raka dojke. Edukativni vodič Udruge Nada Rijeka — toplo, podržavajuće, za sve.",
      },
      {
        property: "og:title",
        content: "Pokret kao tvoj štit — Udruga Nada Rijeka",
      },
      {
        property: "og:description",
        content:
          "Vježbe za prevenciju i vitalnost. Pridruži se zajednici Udruge Nada.",
      },
    ],
  }),
  component: Index,
});

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Index() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const location = useRouterState({ select: (s) => s.location });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    LP_NAV_SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const raw = location.hash;
    if (!raw) return;
    const id = raw.startsWith("#") ? raw.slice(1) : raw;
    if (!(LP_NAV_SECTION_IDS as readonly string[]).includes(id)) {
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() =>
      el.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }, [location.hash, location.pathname]);

  return (
    <div className="lp-page min-h-screen">
      <LpHeader
        open={open}
        setOpen={setOpen}
        sectionActiveId={active}
        onHomeSectionNavigate={(id) => scrollTo(id)}
      />

      {/* HERO */}
      <section id="home" className="gradient-hero">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="lp-animate-fade-up">
            <span className="lp-hero-badge">
              <Sparkles className="h-4 w-4" /> 30 godina uz tebe • Slavimo život 2026.
            </span>
            <h1 className="lp-hero-title">
              Pokret kao <span className="lp-hero-title-accent">tvoj štit</span>
            </h1>
            <p className="lp-hero-sub">
              Tjelesna aktivnost nije samo vježba — to je investicija u tvoju
              vitalnost i snagu. Udruga Nada je tu da te podrži u svakom koraku.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={() => scrollTo("getting-started")}
                className="group lp-btn-cta-primary"
              >
                Saznaj kako početi{" "}
                <ChevronRight className="lp-btn-cta-primary__icon" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("quiz")}
                className="lp-btn-cta-outline"
              >
                Pronađi svoj stil
              </Button>
            </div>
            <p className="lp-hero-quote">
              "Zajedno je lakše."
            </p>
          </div>
          <div className="relative lp-animate-fade-in">
            <div className="lp-hero-glow" aria-hidden />
            <img
              src={heroImg}
              alt="Žene zajedno hodaju u parku"
              width={1536}
              height={1024}
              className="lp-hero-img"
            />
          </div>
        </div>
      </section>

      <section id="about" className="lp-section lp-section--muted">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="lp-heading-2">
              Tu smo za Vas — zajedno je lakše
            </h2>
            <p className="lp-lead mt-6">
              {
                "Svaka žena koja kroči kroz naša vrata donosi svoju priču, svoje strahove i svoju snagu. U Udruzi žena operiranih dojki NADA–Rijeka dočekujemo je s razumijevanjem, toplinom i otvorenim srcem — jer znamo kako izgleda taj put i znamo da je lakši kada se ne hoda sama."
              }
            </p>
          </div>
        </div>
      </section>

      {/* WHY MOVEMENT */}
      <section id="why-movement" className="lp-section lp-section--tint-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl">
            <span className="lp-kicker">
              Zaštitni faktor
            </span>
            <h2 className="lp-heading-2">
              Zašto je kretanje važno?
            </h2>
            <p className="lp-lead">
              Jeste li znali da{" "}
              <strong className="lp-text-strong">više od 25% rizika</strong> od
              raka dojke ovisi o navikama koje sami biramo? To znači da svaki
              korak gradi nešto vrijedno — tvoju snagu, ravnotežu i zdrav
              hormonalni sklad.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Shield,
                title: "Manji rizik",
                text: "Redovito kretanje povezano je s do 20% nižim rizikom od raka dojke.",
              },
              {
                icon: Activity,
                title: "Hormonalna ravnoteža",
                text: "Aktivnost regulira estrogen i inzulin — ključne za zdravlje stanica.",
              },
              {
                icon: Sun,
                title: "Više energije",
                text: "Bolji san, raspoloženje i otpornost na stres već nakon par tjedana.",
              },
              {
                icon: Heart,
                title: "Snažno srce",
                text: "Aerobne vježbe jačaju srce i krvotok — temelj dugovječnosti.",
              },
              {
                icon: Dumbbell,
                title: "Čvrste kosti",
                text: "Vježbe snage čuvaju gustoću kostiju i mišićnu masu.",
              },
              {
                icon: Users,
                title: "Zajednica",
                text: "Kretanje u grupi gradi prijateljstva i daje strukturu tvom danu.",
              },
            ].map((c, i) => (
              <Card
                key={i}
                className="protective-factor-card lp-card-surface lp-card-pad border-transparent shadow-none"
              >
                <div className="lp-icon-tile">
                  <c.icon className="h-5 w-5" />
                </div>
                <h3 className="lp-card-title">{c.title}</h3>
                <p className="lp-card-body">{c.text}</p>
              </Card>
            ))}
          </div>

          <div className="lp-soft-banner gradient-soft">
            <p className="lp-soft-banner__text">
              Ne bježimo od bolesti —{" "}
              <span className="lp-soft-banner__accent">gradimo vitalnost.</span>
            </p>
          </div>
        </div>
      </section>

      {/* RECOMMENDATIONS */}
      <section id="recommendations" className="lp-section lp-section--muted">
        <div className="max-w-5xl mx-auto px-4">
          <div className="max-w-2xl">
            <span className="lp-kicker">
              Preporuke
            </span>
            <h2 className="lp-heading-2">
              Vježbe po tvom ritmu
            </h2>
            <p className="lp-lead">
              Nema univerzalnog recepta. Odaberi početnu točku koja ti najviše
              odgovara — uvijek se može nadograditi.
            </p>
          </div>

          <Tabs defaultValue="zaposleni" className="mt-10">
            <TabsList className="lp-tabs-list justify-center mx-auto md:mx-0 md:justify-start">
              <TabsTrigger value="zaposleni" className="lp-tabs-trigger">
                <Briefcase className="h-4 w-4 mr-2" />
                Zaposleni
              </TabsTrigger>
              <TabsTrigger value="pocetnici" className="lp-tabs-trigger">
                <Footprints className="h-4 w-4 mr-2" />
                Početnici
              </TabsTrigger>
              <TabsTrigger value="aktivni" className="lp-tabs-trigger">
                <Dumbbell className="h-4 w-4 mr-2" />
                Aktivni
              </TabsTrigger>
            </TabsList>

            {[
              {
                v: "zaposleni",
                title: "Za užurbane dane",
                items: [
                  "Kratke vježbe od 10 minuta — 2 do 3 puta dnevno.",
                  "Hodaj na posao ili izađi stanicu ranije iz autobusa.",
                  "Stretching uz radni stol svaka 2 sata.",
                  "Stepenice umjesto lifta — mali izbor, velik utjecaj.",
                ],
              },
              {
                v: "pocetnici",
                title: "Tek krećeš? Sjajno.",
                items: [
                  "Lagane šetnje 20–30 min, 5 dana u tjednu.",
                  "Nordijsko hodanje — pridruži se programu Udruge Nada.",
                  "Vježbe disanja i lagano istezanje uz YouTube.",
                  "Slušaj tijelo — odmor je dio plana.",
                ],
              },
              {
                v: "aktivni",
                title: "Već si u pokretu",
                items: [
                  "150 min umjerene ili 75 min intenzivne aerobne aktivnosti tjedno.",
                  "Vježbe snage 2 puta tjedno — sve glavne mišićne grupe.",
                  "Kombiniraj kardio, snagu i fleksibilnost.",
                  "Ne zaboravi regeneraciju i kvalitetan san.",
                ],
              },
            ].map((t) => (
              <TabsContent key={t.v} value={t.v} className="mt-6">
                <Card className="lp-recommend-card">
                  <h3 className="lp-recommend-card__title">{t.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {t.items.map((it, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <CheckCircle2 className="lp-check-icon" />
                        <span className="lp-list-check">{it}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          <div className="lp-tip-strip">
            <Footprints className="lp-tip-strip__icon" />
            <p className="lp-tip-strip__text">
              <strong className="font-semibold">Zlatno pravilo:</strong> uvedi barem 30 minuta šetnje
              dnevno.
            </p>
          </div>
        </div>
      </section>

      {/* GETTING STARTED */}
      <section id="getting-started" className="lp-section lp-section--tint-b">
        <div className="max-w-5xl mx-auto px-4">
          <div className="max-w-2xl">
            <span className="lp-kicker">
              Praktični savjeti
            </span>
            <h2 className="lp-heading-2">
              Kako početi — bez pritiska
            </h2>
            <p className="lp-lead">
              Tvoj štit, tvoj izbor. Krećemo malo, dosljedno i s puno blagosti
              prema sebi.
            </p>
          </div>

          <ol className="mt-12 grid list-none grid-cols-1 gap-5 p-0 md:grid-cols-2">
            {[
              {
                t: "Postavi mali cilj",
                d: "Npr. 10 minuta hoda nakon ručka. Ostvarivo svakog dana.",
              },
              {
                t: "Pripremi tenisice",
                d: "Stavi ih kraj vrata. Manje prepreka — više pokreta.",
              },
              {
                t: "Pronađi društvo",
                d: "Šetnja s prijateljicom, susjedom ili u grupi Udruge Nada.",
              },
              {
                t: "Slavi male pobjede",
                d: "Bilježi dane aktivnosti. Svaki korak se broji.",
              },
              {
                t: "Slušaj svoje tijelo",
                d: "Umor i bol nisu znak slabosti — već poruka da prilagodiš.",
              },
              {
                t: "Budi strpljiva sa sobom",
                d: "Promjene dolaze tjednima. Konzistentnost > intenzitet.",
              },
            ].map((s, i) => (
              <li key={i} className="lp-step-card">
                <div className="flex items-center gap-3">
                  <span className="lp-step-num">
                    {i + 1}
                  </span>
                  <h3 className="lp-step-title">{s.t}</h3>
                </div>
                <p className="lp-step-desc">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* QUIZ */}
      <section id="quiz" className="lp-section gradient-soft">
        <div className="max-w-3xl mx-auto px-4">
          <div className="lp-quiz-center max-w-2xl mx-auto">
            <span className="lp-kicker">
              Interaktivno
            </span>
            <h2 className="lp-heading-2">
              Pronađi svoju idealnu aktivnost
            </h2>
            <p className="lp-lead">
              Kratki kviz, topla preporuka. Bez prosuđivanja, bez pritiska.
            </p>
          </div>
          <div className="mt-10">
            <Quiz />
          </div>
        </div>
      </section>

      {/* INKLUZIVNOST */}
      <section className="lp-band-tight">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="lp-inclusivity-card flex flex-col md:flex-row gap-5 items-start">
            <div className="lp-inclusivity-icon">
              <HandHeart className="h-6 w-6" />
            </div>
            <div>
              <h3 className="lp-inclusivity-title">
                I muškarci su dobrodošli
              </h3>
              <p className="lp-inclusivity-body">
                Oko{" "}
                <strong className="lp-text-strong">
                  1% dijagnoza raka dojke
                </strong>{" "}
                javlja se kod muškaraca. Naša zajednica je otvorena svima —
                partnerima, sinovima, prijateljima i muškarcima koji se
                suočavaju s dijagnozom. Zajedno smo jači.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* RESURSI */}
      <section id="resources" className="lp-section lp-section--muted">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-2xl">
            <span className="lp-kicker">
              Resursi & Kontakt
            </span>
            <h2 className="lp-heading-2">
              Tu smo za tebe
            </h2>
            <p className="lp-lead">
              Više od 30 godina uz žene i obitelji.{" "}
              <span className="lp-text-accent">
                Slavimo život 2026.
              </span>
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <Card className="lp-resource-card">
              <div className="lp-resource-head-primary">
                <Award className="h-5 w-5" />
                <span>Udruga Nada Rijeka</span>
              </div>
              <ul className="mt-5 space-y-4">
                <li className="flex gap-3 items-start">
                  <MapPin className="lp-resource-meta-icon" />
                  <span>Milana Smokvine Tvrdog 5/1, Rijeka</span>
                </li>
                <li className="flex gap-3 items-start">
                  <Phone className="lp-resource-meta-icon" />
                  <a href="tel:051371062" className="lp-resource-tel">
                    051 / 371-062
                  </a>
                </li>
              </ul>
            </Card>

            <Card className="lp-resource-card">
              <div className="lp-resource-head-secondary">
                <ExternalLink className="h-5 w-5" />
                <span>Korisne poveznice</span>
              </div>
              <ul className="mt-5 space-y-3">
                {[
                  {
                    name: "Svjetska zdravstvena organizacija (WHO)",
                    url: "https://www.who.int/health-topics/breast-cancer",
                  },
                  { name: "HZZO", url: "https://hzzo.hr/" },
                  { name: "KBC Rijeka", url: "https://www.kbc-rijeka.hr/" },
                ].map((l) => (
                  <li key={l.url}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lp-resource-link"
                    >
                      <span>{l.name}</span>
                      <ExternalLink className="lp-resource-link__ext" />
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Alert className="lp-alert-foot !w-fit">
            <AlertCircle />
            <AlertTitle className="lp-alert-foot__title">Važno</AlertTitle>
            <AlertDescription className="lp-alert-foot__desc">
              Ovi savjeti su edukativne prirode. Prije početka novog režima
              vježbanja, obavezno se konzultirajte sa svojim liječnikom.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between lp-footer__inner">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 lp-footer__heart" fill="currentColor" />
            <span>
              © {new Date().getFullYear()} Udruga Nada Rijeka — Slavimo život.
            </span>
          </div>
          <span className="lp-footer__tagline">Tvoj štit, tvoj izbor.</span>
        </div>
      </footer>
    </div>
  );
}

/* ---- QUIZ ---- */
type Answer = "low" | "mid" | "high";
const questions: { q: string; opts: { label: string; v: Answer }[] }[] = [
  {
    q: "Koliko energije danas osjećaš?",
    opts: [
      { label: "Jako malo, umorna sam", v: "low" },
      { label: "Umjereno, mogu nešto lagano", v: "mid" },
      { label: "Puno — spremna za izazov", v: "high" },
    ],
  },
  {
    q: "Koliko vremena dnevno možeš odvojiti?",
    opts: [
      { label: "10–15 minuta", v: "low" },
      { label: "20–40 minuta", v: "mid" },
      { label: "45+ minuta", v: "high" },
    ],
  },
  {
    q: "Voliš li biti vani u prirodi?",
    opts: [
      { label: "Najradije bih kod kuće", v: "low" },
      { label: "Da, šetnja parkom je super", v: "mid" },
      { label: "Obožavam — što više to bolje", v: "high" },
    ],
  },
];

const results: Record<
  Answer,
  { title: string; text: string; icon: typeof Heart }
> = {
  low: {
    title: "Nježan početak",
    text: "Preporučamo lagane vježbe disanja i istezanja 10 minuta dnevno, uz kratku šetnju oko zgrade. Slušaj svoje tijelo — svaki pokret se broji.",
    icon: Sun,
  },
  mid: {
    title: "Nordijsko hodanje s Nadom",
    text: "Pridruži se grupi za nordijsko hodanje Udruge Nada — idealno za tebe. Druženje, svjež zrak i pokret za cijelo tijelo.",
    icon: Footprints,
  },
  high: {
    title: "Aktivni mix",
    text: "Kombinacija aerobne aktivnosti (brzo hodanje, plivanje, bicikl) 3x tjedno i vježbi snage 2x tjedno — savršen ritam za tvoju energiju.",
    icon: Dumbbell,
  },
};

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  if (step >= questions.length) {
    const score = answers.reduce(
      (s, a) => s + (a === "low" ? 0 : a === "mid" ? 1 : 2),
      0,
    );
    const key: Answer = score <= 2 ? "low" : score <= 4 ? "mid" : "high";
    const r = results[key];
    const Icon = r.icon;
    return (
      <Card className="lp-quiz-result-card lp-animate-fade-up">
        <div className="lp-quiz-result-icon">
          <Icon className="h-8 w-8" />
        </div>
        <h3 className="lp-quiz-result-title">{r.title}</h3>
        <p className="lp-quiz-result-body">{r.text}</p>
        <p className="lp-quiz-result-tagline">
          "Zajedno je lakše." 💚
        </p>
        <Button
          onClick={() => {
            setStep(0);
            setAnswers([]);
          }}
          variant="outline"
          className="lp-quiz-btn-repeat"
        >
          Ponovi kviz
        </Button>
      </Card>
    );
  }

  const q = questions[step];
  return (
    <Card className="lp-quiz-card lp-animate-fade-in">
      <div className="flex items-center justify-between lp-quiz-meta">
        <span>
          Pitanje {step + 1} / {questions.length}
        </span>
        <div className="lp-quiz-dots">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`lp-quiz-dot ${i <= step ? "lp-quiz-dot--active" : ""}`}
            />
          ))}
        </div>
      </div>
      <h3 className="lp-quiz-question">{q.q}</h3>
      <div className="mt-6 grid gap-3">
        {q.opts.map((o) => (
          <button
            key={o.v}
            onClick={() => {
              setAnswers([...answers, o.v]);
              setStep(step + 1);
            }}
            className="lp-quiz-option group"
          >
            <span className="lp-quiz-option__label">{o.label}</span>
            <div className="lp-quiz-option__chev-wrap">
              <ChevronRight className="lp-quiz-option__chev" />
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
}