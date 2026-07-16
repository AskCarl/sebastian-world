# Sebastian's World

An interactive learning world built for Sebastian (age 7). What started as a single-page daily companion app is now a whole multi-page world — each zone has its own page, and Bash Bucks earned anywhere show up everywhere.

## The Zones

**🏠 Home Base** (`/`)
The hub. Daily joke & riddle guessing (+$2 each), daily inspiration quote, English/Spanish Word of the Day, live weather for Palos Verdes, the Bash Bucks piggy bank, day-streak counter, and big colorful doors into every zone. (Parents: tap "Dad + Carl" in the footer 5 times for the admin panel.)

**🧮 Math Zone** (`/math`)
Three levels — Explorer 🥾, Adventurer ⚔️, Master 🧙 (division & big numbers) — plus a 60-second ⚡ Lightning Round with a saved best score. 10 correct = $1; Lightning pays $1 per 3 correct.

**🤖 Coding Lab** (`/coding`)
Program Robo! Build real programs from Move/Turn commands to steer a robot through 5 grid puzzles to the diamond — walls, crashes, and all. First clear of each level = $3. Plus Type Quest, the typing game with Cadet/Hero/Legend tiers.

**✍️ Writing Studio** (`/writing`)
Sentence Unscramble (rebuild mixed-up sentences, 3 = $1), the Silly Sentence Machine, Story Time with daily writing prompts (a 20+ word story = $2 once a day), and the daily journal with history.

**📚 Reading Room** (`/reading`)
Nine original stories across three difficulty levels (⭐ to ⭐⭐⭐) with comprehension questions. A perfect score pays $2–$4 depending on difficulty.

**🔬 Science Station** (`/science`)
Mind-blowing fact of the day, science quizzes (Animals, Space, Human Body, Earth & Weather), and Guess the Animal — fewer clues used, more bucks earned.

**🎮 Playroom** (`/playroom`)
The virtual pet (feed/play/groom/sleep, levels & XP), drawing pad with templates and stickers, memory match, the family photo album, and the calendar with reminders.

## For Sebastian 👋

Want to add your own stuff? Look for the ✏️ SEBASTIAN comments in these files:

- `lib/dailyData.ts` — add jokes and riddles
- `lib/typingData.ts` — add typing words
- `lib/writingData.ts` — add silly words, sentences, and story ideas
- `lib/readingData.ts` — write your own story with questions!
- `lib/scienceData.ts` — add facts, quiz questions, and animal riddles
- `app/coding/page.tsx` — design your own Robo level (move the 💎, add 🪨 walls)

Change the words, save the file, and your website updates. That's real coding!

## Tech Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- LocalStorage for persistence (no backend needed) — shared Bash Bucks live in `lib/useBashBucks.ts`, the nav bar in `components/Nav.tsx`
- [wttr.in](https://wttr.in) for weather

## Run It

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Built With

Built by a dad who wanted to make something his kid would actually use every day. Vibe-coded with AI.
