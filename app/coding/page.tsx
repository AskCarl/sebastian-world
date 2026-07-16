'use client';

// 🤖 CODING LAB — program Robo the robot, and level up your typing in Type Quest!

import { useState, useEffect, useRef } from 'react';
import { typingWords } from '@/lib/typingData';
import { useBashBucks } from '@/lib/useBashBucks';

// ─────────────────────────────────────────────
// ROBO LEVELS
// The grid is 8x8. x goes right (0-7), y goes down (0-7).
// dir: 0 = up, 1 = right, 2 = down, 3 = left
// ✏️ SEBASTIAN: You can design your own level here! Add walls, move the gem...
// ─────────────────────────────────────────────
const GRID = 8;

interface RoboLevel {
  name: string;
  start: { x: number; y: number; dir: number };
  gem: { x: number; y: number };
  walls: [number, number][];
  hint: string;
}

const roboLevels: RoboLevel[] = [
  {
    name: 'First Steps',
    start: { x: 1, y: 4, dir: 1 },
    gem: { x: 6, y: 4 },
    walls: [],
    hint: 'Robo starts facing right ➡️. How many steps to the diamond?',
  },
  {
    name: 'The Big Turn',
    start: { x: 1, y: 6, dir: 1 },
    gem: { x: 5, y: 2 },
    walls: [],
    hint: 'Go right, then TURN LEFT to face up, then keep going!',
  },
  {
    name: 'Wall in the Way',
    start: { x: 0, y: 7, dir: 1 },
    gem: { x: 6, y: 7 },
    walls: [[3, 5], [3, 6], [3, 7]],
    hint: 'You can\'t walk through stone! Go up and around it.',
  },
  {
    name: 'Rocky Road',
    start: { x: 0, y: 0, dir: 2 },
    gem: { x: 7, y: 7 },
    walls: [[2, 2], [4, 3], [3, 4], [5, 5], [6, 4]],
    hint: 'Robo starts facing DOWN ⬇️. Find a safe path to the corner!',
  },
  {
    name: 'The Snake Maze',
    start: { x: 0, y: 0, dir: 1 },
    gem: { x: 7, y: 7 },
    walls: [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [2, 5], [3, 5], [4, 5], [5, 5], [6, 5], [7, 5]],
    hint: 'Slither like a snake: right, down, left, down, right!',
  },
];

type Command = 'F' | 'L' | 'R';
const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];
const DIR_EMOJI = ['⬆️', '➡️', '⬇️', '⬅️'];

export default function CodingLab() {
  const { addBucks } = useBashBucks();

  // ── Robo state ──
  const [levelIndex, setLevelIndex] = useState(0);
  const [program, setProgram] = useState<Command[]>([]);
  const [robot, setRobot] = useState(roboLevels[0].start);
  const [trail, setTrail] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<'win' | 'crash' | 'miss' | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const level = roboLevels[levelIndex];

  useEffect(() => {
    const saved = localStorage.getItem('sebastianRoboLevels');
    if (saved) setCompletedLevels(JSON.parse(saved));
  }, []);

  useEffect(() => {
    return () => timeoutsRef.current.forEach(clearTimeout);
  }, []);

  const resetLevel = (idx: number) => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setLevelIndex(idx);
    setProgram([]);
    setRobot(roboLevels[idx].start);
    setTrail([]);
    setRunning(false);
    setRunResult(null);
  };

  const addCommand = (cmd: Command) => {
    if (running || program.length >= 40) return;
    setProgram([...program, cmd]);
    setRunResult(null);
  };

  const runProgram = () => {
    if (running || program.length === 0) return;
    setRunning(true);
    setRunResult(null);

    // Simulate the whole program first to build animation frames
    const frames: { x: number; y: number; dir: number; crashed?: boolean; won?: boolean }[] = [];
    let { x, y, dir } = level.start;
    const isWall = (cx: number, cy: number) => level.walls.some(([wx, wy]) => wx === cx && wy === cy);
    let won = x === level.gem.x && y === level.gem.y;
    let crashed = false;

    for (const cmd of program) {
      if (cmd === 'L') dir = (dir + 3) % 4;
      else if (cmd === 'R') dir = (dir + 1) % 4;
      else {
        const nx = x + DX[dir];
        const ny = y + DY[dir];
        if (nx < 0 || nx >= GRID || ny < 0 || ny >= GRID || isWall(nx, ny)) {
          crashed = true;
          frames.push({ x, y, dir, crashed: true });
          break;
        }
        x = nx; y = ny;
        if (x === level.gem.x && y === level.gem.y) won = true;
      }
      frames.push({ x, y, dir, won: won && x === level.gem.x && y === level.gem.y });
    }

    // Animate frame by frame
    setRobot(level.start);
    setTrail([`${level.start.x},${level.start.y}`]);
    frames.forEach((frame, i) => {
      const t = setTimeout(() => {
        setRobot({ x: frame.x, y: frame.y, dir: frame.dir });
        setTrail(prev => [...prev, `${frame.x},${frame.y}`]);
        if (i === frames.length - 1) {
          setRunning(false);
          if (crashed) {
            setRunResult('crash');
          } else if (won) {
            setRunResult('win');
            if (!completedLevels.includes(levelIndex)) {
              const updated = [...completedLevels, levelIndex];
              setCompletedLevels(updated);
              localStorage.setItem('sebastianRoboLevels', JSON.stringify(updated));
              addBucks(3);
              setTimeout(() => alert(`🤖💎 Level complete! +$3 Bash Bucks!`), 400);
            }
          } else {
            setRunResult('miss');
          }
        }
      }, 350 * (i + 1));
      timeoutsRef.current.push(t);
    });
  };

  const cmdLabel = (cmd: Command) => cmd === 'F' ? '⬆️ Move' : cmd === 'L' ? '↪️ Left' : '↩️ Right';

  // ── Type Quest state ──
  const [typingWord, setTypingWord] = useState('');
  const [typingInput, setTypingInput] = useState('');
  const [typingLevel, setTypingLevel] = useState<'cadet' | 'hero' | 'legend'>('cadet');
  const [typingScore, setTypingScore] = useState(0);
  const [typingStreak, setTypingStreak] = useState(0);
  const [typingBestStreak, setTypingBestStreak] = useState(0);
  const [typingFlash, setTypingFlash] = useState<'correct' | 'levelup' | null>(null);
  const [typingLevelUpTo, setTypingLevelUpTo] = useState<string>('');
  const typingInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedTypingBest = localStorage.getItem('sebastianTypingBestStreak');
    if (savedTypingBest) setTypingBestStreak(parseInt(savedTypingBest));
    pickTypingWord('cadet');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickTypingWord = (level: 'cadet' | 'hero' | 'legend', avoid?: string) => {
    const bank = typingWords[level];
    let next = bank[Math.floor(Math.random() * bank.length)];
    if (avoid && bank.length > 1) {
      while (next === avoid) {
        next = bank[Math.floor(Math.random() * bank.length)];
      }
    }
    setTypingWord(next);
    setTypingInput('');
    setTimeout(() => typingInputRef.current?.focus(), 50);
  };

  const handleTypingChange = (value: string) => {
    setTypingInput(value);
    if (value.toLowerCase() === typingWord.toLowerCase() && typingWord) {
      const newScore = typingScore + 1;
      const newStreak = typingStreak + 1;
      setTypingScore(newScore);
      setTypingStreak(newStreak);
      setTypingFlash('correct');

      if (newStreak > typingBestStreak) {
        setTypingBestStreak(newStreak);
        localStorage.setItem('sebastianTypingBestStreak', newStreak.toString());
      }

      if (newScore % 10 === 0) {
        addBucks(1);
        setTimeout(() => {
          alert(`⌨️ 10 words typed! +$1 Bash Buck! 🐷💰`);
        }, 500);
      }

      let nextLevel: 'cadet' | 'hero' | 'legend' = typingLevel;
      if (newScore === 8) {
        nextLevel = 'hero';
        setTypingLevel('hero');
        setTypingLevelUpTo('HERO');
        setTypingFlash('levelup');
      } else if (newScore === 20) {
        nextLevel = 'legend';
        setTypingLevel('legend');
        setTypingLevelUpTo('LEGEND');
        setTypingFlash('levelup');
      }

      setTimeout(() => {
        setTypingFlash(null);
        pickTypingWord(nextLevel, typingWord);
      }, nextLevel !== typingLevel ? 1800 : 700);
    }
  };

  const skipTypingWord = () => {
    setTypingStreak(0);
    pickTypingWord(typingLevel, typingWord);
  };

  const setTypingLevelManual = (level: 'cadet' | 'hero' | 'legend') => {
    setTypingLevel(level);
    pickTypingWord(level, typingWord);
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[3px_3px_0_#333]">
          🤖 Coding Lab 🤖
        </h1>
        <p className="text-lg text-white drop-shadow-[2px_2px_0_#333] mt-2">
          Give Robo commands and watch him go — that&apos;s real programming!
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid gap-6">

        {/* ROBO THE ROBOT */}
        <div className="pixel-border bg-gradient-to-br from-slate-100 to-blue-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-2 text-slate-800">
            🤖 Program Robo! 💎
          </h2>
          <p className="text-center text-sm text-slate-600 mb-4">
            Write a program with Move and Turn commands to get Robo to the diamond. Watch out for stone blocks!
          </p>

          {/* Level picker */}
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {roboLevels.map((lvl, i) => (
              <button
                key={i}
                onClick={() => resetLevel(i)}
                className={`px-3 py-1 rounded-lg text-sm font-bold border-2 ${
                  levelIndex === i
                    ? 'bg-slate-700 text-white border-slate-900'
                    : completedLevels.includes(i)
                      ? 'bg-green-100 text-green-800 border-green-400'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                }`}
              >
                {completedLevels.includes(i) ? '⭐' : ''} Level {i + 1}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Grid */}
            <div className="bg-white rounded-lg p-3 pixel-border">
              <p className="text-center font-bold text-slate-700 mb-2">
                {level.name} {completedLevels.includes(levelIndex) && '⭐'}
              </p>
              <div className="grid grid-cols-8 gap-0.5 max-w-xs mx-auto bg-slate-300 p-1 rounded">
                {Array(GRID * GRID).fill(null).map((_, i) => {
                  const cx = i % GRID;
                  const cy = Math.floor(i / GRID);
                  const isRobot = robot.x === cx && robot.y === cy;
                  const isGem = level.gem.x === cx && level.gem.y === cy;
                  const isWall = level.walls.some(([wx, wy]) => wx === cx && wy === cy);
                  const inTrail = trail.includes(`${cx},${cy}`);
                  return (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center text-lg rounded-sm ${
                        isWall ? 'bg-slate-600' : inTrail ? 'bg-yellow-200' : 'bg-green-100'
                      }`}
                    >
                      {isRobot ? (runResult === 'crash' ? '💥' : '🤖') : isGem ? '💎' : isWall ? '🪨' : ''}
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-xs text-slate-500 mt-2">
                Robo is facing {DIR_EMOJI[robot.dir]} | 💡 {level.hint}
              </p>
            </div>

            {/* Program editor */}
            <div className="bg-white rounded-lg p-3 pixel-border flex flex-col">
              <p className="text-center font-bold text-slate-700 mb-2">📜 Robo&apos;s Program</p>
              <div className="flex-1 bg-slate-50 rounded-lg p-2 mb-3 min-h-[100px] border-2 border-slate-200">
                {program.length === 0 ? (
                  <p className="text-slate-400 text-sm text-center italic mt-4">Tap commands below to build your program!</p>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {program.map((cmd, i) => (
                      <span key={i} className="bg-blue-100 border border-blue-300 rounded px-2 py-0.5 text-sm font-bold text-blue-800">
                        {i + 1}. {cmdLabel(cmd)}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-2">
                <button onClick={() => addCommand('F')} disabled={running} className="lego-btn-blue text-white font-bold py-2 rounded-lg disabled:opacity-50">
                  ⬆️ Move
                </button>
                <button onClick={() => addCommand('L')} disabled={running} className="lego-btn-green text-white font-bold py-2 rounded-lg disabled:opacity-50">
                  ↪️ Left
                </button>
                <button onClick={() => addCommand('R')} disabled={running} className="lego-btn text-white font-bold py-2 rounded-lg disabled:opacity-50">
                  ↩️ Right
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setProgram(program.slice(0, -1))}
                  disabled={running || program.length === 0}
                  className="bg-gray-400 text-white font-bold py-2 rounded-lg text-sm hover:bg-gray-500 disabled:opacity-50"
                >
                  ⌫ Undo
                </button>
                <button
                  onClick={() => { setProgram([]); setRobot(level.start); setTrail([]); setRunResult(null); }}
                  disabled={running}
                  className="bg-gray-400 text-white font-bold py-2 rounded-lg text-sm hover:bg-gray-500 disabled:opacity-50"
                >
                  🗑️ Clear
                </button>
                <button
                  onClick={runProgram}
                  disabled={running || program.length === 0}
                  className="bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 disabled:opacity-50"
                >
                  ▶️ RUN!
                </button>
              </div>

              {runResult === 'win' && (
                <div className="mt-3 text-center text-xl text-green-500 font-bold bounce">💎 ROBO GOT THE DIAMOND! 💎</div>
              )}
              {runResult === 'crash' && (
                <div className="mt-3 text-center text-lg text-red-500 font-bold wiggle">💥 CRASH! Robo hit something. Try again!</div>
              )}
              {runResult === 'miss' && (
                <div className="mt-3 text-center text-lg text-orange-500 font-bold">🤔 So close! Robo didn&apos;t reach the diamond.</div>
              )}
            </div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-3">💰 First time you beat each level = +$3 Bash Bucks!</p>
        </div>

        {/* TYPE QUEST */}
        <div className="pixel-border bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-3 text-purple-800">
            ⌨️ Type Quest ⌨️
          </h2>
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span className="text-sm font-bold px-3 py-1 rounded-full bg-purple-500 text-white">
                {typingLevel === 'cadet' ? '🛡️ CADET' : typingLevel === 'hero' ? '⚔️ HERO' : '🐉 LEGEND'}
              </span>
              <span className="text-sm font-bold text-purple-700">Words: {typingScore}</span>
              <span className="text-sm font-bold text-pink-700">🔥 Streak: {typingStreak}</span>
              {typingBestStreak > 0 && (
                <span className="text-sm font-bold text-yellow-700">🏆 Best: {typingBestStreak}</span>
              )}
            </div>
            <p className="text-xs text-purple-500 mt-1">
              💰 Type 10 words = +$1 Bash Buck! ({10 - (typingScore % 10)} more!)
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 pixel-border relative overflow-hidden">
            {typingFlash === 'levelup' && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-300 to-orange-400 z-10 bounce">
                <div className="text-center">
                  <div className="text-5xl mb-2">🎉🚀🎉</div>
                  <div className="text-3xl font-bold text-white drop-shadow-lg">LEVEL UP!</div>
                  <div className="text-2xl font-bold text-white drop-shadow-lg mt-1">{typingLevelUpTo} MODE</div>
                </div>
              </div>
            )}

            <div className="text-center mb-4 min-h-[60px] flex items-center justify-center flex-wrap gap-1">
              {typingWord.split('').map((letter, i) => {
                const typed = typingInput[i];
                let color = 'text-gray-400';
                if (typed != null) {
                  color = typed.toLowerCase() === letter.toLowerCase() ? 'text-green-500' : 'text-red-500 underline';
                }
                return (
                  <span key={i} className={`text-4xl md:text-5xl font-bold ${color} transition-colors`}>
                    {letter}
                  </span>
                );
              })}
            </div>

            <div className="flex gap-2 justify-center items-center">
              <input
                ref={typingInputRef}
                type="text"
                value={typingInput}
                onChange={(e) => handleTypingChange(e.target.value)}
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                className="text-2xl font-bold text-center border-4 border-purple-400 rounded-lg p-2 w-full max-w-md focus:border-pink-500 focus:outline-none"
                placeholder="Type the word!"
              />
            </div>

            {typingFlash === 'correct' && (
              <div className="mt-3 text-center text-3xl font-bold text-green-500 bounce">
                ✨ NICE! ✨
              </div>
            )}

            <div className="flex gap-2 justify-center mt-4 flex-wrap">
              <button
                onClick={skipTypingWord}
                className="bg-gray-400 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-gray-500"
              >
                Skip ⏭️
              </button>
              <button
                onClick={() => setTypingLevelManual('cadet')}
                className={`font-bold py-2 px-3 rounded-lg text-sm ${typingLevel === 'cadet' ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-800 hover:bg-purple-300'}`}
              >
                🛡️ Cadet
              </button>
              <button
                onClick={() => setTypingLevelManual('hero')}
                className={`font-bold py-2 px-3 rounded-lg text-sm ${typingLevel === 'hero' ? 'bg-pink-600 text-white' : 'bg-pink-200 text-pink-800 hover:bg-pink-300'}`}
              >
                ⚔️ Hero
              </button>
              <button
                onClick={() => setTypingLevelManual('legend')}
                className={`font-bold py-2 px-3 rounded-lg text-sm ${typingLevel === 'legend' ? 'bg-orange-600 text-white' : 'bg-orange-200 text-orange-800 hover:bg-orange-300'}`}
              >
                🐉 Legend
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
