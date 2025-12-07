# Study OS

A focused study companion that combines planning, a Pomodoro-inspired focus timer, and lightweight spaced repetition into a single screen. The app persists your data locally so you can build momentum over time.

## Features

- 🗂️ **Study planner** – capture tasks with due dates, estimated effort, and resources, then drag them through Upcoming → In progress → Completed states.
- ⏱️ **Guided focus timer** – configurable Pomodoro blocks that automatically log completed focus sessions with your energy check-in.
- 🧠 **Flashcard drills** – prioritizes cards with the lowest confidence and lets you record new prompts on the fly.
- 🧾 **Progress overview** – weekly focus minutes, completion rate, and an "urgent next" list so you always know what matters.
- 🧰 **Resource playbook** – recent session log plus curated study habits and links for easy reference.

## Getting started

```bash
npm install
npm run dev
```

The dev server prints the URL (default `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

Run component and state tests:

```bash
npm test
```

## Project structure

```
src/
  components/        # UI building blocks (planner, timer, flashcards, etc.)
  context/           # StudyProvider state container + reducer
  data/              # Default seed data
  hooks/             # Local storage + Pomodoro logic
  types/             # Shared domain types
  utils/             # Date + id helpers
```

Key patterns:

- **Single source of truth** – `StudyProvider` wraps the app and exposes actions (`addTask`, `logSession`, `addFlashcard`, …) with a reducer so state stays predictable.
- **Local persistence** – state and timer settings sync to `localStorage`, so refreshing the page does not wipe progress.
- **Derived insights** – memoized stats (completion rate, minutes this week, urgent tasks) keep expensive calculations out of render paths.
- **Accessible forms** – labeled inputs, keyboard-friendly buttons, and responsive layout make the dashboard usable on laptop or tablet.

Feel free to tailor the default data or extend the reducer with features like reminders or cloud sync.
