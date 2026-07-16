'use client';

// 🔬 SCIENCE STATION — amazing facts, quizzes, and animal mysteries!

import { useState, useEffect } from 'react';
import { scienceFacts, quizTopics, QuizQuestion, animalRiddles } from '@/lib/scienceData';
import { useBashBucks } from '@/lib/useBashBucks';

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const QUIZ_LENGTH = 5;

export default function ScienceStation() {
  const { addBucks } = useBashBucks();

  // ── Fact of the day ──
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    setFactIndex(dayOfYear % scienceFacts.length);
  }, []);

  // ── Quiz ──
  const [quizTopic, setQuizTopic] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [quizDone, setQuizDone] = useState(false);
  const [quizReward, setQuizReward] = useState(0);

  const startQuiz = (topicKey: string) => {
    const topic = quizTopics.find(t => t.key === topicKey);
    if (!topic) return;
    setQuizTopic(topicKey);
    setQuizQuestions(shuffle(topic.questions).slice(0, QUIZ_LENGTH));
    setQuizIndex(0);
    setQuizScore(0);
    setPicked(null);
    setQuizDone(false);
    setQuizReward(0);
  };

  const answerQuiz = (optIndex: number) => {
    if (picked !== null) return;
    setPicked(optIndex);
    const isRight = optIndex === quizQuestions[quizIndex].answer;
    const newScore = isRight ? quizScore + 1 : quizScore;
    if (isRight) setQuizScore(newScore);

    setTimeout(() => {
      if (quizIndex + 1 >= quizQuestions.length) {
        setQuizDone(true);
        const reward = newScore >= 5 ? 3 : newScore >= 4 ? 2 : newScore >= 3 ? 1 : 0;
        setQuizReward(reward);
        if (reward > 0) {
          addBucks(reward);
        }
      } else {
        setQuizIndex(quizIndex + 1);
        setPicked(null);
      }
    }, 1200);
  };

  // ── Guess the Animal ──
  const [riddleIndex, setRiddleIndex] = useState<number | null>(null);
  const [cluesShown, setCluesShown] = useState(1);
  const [animalGuess, setAnimalGuess] = useState('');
  const [animalResult, setAnimalResult] = useState<'correct' | 'wrong' | 'revealed' | null>(null);
  const [usedRiddles, setUsedRiddles] = useState<number[]>([]);

  useEffect(() => {
    setRiddleIndex(Math.floor(Math.random() * animalRiddles.length));
  }, []);

  const riddle = riddleIndex !== null ? animalRiddles[riddleIndex] : null;

  const newRiddle = () => {
    let remaining = animalRiddles.map((_, i) => i).filter(i => !usedRiddles.includes(i) && i !== riddleIndex);
    if (remaining.length === 0) {
      setUsedRiddles([]);
      remaining = animalRiddles.map((_, i) => i).filter(i => i !== riddleIndex);
    }
    setRiddleIndex(remaining[Math.floor(Math.random() * remaining.length)]);
    setCluesShown(1);
    setAnimalGuess('');
    setAnimalResult(null);
  };

  const checkAnimal = () => {
    if (!riddle) return;
    const guess = animalGuess.toLowerCase().trim();
    if (guess.length < 2) return;
    if (riddle.answer.includes(guess) || guess.includes(riddle.answer)) {
      setAnimalResult('correct');
      setUsedRiddles([...usedRiddles, riddleIndex!]);
      const reward = cluesShown === 1 ? 3 : cluesShown === 2 ? 2 : 1;
      addBucks(reward);
      setTimeout(() => alert(`🔍 You got it with ${cluesShown} clue${cluesShown > 1 ? 's' : ''}! +$${reward} Bash Bucks! 🐷`), 300);
    } else {
      setAnimalResult('wrong');
      if (cluesShown < riddle.clues.length) {
        setCluesShown(cluesShown + 1);
      }
      setAnimalGuess('');
    }
  };

  const revealAnimal = () => {
    setAnimalResult('revealed');
    setUsedRiddles([...usedRiddles, riddleIndex!]);
  };

  const currentTopic = quizTopics.find(t => t.key === quizTopic);

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[3px_3px_0_#333]">
          🔬 Science Station 🔬
        </h1>
        <p className="text-lg text-white drop-shadow-[2px_2px_0_#333] mt-2">
          Discover something amazing every single day!
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-6">

        {/* FACT OF THE DAY */}
        <div className="pixel-border bg-gradient-to-br from-cyan-100 to-sky-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-3 text-cyan-800">🤯 Mind-Blowing Fact</h2>
          <div className="bg-white rounded-lg p-5 pixel-border text-center">
            <div className="text-6xl mb-3">{scienceFacts[factIndex].emoji}</div>
            <p className="text-xl text-gray-800 font-bold">{scienceFacts[factIndex].fact}</p>
            <button
              onClick={() => setFactIndex((factIndex + 1) % scienceFacts.length)}
              className="lego-btn-blue text-white font-bold py-2 px-6 rounded-lg mt-4"
            >
              Another One! 🎲
            </button>
          </div>
        </div>

        {/* SCIENCE QUIZ */}
        <div className="pixel-border bg-cyan-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-2 text-cyan-800">🧪 Science Quiz</h2>
          <p className="text-center text-xs text-cyan-700 mb-4">💰 5/5 = $3 | 4/5 = $2 | 3/5 = $1</p>

          {!quizTopic ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quizTopics.map(topic => (
                <button
                  key={topic.key}
                  onClick={() => startQuiz(topic.key)}
                  className="bg-white rounded-lg p-4 pixel-border text-center hover:scale-105 transition-transform"
                >
                  <div className="text-4xl mb-1">{topic.emoji}</div>
                  <div className="font-bold text-cyan-800">{topic.name}</div>
                </button>
              ))}
            </div>
          ) : quizDone ? (
            <div className="bg-white rounded-lg p-6 pixel-border text-center">
              <div className="text-6xl mb-2">{quizScore >= 4 ? '🏆' : quizScore >= 3 ? '🎉' : '💪'}</div>
              <p className="text-2xl font-bold text-cyan-800 mb-1">
                You got {quizScore} out of {quizQuestions.length}!
              </p>
              {quizReward > 0 ? (
                <p className="text-lg font-bold text-green-600">+${quizReward} Bash Bucks! 🐷</p>
              ) : (
                <p className="text-gray-600">Keep studying, scientist — try again!</p>
              )}
              <div className="flex gap-2 justify-center mt-4">
                <button onClick={() => startQuiz(quizTopic)} className="lego-btn-green text-white font-bold py-2 px-4 rounded-lg">
                  Same Topic 🔄
                </button>
                <button onClick={() => setQuizTopic(null)} className="lego-btn-blue text-white font-bold py-2 px-4 rounded-lg">
                  Pick a Topic 📋
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-5 pixel-border">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-bold text-cyan-700">
                  {currentTopic?.emoji} {currentTopic?.name} — Question {quizIndex + 1} of {quizQuestions.length}
                </span>
                <span className="text-sm font-bold text-green-600">⭐ {quizScore}</span>
              </div>
              <p className="text-xl font-bold text-gray-800 mb-4">{quizQuestions[quizIndex].q}</p>
              <div className="grid md:grid-cols-2 gap-2">
                {quizQuestions[quizIndex].options.map((opt, oi) => {
                  const isRight = oi === quizQuestions[quizIndex].answer;
                  let style = 'bg-cyan-50 border-cyan-200 text-gray-700 hover:border-cyan-400 hover:scale-[1.02]';
                  if (picked !== null) {
                    if (isRight) style = 'bg-green-100 border-green-500 text-green-800';
                    else if (picked === oi) style = 'bg-red-100 border-red-400 text-red-700';
                    else style = 'bg-gray-50 border-gray-200 text-gray-400';
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => answerQuiz(oi)}
                      className={`border-4 rounded-lg p-3 text-left font-bold transition-all ${style}`}
                    >
                      {picked !== null && isRight ? '✅ ' : picked === oi && !isRight ? '❌ ' : ''}{opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* GUESS THE ANIMAL */}
        {riddle && (
          <div className="pixel-border bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-2 text-emerald-800">🔍 Guess the Animal</h2>
            <p className="text-center text-xs text-emerald-700 mb-4">
              💰 Guess with 1 clue = $3 | 2 clues = $2 | 3 clues = $1
            </p>
            <div className="bg-white rounded-lg p-5 pixel-border">
              <div className="space-y-2 mb-4">
                {riddle.clues.slice(0, cluesShown).map((clue, i) => (
                  <div key={i} className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-3">
                    <span className="font-bold text-emerald-700">Clue {i + 1}:</span>{' '}
                    <span className="text-gray-800">{clue}</span>
                  </div>
                ))}
              </div>

              {animalResult === 'correct' || animalResult === 'revealed' ? (
                <div className="text-center">
                  <div className="text-7xl mb-2">{riddle.emoji}</div>
                  <p className="text-2xl font-bold text-emerald-700 capitalize mb-1">It&apos;s a {riddle.answer}!</p>
                  {animalResult === 'correct' ? (
                    <p className="text-green-500 font-bold bounce">🎉 Amazing detective work! 🎉</p>
                  ) : (
                    <p className="text-gray-500">Now you know — try the next one!</p>
                  )}
                  <button onClick={newRiddle} className="lego-btn-green text-white font-bold py-2 px-6 rounded-lg mt-3">
                    Next Animal 🐾
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2 justify-center flex-wrap">
                    <input
                      type="text"
                      value={animalGuess}
                      onChange={(e) => setAnimalGuess(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && checkAnimal()}
                      placeholder="What animal am I?"
                      className="border-4 border-emerald-300 rounded-lg p-2 text-lg"
                    />
                    <button onClick={checkAnimal} className="lego-btn-green text-white font-bold py-2 px-4 rounded-lg">
                      Guess! 🎯
                    </button>
                    <button onClick={revealAnimal} className="bg-gray-400 text-white font-bold py-2 px-3 rounded-lg text-sm hover:bg-gray-500">
                      Show Answer 👁️
                    </button>
                  </div>
                  {animalResult === 'wrong' && (
                    <p className="text-center text-red-500 font-bold mt-3 wiggle">
                      {cluesShown < riddle.clues.length
                        ? 'Not quite — here\'s another clue! 🕵️'
                        : 'Hmm, not that one. Keep guessing!'}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
