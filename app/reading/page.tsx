'use client';

// 📚 READING ROOM — read a story, answer the questions, earn Bash Bucks!

import { useState, useEffect } from 'react';
import { passages, Passage } from '@/lib/readingData';
import { useBashBucks } from '@/lib/useBashBucks';

const levelStars = (level: number) => '⭐'.repeat(level);

export default function ReadingRoom() {
  const { addBucks } = useBashBucks();
  const [selected, setSelected] = useState<Passage | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('sebastianReadingDone');
    if (saved) setCompleted(JSON.parse(saved));
  }, []);

  const openPassage = (p: Passage) => {
    setSelected(p);
    setAnswers(Array(p.questions.length).fill(null));
    setChecked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pickAnswer = (qIndex: number, optIndex: number) => {
    if (checked) return;
    const next = [...answers];
    next[qIndex] = optIndex;
    setAnswers(next);
  };

  const allAnswered = answers.length > 0 && answers.every(a => a !== null);
  const correctCount = selected
    ? answers.filter((a, i) => a === selected.questions[i].answer).length
    : 0;

  const checkAnswers = () => {
    if (!selected || !allAnswered) return;
    setChecked(true);
    const total = selected.questions.length;
    const allCorrect = correctCount === total;

    if (allCorrect && !completed.includes(selected.id)) {
      const updated = [...completed, selected.id];
      setCompleted(updated);
      localStorage.setItem('sebastianReadingDone', JSON.stringify(updated));
      const reward = selected.level + 1; // harder stories pay more!
      addBucks(reward);
      setTimeout(() => alert(`📚 Perfect score! +$${reward} Bash Bucks! 🐷💰`), 400);
    }
  };

  const tryAgain = () => {
    if (!selected) return;
    setAnswers(Array(selected.questions.length).fill(null));
    setChecked(false);
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[3px_3px_0_#333]">
          📚 Reading Room 📚
        </h1>
        <p className="text-lg text-white drop-shadow-[2px_2px_0_#333] mt-2">
          Read carefully — then show what you know!
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-6">

        {selected ? (
          <>
            {/* THE STORY */}
            <div className="pixel-border bg-amber-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                <h2 className="text-2xl font-bold text-amber-800">
                  {selected.emoji} {selected.title} <span className="text-sm">{levelStars(selected.level)}</span>
                </h2>
                <button
                  onClick={() => setSelected(null)}
                  className="bg-gray-400 text-white font-bold py-1 px-3 rounded-lg text-sm hover:bg-gray-500"
                >
                  ← All Stories
                </button>
              </div>
              <div className="bg-white rounded-lg p-5 pixel-border">
                <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-line">{selected.text}</p>
              </div>
            </div>

            {/* THE QUESTIONS */}
            <div className="pixel-border bg-amber-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-center text-amber-800 mb-1">🤔 Question Time!</h3>
              <p className="text-center text-xs text-amber-700 mb-4">
                💰 Get them ALL right = +${selected.level + 1} Bash Bucks!
                {completed.includes(selected.id) && ' (already earned for this story ⭐)'}
              </p>

              <div className="space-y-4">
                {selected.questions.map((question, qi) => (
                  <div key={qi} className="bg-white rounded-lg p-4 pixel-border">
                    <p className="font-bold text-gray-800 mb-2">{qi + 1}. {question.q}</p>
                    <div className="grid md:grid-cols-2 gap-2">
                      {question.options.map((opt, oi) => {
                        const isPicked = answers[qi] === oi;
                        const isRight = question.answer === oi;
                        let style = 'bg-amber-50 border-amber-200 text-gray-700 hover:border-amber-400';
                        if (checked) {
                          if (isRight) style = 'bg-green-100 border-green-500 text-green-800';
                          else if (isPicked) style = 'bg-red-100 border-red-400 text-red-700';
                          else style = 'bg-gray-50 border-gray-200 text-gray-400';
                        } else if (isPicked) {
                          style = 'bg-amber-300 border-amber-600 text-amber-900 scale-[1.02]';
                        }
                        return (
                          <button
                            key={oi}
                            onClick={() => pickAnswer(qi, oi)}
                            className={`border-4 rounded-lg p-2 text-left font-bold transition-all ${style}`}
                          >
                            {checked && isRight ? '✅ ' : checked && isPicked && !isRight ? '❌ ' : ''}{opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-4">
                {!checked ? (
                  <button
                    onClick={checkAnswers}
                    disabled={!allAnswered}
                    className="lego-btn-green text-white font-bold py-3 px-8 rounded-lg text-lg disabled:opacity-50"
                  >
                    Check My Answers! ✓
                  </button>
                ) : (
                  <div>
                    <p className={`text-2xl font-bold mb-3 ${correctCount === selected.questions.length ? 'text-green-500 bounce' : 'text-orange-500'}`}>
                      {correctCount === selected.questions.length
                        ? '🎉 PERFECT! You got them all! 🎉'
                        : `You got ${correctCount} of ${selected.questions.length} right!`}
                    </p>
                    <div className="flex gap-2 justify-center">
                      {correctCount < selected.questions.length && (
                        <button onClick={tryAgain} className="lego-btn-blue text-white font-bold py-2 px-6 rounded-lg">
                          Read Again & Retry 🔄
                        </button>
                      )}
                      <button onClick={() => setSelected(null)} className="lego-btn text-white font-bold py-2 px-6 rounded-lg">
                        Next Story →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          /* STORY PICKER */
          <div className="pixel-border bg-amber-100 rounded-lg p-6">
            <h2 className="text-xl font-bold text-center text-amber-800 mb-1">📖 Pick a Story</h2>
            <p className="text-center text-xs text-amber-700 mb-4">
              More stars = trickier story = more Bash Bucks! | Finished: {completed.length}/{passages.length}
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              {[1, 2, 3].map(level => (
                <div key={level} className="space-y-3">
                  <p className="text-center font-bold text-amber-700">{levelStars(level)}</p>
                  {passages.filter(p => p.level === level).map(p => (
                    <button
                      key={p.id}
                      onClick={() => openPassage(p)}
                      className={`w-full bg-white rounded-lg p-4 pixel-border text-center hover:scale-105 transition-transform ${
                        completed.includes(p.id) ? 'opacity-90' : ''
                      }`}
                    >
                      <div className="text-4xl mb-1">{p.emoji}</div>
                      <div className="font-bold text-amber-800">{p.title}</div>
                      {completed.includes(p.id) && (
                        <div className="text-xs text-green-600 font-bold mt-1">⭐ Completed!</div>
                      )}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
