# Udruga Nada — landing stranica

Jednostranična edukativna stranica za kampanju **„Pokret kao tvoj štit“** (Udruga Nada, Rijeka): hero, zaštitni faktori, preporuke po profilu, koraci za početak, interaktivni kviz, resursi i kontakt.

## Tehnologije

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/)
- [TanStack Start](https://tanstack.com/start) / [TanStack Router](https://tanstack.com/router) (file-based rute)
- [Vite](https://vitejs.dev/) 7
- [Tailwind CSS](https://tailwindcss.com/) 4 (`@tailwindcss/vite`)
- [Radix UI](https://www.radix-ui.com/) (Tabs, Slot)
- [Lucide](https://lucide.dev/) ikone
- Produkcijski build cilja [Cloudflare Workers](https://developers.cloudflare.com/workers/) (`@cloudflare/vite-plugin`, `wrangler.jsonc`)

## Preduvjeti

- [Node.js](https://nodejs.org/) (preporuka: LTS, npr. 22.x)
- npm (dolazi s Nodeom)

## Pokretanje

```bash
npm install
npm run dev
```

Aplikacija se u razvoju obično otvara na `http://localhost:5173` (Vite).

## Skripte

| Naredba        | Opis                          |
| -------------- | ----------------------------- |
| `npm run dev`  | Razvojni poslužitelj (Vite)   |
| `npm run build`| Produkcijski build (client + SSR / Worker) |
| `npm run preview` | Lokalni pregled builda     |
| `npm run lint` | ESLint                        |
| `npm run format` | Prettier (`--write .`)     |

## Struktura (sažeto)

- `src/routes/` — rute; početna je `index.tsx`
- `src/routes/__root.tsx` — root layout (HTML shell, globalni stilovi)
- `src/components/ui/` — shadcn-style UI (Button, Card, Tabs, …)
- `src/styles.css` — dizajn sustava (`:root` / `.dark`), landing (`lp-*`), scrollbar overlay
- `src/lib/` — pomoćne funkcije (npr. `scrollbar-overlay.ts`, `utils.ts`)

## Deploy (Cloudflare)

Nakon `npm run build` artefakti su u `dist/`. Za Workers koristi [Wrangler](https://developers.cloudflare.com/workers/wrangler/) prema postavkama u `wrangler.jsonc` (ime projekta, `compatibility_date`, itd.).

## Licenca / vlasništvo

Sadržaj i vizual identitet vezani uz **Udrugu Nada**; kod je vlasništvo autora repozitorija, osim otvorenih ovisnosti navedenih u `package.json`.

## Repozitorij

- <https://github.com/igrzetic/udruga-nada-lp-project>
