'use client';

// 🎮 PLAYROOM — virtual pet, drawing pad, memory match, photos, and calendar!

import { useState, useEffect, useRef } from 'react';
import { useBashBucks } from '@/lib/useBashBucks';

interface Reminder {
  id: string;
  date: string;
  text: string;
}

interface Drawing {
  id: string;
  date: string;
  dataUrl: string;
  name: string;
}

export default function Playroom() {
  const { bashBucks, addBucks } = useBashBucks();
  const [today, setToday] = useState('');

  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newReminder, setNewReminder] = useState('');

  // Drawing state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [savedDrawings, setSavedDrawings] = useState<Drawing[]>([]);
  const [drawingName, setDrawingName] = useState('');
  const [showStickers, setShowStickers] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Photo album
  const photos = [
    { id: '1', url: '/photos/sea-turtle.jpg', caption: 'Swimming with Sea Turtles 🐢', isImage: true },
    { id: '2', url: '/photos/fu-bao-1.jpg', caption: 'Fu Bao Eating Bamboo 🐼', isImage: true },
    { id: '3', url: '/photos/fu-bao-2.jpg', caption: 'Sleepy Fu Bao 😴', isImage: true },
    { id: '4', url: '/photos/moby.jpg', caption: 'Moby the Snow Dog 🐕', isImage: true },
    { id: '5', url: '/photos/hawaii.jpg', caption: 'Hawaii Adventure 🌺', isImage: true },
  ];

  // Virtual Pet state
  const [pet, setPet] = useState<{
    name: string;
    type: string;
    emoji: string;
    hunger: number;
    happiness: number;
    energy: number;
    level: number;
    xp: number;
    lastFed: string;
    lastPlayed: string;
  } | null>(null);
  const [showPetSelector, setShowPetSelector] = useState(false);
  const [petNameInput, setPetNameInput] = useState('');

  // Memory Match Game state
  const [memoryCards, setMemoryCards] = useState<{id: number; emoji: string; isFlipped: boolean; isMatched: boolean}[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryGameWon, setMemoryGameWon] = useState(false);
  const [memoryBestScore, setMemoryBestScore] = useState<number | null>(null);

  // Load data from localStorage
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    setToday(todayStr);

    const savedReminders = localStorage.getItem('sebastianReminders');
    if (savedReminders) setReminders(JSON.parse(savedReminders));

    const savedDrawingsData = localStorage.getItem('sebastianDrawings');
    if (savedDrawingsData) setSavedDrawings(JSON.parse(savedDrawingsData));

    const savedMemoryBest = localStorage.getItem('sebastianMemoryBest');
    if (savedMemoryBest) setMemoryBestScore(parseInt(savedMemoryBest));

    initMemoryGame();

    // Load pet + decay stats based on days since the pet was last checked on
    const savedPet = localStorage.getItem('sebastianPet');
    if (savedPet) {
      const petData = JSON.parse(savedPet);
      const lastSeen = localStorage.getItem('sebastianPetLastSeen');
      if (lastSeen && lastSeen !== todayStr) {
        const daysSince = Math.min(3, Math.ceil((new Date(todayStr).getTime() - new Date(lastSeen).getTime()) / (1000 * 60 * 60 * 24)));
        petData.hunger = Math.max(0, petData.hunger - (10 * daysSince));
        petData.happiness = Math.max(0, petData.happiness - (5 * daysSince));
        petData.energy = Math.min(100, petData.energy + (20 * daysSince));
        localStorage.setItem('sebastianPet', JSON.stringify(petData));
      }
      setPet(petData);
    } else if (!localStorage.getItem('sebastianPetSkipped')) {
      setShowPetSelector(true);
    }
    localStorage.setItem('sebastianPetLastSeen', todayStr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  useEffect(() => {
    localStorage.setItem('sebastianReminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('sebastianDrawings', JSON.stringify(savedDrawings));
  }, [savedDrawings]);

  // ── Drawing functions ──
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

  const addSticker = (sticker: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const x = Math.random() * (canvas.width - 40) + 20;
        const y = Math.random() * (canvas.height - 40) + 20;
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sticker, x, y);
      }
    }
  };

  const loadTemplate = (template: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setSelectedTemplate(template);

    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 2;

    const w = canvas.width;
    const h = canvas.height;

    switch (template) {
      case 'house':
        ctx.strokeRect(w/2 - 60, h/2 + 20, 120, 80);
        ctx.beginPath();
        ctx.moveTo(w/2 - 70, h/2 + 20);
        ctx.lineTo(w/2, h/2 - 60);
        ctx.lineTo(w/2 + 70, h/2 + 20);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeRect(w/2 - 20, h/2 + 50, 40, 50);
        ctx.strokeRect(w/2 - 40, h/2 + 30, 30, 30);
        break;
      case 'sun':
        ctx.beginPath();
        ctx.arc(w/2, h/2, 50, 0, 2 * Math.PI);
        ctx.stroke();
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI * 2) / 8;
          ctx.beginPath();
          ctx.moveTo(w/2 + Math.cos(angle) * 60, h/2 + Math.sin(angle) * 60);
          ctx.lineTo(w/2 + Math.cos(angle) * 85, h/2 + Math.sin(angle) * 85);
          ctx.stroke();
        }
        break;
      case 'tree':
        ctx.strokeRect(w/2 - 15, h/2 + 60, 30, 70);
        ctx.beginPath();
        ctx.arc(w/2, h/2 - 20, 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(w/2 - 40, h/2 + 10, 35, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(w/2 + 40, h/2 + 10, 35, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      case 'flower':
        ctx.strokeRect(w/2 - 5, h/2 + 20, 10, 100);
        ctx.beginPath();
        ctx.arc(w/2, h/2, 25, 0, 2 * Math.PI);
        ctx.stroke();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI * 2) / 6;
          ctx.beginPath();
          ctx.ellipse(
            w/2 + Math.cos(angle) * 45,
            h/2 + Math.sin(angle) * 45,
            20, 35,
            angle,
            0, 2 * Math.PI
          );
          ctx.stroke();
        }
        break;
      case 'cat':
        ctx.beginPath();
        ctx.arc(w/2, h/2 - 30, 45, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w/2 - 35, h/2 - 60);
        ctx.lineTo(w/2 - 50, h/2 - 90);
        ctx.lineTo(w/2 - 15, h/2 - 70);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(w/2 + 35, h/2 - 60);
        ctx.lineTo(w/2 + 50, h/2 - 90);
        ctx.lineTo(w/2 + 15, h/2 - 70);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeRect(w/2 - 35, h/2 + 15, 70, 90);
        ctx.beginPath();
        ctx.moveTo(w/2 + 35, h/2 + 40);
        ctx.quadraticCurveTo(w/2 + 70, h/2 + 20, w/2 + 60, h/2 - 10);
        ctx.stroke();
        break;
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

  // ── Pet functions ──
  const adoptPet = (type: string, emoji: string) => {
    if (!petNameInput.trim()) return;
    const newPet = {
      name: petNameInput.trim(),
      type,
      emoji,
      hunger: 80,
      happiness: 80,
      energy: 80,
      level: 1,
      xp: 0,
      lastFed: today,
      lastPlayed: today,
    };
    setPet(newPet);
    localStorage.setItem('sebastianPet', JSON.stringify(newPet));
    setShowPetSelector(false);
  };

  const feedPet = () => {
    if (!pet || bashBucks < 2) return;
    const updatedPet = {
      ...pet,
      hunger: Math.min(100, pet.hunger + 25),
      happiness: Math.min(100, pet.happiness + 5),
      xp: pet.xp + 10,
      lastFed: today,
    };
    if (updatedPet.xp >= updatedPet.level * 50) {
      updatedPet.level += 1;
      updatedPet.xp = 0;
    }
    setPet(updatedPet);
    localStorage.setItem('sebastianPet', JSON.stringify(updatedPet));
    addBucks(-2);
  };

  const playWithPet = () => {
    if (!pet || bashBucks < 1 || pet.energy < 20) return;
    const updatedPet = {
      ...pet,
      happiness: Math.min(100, pet.happiness + 20),
      energy: Math.max(0, pet.energy - 20),
      hunger: Math.max(0, pet.hunger - 10),
      xp: pet.xp + 15,
      lastPlayed: today,
    };
    if (updatedPet.xp >= updatedPet.level * 50) {
      updatedPet.level += 1;
      updatedPet.xp = 0;
    }
    setPet(updatedPet);
    localStorage.setItem('sebastianPet', JSON.stringify(updatedPet));
    addBucks(-1);
  };

  const groomPet = () => {
    if (!pet || bashBucks < 1) return;
    const updatedPet = {
      ...pet,
      happiness: Math.min(100, pet.happiness + 15),
      xp: pet.xp + 5,
    };
    if (updatedPet.xp >= updatedPet.level * 50) {
      updatedPet.level += 1;
      updatedPet.xp = 0;
    }
    setPet(updatedPet);
    localStorage.setItem('sebastianPet', JSON.stringify(updatedPet));
    addBucks(-1);
  };

  const letPetSleep = () => {
    if (!pet) return;
    const updatedPet = {
      ...pet,
      energy: Math.min(100, pet.energy + 40),
      hunger: Math.max(0, pet.hunger - 5),
    };
    setPet(updatedPet);
    localStorage.setItem('sebastianPet', JSON.stringify(updatedPet));
  };

  const getPetMood = () => {
    if (!pet) return '';
    const avg = (pet.hunger + pet.happiness + pet.energy) / 3;
    if (avg >= 80) return '😄';
    if (avg >= 60) return '🙂';
    if (avg >= 40) return '😐';
    if (avg >= 20) return '😕';
    return '😢';
  };

  // ── Memory Match functions ──
  const initMemoryGame = () => {
    const emojis = ['🐢', '🐕', '🦁', '🦖', '🚀', '🌈', '💎', '⚡'];
    const pairs = [...emojis, ...emojis];
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    const cards = pairs.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    setMemoryCards(cards);
    setFlippedCards([]);
    setMemoryMoves(0);
    setMemoryGameWon(false);
  };

  const flipCard = (id: number) => {
    if (memoryGameWon) return;
    if (flippedCards.length === 2) return;
    if (memoryCards[id].isFlipped || memoryCards[id].isMatched) return;

    const newCards = [...memoryCards];
    newCards[id].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves(memoryMoves + 1);
      const [first, second] = newFlipped;

      if (newCards[first].emoji === newCards[second].emoji) {
        setTimeout(() => {
          const matchedCards = [...memoryCards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setMemoryCards(matchedCards);
          setFlippedCards([]);

          if (matchedCards.every(card => card.isMatched)) {
            setMemoryGameWon(true);
            const reward = memoryMoves <= 12 ? 5 : memoryMoves <= 16 ? 3 : 1;
            addBucks(reward);

            if (!memoryBestScore || memoryMoves < memoryBestScore) {
              setMemoryBestScore(memoryMoves);
              localStorage.setItem('sebastianMemoryBest', memoryMoves.toString());
            }

            setTimeout(() => {
              alert(`🎉 You won in ${memoryMoves} moves! +$${reward} Bash Bucks!`);
            }, 500);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const resetCards = [...memoryCards];
          resetCards[first].isFlipped = false;
          resetCards[second].isFlipped = false;
          setMemoryCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // ── Calendar functions ──
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
    <main className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-[3px_3px_0_#333]">
          🎮 Playroom 🎮
        </h1>
        <p className="text-lg text-white drop-shadow-[2px_2px_0_#333] mt-2">
          Your pet, your art, your games — all in one place!
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">

        {/* ADOPT A PET CTA */}
        {!pet && (
          <div className="pixel-border bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 md:col-span-2 text-center">
            <h2 className="text-2xl font-bold mb-3 text-purple-800">🐾 Want a Pet? 🐾</h2>
            <p className="text-gray-600 mb-4">Adopt a virtual pet to feed, play with, and level up!</p>
            <button
              onClick={() => {
                localStorage.removeItem('sebastianPetSkipped');
                setShowPetSelector(true);
              }}
              className="lego-btn-purple bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
            >
              Adopt a Pet 🐾
            </button>
          </div>
        )}

        {/* VIRTUAL PET */}
        {pet && (
          <div className="pixel-border bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 md:col-span-2">
            <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">
              🐾 My Virtual Pet 🐾
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/80 rounded-lg p-4 pixel-border text-center">
                <div className="text-8xl mb-2 animate-bounce">{pet.emoji}</div>
                <h3 className="text-xl font-bold text-purple-700">{pet.name}</h3>
                <p className="text-sm text-gray-600">Level {pet.level} {pet.type}</p>
                <div className="text-4xl mt-2">{getPetMood()}</div>

                <div className="mt-3">
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-full transition-all duration-500"
                      style={{ width: `${(pet.xp / (pet.level * 50)) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">XP to next level: {pet.xp}/{pet.level * 50}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm font-bold text-gray-700 mb-1">
                    <span>🍖 Hunger</span>
                    <span>{pet.hunger}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${pet.hunger > 60 ? 'bg-green-400' : pet.hunger > 30 ? 'bg-yellow-400' : 'bg-red-400'}`}
                      style={{ width: `${pet.hunger}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold text-gray-700 mb-1">
                    <span>😊 Happiness</span>
                    <span>{pet.happiness}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${pet.happiness > 60 ? 'bg-pink-400' : pet.happiness > 30 ? 'bg-yellow-400' : 'bg-red-400'}`}
                      style={{ width: `${pet.happiness}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold text-gray-700 mb-1">
                    <span>⚡ Energy</span>
                    <span>{pet.energy}%</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${pet.energy > 60 ? 'bg-blue-400' : pet.energy > 30 ? 'bg-yellow-400' : 'bg-red-400'}`}
                      style={{ width: `${pet.energy}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4">
                  <button
                    onClick={feedPet}
                    disabled={bashBucks < 2 || pet.hunger >= 100}
                    className="bg-green-400 text-white font-bold py-2 px-3 rounded-lg text-sm hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    🍖 Feed (-$2)
                  </button>
                  <button
                    onClick={playWithPet}
                    disabled={bashBucks < 1 || pet.energy < 20 || pet.happiness >= 100}
                    className="bg-pink-400 text-white font-bold py-2 px-3 rounded-lg text-sm hover:bg-pink-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    🎾 Play (-$1)
                  </button>
                  <button
                    onClick={groomPet}
                    disabled={bashBucks < 1 || pet.happiness >= 100}
                    className="bg-purple-400 text-white font-bold py-2 px-3 rounded-lg text-sm hover:bg-purple-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    ✨ Groom (-$1)
                  </button>
                  <button
                    onClick={letPetSleep}
                    className="bg-blue-400 text-white font-bold py-2 px-3 rounded-lg text-sm hover:bg-blue-500"
                  >
                    😴 Sleep (Free)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MEMORY MATCH GAME */}
        <div className="pixel-border bg-gradient-to-br from-teal-100 to-cyan-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-teal-800">
            🧠 Memory Match 🧠
          </h2>
          <div className="text-center mb-4">
            <p className="text-lg text-teal-600">Moves: {memoryMoves}</p>
            {memoryBestScore && (
              <p className="text-xs text-teal-500">🏆 Best: {memoryBestScore} moves</p>
            )}
            <p className="text-xs text-teal-500 mt-1">
              💰 Win bonus: 5/3/1 Bash Bucks (12/16/17+ moves)
            </p>
          </div>

          {memoryGameWon ? (
            <div className="text-center bg-white rounded-lg p-6 pixel-border">
              <div className="text-6xl mb-3">🎉</div>
              <p className="text-xl font-bold text-green-500 mb-2">You Won!</p>
              <p className="text-gray-600 mb-4">Completed in {memoryMoves} moves</p>
              <button
                onClick={initMemoryGame}
                className="lego-btn-green text-white font-bold py-2 px-6 rounded-lg"
              >
                Play Again 🔄
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-2 mb-4 max-w-xs mx-auto">
                {memoryCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => flipCard(card.id)}
                    disabled={card.isFlipped || card.isMatched}
                    className={`aspect-square rounded-lg text-3xl font-bold transition-all duration-300 ${
                      card.isMatched
                        ? 'bg-green-200 border-4 border-green-400 opacity-50'
                        : card.isFlipped
                          ? 'bg-white border-4 border-teal-400'
                          : 'bg-gradient-to-br from-teal-400 to-cyan-500 border-4 border-teal-500 hover:scale-105'
                    }`}
                  >
                    {card.isFlipped || card.isMatched ? card.emoji : '❓'}
                  </button>
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={initMemoryGame}
                  className="bg-gray-400 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-gray-500"
                >
                  New Game 🔄
                </button>
              </div>
            </>
          )}
        </div>

        {/* PHOTO ALBUM */}
        <div className="pixel-border bg-rose-100 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-rose-800">
            📸 My Photo Album 📸
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {photos.map(photo => (
              <div key={photo.id} className="bg-white rounded-lg p-2 pixel-border text-center hover:scale-105 transition-transform">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <p className="font-bold text-rose-700 text-xs">{photo.caption}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DRAWING PAD */}
        <div className="pixel-border bg-indigo-100 rounded-lg p-6 md:col-span-2">
          <h2 className="text-2xl font-bold text-center mb-4 text-indigo-800">
            🎨 Drawing Pad 🎨
          </h2>
          <div className="bg-white rounded-lg p-4 pixel-border">
            <div className="mb-3">
              <p className="text-sm text-indigo-600 font-bold mb-2 text-center">📋 Templates:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {(['house', 'sun', 'tree', 'flower', 'cat'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => loadTemplate(t)}
                    className={`px-3 py-1 rounded-lg text-sm font-bold ${selectedTemplate === t ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                  >
                    {t === 'house' ? '🏠 House' : t === 'sun' ? '☀️ Sun' : t === 'tree' ? '🌳 Tree' : t === 'flower' ? '🌸 Flower' : '🐱 Cat'}
                  </button>
                ))}
                <button
                  onClick={() => {setSelectedTemplate(null); clearCanvas();}}
                  className="px-3 py-1 rounded-lg text-sm font-bold bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  🧹 Clear
                </button>
              </div>
            </div>

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

            <div className="flex justify-center mt-3">
              <button
                onClick={() => setShowStickers(!showStickers)}
                className="bg-pink-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-500 transition-colors"
              >
                {showStickers ? 'Hide Stickers 🙈' : 'Add Stickers ✨'}
              </button>
            </div>

            {showStickers && (
              <div className="mt-3 p-3 bg-pink-50 rounded-lg border-2 border-pink-200">
                <p className="text-sm text-pink-600 font-bold mb-2 text-center">Click a sticker to add it:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['⭐', '❤️', '🌈', '🌟', '💎', '🎈', '🎨', '🌸', '🦋', '🐢', '🐼', '🐕', '🌺', '🍄', '⚡', '🔥', '💫', '🎵', '🏆', '🌙'].map((sticker, i) => (
                    <button
                      key={i}
                      onClick={() => addSticker(sticker)}
                      className="text-2xl p-2 hover:bg-pink-200 rounded-lg transition-colors"
                    >
                      {sticker}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
              <button onClick={() => {clearCanvas(); setSelectedTemplate(null);}} className="lego-btn text-white font-bold py-2 px-4 rounded-lg">
                Clear 🗑️
              </button>
            </div>

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

      {/* Pet Selector Modal */}
      {showPetSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full pixel-border max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-purple-800 mb-4 text-center">🐾 Adopt a Pet! 🐾</h2>
            <p className="text-center text-gray-600 mb-4">Choose your new best friend and give them a name!</p>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Pet Name:</label>
              <input
                type="text"
                value={petNameInput}
                onChange={(e) => setPetNameInput(e.target.value)}
                placeholder="e.g., Buddy, Luna, Max"
                className="w-full border-2 border-purple-300 rounded-lg p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { type: 'Dog', emoji: '🐕', desc: 'Loyal & playful' },
                { type: 'Sea Turtle', emoji: '🐢', desc: 'Chill & wise' },
                { type: 'Dragon', emoji: '🐉', desc: 'Magical & brave' },
                { type: 'Unicorn', emoji: '🦄', desc: 'Sparkly & kind' },
              ].map(option => (
                <button
                  key={option.type}
                  onClick={() => adoptPet(option.type, option.emoji)}
                  disabled={!petNameInput.trim()}
                  className="bg-white border-4 border-purple-300 rounded-lg p-4 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="text-4xl mb-2">{option.emoji}</div>
                  <div className="font-bold text-purple-700">{option.type}</div>
                  <div className="text-xs text-gray-500">{option.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  localStorage.setItem('sebastianPetSkipped', '1');
                  setShowPetSelector(false);
                  setPetNameInput('');
                }}
                className="text-gray-500 hover:text-gray-700 font-bold text-sm underline"
              >
                Maybe Later ⏭️
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
