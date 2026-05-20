import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { LpHeader } from "@/components/lp-header";
import nadaLogo from "@/assets/nada-logo-30.avif";
import inkaPortrait from "@/assets/dr-Inka-Miskulin.avif";
import katicaPortrait from "@/assets/katica_vukas.avif";

const WHAT_WE_DO_ITEMS: { title: string; body: string }[] = [
  {
    title: "Psihosocijalna pomoć i podrška",
    body: "individualni razgovori i grupni susreti u kojima se dijele iskustva, strahovi i uspjesi na putu oporavka.",
  },
  {
    title: "Psihoedukacija",
    body: "radionice i predavanja koja pomažu ženama razumjeti bolest, liječenje i vlastite emocije te pronaći snagu za svakodnevni život.",
  },
  {
    title: "Fizikalna terapija",
    body: "program „Vježbam s Nadom” nudi postoperativne vježbe važne za sprečavanje limfedema i oporavak pokretljivosti.",
  },
  {
    title: "Limfna drenaža",
    body: "manualna limfna drenaža koju provode naši terapeuti, namijenjena ženama s limfedemom nakon operacije dojke.",
  },
  {
    title: "Nordijsko hodanje",
    body: "redovite grupne šetnje koje kombiniraju tjelovježbu, opuštanje i zajedništvo u prirodi.",
  },
  {
    title: "Ruke nade",
    body: "program međusobne podrške koji spaja žene koje su prošle kroz liječenje s onima koje se tek suočavaju s dijagnozom, jer iskustvo preživjele je najsnažnija poruka nade.",
  },
  {
    title: "Prevencija i rano otkrivanje",
    body: "edukacijske radionice, predavanja i javne akcije (Dan narcisa, Dan ružičaste vrpce) kojima motiviramo žene na samopreglede i redovite mamografske preglede.",
  },
  {
    title: "Humanitarni rad",
    body: "donacije medicinske opreme KBC-u Rijeka i suradnim ustanovama, kreativne radionice i akcije solidarnosti.",
  },
];

const PSYCHOLOGY_FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Je li normalno osjećati strah i tugu nakon dijagnoze?",
    a: "Da. Strah, tuga, ljutnja i zbunjenost normalne su reakcije. Emocije se mogu mijenjati iz dana u dan — i sve su one valjane.",
  },
  {
    q: "Trebam li psihološku pomoć tijekom liječenja?",
    a: "Psihološka pomoć može biti vrlo korisna. Razgovor sa stručnjakom ili ženama koje su prošle slično iskustvo može značajno olakšati suočavanje s bolešću.",
  },
  {
    q: "Kako razgovarati s djecom o dijagnozi?",
    a: "Djeci je važno pružiti iskrene, ali dobno prilagođene informacije. Objašnjenje da se liječite i da nisu kriva za bolest smanjuje njihov strah i daje im osjećaj sigurnosti.",
  },
  {
    q: "Kako obitelj može pomoći?",
    a: "Praktično — preuzimanjem kućanskih obaveza i brigom o djeci. Emocionalno — slušanjem i podrškom bez pritiska i savjeta koji nisu traženi.",
  },
  {
    q: "Je li rak dojke izlječiv?",
    a: "Rak dojke danas se u velikom broju slučajeva uspješno liječi, osobito uz rano otkrivanje i suvremene terapije.",
  },
];

const TEAM_MEMBER_LINES: string[] = [
  "Stanislava Laginja, dr. med., spec. dermatovenerologije",
  "Emina Grgurević Dujmić, dr.med., spec. radiologije",
  "Sanja Hajdinjak, psihoterapeut — s osobnim iskustvom liječenja od raka dojke",
  "Sandra Anđelić, psiholog-psihoterapeut",
  "Maja Maržić, bacc. physio., fizioterapeut",
  "Katarina Zoretić Kanjir, fizioterapeut",
  "Dr. sc. Nina Bašić Marković, dr. med., spec. obiteljske medicine i seksualni terapeut",
  "Prof. dr. sc. Vera Vlahović Palčevski, dr. med., spec. kliničke farmakologije",
];

/**
 * Bubble centres as % of the field (`translate(-50%, -50%)` on the `<li>`).
 * One larger “anchor” circle (index 3) with smaller satellites — organic scatter, no overlap at ≥360px wide fields.
 */
const TEAM_BUBBLE_LAYOUT: { cx: string; cy: string; size: string }[] = [
  { cx: "14%", cy: "14%", size: "min(7.5rem, 36vw)" },
  { cx: "88%", cy: "17%", size: "min(7.35rem, 35vw)" },
  { cx: "10%", cy: "42%", size: "min(8.125rem, 38vw)" },
  { cx: "50%", cy: "48%", size: "min(11.75rem, 52vw)" },
  { cx: "17%", cy: "74%", size: "min(7.125rem, 34vw)" },
  { cx: "85%", cy: "70%", size: "min(7.4rem, 35vw)" },
  { cx: "31%", cy: "26%", size: "min(8.25rem, 39vw)" },
  { cx: "65%", cy: "76%", size: "min(8.75rem, 40vw)" },
];

/** Wider vertical spread + smaller circles — no overlap on narrow viewports. */
const TEAM_BUBBLE_LAYOUT_MOBILE: { cx: string; cy: string; size: string }[] = [
  { cx: "20%", cy: "6%", size: "4.85rem" },
  { cx: "80%", cy: "7%", size: "4.75rem" },
  { cx: "22%", cy: "21%", size: "5.05rem" },
  { cx: "52%", cy: "30%", size: "5.85rem" },
  { cx: "24%", cy: "44%", size: "4.8rem" },
  { cx: "78%", cy: "42%", size: "4.9rem" },
  { cx: "50%", cy: "13%", size: "4.95rem" },
  { cx: "72%", cy: "58%", size: "5.1rem" },
];

/** Seconds — shuffled per member index so bubbles do not pop in 0…7 order (stable SSR). */
const TEAM_BUBBLE_ENTRANCE_DELAY_S: readonly string[] = [
  "0.34s",
  "0.07s",
  "0.5s",
  "0.15s",
  "0.58s",
  "0.41s",
  "0s",
  "0.26s",
];

function teamMemberShortLabel(fullLine: string): string {
  const i = fullLine.indexOf(",");
  return (i === -1 ? fullLine : fullLine.slice(0, i)).trim();
}

function teamMemberCredentialLabel(fullLine: string): string {
  const i = fullLine.indexOf(",");
  return (i === -1 ? "" : fullLine.slice(i + 1)).trim();
}

export const Route = createFileRoute("/o-nama")({
  head: () => ({
    meta: [
      { title: "O nama — Udruga Nada Rijeka" },
      {
        name: "description",
        content:
          "Udruga žena operiranih dojki NADA Rijeka — nada, snaga i solidarnost za žene oboljele i liječene od raka dojke.",
      },
      { property: "og:title", content: "O nama — Udruga Nada Rijeka" },
      {
        property: "og:description",
        content:
          "Trideset godina podrške, edukacije i zajednice u službi žena i Primorsko-goranske županije.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const [open, setOpen] = useState(false);
  const [leadershipSectionRevealed, setLeadershipSectionRevealed] = useState(false);
  const [teamBubblesRevealed, setTeamBubblesRevealed] = useState(false);
  const leadershipSectionRef = useRef<HTMLElement>(null);
  const teamSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = leadershipSectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLeadershipSectionRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = teamSectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTeamBubblesRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="lp-page min-h-screen">
      <LpHeader open={open} setOpen={setOpen} sectionActiveId="" />

      <main>
        <h1 className="sr-only">O nama — Udruga Nada Rijeka</h1>
        <section className="lp-section lp-section--muted" aria-labelledby="about-intro-heading">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-center mb-14">
                <img
                  src={nadaLogo}
                  alt="Udruga Nada Rijeka — logo"
                  className="lp-about-hero-logo lp-about-logo-reveal"
                  width={320}
                  height={120}
                  decoding="async"
                />
              </div>
              <div className="lp-about-body-reveal">
                <h2 id="about-intro-heading" className="lp-heading-2 lp-about-section-title">
                  O nama
                </h2>
                <div className="mt-0 space-y-6">
                  <p className="lp-lead !mt-0">
                    {
                      "Udruga žena operiranih dojki NADA Rijeka mjesto je nade, snage i solidarnosti. Osnažujemo žene oboljele i liječene od raka dojke, educiramo javnost o prevenciji i ranom otkrivanju bolesti te gradimo zajednicu u kojoj nijedna žena ne prolazi ovim putem sama."
                    }
                  </p>
                  <p className="lp-lead !mt-0">
                    {
                      "Udrugu su 10. lipnja 1996. godine osnovale Nadia Blašković-Morankić, ujedno i njezina prva predsjednica, i Elda Zamlić, tajnica. Radu Udruge volonterski se odmah pridružio neuropsihijatar dr. Gino di Leonardi-Zamlić koji je pokrenuo grupu za psihološku pomoć. Od prvih dana, NADA je bila više od udruge — bila je obitelj."
                    }
                  </p>
                  <p className="lp-lead !mt-0">
                    {
                      "Kroz gotovo tri desetljeća, Udruga je prerasla u referentnu točku podrške za žene diljem Primorsko-goranske županije. Realizirane su vrijedne donacije za KBC Rijeka: fotelje za kemoterapiju, madraci, bolesnički kreveti, televizori i brojna druga medicinska oprema — sve prikupljeno snagom zajednice i humanitarnih akcija."
                    }
                  </p>
                  <p className="lp-lead !mt-0">{`Godine 2026. NADA Rijeka obilježava iznimnu obljetnicu — 30 godina neprekidnog djelovanja u službi žena i zajednice. Moto obljetnice je „Slavimo život" — jer trideset godina NADE nije samo povijest jedne udruge, već povijest stotina žena koje su se suočile s bolešću i izabrale borbu, ozdravljenje i novi početak.`}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={leadershipSectionRef}
          className={`lp-section lp-section--tint-b lp-leadership-scroll-reveal ${leadershipSectionRevealed ? "lp-leadership-scroll-reveal--active" : ""}`}
          aria-labelledby="leadership-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="lp-leadership-heading-block">
                <h2
                  id="leadership-heading"
                  className="lp-heading-2 lp-about-section-title lp-leadership-reveal-heading"
                >
                  Vodstvo
                </h2>
                <div className="flex w-full justify-start">
                  <img
                    src={inkaPortrait}
                    alt="dr. sc. Inka Miškulin, predsjednica Udruge Nada Rijeka"
                    className="lp-leadership-portrait lp-leadership-reveal-img"
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div className="space-y-6 lp-leadership-reveal-copy">
                <p className="lp-lead !mt-0">
                  {
                    "Na čelu Udruge nalazi se predsjednica dr. sc. Inka Miškulin, psihologinja i psihoterapeutkinja, koja u NADU unosi stručnost u području psihološke podrške i snažnu osobnu predanost ženama oboljelim od raka dojke."
                  }
                </p>
                <div className="flex w-full justify-start">
                  <img
                    src={katicaPortrait}
                    alt="Katica Vukas, potpredsjednica Udruge Nada Rijeka"
                    className="lp-leadership-photo-landscape"
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="lp-lead !mt-0">
                  {
                    "Potpredsjednica je Katica Vukas, dugogodišnja članica i nezaobilazni oslonac zajednice, čija predanost i toplina svakodnevno oblikuju duh NADE."
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="what-we-do"
          className="lp-section lp-section--muted"
          aria-labelledby="what-we-do-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 id="what-we-do-heading" className="lp-heading-2 lp-about-section-title">
                Što radimo
              </h2>
              <p className="lp-lead !mt-0">
                {
                  "NADA Rijeka djeluje na više razina — od neposredne podrške ženama u bolnici do edukacije javnosti. Svi programi dostupni su besplatno."
                }
              </p>
              <ul className="mt-8 list-none space-y-5 p-0">
                {WHAT_WE_DO_ITEMS.map((item) => (
                  <li key={item.title}>
                    <p className="lp-lead !mt-0">
                      <strong className="lp-text-strong">{item.title}</strong>
                      {" — "}
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="newly-diagnosed-support"
          className="lp-section lp-section--tint-b"
          aria-labelledby="newly-diagnosed-support-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2
                id="newly-diagnosed-support-heading"
                className="lp-heading-2 lp-about-section-title"
              >
                Podrška novooboljelima
              </h2>
              <div className="mt-0 space-y-6">
                <p className="lp-lead !mt-0">
                  {`Primiti dijagnozu raka dojke jedan je od najtežih trenutaka u životu žene. U Udruzi NADA–Rijeka dočekat ćemo vas upravo onakve kakve jeste — prestrašene, zbunjene, pune pitanja ili jednostavno u potrebi da netko sjedne uz vas i kaže: „Razumijem, jer sam to prošla."`}
                </p>
                <p className="lp-lead !mt-0">
                  {
                    "Naš stručni tim i naše članice tu su za vas od prvog dana. Besplatno psihološko savjetovanje dostupno je svim novooboljelim ženama, a svaki razgovor ostaje strogo povjerljiv. Ne trebate čekati ni znati što točno trebate. Dovoljno je nazvati."
                  }
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="psychology-faq"
          className="lp-section lp-section--muted"
          aria-labelledby="psychology-faq-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 id="psychology-faq-heading" className="lp-heading-2 lp-about-section-title">
                Psihološka pomoć — često postavljana pitanja
              </h2>
              <ul className="mt-8 list-none space-y-6 p-0">
                {PSYCHOLOGY_FAQ_ITEMS.map((item) => (
                  <li key={item.q}>
                    <p className="lp-lead !mt-0">
                      <strong className="lp-text-strong">{item.q}</strong> {item.a}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="team"
          ref={teamSectionRef}
          className="lp-section lp-section--tint-b"
          aria-labelledby="team-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2 id="team-heading" className="max-w-2xl mx-auto lp-heading-2 lp-about-section-title">
              Stručni tim
            </h2>
            <div className="mt-10 max-w-5xl mx-auto w-full">
              <ul
                className={`lp-team-bubble-field list-none p-0 m-0${teamBubblesRevealed ? " lp-team-bubble-field--revealed" : ""}`}
                aria-label="Stručni tim — članovi"
              >
                {TEAM_MEMBER_LINES.map((fullLine, index) => {
                  const pos = TEAM_BUBBLE_LAYOUT[index] ?? TEAM_BUBBLE_LAYOUT[0];
                  const posMobile = TEAM_BUBBLE_LAYOUT_MOBILE[index] ?? TEAM_BUBBLE_LAYOUT_MOBILE[0];
                  const enterDelay = TEAM_BUBBLE_ENTRANCE_DELAY_S[index] ?? "0s";
                  const credentials = teamMemberCredentialLabel(fullLine);
                  return (
                    <li
                      key={fullLine}
                      className="lp-team-bubble"
                      style={
                        {
                          "--bubble-cx": pos.cx,
                          "--bubble-cy": pos.cy,
                          "--bubble-size": pos.size,
                          "--bubble-cx-m": posMobile.cx,
                          "--bubble-cy-m": posMobile.cy,
                          "--bubble-size-m": posMobile.size,
                          "--team-bubble-enter-delay": enterDelay,
                        } as CSSProperties
                      }
                      tabIndex={teamBubblesRevealed ? 0 : -1}
                      aria-label={fullLine}
                    >
                      <div className="lp-team-bubble__flip">
                        <div className="lp-team-bubble__face lp-team-bubble__face--front">
                          <span className="lp-team-bubble__name">
                            {teamMemberShortLabel(fullLine)}
                          </span>
                        </div>
                        <div className="lp-team-bubble__face lp-team-bubble__face--back">
                          <span className="lp-team-bubble__title">
                            {credentials || fullLine}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="partnerships"
          className="lp-section lp-section--muted"
          aria-labelledby="partnerships-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 id="partnerships-heading" className="lp-heading-2 lp-about-section-title">
                Suradnja i partnerstva
              </h2>
              <p className="lp-lead !mt-0">
                {
                  "NADA Rijeka ostvaruje blisku suradnju s KBC Rijeka (Odjel kirurgije i Klinika za tumore), Nastavnim zavodom za javno zdravstvo Primorsko-goranske županije, Gradom Rijekom i Primorsko-goranskom županijom te nizom organizacija civilnog društva. Udruga je korisnica institucionalne podrške Nacionalne zaklade za razvoj civilnoga društva."
                }
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
