'use client';

// 🏠 HOME BASE — daily fun + doors to every zone!

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { jokes, riddles, motivationalQuotes, wordOfTheDay } from '@/lib/dailyData';
import { useBashBucks } from '@/lib/useBashBucks';

const zoneDoors = [
  { href: '/math', emoji: '🧮', name: 'Math Zone', desc: 'Solve problems & beat the clock!', color: 'from-blue-200 to-blue-300', text: 'text-blue-800' },
  { href: '/coding', emoji: '🤖', name: 'Coding Lab', desc: 'Program Robo & type like a hero!', color: 'from-purple-200 to-purple-300', text: 'text-purple-800' },
  { href: '/writing', emoji: '✍️', name: 'Writing Studio', desc: 'Build sentences & write stories!', color: 'from-green-200 to-green-300', text: 'text-green-800' },
  { href: '/reading', emoji: '📚', name: 'Reading Room', desc: 'Read stories & answer questions!', color: 'from-amber-200 to-amber-300', text: 'text-amber-800' },
  { href: '/science', emoji: '🔬', name: 'Science Station', desc: 'Quizzes, facts & animal mysteries!', color: 'from-cyan-200 to-cyan-300', text: 'text-cyan-800' },
  { href: '/playroom', emoji: '🎮', name: 'Playroom', desc: 'Pet, drawing, games & photos!', color: 'from-pink-200 to-pink-300', text: 'text-pink-800' },
];

export default function SebastianWorld() {
  const { bashBucks, addBucks, setBucks } = useBashBucks();
  const [todayJoke, setTodayJoke] = useState(jokes[0]);
  const [todayRiddle, setTodayRiddle] = useState(riddles[0]);
  const [todayQuote, setTodayQuote] = useState(motivationalQuotes[0]);
  const [todayWord, setTodayWord] = useState(wordOfTheDay[0]);
  const [jokeGuess, setJokeGuess] = useState('');
  const [riddleGuess, setRiddleGuess] = useState('');
  const [jokeResult, setJokeResult] = useState<'correct' | 'wrong' | 'earned' | 'revealed' | null>(null);
  const [riddleResult, setRiddleResult] = useState<'correct' | 'wrong' | 'earned' | 'revealed' | null>(null);

  // Admin state
  const [dailyGoal, setDailyGoal] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminGoalInput, setAdminGoalInput] = useState('');
  const [adminBucksInput, setAdminBucksInput] = useState('');
  const [adminClicks, setAdminClicks] = useState(0);

  // Weather state
  const [weather, setWeather] = useState<{temp: string, condition: string, icon: string} | null>(null);

  // Streak counter state
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [today, setToday] = useState('');

  // Fetch weather for Palos Verdes
  useEffect(() => {
    fetch('https://wttr.in/Palos+Verdes+Estates?format=j1')
      .then(res => res.json())
      .then(data => {
        const current = data.current_condition[0];
        const tempF = current.temp_F;
        const condition = current.weatherDesc[0].value;
        let icon = '☀️';
        const desc = condition.toLowerCase();
        if (desc.includes('cloud')) icon = '☁️';
        if (desc.includes('rain')) icon = '🌧️';
        if (desc.includes('sun') || desc.includes('clear')) icon = '☀️';
        if (desc.includes('fog') || desc.includes('mist')) icon = '🌫️';
        if (desc.includes('part')) icon = '⛅';
        setWeather({ temp: tempF, condition, icon });
      })
      .catch(() => setWeather(null));
  }, []);

  // Load daily content + streak from localStorage
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    setToday(todayStr);

    const savedGoal = localStorage.getItem('sebastianDailyGoal');
    const savedGoalDate = localStorage.getItem('sebastianGoalDate');
    if (savedGoalDate === todayStr && savedGoal) {
      setDailyGoal(savedGoal);
    }

    const savedJokeEarned = localStorage.getItem('jokeEarnedDate');
    const savedRiddleEarned = localStorage.getItem('riddleEarnedDate');
    if (savedJokeEarned === todayStr) setJokeResult('earned');
    if (savedRiddleEarned === todayStr) setRiddleResult('earned');

    // Streak logic
    const savedStreak = localStorage.getItem('sebastianStreak');
    const savedBestStreak = localStorage.getItem('sebastianBestStreak');
    const lastVisit = localStorage.getItem('sebastianLastVisit');

    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak));

    if (lastVisit) {
      const lastDate = new Date(lastVisit);
      const todayDate = new Date(todayStr);
      const diffTime = todayDate.getTime() - lastDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        if (savedStreak) setStreak(parseInt(savedStreak));
      } else if (diffDays === 1) {
        const newStreak = savedStreak ? parseInt(savedStreak) + 1 : 1;
        setStreak(newStreak);
        localStorage.setItem('sebastianStreak', newStreak.toString());
        if (newStreak > (savedBestStreak ? parseInt(savedBestStreak) : 0)) {
          setBestStreak(newStreak);
          localStorage.setItem('sebastianBestStreak', newStreak.toString());
        }
      } else {
        setStreak(1);
        localStorage.setItem('sebastianStreak', '1');
      }
    } else {
      setStreak(1);
      localStorage.setItem('sebastianStreak', '1');
    }

    localStorage.setItem('sebastianLastVisit', todayStr);

    // Pick today's joke, riddle, quote, and word
    const todayDate = new Date();
    const dayOfYear = Math.floor((todayDate.getTime() - new Date(todayDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    setTodayJoke(jokes[dayOfYear % jokes.length]);
    setTodayRiddle(riddles[dayOfYear % riddles.length]);
    setTodayQuote(motivationalQuotes[dayOfYear % motivationalQuotes.length]);
    setTodayWord(wordOfTheDay[dayOfYear % wordOfTheDay.length]);
  }, []);

  const checkJokeAnswer = () => {
    const guess = jokeGuess.toLowerCase().trim();
    if (guess.length < 2) {
      setJokeResult('wrong');
      return;
    }
    const answer = todayJoke.a.toLowerCase();
    if (answer.includes(guess) || guess.includes(answer) || (guess.length > 3 && answer.includes(guess.slice(0, -1)))) {
      setJokeResult('correct');
      addBucks(2);
      localStorage.setItem('jokeEarnedDate', today);
      setTimeout(() => setJokeResult('earned'), 2000);
    } else {
      setJokeResult('wrong');
    }
  };

  const revealJokeAnswer = () => {
    setJokeResult('revealed');
    localStorage.setItem('jokeEarnedDate', today);
  };

  const checkRiddleAnswer = () => {
    const guess = riddleGuess.toLowerCase().trim();
    if (guess.length < 2) {
      setRiddleResult('wrong');
      return;
    }
    const answer = todayRiddle.a.toLowerCase();
    if (answer.includes(guess) || guess.includes(answer)) {
      setRiddleResult('correct');
      addBucks(2);
      localStorage.setItem('riddleEarnedDate', today);
      setTimeout(() => setRiddleResult('earned'), 2000);
    } else {
      setRiddleResult('wrong');
    }
  };

  const revealRiddleAnswer = () => {
    setRiddleResult('revealed');
    localStorage.setItem('riddleEarnedDate', today);
  };

  // Admin functions
  const handleAdminClick = () => {
    const newClicks = adminClicks + 1;
    setAdminClicks(newClicks);
    if (newClicks >= 5) {
      setShowAdmin(true);
      setAdminClicks(0);
    }
    setTimeout(() => setAdminClicks(0), 3000);
  };

  const saveAdminGoal = () => {
    setDailyGoal(adminGoalInput);
    localStorage.setItem('sebastianDailyGoal', adminGoalInput);
    localStorage.setItem('sebastianGoalDate', today);
    setAdminGoalInput('');
  };

  const updateBashBucks = () => {
    const amount = parseInt(adminBucksInput);
    if (!isNaN(amount)) {
      setBucks(amount);
      setAdminBucksInput('');
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Minecraft Decorations */}
      <img
        src="/photos/creeper.png"
        alt="Creeper"
        className="fixed right-0 top-1/4 w-20 md:w-32 opacity-80 hover:opacity-100 z-10 hover:scale-110 transition-transform"
        style={{ transform: 'translateX(30%)' }}
      />
      <img
        src="/photos/crafting-table.png"
        alt="Crafting Table"
        className="fixed left-4 bottom-20 w-16 md:w-24 opacity-70 hover:opacity-100 transition-opacity z-10"
      />
      <img
        src="/photos/diamond-pickaxe.png"
        alt="Diamond Pickaxe"
        className="fixed left-4 top-1/3 w-12 md:w-16 opacity-70 hover:opacity-100 transition-opacity z-10 rotate-45"
      />

      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4">
          <img src="/photos/steve.png" alt="Steve" className="w-16 md:w-24 drop-shadow-lg" />
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-[3px_3px_0_#333]">
            Sebastian&apos;s World
          </h1>
          <img src="/photos/steve.png" alt="Steve" className="w-16 md:w-24 drop-shadow-lg scale-x-[-1]" />
        </div>
        <p className="text-xl text-white drop-shadow-[2px_2px_0_#333] mt-2">
          Welcome, Bash! Pick a zone and let&apos;s go! 🚀
        </p>
        {/* Weather */}
        {weather && (
          <div className="mt-4 inline-block bg-white/80 rounded-full px-6 py-2 pixel-border">
            <span className="text-2xl mr-2">{weather.icon}</span>
            <span className="font-bold text-gray-800">{weather.temp}°F</span>
            <span className="text-gray-600 ml-2 text-sm">in Palos Verdes</span>
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">

        {/* ZONE DOORS */}
        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
          {zoneDoors.map(zone => (
            <Link
              key={zone.href}
              href={zone.href}
              className={`pixel-border bg-gradient-to-br ${zone.color} rounded-lg p-4 md:p-6 text-center hover:scale-105 transition-transform`}
            >
              <div className="text-5xl md:text-6xl mb-2">{zone.emoji}</div>
              <div className={`text-lg md:text-xl font-bold ${zone.text}`}>{zone.name}</div>
              <div className="text-xs md:text-sm text-gray-700 mt-1">{zone.desc}</div>
            </Link>
          ))}
        </div>

        {/* DAILY GOAL, QUOTE & WORD OF THE DAY */}
        <div className="pixel-border bg-gradient-to-br from-cyan-100 to-blue-100 rounded-lg p-6 md:col-span-2">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/80 rounded-lg p-4 pixel-border">
              <h2 className="text-xl font-bold text-cyan-800 mb-2">🎯 Today&apos;s Goal</h2>
              {dailyGoal ? (
                <p className="text-lg text-gray-700">{dailyGoal}</p>
              ) : (
                <p className="text-gray-400 italic">No goal set for today</p>
              )}
            </div>

            <div className="bg-white/80 rounded-lg p-4 pixel-border">
              <h2 className="text-xl font-bold text-blue-800 mb-2">✨ Daily Inspiration</h2>
              <p className="text-base text-gray-700 italic">&quot;{todayQuote.text}&quot;</p>
              <p className="text-sm text-gray-500 mt-1">— {todayQuote.author}</p>
            </div>

            <div className="bg-white/80 rounded-lg p-4 pixel-border">
              <h2 className="text-xl font-bold text-green-800 mb-2">🌎 Word of the Day</h2>
              <div className="text-4xl text-center mb-2">{todayWord.emoji}</div>
              <p className="text-lg text-center"><strong>English:</strong> {todayWord.english}</p>
              <p className="text-lg text-center"><strong>Spanish:</strong> {todayWord.spanish}</p>
              <p className="text-sm text-gray-500 text-center italic">Say it: {todayWord.pronunciation}</p>
            </div>
          </div>
        </div>

        {/* DAILY JOKE */}
        <div className="pixel-border bg-pink-100 rounded-lg p-6">
          <h2 className="text-xl font-bold text-center mb-3 text-pink-800">
            😂 Daily Joke {jokeResult === 'earned' && <span className="text-green-500">✓ +$2!</span>}
          </h2>
          <div className="bg-white rounded-lg p-3 pixel-border">
            <p className="text-base text-gray-800 mb-3">{todayJoke.q}</p>
            {jokeResult === 'earned' || jokeResult === 'revealed' ? (
              <div>
                <p className="text-base font-bold text-pink-600">{todayJoke.display}</p>
                <p className="text-sm mt-1">
                  {jokeResult === 'earned' ? (
                    <span className="text-green-500">Great job! Come back tomorrow! 🌟</span>
                  ) : (
                    <span className="text-gray-500">Answer revealed — try again tomorrow! 🎯</span>
                  )}
                </p>
              </div>
            ) : jokeResult === 'correct' ? (
              <div className="text-xl text-green-500 font-bold bounce">🎉 +$2! 🎉</div>
            ) : (
              <div>
                <input
                  type="text"
                  value={jokeGuess}
                  onChange={(e) => setJokeGuess(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && checkJokeAnswer()}
                  placeholder="Your guess..."
                  className="w-full border-3 border-pink-300 rounded-lg p-2 mb-2 text-sm"
                />
                <div className="flex gap-2">
                  <button onClick={checkJokeAnswer} className="lego-btn text-white font-bold py-1 px-4 rounded-lg text-sm">
                    Guess! 🎯
                  </button>
                  <button onClick={revealJokeAnswer} className="bg-gray-400 text-white font-bold py-1 px-3 rounded-lg text-sm hover:bg-gray-500">
                    Show Answer 👁️
                  </button>
                </div>
                {jokeResult === 'wrong' && <p className="text-red-500 text-sm mt-1">Try again!</p>}
              </div>
            )}
          </div>
        </div>

        {/* DAILY RIDDLE */}
        <div className="pixel-border bg-purple-100 rounded-lg p-6">
          <h2 className="text-xl font-bold text-center mb-3 text-purple-800">
            🤔 Daily Riddle {riddleResult === 'earned' && <span className="text-green-500">✓ +$2!</span>}
          </h2>
          <div className="bg-white rounded-lg p-3 pixel-border">
            <p className="text-base text-gray-800 mb-3">{todayRiddle.q}</p>
            {riddleResult === 'earned' || riddleResult === 'revealed' ? (
              <div>
                <p className="text-base font-bold text-purple-600">{todayRiddle.display}</p>
                <p className="text-sm mt-1">
                  {riddleResult === 'earned' ? (
                    <span className="text-green-500">Great job! Come back tomorrow! 🌟</span>
                  ) : (
                    <span className="text-gray-500">Answer revealed — try again tomorrow! 🎯</span>
                  )}
                </p>
              </div>
            ) : riddleResult === 'correct' ? (
              <div className="text-xl text-green-500 font-bold bounce">🎉 +$2! 🎉</div>
            ) : (
              <div>
                <input
                  type="text"
                  value={riddleGuess}
                  onChange={(e) => setRiddleGuess(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && checkRiddleAnswer()}
                  placeholder="Your guess..."
                  className="w-full border-3 border-purple-300 rounded-lg p-2 mb-2 text-sm"
                />
                <div className="flex gap-2">
                  <button onClick={checkRiddleAnswer} className="lego-btn-blue text-white font-bold py-1 px-4 rounded-lg text-sm">
                    Guess! 🎯
                  </button>
                  <button onClick={revealRiddleAnswer} className="bg-gray-400 text-white font-bold py-1 px-3 rounded-lg text-sm hover:bg-gray-500">
                    Show Answer 👁️
                  </button>
                </div>
                {riddleResult === 'wrong' && <p className="text-red-500 text-sm mt-1">Try again!</p>}
              </div>
            )}
          </div>
        </div>

        {/* BASH BUCKS + STREAK */}
        <div className="pixel-border bg-yellow-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-yellow-800">
            🐷 Bash Bucks Bank 🐷
          </h2>
          <div className="text-center">
            <div className="text-6xl bounce">🐷</div>
            <div className="text-5xl font-bold text-green-600 mt-2">
              ${bashBucks}
            </div>
            <p className="text-yellow-700">Keep being awesome to earn more!</p>
            <p className="text-sm text-yellow-600 mt-1">💡 Earn bucks in every zone!</p>
          </div>
        </div>

        {/* STREAK COUNTER */}
        <div className="pixel-border bg-gradient-to-br from-orange-100 to-red-100 rounded-lg p-6">
          <div className="flex items-center justify-center gap-8 h-full">
            <div className="text-center">
              <div className="text-4xl mb-1">🔥</div>
              <div className="text-3xl font-bold text-orange-600">{streak}</div>
              <div className="text-sm text-orange-700 font-bold">Day Streak!</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-1">🏆</div>
              <div className="text-3xl font-bold text-yellow-600">{bestStreak}</div>
              <div className="text-sm text-yellow-700 font-bold">Best Streak!</div>
            </div>
            <div className="text-center bg-white/70 rounded-lg p-3 pixel-border">
              <p className="text-sm text-gray-600">
                {streak >= 7 ? '🌟 You\'re on fire! Keep it up!' :
                 streak >= 3 ? '💪 Great job! Keep the streak going!' :
                 '👋 Come back tomorrow to build your streak!'}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="text-center mt-8 text-white drop-shadow-[2px_2px_0_#333]">
        <p>Made with ❤️ for Sebastian | <span onClick={handleAdminClick} className="cursor-pointer">Dad + Carl 🦞</span></p>
      </footer>

      {/* Admin Modal */}
      {showAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full pixel-border max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🔧 Parent Admin</h2>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">🎯 Set Today&apos;s Goal:</label>
              <input
                type="text"
                value={adminGoalInput}
                onChange={(e) => setAdminGoalInput(e.target.value)}
                placeholder="e.g., Practice piano for 15 minutes"
                className="w-full border-2 border-gray-300 rounded-lg p-2"
              />
              <button onClick={saveAdminGoal} className="lego-btn-green text-white font-bold py-2 px-4 rounded-lg mt-2">
                Save Goal
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">🐷 Set Bash Bucks Balance:</label>
              <p className="text-sm text-gray-500 mb-1">Current: ${bashBucks}</p>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={adminBucksInput}
                  onChange={(e) => setAdminBucksInput(e.target.value)}
                  placeholder="New amount"
                  className="flex-1 border-2 border-gray-300 rounded-lg p-2"
                />
                <button onClick={updateBashBucks} className="lego-btn-green text-white font-bold py-2 px-4 rounded-lg">
                  Set
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => addBucks(1)} className="flex-1 lego-btn-green text-white font-bold py-2 rounded-lg">+$1</button>
                <button onClick={() => addBucks(5)} className="flex-1 lego-btn-green text-white font-bold py-2 rounded-lg">+$5</button>
                <button onClick={() => addBucks(-1)} className="flex-1 lego-btn text-white font-bold py-2 rounded-lg">-$1</button>
                <button onClick={() => addBucks(-5)} className="flex-1 lego-btn text-white font-bold py-2 rounded-lg">-$5</button>
              </div>
            </div>

            <button onClick={() => setShowAdmin(false)} className="w-full lego-btn text-white font-bold py-2 rounded-lg">
              Close Admin
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
