'use client';

import { useState, useEffect, useRef } from 'react';

// Jokes and Riddles for kids
const jokes = [
  { q: "Why did the creeper cross the road?", a: "to get to the other side", display: "To get to the other SSSSSIDE! 💥" },
  { q: "What do you call a pig that knows karate?", a: "pork chop", display: "A pork chop! 🐷" },
  { q: "Why can't Elsa hold a balloon?", a: "let it go", display: "Because she'll LET IT GO! 🎈" },
  { q: "What do you call a dinosaur that crashes their car?", a: "tyrannosaurus wrecks", display: "Tyrannosaurus WRECKS! 🦖" },
  { q: "Why did the teddy bear say no to dessert?", a: "stuffed", display: "Because she was already STUFFED! 🧸" },
  { q: "What do you call a fish without eyes?", a: "fsh", display: "A fsh! 🐟" },
  { q: "Why do bees have sticky hair?", a: "honeycomb", display: "Because they use HONEYcombs! 🐝" },
  { q: "What do you call a sleeping dinosaur?", a: "dino snore", display: "A dino-SNORE! 😴" },
  { q: "Why did the Minecraft player bring a ladder?", a: "next level", display: "To get to the NEXT LEVEL! 🎮" },
  { q: "What's a Lego's favorite music?", a: "block and roll", display: "Block and roll! 🧱" },
];

const riddles = [
  { q: "I have hands but can't clap. What am I?", a: "clock", display: "A clock! ⏰" },
  { q: "What has ears but cannot hear?", a: "corn", display: "Corn! 🌽" },
  { q: "What gets wetter the more it dries?", a: "towel", display: "A towel! 🛁" },
  { q: "What can you catch but not throw?", a: "cold", display: "A cold! 🤧" },
  { q: "What has legs but doesn't walk?", a: "table", display: "A table! 🪑" },
  { q: "What goes up but never comes down?", a: "age", display: "Your age! 🎂" },
  { q: "I'm tall when I'm young and short when I'm old. What am I?", a: "candle", display: "A candle! 🕯️" },
  { q: "What has a head and a tail but no body?", a: "coin", display: "A coin! 🪙" },
];

const motivationalQuotes = [
  { text: "You're braver than you believe, stronger than you seem, and smarter than you think!", author: "Winnie the Pooh" },
  { text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go!", author: "Dr. Seuss" },
  { text: "You're off to great places! Today is your day!", author: "Dr. Seuss" },
  { text: "Always let your conscience be your guide.", author: "Pinocchio" },
  { text: "Even miracles take a little time.", author: "Cinderella" },
  { text: "Just keep swimming!", author: "Dory" },
  { text: "To infinity and beyond!", author: "Buzz Lightyear" },
  { text: "Adventure is out there!", author: "Up" },
  { text: "Ohana means family. Family means nobody gets left behind.", author: "Lilo & Stitch" },
  { text: "The flower that blooms in adversity is the most rare and beautiful of all.", author: "Mulan" },
];

// Spanish/English word pairs for kids
const wordOfTheDay = [
  { english: "Hello", spanish: "Hola", emoji: "👋", pronunciation: "OH-lah" },
  { english: "Goodbye", spanish: "Adiós", emoji: "👋", pronunciation: "ah-dee-OHS" },
  { english: "Please", spanish: "Por favor", emoji: "🙏", pronunciation: "por fah-VOR" },
  { english: "Thank you", spanish: "Gracias", emoji: "💕", pronunciation: "GRAH-see-ahs" },
  { english: "Dog", spanish: "Perro", emoji: "🐕", pronunciation: "PEH-rro" },
  { english: "Cat", spanish: "Gato", emoji: "🐱", pronunciation: "GAH-toh" },
  { english: "Sun", spanish: "Sol", emoji: "☀️", pronunciation: "SOHL" },
  { english: "Moon", spanish: "Luna", emoji: "🌙", pronunciation: "LOO-nah" },
  { english: "Star", spanish: "Estrella", emoji: "⭐", pronunciation: "es-TREY-yah" },
  { english: "Water", spanish: "Agua", emoji: "💧", pronunciation: "AH-gwah" },
  { english: "Food", spanish: "Comida", emoji: "🍕", pronunciation: "koh-MEE-dah" },
  { english: "Happy", spanish: "Feliz", emoji: "😊", pronunciation: "feh-LEES" },
  { english: "Love", spanish: "Amor", emoji: "❤️", pronunciation: "ah-MOR" },
  { english: "Friend", spanish: "Amigo", emoji: "🤝", pronunciation: "ah-MEE-goh" },
  { english: "Family", spanish: "Familia", emoji: "👨‍👩‍👦", pronunciation: "fah-MEE-lee-ah" },
  { english: "Book", spanish: "Libro", emoji: "📚", pronunciation: "LEE-broh" },
  { english: "Tree", spanish: "Árbol", emoji: "🌳", pronunciation: "AR-bohl" },
  { english: "Flower", spanish: "Flor", emoji: "🌸", pronunciation: "FLOHR" },
  { english: "Bird", spanish: "Pájaro", emoji: "🐦", pronunciation: "PAH-hah-roh" },
  { english: "Fish", spanish: "Pez", emoji: "🐟", pronunciation: "PEHS" },
  { english: "Turtle", spanish: "Tortuga", emoji: "🐢", pronunciation: "tor-TOO-gah" },
  { english: "Panda", spanish: "Panda", emoji: "🐼", pronunciation: "PAHN-dah" },
  { english: "Ocean", spanish: "Océano", emoji: "🌊", pronunciation: "oh-SEH-ah-noh" },
  { english: "Beach", spanish: "Playa", emoji: "🏖️", pronunciation: "PLY-ah" },
  { english: "House", spanish: "Casa", emoji: "🏠", pronunciation: "KAH-sah" },
  { english: "School", spanish: "Escuela", emoji: "🏫", pronunciation: "es-KWEH-lah" },
  { english: "Red", spanish: "Rojo", emoji: "🔴", pronunciation: "ROH-hoh" },
  { english: "Blue", spanish: "Azul", emoji: "🔵", pronunciation: "ah-SOOL" },
  { english: "Green", spanish: "Verde", emoji: "🟢", pronunciation: "BEHR-deh" },
  { english: "Yellow", spanish: "Amarillo", emoji: "🟡", pronunciation: "ah-mah-REE-yoh" },
];

interface Reminder {
  id: string;
  date: string;
  text: string;
}

interface JournalEntry {
  date: string;
  content: string;
}

interface Drawing {
  id: string;
  date: string;
  dataUrl: string;
  name: string;
}

export default function SebastianWorld() {
  const [bashBucks, setBashBucks] = useState(0);
  const [todayJoke, setTodayJoke] = useState(jokes[0]);
  const [todayRiddle, setTodayRiddle] = useState(riddles[0]);
  const [todayQuote, setTodayQuote] = useState(motivationalQuotes[0]);
  const [todayWord, setTodayWord] = useState(wordOfTheDay[0]);
  const [jokeGuess, setJokeGuess] = useState('');
  const [riddleGuess, setRiddleGuess] = useState('');
  const [jokeResult, setJokeResult] = useState<'correct' | 'wrong' | 'earned' | null>(null);
  const [riddleResult, setRiddleResult] = useState<'correct' | 'wrong' | 'earned' | null>(null);
  const [mathProblem, setMathProblem] = useState({ num1: 0, num2: 0, op: '+', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [mathResult, setMathResult] = useState<'correct' | 'wrong' | null>(null);
  const [score, setScore] = useState(0);
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newReminder, setNewReminder] = useState('');
  
  // Journal state
  const [journalEntry, setJournalEntry] = useState('');
  const [journalHistory, setJournalHistory] = useState<JournalEntry[]>([]);
  const [showJournalHistory, setShowJournalHistory] = useState(false);
  
  // Admin state
  const [dailyGoal, setDailyGoal] = useState('');
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminGoalInput, setAdminGoalInput] = useState('');
  const [adminBucksInput, setAdminBucksInput] = useState('');
  const [adminClicks, setAdminClicks] = useState(0);
  
  // Drawing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [savedDrawings, setSavedDrawings] = useState<Drawing[]>([]);
  const [drawingName, setDrawingName] = useState('');
  
  // Photo album state
  // Weather state
  const [weather, setWeather] = useState<{temp: string, condition: string, icon: string} | null>(null);

  const [photos, setPhotos] = useState<{id: string, url: string, caption: string, isImage: boolean}[]>([
    { id: '1', url: '/photos/sea-turtle.jpg', caption: 'Swimming with Sea Turtles 🐢', isImage: true },
    { id: '2', url: '/photos/fu-bao-1.jpg', caption: 'Fu Bao Eating Bamboo 🐼', isImage: true },
    { id: '3', url: '/photos/fu-bao-2.jpg', caption: 'Sleepy Fu Bao 😴', isImage: true },
    { id: '4', url: '/photos/moby.jpg', caption: 'Moby the Snow Dog 🐕', isImage: true },
    { id: '5', url: '/photos/hawaii.jpg', caption: 'Hawaii Adventure 🌺', isImage: true },
  ]);

  const today = new Date().toISOString().split('T')[0];

  // Fetch weather for Palos Verdes
  useEffect(() => {
    fetch('https://wttr.in/Palos+Verdes+Estates?format=j1')
      .then(res => res.json())
      .then(data => {
        const current = data.current_condition[0];
        const tempF = current.temp_F;
        const condition = current.weatherDesc[0].value;
        // Map weather to fun emoji
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

  // Load data from localStorage
  useEffect(() => {
    const savedBucks = localStorage.getItem('bashBucks');
    if (savedBucks) setBashBucks(parseInt(savedBucks));
    
    const savedReminders = localStorage.getItem('sebastianReminders');
    if (savedReminders) setReminders(JSON.parse(savedReminders));
    
    const savedJournalHistory = localStorage.getItem('sebastianJournalHistory');
    if (savedJournalHistory) setJournalHistory(JSON.parse(savedJournalHistory));
    
    const savedDrawings = localStorage.getItem('sebastianDrawings');
    if (savedDrawings) setSavedDrawings(JSON.parse(savedDrawings));
    
    // Photos are now hardcoded with real images - don't load from localStorage
    // const savedPhotos = localStorage.getItem('sebastianPhotos');
    // if (savedPhotos) setPhotos(JSON.parse(savedPhotos));
    
    const savedTodayJournal = localStorage.getItem('sebastianJournalToday');
    const savedJournalDate = localStorage.getItem('sebastianJournalDate');
    if (savedJournalDate === today && savedTodayJournal) {
      setJournalEntry(savedTodayJournal);
    }
    
    const savedGoal = localStorage.getItem('sebastianDailyGoal');
    const savedGoalDate = localStorage.getItem('sebastianGoalDate');
    if (savedGoalDate === today && savedGoal) {
      setDailyGoal(savedGoal);
    }
    
    const savedJokeEarned = localStorage.getItem('jokeEarnedDate');
    const savedRiddleEarned = localStorage.getItem('riddleEarnedDate');
    
    if (savedJokeEarned === today) setJokeResult('earned');
    if (savedRiddleEarned === today) setRiddleResult('earned');
    
    const todayDate = new Date();
    const dayOfYear = Math.floor((todayDate.getTime() - new Date(todayDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    setTodayJoke(jokes[dayOfYear % jokes.length]);
    setTodayRiddle(riddles[dayOfYear % riddles.length]);
    setTodayQuote(motivationalQuotes[dayOfYear % motivationalQuotes.length]);
    setTodayWord(wordOfTheDay[dayOfYear % wordOfTheDay.length]);
    
    generateMathProblem();
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('bashBucks', bashBucks.toString());
  }, [bashBucks]);

  useEffect(() => {
    localStorage.setItem('sebastianReminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('sebastianJournalHistory', JSON.stringify(journalHistory));
  }, [journalHistory]);

  useEffect(() => {
    localStorage.setItem('sebastianDrawings', JSON.stringify(savedDrawings));
  }, [savedDrawings]);

  // Photos are hardcoded now - no need to save to localStorage
  // useEffect(() => {
  //   localStorage.setItem('sebastianPhotos', JSON.stringify(photos));
  // }, [photos]);

  const addBucks = (amount: number) => {
    setBashBucks(prev => Math.max(0, prev + amount));
  };

  const generateMathProblem = () => {
    // 3rd grade level: +, -, × with larger numbers
    const ops = ['+', '-', '×', '×'];  // multiplication weighted more for practice
    const op = ops[Math.floor(Math.random() * ops.length)];
    let num1: number, num2: number, answer: number;
    
    if (op === '×') {
      // Multiplication: focus on times tables up to 12
      num1 = Math.floor(Math.random() * 12) + 1;
      num2 = Math.floor(Math.random() * 12) + 1;
      answer = num1 * num2;
    } else if (op === '+') {
      // Addition: two-digit numbers
      num1 = Math.floor(Math.random() * 50) + 10;
      num2 = Math.floor(Math.random() * 50) + 10;
      answer = num1 + num2;
    } else {
      // Subtraction: ensure positive result, two-digit numbers
      num1 = Math.floor(Math.random() * 50) + 25;
      num2 = Math.floor(Math.random() * 25) + 1;
      answer = num1 - num2;
    }
    
    setMathProblem({ num1, num2, op, answer });
    setUserAnswer('');
    setMathResult(null);
  };

  const checkMathAnswer = () => {
    if (parseInt(userAnswer) === mathProblem.answer) {
      setMathResult('correct');
      const newScore = score + 1;
      setScore(newScore);
      
      // Award $1 Bash Buck for every 10 correct answers!
      if (newScore % 10 === 0) {
        addBucks(1);
        setTimeout(() => {
          alert(`🎉 Amazing! 10 correct answers = +$1 Bash Buck! 🐷💰`);
        }, 500);
      }
      
      setTimeout(() => generateMathProblem(), 1500);
    } else {
      setMathResult('wrong');
    }
  };

  const checkJokeAnswer = () => {
    const guess = jokeGuess.toLowerCase().trim();
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

  const checkRiddleAnswer = () => {
    const guess = riddleGuess.toLowerCase().trim();
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

  // Journal functions
  const saveJournalEntry = () => {
    if (!journalEntry.trim()) return;
    
    localStorage.setItem('sebastianJournalToday', journalEntry);
    localStorage.setItem('sebastianJournalDate', today);
    
    const existingIndex = journalHistory.findIndex(e => e.date === today);
    if (existingIndex >= 0) {
      const newHistory = [...journalHistory];
      newHistory[existingIndex].content = journalEntry;
      setJournalHistory(newHistory);
    } else {
      setJournalHistory([...journalHistory, { date: today, content: journalEntry }]);
    }
  };

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;
    
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas && drawingName.trim()) {
      const dataUrl = canvas.toDataURL();
      const newDrawing: Drawing = {
        id: Date.now().toString(),
        date: today,
        dataUrl,
        name: drawingName.trim()
      };
      setSavedDrawings([...savedDrawings, newDrawing]);
      setDrawingName('');
      clearCanvas();
    }
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
      setBashBucks(amount);
      setAdminBucksInput('');
    }
  };

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const formatDate = (day: number) => {
    const d = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return d.toISOString().split('T')[0];
  };

  const addReminder = () => {
    if (!selectedDate || !newReminder.trim()) return;
    const reminder: Reminder = {
      id: Date.now().toString(),
      date: selectedDate,
      text: newReminder.trim()
    };
    setReminders([...reminders, reminder]);
    setNewReminder('');
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  const colors = ['#000000', '#FF0000', '#FF9900', '#FFFF00', '#00FF00', '#00FFFF', '#0066FF', '#9900FF', '#FF00FF', '#8B4513'];

  return (
    <main className="min-h-screen p-4 md:p-8 relative overflow-hidden">
      {/* Minecraft Decorations */}
      <img 
        src="/photos/creeper.png" 
        alt="Creeper" 
        className="fixed right-0 top-1/4 w-20 md:w-32 opacity-80 hover:opacity-100 transition-opacity z-10 hover:scale-110 transition-transform"
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
          Welcome, Bash! Let&apos;s have fun! 🚀
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

        {/* BASH BUCKS PIGGY BANK - View Only */}
        <div className="pixel-border bg-yellow-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-yellow-800">
            🐷 Bash Bucks Bank 🐷
          </h2>
          <div className="text-center mb-4">
            <div className="text-6xl bounce">🐷</div>
            <div className="text-5xl font-bold text-green-600 mt-2">
              ${bashBucks}
            </div>
            <p className="text-yellow-700">Keep being awesome to earn more!</p>
            <p className="text-sm text-yellow-600 mt-1">💡 Earn $2 for each joke & riddle!</p>
          </div>
        </div>

        {/* MATH GAME */}
        <div className="pixel-border bg-blue-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-blue-800">
            🧮 Math Adventure 🧮
          </h2>
          <div className="text-center mb-4">
            <p className="text-lg text-blue-600">Score: ⭐ {score}</p>
            <p className="text-xs text-blue-500">💰 Get 10 correct = +$1 Bash Buck! ({10 - (score % 10)} more to go!)</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center pixel-border">
            <div className="text-3xl font-bold text-gray-800 mb-4">
              {mathProblem.num1} {mathProblem.op} {mathProblem.num2} = ?
            </div>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && checkMathAnswer()}
              className="text-2xl font-bold text-center w-20 border-4 border-blue-400 rounded-lg p-2 mb-4"
              placeholder="?"
            />
            <div className="flex gap-2 justify-center">
              <button onClick={checkMathAnswer} className="lego-btn-blue text-white font-bold py-2 px-4 rounded-lg">
                Check! ✓
              </button>
              <button onClick={generateMathProblem} className="lego-btn text-white font-bold py-2 px-4 rounded-lg">
                New 🔄
              </button>
            </div>
            {mathResult === 'correct' && (
              <div className="mt-3 text-2xl text-green-500 font-bold bounce">🎉 CORRECT! 🎉</div>
            )}
            {mathResult === 'wrong' && (
              <div className="mt-3 text-xl text-red-500 font-bold wiggle">Try again! 💪</div>
            )}
          </div>
        </div>

        {/* DRAWING PAD */}
        <div className="pixel-border bg-indigo-100 rounded-lg p-6 md:col-span-2">
          <h2 className="text-2xl font-bold text-center mb-4 text-indigo-800">
            🎨 Drawing Pad 🎨
          </h2>
          <div className="bg-white rounded-lg p-4 pixel-border">
            {/* Color Palette */}
            <div className="flex flex-wrap gap-2 mb-3 justify-center">
              {colors.map(color => (
                <button
                  key={color}
                  onClick={() => setBrushColor(color)}
                  className={`w-8 h-8 rounded-full border-4 ${brushColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <button
                onClick={() => setBrushColor('#FFFFFF')}
                className={`w-8 h-8 rounded-full border-4 bg-white ${brushColor === '#FFFFFF' ? 'border-gray-800' : 'border-gray-300'}`}
                title="Eraser"
              >
                🧹
              </button>
            </div>
            
            {/* Brush Size */}
            <div className="flex items-center gap-2 mb-3 justify-center">
              <span className="text-sm">Size:</span>
              <input
                type="range"
                min="2"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-32"
              />
              <span className="text-sm">{brushSize}px</span>
            </div>

            {/* Canvas */}
            <canvas
              ref={canvasRef}
              width={400}
              height={300}
              className="border-4 border-indigo-300 rounded-lg mx-auto block cursor-crosshair touch-none"
              style={{ maxWidth: '100%' }}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
            />

            {/* Save Controls */}
            <div className="flex gap-2 mt-3 justify-center flex-wrap">
              <input
                type="text"
                value={drawingName}
                onChange={(e) => setDrawingName(e.target.value)}
                placeholder="Name your art..."
                className="border-2 border-indigo-300 rounded-lg p-2 w-40"
              />
              <button onClick={saveDrawing} className="lego-btn-green text-white font-bold py-2 px-4 rounded-lg">
                Save 💾
              </button>
              <button onClick={clearCanvas} className="lego-btn text-white font-bold py-2 px-4 rounded-lg">
                Clear 🗑️
              </button>
            </div>

            {/* Saved Drawings */}
            {savedDrawings.length > 0 && (
              <div className="mt-4">
                <h3 className="font-bold text-indigo-700 mb-2">🖼️ My Art Gallery:</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {savedDrawings.slice(-6).map(d => (
                    <div key={d.id} className="text-center">
                      <img src={d.dataUrl} alt={d.name} className="w-full rounded border-2 border-indigo-200" />
                      <p className="text-xs text-gray-600 truncate">{d.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DAILY JOURNAL */}
        <div className="pixel-border bg-teal-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-teal-800">
            📝 My Journal 📝
          </h2>
          <div className="bg-white rounded-lg p-4 pixel-border">
            <p className="text-sm text-teal-600 mb-2">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="What happened today?"
              className="w-full h-24 border-4 border-teal-300 rounded-lg p-2 text-base resize-none"
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
                  <div key={i} className="bg-teal-50 p-2 rounded mb-1 text-sm">
                    <span className="font-bold">{new Date(entry.date).toLocaleDateString()}:</span> {entry.content.slice(0, 50)}...
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* PHOTO ALBUM */}
        <div className="pixel-border bg-rose-100 rounded-lg p-6 md:col-span-2">
          <h2 className="text-2xl font-bold text-center mb-4 text-rose-800">
            📸 My Photo Album 📸
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {photos.map(photo => (
              <div key={photo.id} className="bg-white rounded-lg p-2 pixel-border text-center hover:scale-105 transition-transform">
                {photo.isImage ? (
                  <img 
                    src={photo.url} 
                    alt={photo.caption}
                    className="w-full h-32 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <div className="text-5xl mb-1">{photo.url}</div>
                )}
                <p className="font-bold text-rose-700 text-xs">{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DAILY JOKE */}
        <div className="pixel-border bg-pink-100 rounded-lg p-6">
          <h2 className="text-xl font-bold text-center mb-3 text-pink-800">
            😂 Daily Joke {jokeResult === 'earned' && <span className="text-green-500">✓ +$2!</span>}
          </h2>
          <div className="bg-white rounded-lg p-3 pixel-border">
            <p className="text-base text-gray-800 mb-3">{todayJoke.q}</p>
            {jokeResult === 'earned' ? (
              <div>
                <p className="text-base font-bold text-pink-600">{todayJoke.display}</p>
                <p className="text-green-500 text-sm mt-1">Come back tomorrow! 🌟</p>
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
                <button onClick={checkJokeAnswer} className="lego-btn text-white font-bold py-1 px-4 rounded-lg text-sm">
                  Guess! 🎯
                </button>
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
            {riddleResult === 'earned' ? (
              <div>
                <p className="text-base font-bold text-purple-600">{todayRiddle.display}</p>
                <p className="text-green-500 text-sm mt-1">Come back tomorrow! 🌟</p>
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
                <button onClick={checkRiddleAnswer} className="lego-btn-blue text-white font-bold py-1 px-4 rounded-lg text-sm">
                  Guess! 🎯
                </button>
                {riddleResult === 'wrong' && <p className="text-red-500 text-sm mt-1">Try again!</p>}
              </div>
            )}
          </div>
        </div>

        {/* CALENDAR */}
        <div className="pixel-border bg-orange-100 rounded-lg p-6 md:col-span-2">
          <h2 className="text-2xl font-bold text-center mb-4 text-orange-800">📅 My Calendar 📅</h2>
          <div className="bg-white rounded-lg p-4 pixel-border">
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="lego-btn text-white font-bold py-1 px-3 rounded-lg">◀</button>
              <h3 className="text-lg font-bold text-orange-700">{monthName}</h3>
              <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="lego-btn text-white font-bold py-1 px-3 rounded-lg">▶</button>
            </div>
            
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center font-bold text-orange-600 text-xs">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {Array(firstDay).fill(null).map((_, i) => <div key={`e-${i}`} className="h-8"></div>)}
              {Array(daysInMonth).fill(null).map((_, i) => {
                const day = i + 1;
                const dateStr = formatDate(day);
                const hasReminder = reminders.some(r => r.date === dateStr);
                const isSelected = selectedDate === dateStr;
                const isToday = today === dateStr;
                
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`h-8 rounded font-bold text-sm transition-all ${
                      isSelected ? 'bg-orange-500 text-white scale-105' :
                      isToday ? 'bg-yellow-300 text-orange-800' :
                      hasReminder ? 'bg-green-200 text-green-800' :
                      'bg-orange-50 hover:bg-orange-200 text-orange-700'
                    }`}
                  >
                    {day}{hasReminder && '📌'}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <div className="mt-3 p-2 bg-orange-50 rounded-lg">
                <h4 className="font-bold text-orange-700 text-sm mb-2">
                  {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </h4>
                {reminders.filter(r => r.date === selectedDate).map(r => (
                  <div key={r.id} className="flex justify-between items-center bg-white p-1 rounded mb-1 text-sm">
                    <span>{r.text}</span>
                    <button onClick={() => deleteReminder(r.id)} className="text-red-500 font-bold">✕</button>
                  </div>
                ))}
                <div className="flex gap-1 mt-1">
                  <input
                    type="text"
                    value={newReminder}
                    onChange={(e) => setNewReminder(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addReminder()}
                    placeholder="Add..."
                    className="flex-1 border-2 border-orange-300 rounded p-1 text-sm"
                  />
                  <button onClick={addReminder} className="lego-btn-green text-white font-bold py-1 px-2 rounded text-sm">+</button>
                </div>
              </div>
            )}
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
