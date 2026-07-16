'use client';

// ✍️ WRITING STUDIO — unscramble sentences, make silly ones, and write stories!

import { useState, useEffect, useCallback } from 'react';
import { scrambleSentences, sillyParts, writingPrompts } from '@/lib/writingData';
import { useBashBucks } from '@/lib/useBashBucks';

interface JournalEntry {
  date: string;
  content: string;
}

interface Story {
  id: string;
  date: string;
  prompt: string;
  content: string;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function WritingStudio() {
  const { addBucks } = useBashBucks();
  const [today, setToday] = useState('');

  // ── Sentence Unscramble ──
  const [targetSentence, setTargetSentence] = useState('');
  const [wordBank, setWordBank] = useState<{ word: string; id: number }[]>([]);
  const [built, setBuilt] = useState<{ word: string; id: number }[]>([]);
  const [scrambleResult, setScrambleResult] = useState<'correct' | 'wrong' | null>(null);
  const [scrambleScore, setScrambleScore] = useState(0);

  const newScramble = useCallback((avoid?: string) => {
    let sentence = scrambleSentences[Math.floor(Math.random() * scrambleSentences.length)];
    while (sentence === avoid && scrambleSentences.length > 1) {
      sentence = scrambleSentences[Math.floor(Math.random() * scrambleSentences.length)];
    }
    const words = sentence.split(' ').map((word, i) => ({ word, id: i }));
    let mixed = shuffle(words);
    // Make sure it's actually scrambled
    while (mixed.map(w => w.word).join(' ') === sentence) {
      mixed = shuffle(words);
    }
    setTargetSentence(sentence);
    setWordBank(mixed);
    setBuilt([]);
    setScrambleResult(null);
  }, []);

  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
    newScramble();
  }, [newScramble]);

  const pickWord = (id: number) => {
    const item = wordBank.find(w => w.id === id);
    if (!item) return;
    setWordBank(wordBank.filter(w => w.id !== id));
    setBuilt([...built, item]);
    setScrambleResult(null);
  };

  const unpickWord = (id: number) => {
    const item = built.find(w => w.id === id);
    if (!item) return;
    setBuilt(built.filter(w => w.id !== id));
    setWordBank([...wordBank, item]);
    setScrambleResult(null);
  };

  const checkScramble = () => {
    if (built.map(w => w.word).join(' ') === targetSentence) {
      setScrambleResult('correct');
      const newScore = scrambleScore + 1;
      setScrambleScore(newScore);
      if (newScore % 3 === 0) {
        addBucks(1);
        setTimeout(() => alert(`✍️ 3 sentences fixed = +$1 Bash Buck! 🐷`), 400);
      }
      setTimeout(() => newScramble(targetSentence), 1500);
    } else {
      setScrambleResult('wrong');
    }
  };

  // ── Silly Sentence Machine ──
  const [silly, setSilly] = useState<string | null>(null);

  const makeSilly = () => {
    const c = sillyParts.characters[Math.floor(Math.random() * sillyParts.characters.length)];
    const a = sillyParts.actions[Math.floor(Math.random() * sillyParts.actions.length)];
    const t = sillyParts.things[Math.floor(Math.random() * sillyParts.things.length)];
    const p = sillyParts.places[Math.floor(Math.random() * sillyParts.places.length)];
    setSilly(`${c} ${a} ${t} ${p}!`);
  };

  // ── Story Writing ──
  const [prompt, setPrompt] = useState(writingPrompts[0]);
  const [storyText, setStoryText] = useState('');
  const [stories, setStories] = useState<Story[]>([]);
  const [showStories, setShowStories] = useState(false);
  const [storySaved, setStorySaved] = useState(false);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    setPrompt(writingPrompts[dayOfYear % writingPrompts.length]);
    const saved = localStorage.getItem('sebastianStories');
    if (saved) setStories(JSON.parse(saved));
  }, []);

  const saveStory = () => {
    if (!storyText.trim()) return;
    const newStory: Story = {
      id: Date.now().toString(),
      date: today,
      prompt,
      content: storyText.trim(),
    };
    const updated = [...stories, newStory];
    setStories(updated);
    localStorage.setItem('sebastianStories', JSON.stringify(updated));
    setStorySaved(true);

    // Reward: $2 for a real story (20+ words), once per day
    const wordCount = storyText.trim().split(/\s+/).length;
    const rewardedDate = localStorage.getItem('sebastianStoryRewardDate');
    if (wordCount >= 20 && rewardedDate !== today) {
      localStorage.setItem('sebastianStoryRewardDate', today);
      addBucks(2);
      setTimeout(() => alert(`📖 Awesome story! +$2 Bash Bucks! 🐷💰`), 400);
    }
  };

  // ── Journal (moved from the home page) ──
  const [journalEntry, setJournalEntry] = useState('');
  const [journalHistory, setJournalHistory] = useState<JournalEntry[]>([]);
  const [showJournalHistory, setShowJournalHistory] = useState(false);

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const savedJournalHistory = localStorage.getItem('sebastianJournalHistory');
    if (savedJournalHistory) setJournalHistory(JSON.parse(savedJournalHistory));
    const savedTodayJournal = localStorage.getItem('sebastianJournalToday');
    const savedJournalDate = localStorage.getItem('sebastianJournalDate');
    if (savedJournalDate === todayStr && savedTodayJournal) {
      setJournalEntry(savedTodayJournal);
    }
  }, []);

  const saveJournalEntry = () => {
    if (!journalEntry.trim()) return;
    localStorage.setItem('sebastianJournalToday', journalEntry);
    localStorage.setItem('sebastianJournalDate', today);

    const existingIndex = journalHistory.findIndex(e => e.date === today);
    let newHistory;
    if (existingIndex >= 0) {
      newHistory = [...journalHistory];
      newHistory[existingIndex].content = journalEntry;
    } else {
      newHistory = [...journalHistory, { date: today, content: journalEntry }];
    }
    setJournalHistory(newHistory);
    localStorage.setItem('sebastianJournalHistory', JSON.stringify(newHistory));
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[3px_3px_0_#333]">
          ✍️ Writing Studio ✍️
        </h1>
        <p className="text-lg text-white drop-shadow-[2px_2px_0_#333] mt-2">
          Build sentences, invent silly ones, and write amazing stories!
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-6">

        {/* SENTENCE UNSCRAMBLE */}
        <div className="pixel-border bg-green-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-2 text-green-800">🧩 Sentence Unscramble</h2>
          <p className="text-center text-sm text-green-700 mb-1">The words got all mixed up! Tap them in the right order.</p>
          <p className="text-center text-xs text-green-600 mb-4">💰 Fix 3 sentences = +$1 Bash Buck! | Fixed so far: {scrambleScore}</p>

          <div className="bg-white rounded-lg p-4 pixel-border">
            {/* Built sentence */}
            <div className="min-h-[56px] bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-2 mb-3 flex flex-wrap gap-2 items-center">
              {built.length === 0 ? (
                <span className="text-green-300 italic text-sm">Your sentence goes here...</span>
              ) : (
                built.map(w => (
                  <button
                    key={w.id}
                    onClick={() => unpickWord(w.id)}
                    className="bg-green-500 text-white font-bold px-3 py-1 rounded-lg hover:bg-red-400"
                    title="Tap to put back"
                  >
                    {w.word}
                  </button>
                ))
              )}
            </div>

            {/* Word bank */}
            <div className="flex flex-wrap gap-2 justify-center mb-3">
              {wordBank.map(w => (
                <button
                  key={w.id}
                  onClick={() => pickWord(w.id)}
                  className="bg-white border-2 border-green-400 text-green-800 font-bold px-3 py-1 rounded-lg hover:bg-green-100 hover:scale-105 transition-all"
                >
                  {w.word}
                </button>
              ))}
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={checkScramble}
                disabled={wordBank.length > 0}
                className="lego-btn-green text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50"
              >
                Check! ✓
              </button>
              <button onClick={() => newScramble(targetSentence)} className="lego-btn text-white font-bold py-2 px-4 rounded-lg">
                New 🔄
              </button>
            </div>

            {scrambleResult === 'correct' && (
              <div className="mt-3 text-center text-2xl text-green-500 font-bold bounce">🎉 PERFECT SENTENCE! 🎉</div>
            )}
            {scrambleResult === 'wrong' && (
              <div className="mt-3 text-center text-lg text-red-500 font-bold wiggle">Not quite — tap words to move them back! 💪</div>
            )}
          </div>
        </div>

        {/* SILLY SENTENCE MACHINE */}
        <div className="pixel-border bg-gradient-to-br from-lime-100 to-emerald-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-2 text-emerald-800">🎰 Silly Sentence Machine</h2>
          <p className="text-center text-sm text-emerald-700 mb-4">Pull the lever and get a ridiculous sentence. Then try writing your own!</p>
          <div className="bg-white rounded-lg p-4 pixel-border text-center">
            {silly ? (
              <p className="text-xl font-bold text-emerald-800 mb-4">&quot;{silly}&quot;</p>
            ) : (
              <p className="text-gray-400 italic mb-4">Press the button to make a silly sentence!</p>
            )}
            <button onClick={makeSilly} className="lego-btn text-white font-bold py-3 px-8 rounded-lg text-lg">
              🎰 Make One!
            </button>
          </div>
        </div>

        {/* STORY WRITING */}
        <div className="pixel-border bg-teal-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-2 text-teal-800">📖 Story Time</h2>
          <p className="text-center text-xs text-teal-600 mb-4">💰 Write a story with 20+ words = +$2 Bash Bucks (once a day)!</p>
          <div className="bg-white rounded-lg p-4 pixel-border">
            <div className="bg-teal-50 rounded-lg p-3 mb-3 border-2 border-teal-200">
              <p className="text-sm font-bold text-teal-700">✨ Today&apos;s Story Idea:</p>
              <p className="text-base text-gray-800">{prompt}</p>
              <button
                onClick={() => setPrompt(writingPrompts[Math.floor(Math.random() * writingPrompts.length)])}
                className="text-xs text-teal-600 underline mt-1"
              >
                Give me a different idea 🎲
              </button>
            </div>
            <textarea
              value={storyText}
              onChange={(e) => { setStoryText(e.target.value); setStorySaved(false); }}
              placeholder="Once upon a time..."
              className="w-full h-36 border-4 border-teal-300 rounded-lg p-2 text-base resize-none"
            />
            <div className="flex gap-2 mt-2 items-center flex-wrap">
              <button onClick={saveStory} className="lego-btn-green text-white font-bold py-2 px-4 rounded-lg text-sm">
                Save Story 💾
              </button>
              <button onClick={() => setShowStories(!showStories)} className="lego-btn-blue text-white font-bold py-2 px-4 rounded-lg text-sm">
                {showStories ? 'Hide' : 'My'} Stories 📚 ({stories.length})
              </button>
              <span className="text-xs text-gray-500">
                Words: {storyText.trim() ? storyText.trim().split(/\s+/).length : 0}
              </span>
              {storySaved && <span className="text-green-500 font-bold text-sm">✓ Saved!</span>}
            </div>

            {showStories && stories.length > 0 && (
              <div className="mt-3 max-h-48 overflow-y-auto space-y-2">
                {stories.slice().reverse().map(story => (
                  <div key={story.id} className="bg-teal-50 p-2 rounded text-sm">
                    <p className="font-bold text-teal-700 text-xs">{new Date(story.date + 'T12:00:00').toLocaleDateString()} — {story.prompt.slice(0, 40)}...</p>
                    <p className="text-gray-700">{story.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* DAILY JOURNAL */}
        <div className="pixel-border bg-cyan-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-cyan-800">
            📝 My Journal 📝
          </h2>
          <div className="bg-white rounded-lg p-4 pixel-border">
            <p className="text-sm text-cyan-600 mb-2">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="What happened today?"
              className="w-full h-24 border-4 border-cyan-300 rounded-lg p-2 text-base resize-none"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={saveJournalEntry} className="lego-btn-green text-white font-bold py-2 px-4 rounded-lg text-sm">
                Save 💾
              </button>
              <button onClick={() => setShowJournalHistory(!showJournalHistory)} className="lego-btn-blue text-white font-bold py-2 px-4 rounded-lg text-sm">
                {showJournalHistory ? 'Hide' : 'Past'} 📚
              </button>
            </div>

            {showJournalHistory && journalHistory.length > 0 && (
              <div className="mt-3 max-h-32 overflow-y-auto">
                {journalHistory.slice().reverse().slice(0, 5).map((entry, i) => (
                  <div key={i} className="bg-cyan-50 p-2 rounded mb-1 text-sm">
                    <span className="font-bold">{new Date(entry.date + 'T12:00:00').toLocaleDateString()}:</span> {entry.content.slice(0, 50)}...
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
