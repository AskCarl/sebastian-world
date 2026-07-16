'use client';

// 🧮 MATH ZONE — practice mode with levels + a 60-second Lightning Round!

import { useState, useEffect, useRef, useCallback } from 'react';
import { useBashBucks } from '@/lib/useBashBucks';

type Level = 'explorer' | 'adventurer' | 'master';

const levelInfo: Record<Level, { label: string; emoji: string; desc: string }> = {
  explorer: { label: 'Explorer', emoji: '🥾', desc: 'Add & subtract small numbers' },
  adventurer: { label: 'Adventurer', emoji: '⚔️', desc: 'Bigger numbers + times tables' },
  master: { label: 'Master', emoji: '🧙', desc: 'Big numbers, division & more!' },
};

function makeProblem(level: Level) {
  let ops: string[];
  if (level === 'explorer') ops = ['+', '+', '-'];
  else if (level === 'adventurer') ops = ['+', '-', '×', '×'];
  else ops = ['+', '-', '×', '÷'];

  const op = ops[Math.floor(Math.random() * ops.length)];
  let num1: number, num2: number, answer: number;

  if (op === '×') {
    if (level === 'master') {
      num1 = Math.floor(Math.random() * 12) + 4;
      num2 = Math.floor(Math.random() * 12) + 4;
    } else {
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
    }
    answer = num1 * num2;
  } else if (op === '÷') {
    // Division that always comes out even
    num2 = Math.floor(Math.random() * 11) + 2;
    answer = Math.floor(Math.random() * 11) + 2;
    num1 = num2 * answer;
  } else if (op === '+') {
    if (level === 'explorer') {
      num1 = Math.floor(Math.random() * 15) + 1;
      num2 = Math.floor(Math.random() * 15) + 1;
    } else if (level === 'adventurer') {
      num1 = Math.floor(Math.random() * 50) + 10;
      num2 = Math.floor(Math.random() * 50) + 10;
    } else {
      num1 = Math.floor(Math.random() * 400) + 100;
      num2 = Math.floor(Math.random() * 400) + 100;
    }
    answer = num1 + num2;
  } else {
    if (level === 'explorer') {
      num1 = Math.floor(Math.random() * 15) + 5;
      num2 = Math.floor(Math.random() * num1);
    } else if (level === 'adventurer') {
      num1 = Math.floor(Math.random() * 50) + 25;
      num2 = Math.floor(Math.random() * 25) + 1;
    } else {
      num1 = Math.floor(Math.random() * 400) + 200;
      num2 = Math.floor(Math.random() * 200) + 1;
    }
    answer = num1 - num2;
  }

  return { num1, num2, op, answer };
}

export default function MathZone() {
  const { addBucks } = useBashBucks();
  const [level, setLevel] = useState<Level>('adventurer');
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, op: '+', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [mathResult, setMathResult] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);

  // Lightning Round state
  const [lightningActive, setLightningActive] = useState(false);
  const [lightningTime, setLightningTime] = useState(60);
  const [lightningScore, setLightningScore] = useState(0);
  const [lightningDone, setLightningDone] = useState(false);
  const [lightningBest, setLightningBest] = useState(0);
  const [lightningReward, setLightningReward] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const lightningScoreRef = useRef(0);

  const newProblem = useCallback((lvl: Level) => {
    setMathProblem(makeProblem(lvl));
    setUserAnswer('');
    setMathResult(null);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    const savedBest = localStorage.getItem('sebastianLightningBest');
    if (savedBest) setLightningBest(parseInt(savedBest));
    newProblem('adventurer');
  }, [newProblem]);

  // Lightning countdown
  useEffect(() => {
    if (!lightningActive) return;
    if (lightningTime <= 0) {
      setLightningActive(false);
      setLightningDone(true);
      const finalScore = lightningScoreRef.current;
      const reward = Math.floor(finalScore / 3);
      setLightningReward(reward);
      if (reward > 0) addBucks(reward);
      setLightningBest(prev => {
        if (finalScore > prev) {
          localStorage.setItem('sebastianLightningBest', finalScore.toString());
          return finalScore;
        }
        return prev;
      });
      return;
    }
    const t = setTimeout(() => setLightningTime(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [lightningActive, lightningTime, addBucks]);

  const pickLevel = (lvl: Level) => {
    setLevel(lvl);
    newProblem(lvl);
  };

  const checkAnswer = () => {
    if (userAnswer.trim() === '') return;
    if (parseInt(userAnswer) === mathProblem.answer) {
      if (lightningActive) {
        const next = lightningScoreRef.current + 1;
        lightningScoreRef.current = next;
        setLightningScore(next);
        newProblem(level);
      } else {
        setMathResult('correct');
        const newScore = score + 1;
        setScore(newScore);
        if (newScore % 10 === 0) {
          addBucks(1);
          setTimeout(() => {
            alert(`🎉 Amazing! 10 correct answers = +$1 Bash Buck! 🐷💰`);
          }, 500);
        }
        setTimeout(() => newProblem(level), 1200);
      }
    } else {
      setMathResult('wrong');
      if (lightningActive) {
        setTimeout(() => setMathResult(null), 600);
      }
    }
  };

  const startLightning = () => {
    lightningScoreRef.current = 0;
    setLightningScore(0);
    setLightningTime(60);
    setLightningDone(false);
    setLightningActive(true);
    newProblem(level);
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[3px_3px_0_#333]">
          🧮 Math Zone 🧮
        </h1>
        <p className="text-lg text-white drop-shadow-[2px_2px_0_#333] mt-2">
          Pick your level and solve away, Bash!
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid gap-6">

        {/* LEVEL PICKER */}
        <div className="pixel-border bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-6">
          <h2 className="text-xl font-bold text-center mb-4 text-blue-800">🎚️ Choose Your Level</h2>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(levelInfo) as Level[]).map(lvl => (
              <button
                key={lvl}
                onClick={() => pickLevel(lvl)}
                disabled={lightningActive}
                className={`rounded-lg p-3 text-center font-bold transition-all border-4 ${
                  level === lvl
                    ? 'bg-blue-500 text-white border-blue-700 scale-105'
                    : 'bg-white text-blue-800 border-blue-200 hover:border-blue-400'
                } disabled:opacity-50`}
              >
                <div className="text-3xl mb-1">{levelInfo[lvl].emoji}</div>
                <div>{levelInfo[lvl].label}</div>
                <div className="text-xs font-normal mt-1">{levelInfo[lvl].desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* MATH GAME */}
        <div className="pixel-border bg-blue-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-800">
            {lightningActive ? '⚡ LIGHTNING ROUND! ⚡' : '🧮 Math Adventure 🧮'}
          </h2>
          <div className="text-center mb-4">
            {lightningActive ? (
              <div className="flex justify-center items-center gap-6">
                <span className={`text-3xl font-bold ${lightningTime <= 10 ? 'text-red-600 wiggle' : 'text-orange-600'}`}>
                  ⏱️ {lightningTime}s
                </span>
                <span className="text-3xl font-bold text-green-600">⭐ {lightningScore}</span>
              </div>
            ) : (
              <>
                <p className="text-lg text-blue-600">Score: ⭐ {score}</p>
                <p className="text-xs text-blue-500">💰 Get 10 correct = +$1 Bash Buck! ({10 - (score % 10)} more to go!)</p>
              </>
            )}
          </div>
          <div className="bg-white rounded-lg p-4 text-center pixel-border">
            <div className="text-4xl font-bold text-gray-800 mb-4">
              {mathProblem.num1} {mathProblem.op} {mathProblem.num2} = ?
            </div>
            <input
              ref={inputRef}
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
              className="text-2xl font-bold text-center w-28 border-4 border-blue-400 rounded-lg p-2 mb-4"
              placeholder="?"
            />
            <div className="flex gap-2 justify-center">
              <button onClick={checkAnswer} className="lego-btn-blue text-white font-bold py-2 px-4 rounded-lg">
                Check! ✓
              </button>
              {!lightningActive && (
                <button onClick={() => newProblem(level)} className="lego-btn text-white font-bold py-2 px-4 rounded-lg">
                  New 🔄
                </button>
              )}
            </div>
            {mathResult === 'correct' && (
              <div className="mt-3 text-2xl text-green-500 font-bold bounce">🎉 CORRECT! 🎉</div>
            )}
            {mathResult === 'wrong' && (
              <div className="mt-3 text-xl text-red-500 font-bold wiggle">Try again! 💪</div>
            )}
          </div>
        </div>

        {/* LIGHTNING ROUND */}
        <div className="pixel-border bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-3 text-orange-800">⚡ Lightning Round ⚡</h2>
          {lightningDone && (
            <div className="text-center bg-white rounded-lg p-4 pixel-border mb-4">
              <div className="text-5xl mb-2">🏁</div>
              <p className="text-2xl font-bold text-orange-600">Time&apos;s up! You got {lightningScore} right!</p>
              {lightningReward > 0 && (
                <p className="text-lg font-bold text-green-600 mt-1">+${lightningReward} Bash Bucks! 🐷</p>
              )}
              {lightningScore >= lightningBest && lightningScore > 0 && (
                <p className="text-lg font-bold text-yellow-600 mt-1">🏆 NEW BEST SCORE! 🏆</p>
              )}
            </div>
          )}
          <div className="text-center">
            <p className="text-orange-700 mb-1">How many can you solve in 60 seconds?</p>
            <p className="text-sm text-orange-600 mb-3">💰 Every 3 correct = $1 Bash Buck! {lightningBest > 0 && <span>| 🏆 Best: {lightningBest}</span>}</p>
            {!lightningActive && (
              <button onClick={startLightning} className="lego-btn text-white font-bold py-3 px-8 rounded-lg text-xl">
                {lightningDone ? 'Play Again! ⚡' : 'Start! ⚡'}
              </button>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
