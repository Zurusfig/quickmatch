# QuickMatcH

A fast-paced emoji matching game. Two cards show up on screen, each one covered in scattered,
rotated emojis. Exactly one symbol is on both cards. Find it and click it before the clock runs
out.

Play it here: https://quickmatch-khaki.vercel.app/

## How it plays

Every round deals two circular cards with 8 symbols each, and exactly one symbol appears on
both. Clicking the shared symbol scores +1 and deals a new pair. Clicking a wrong one costs a
point (the score never drops below 0) and shakes the score display. You get 60 seconds per run.

Your best run is kept in `sessionStorage`. If you sign in with Discord, it also gets saved to
the global leaderboard.

## What's in it

* Cards are generated procedurally. Symbols come from a pool of 144 emojis and are placed by a
  rejection sampler that keeps any two from overlapping, at random sizes and rotations.
* Discord login through NextAuth, with a MongoDB adapter behind it.
* A leaderboard with the top 5 by high score and the top 5 by games played.
* A fire particle background (tsParticles) on the landing and leaderboard screens.

## Tech stack

| | |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) with React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | NextAuth v4, Discord provider, JWT sessions, MongoDB adapter |
| Database | MongoDB via Mongoose |
| Effects | tsParticles (fire preset), lucide-react, react-loading-icons |
| Hosting | Vercel, with Speed Insights |

## Running it locally

You'll need Node.js 18 or newer and a MongoDB database. Atlas works fine.

```bash
git clone https://github.com/Zurusfig/quickmatch.git
cd quickmatch
npm install
```

Create a `.env.local` in the project root:

```bash
MONGODB_URI=mongodb+srv://...          # MongoDB connection string
NEXTAUTH_SECRET=...                    # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000     # your site URL
DISCORD_CLIENT_ID=...                  # from the Discord Developer Portal
DISCORD_CLIENT_SECRET=...
```

For the Discord login, create an application at
[discord.com/developers](https://discord.com/developers/applications) and add
`http://localhost:3000/api/auth/callback/discord` as a redirect URI.

Then:

```bash
npm run dev      # dev server on http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

Note that `src/lib/mongodb.ts` throws at import time if `MONGODB_URI` is missing, so the app
won't start without it.

## Project structure

```
src/
├── app/
│   ├── page.tsx              # game loop: phase state, timer, scoring
│   ├── layout.tsx            # root layout, fonts, AuthProvider
│   ├── leaderboard/page.tsx  # top scores and most played boards
│   └── api/
│       ├── auth/[...nextauth]/  # NextAuth route handler
│       ├── score/               # GET own stats, POST a finished run
│       ├── topplayers/          # GET top 5 by high score
│       └── mostplayed/          # GET top 5 by games played
├── components/               # Landing, HUD, Card, GameOver, NavBar, Particles
├── logic/
│   ├── generate.ts           # symbol pool and card pair generation
│   └── positionGenerator.ts  # non-overlapping placement
├── models/UserStats.ts       # Mongoose schema
└── lib/mongodb.ts            # cached MongoClient promise
```

### How a card pair gets built

`generateCardPair(pool, size)` picks one shared symbol, then fills each card with `size - 1`
extras drawn from disjoint subsets of the pool, so the two cards can only ever intersect in
that one symbol.

Each card is then laid out by `generateNonOverlappingPositions`, which samples uniform points
in a disc and rejects any that collide with an emoji already placed. After 100 failed attempts
it shrinks the base size by 10 percent and tries again, so a card always fills.

## API

| Route | Method | What it does |
|---|---|---|
| `/api/score` | `GET` | Returns the signed-in user's `highScore` and `totalGames`, or zeros when signed out |
| `/api/score` | `POST` | Takes `{ score }`. Upserts the user, raises the high score, increments games played. Returns 401 when signed out |
| `/api/topplayers` | `GET` | Top 5 users by high score |
| `/api/mostplayed` | `GET` | Top 5 users by games played |

## Author

Created by Zagif ([@Zurusfig](https://github.com/Zurusfig)).
