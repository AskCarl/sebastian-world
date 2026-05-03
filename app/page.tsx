'use client';

import { useState, useEffect, useRef } from 'react';

// Jokes and Riddles for kids - 50 each!
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
  { q: "What do you call cheese that isn't yours?", a: "nacho cheese", display: "Nacho cheese! 🧀" },
  { q: "Why don't eggs tell jokes?", a: "crack up", display: "They'd crack up! 🥚" },
  { q: "What do you call a bear with no teeth?", a: "gummy bear", display: "A gummy bear! 🐻" },
  { q: "Why did the scarecrow win an award?", a: "outstanding", display: "Because he was OUTSTANDING in his field! 🌾" },
  { q: "What do you call fake spaghetti?", a: "impasta", display: "An impasta! 🍝" },
  { q: "Why couldn't the bicycle stand up?", a: "two tired", display: "It was two-tired! 🚲" },
  { q: "What do you call a dog that can do magic?", a: "labracadabrador", display: "A Labracadabrador! 🐕✨" },
  { q: "Why don't scientists trust atoms?", a: "make up everything", display: "Because they make up everything! ⚛️" },
  { q: "What do you call a sleeping bull?", a: "bulldozer", display: "A bulldozer! 🐂" },
  { q: "Why did the golfer bring two pairs of pants?", a: "hole in one", display: "In case he got a hole in one! ⛳" },
  { q: "What do you call a snowman with a six pack?", a: "abdominal", display: "An abdominal snowman! ⛄💪" },
  { q: "Why did the tomato turn red?", a: "saw salad dressing", display: "Because it saw the salad dressing! 🍅" },
  { q: "What do you call a seagull that flies over the bay?", a: "bagel", display: "A bagel! 🥯" },
  { q: "Why did the cookie go to the doctor?", a: "crummy", display: "Because it felt crummy! 🍪" },
  { q: "What do you call a lazy kangaroo?", a: "pouch potato", display: "A pouch potato! 🦘" },
  { q: "Why don't skeletons fight each other?", a: "guts", display: "They don't have the guts! 💀" },
  { q: "What do you call an alligator in a vest?", a: "investigator", display: "An investigator! 🐊" },
  { q: "Why did the math book look sad?", a: "too many problems", display: "It had too many problems! 📚" },
  { q: "What do you call a bee that can't make up its mind?", a: "maybe", display: "A maybe! 🐝" },
  { q: "Why did the orange stop rolling?", a: "ran out of juice", display: "It ran out of juice! 🍊" },
  { q: "What do you call a boomerang that doesn't come back?", a: "stick", display: "A stick! 🪃" },
  { q: "Why did the banana go to the doctor?", a: "peeling", display: "It wasn't peeling well! 🍌" },
  { q: "What do you call a dinosaur with an extensive vocabulary?", a: "thesaurus", display: "A thesaurus! 📖" },
  { q: "Why did the music teacher go to jail?", a: "sharp", display: "Because she got caught with a sharp! 🎵" },
  { q: "What do you call a cow on a trampoline?", a: "milk shake", display: "A milk shake! 🐄" },
  { q: "Why did the photo go to jail?", a: "framed", display: "It was framed! 📸" },
  { q: "What do you call a sheep with no legs?", a: "cloud", display: "A cloud! ☁️" },
  { q: "Why did the computer go to the doctor?", a: "virus", display: "It had a virus! 💻" },
  { q: "What do you call a fish that wears a crown?", a: "king fish", display: "A king fish! 👑🐟" },
  { q: "Why did the balloon go near the needle?", a: "pop", display: "It wanted to pop in! 🎈" },
  { q: "What do you call a cat that likes to swim?", a: "catfish", display: "A catfish! 🐱🐟" },
  { q: "Why did the lion eat the tightrope walker?", a: "want a balanced meal", display: "He wanted a balanced meal! 🦁" },
  { q: "What do you call a frog that's illegally parked?", a: "toad", display: "Toad! 🐸" },
  { q: "Why did the duck get arrested?", a: "selling quack", display: "For selling quack! 🦆" },
  { q: "What do you call a dog that meditates?", a: "aware wolf", display: "Aware wolf! 🐕🧘" },
  { q: "Why did the robber take a bath?", a: "make clean getaway", display: "To make a clean getaway! 🛁" },
  { q: "What do you call a can opener that doesn't work?", a: "can't opener", display: "A can't opener! 🥫" },
  { q: "Why did the belt go to jail?", a: "holding up pants", display: "For holding up a pair of pants! 👖" },
  { q: "What do you call a rabbit with fleas?", a: "bugs bunny", display: "Bugs Bunny! 🐰" },
  { q: "Why did the stadium get hot?", a: "fans left", display: "All the fans left! 🏟️" },
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
  { q: "What has to be broken before you can use it?", a: "egg", display: "An egg! 🥚" },
  { q: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?", a: "map", display: "A map! 🗺️" },
  { q: "What can travel around the world while staying in a corner?", a: "stamp", display: "A stamp! 📬" },
  { q: "What has many keys but can't open a single lock?", a: "piano", display: "A piano! 🎹" },
  { q: "What has a neck but no head?", a: "bottle", display: "A bottle! 🍾" },
  { q: "What belongs to you but other people use it more than you?", a: "name", display: "Your name! 🏷️" },
  { q: "What has one eye but can't see?", a: "needle", display: "A needle! 🪡" },
  { q: "What has words but never speaks?", a: "book", display: "A book! 📖" },
  { q: "What runs but never walks, has a mouth but never talks?", a: "river", display: "A river! 🏞️" },
  { q: "What can fill a room but takes up no space?", a: "light", display: "Light! 💡" },
  { q: "I have teeth but can't bite. What am I?", a: "comb", display: "A comb! 🪮" },
  { q: "What has a bottom at the top?", a: "legs", display: "Your legs! 🦵" },
  { q: "What is full of holes but still holds water?", a: "sponge", display: "A sponge! 🧽" },
  { q: "I shave every day but my beard stays the same. What am I?", a: "barber", display: "A barber! ✂️" },
  { q: "What can you break without touching it?", a: "promise", display: "A promise! 🤝" },
  { q: "What goes through cities and fields but never moves?", a: "road", display: "A road! 🛣️" },
  { q: "What building has the most stories?", a: "library", display: "A library! 📚" },
  { q: "What has a face and two hands but no arms or legs?", a: "clock", display: "A clock! ⏰" },
  { q: "What can you hold in your left hand but not in your right?", a: "elbow", display: "Your right elbow! 🦴" },
  { q: "What has a thumb and four fingers but is not alive?", a: "glove", display: "A glove! 🧤" },
  { q: "What gets bigger the more you take away?", a: "hole", display: "A hole! 🕳️" },
  { q: "What kind of coat is always wet when you put it on?", a: "paint", display: "Paint! 🎨" },
  { q: "What has a bark but no bite?", a: "tree", display: "A tree! 🌳" },
  { q: "What begins with T, ends with T, and has T in it?", a: "teapot", display: "A teapot! 🫖" },
  { q: "What has 13 hearts but no other organs?", a: "cards", display: "A deck of cards! 🃏" },
  { q: "What is so fragile that saying its name breaks it?", a: "silence", display: "Silence! 🤫" },
  { q: "What has a bed but never sleeps?", a: "river", display: "A river! 🏞️" },
  { q: "What can you make that no one can see?", a: "noise", display: "Noise! 🔊" },
  { q: "What has an end but no beginning?", a: "stick", display: "A stick! 🪵" },
  { q: "What has a spine but no bones?", a: "book", display: "A book! 📚" },
  { q: "What is black when you buy it, red when you use it, and gray when you throw it away?", a: "charcoal", display: "Charcoal! 🔥" },
  { q: "What has a ring but no finger?", a: "phone", display: "A phone! 📱" },
  { q: "What can you keep after giving to someone?", a: "word", display: "Your word! 💬" },
  { q: "What has hands but can't clap?", a: "clock", display: "A clock! ⏰" },
  { q: "What is always in front of you but can't be seen?", a: "future", display: "The future! 🔮" },
  { q: "What has a tongue but cannot talk?", a: "shoe", display: "A shoe! 👟" },
  { q: "What comes down but never goes up?", a: "rain", display: "Rain! 🌧️" },
  { q: "What has to be taken before you can have it?", a: "picture", display: "A picture! 📸" },
  { q: "What kind of room has no doors or windows?", a: "mushroom", display: "A mushroom! 🍄" },
  { q: "What has four wheels and flies?", a: "garbage truck", display: "A garbage truck! 🚛" },
  { q: "What can you put in a bucket to make it lighter?", a: "hole", display: "A hole! 🪣" },
  { q: "What has a bottom at the top of it?", a: "legs", display: "Your legs! 🦵" },
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

// Spanish/English word pairs - more challenging for smart kids!
const wordOfTheDay = [
  // Character & Virtues (Advanced Vocabulary)
  { english: "Magnificent", spanish: "Magnífico", emoji: "✨", pronunciation: "mag-NIF-i-sent" },
  { english: "Extraordinary", spanish: "Extraordinario", emoji: "🌟", pronunciation: "ik-STRAWR-di-ner-ee" },
  { english: "Courageous", spanish: "Valiente", emoji: "🦁", pronunciation: "kuh-RAY-jus" },
  { english: "Perseverance", spanish: "Perseverancia", emoji: "🧗", pronunciation: "per-suh-VEER-uns" },
  { english: "Compassion", spanish: "Compasión", emoji: "💝", pronunciation: "kum-PASH-un" },
  { english: "Integrity", spanish: "Integridad", emoji: "⚖️", pronunciation: "in-TEG-ri-tee" },
  { english: "Determination", spanish: "Determinación", emoji: "🎯", pronunciation: "di-ter-mi-NAY-shun" },
  { english: "Gratitude", spanish: "Gratitud", emoji: "🙏", pronunciation: "GRAT-i-tood" },
  { english: "Resilience", spanish: "Resiliencia", emoji: "🌱", pronunciation: "ri-ZIL-yuns" },
  { english: "Empathy", spanish: "Empatía", emoji: "💙", pronunciation: "EM-puh-thee" },
  { english: "Bravery", spanish: "Valentía", emoji: "🦸", pronunciation: "BRAY-vuh-ree" },
  { english: "Generosity", spanish: "Generosidad", emoji: "🎁", pronunciation: "jen-uh-ROS-i-tee" },
  { english: "Wisdom", spanish: "Sabiduría", emoji: "📜", pronunciation: "WIZ-dum" },
  { english: "Patience", spanish: "Paciencia", emoji: "⏳", pronunciation: "PAY-shuns" },
  { english: "Creativity", spanish: "Creatividad", emoji: "🎨", pronunciation: "kree-ay-TIV-i-tee" },
  
  // Nature & Science (Advanced)
  { english: "Ecosystem", spanish: "Ecosistema", emoji: "🌿", pronunciation: "EE-koh-sis-tum" },
  { english: "Photosynthesis", spanish: "Fotosíntesis", emoji: "🌱", pronunciation: "foh-toh-SIN-thuh-sis" },
  { english: "Constellation", spanish: "Constelación", emoji: "✨", pronunciation: "kon-stel-LAY-shun" },
  { english: "Symmetry", spanish: "Simetría", emoji: "🔷", pronunciation: "SIM-i-tree" },
  { english: "Volcano", spanish: "Volcán", emoji: "🌋", pronunciation: "vol-KAY-noh" },
  { english: "Galaxy", spanish: "Galaxia", emoji: "🌌", pronunciation: "GAL-uk-see" },
  { english: "Hibernate", spanish: "Hibernar", emoji: "🐻", pronunciation: "HY-ber-nayt" },
  { english: "Camouflage", spanish: "Camuflaje", emoji: "🦎", pronunciation: "KAM-uh-flahzh" },
  { english: "Metamorphosis", spanish: "Metamorfosis", emoji: "🦋", pronunciation: "met-uh-MOR-fuh-sis" },
  { english: "Nebula", spanish: "Nebulosa", emoji: "🌠", pronunciation: "NEB-yoo-luh" },
  
  // Big Ideas (Philosophy & Concepts)
  { english: "Infinity", spanish: "Infinito", emoji: "∞", pronunciation: "in-FIN-i-tee" },
  { english: "Perspective", spanish: "Perspectiva", emoji: "🔭", pronunciation: "per-SPEK-tiv" },
  { english: "Harmony", spanish: "Armonía", emoji: "🎵", pronunciation: "HAR-muh-nee" },
  { english: "Serendipity", spanish: "Serendipia", emoji: "🍀", pronunciation: "ser-un-DIP-i-tee" },
  { english: "Curiosity", spanish: "Curiosidad", emoji: "🔍", pronunciation: "kyoo-ree-OS-i-tee" },
  { english: "Possibility", spanish: "Posibilidad", emoji: "🚪", pronunciation: "pos-i-BIL-i-tee" },
  { english: "Adventure", spanish: "Aventura", emoji: "🗺️", pronunciation: "ad-VEN-chur" },
  { english: "Discovery", spanish: "Descubrimiento", emoji: "💡", pronunciation: "di-SKUV-uh-ree" },
  { english: "Imagination", spanish: "Imaginación", emoji: "🌈", pronunciation: "i-maj-i-NAY-shun" },
  { english: "Brilliance", spanish: "Brillantez", emoji: "💎", pronunciation: "BRIL-yuns" },
];

const typingWords = {
  cadet: [
    "dragon", "castle", "wizard", "knight", "rocket", "planet", "robot", "tiger",
    "panda", "shark", "magic", "sword", "shield", "diamond", "emerald", "golden",
    "ocean", "jungle", "forest", "sunset", "garden", "frosty", "mighty", "brave",
    "swift", "silent", "comet", "falcon", "parrot", "mango", "helmet", "treasure",
    "sparkle", "crystal", "thunder", "lightning", "monster", "creature", "rainbow",
    "kitten", "puppy", "bunny", "phoenix", "kraken", "ninja", "pirate", "viking",
  ],
  hero: [
    "adventure", "dinosaur", "elephant", "butterfly", "kangaroo", "penguin",
    "mystery", "science", "library", "kitchen", "pumpkin", "snowman", "spaghetti",
    "blueberry", "telescope", "spaceship", "incredible", "fantastic", "beautiful",
    "dangerous", "marvelous", "hurricane", "volcano", "kingdom", "champion",
    "gladiator", "explorer", "courageous", "magnificent", "dictionary", "mysterious",
    "knowledge", "intelligent", "brilliant", "stardust", "midnight", "blizzard",
    "mountain", "treasure", "fireball", "snowflake", "crocodile", "dolphin",
    "octopus", "cheetah", "gorilla", "creeper", "Minecraft",
  ],
  legend: [
    "extraordinary", "magnificent", "mountainous", "microscope", "laboratory",
    "experiment", "discovery", "vocabulary", "encyclopedia", "championship",
    "supersonic", "intergalactic", "hippopotamus", "rhinoceros", "pterodactyl",
    "archaeology", "photosynthesis", "paleontologist", "astronaut", "unbelievable",
    "thunderstorm", "constellation", "civilization", "exploration", "imagination",
    "celebration", "illustration", "observation", "transformation", "tyrannosaurus",
    "mathematics", "electromagnetic", "submarine", "wilderness", "dangerously",
    "incredibly", "astonishing", "spectacular", "tremendous", "phenomenon",
    "chocolate", "spaghettios", "kindergarten", "playground",
  ],
};

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
  const [jokeResult, setJokeResult] = useState<'correct' | 'wrong' | 'earned' | 'revealed' | null>(null);
  const [riddleResult, setRiddleResult] = useState<'correct' | 'wrong' | 'earned' | 'revealed' | null>(null);
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

  // Streak counter state
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Drawing enhancement state
  const [showStickers, setShowStickers] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

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

  // Typing Game state
  const [typingWord, setTypingWord] = useState('');
  const [typingInput, setTypingInput] = useState('');
  const [typingLevel, setTypingLevel] = useState<'cadet' | 'hero' | 'legend'>('cadet');
  const [typingScore, setTypingScore] = useState(0);
  const [typingStreak, setTypingStreak] = useState(0);
  const [typingBestStreak, setTypingBestStreak] = useState(0);
  const [typingFlash, setTypingFlash] = useState<'correct' | 'levelup' | null>(null);
  const [typingLevelUpTo, setTypingLevelUpTo] = useState<string>('');
  const typingInputRef = useRef<HTMLInputElement>(null);

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
    
    // Load streak data
    const savedStreak = localStorage.getItem('sebastianStreak');
    const savedBestStreak = localStorage.getItem('sebastianBestStreak');
    const lastVisit = localStorage.getItem('sebastianLastVisit');
    
    if (savedBestStreak) setBestStreak(parseInt(savedBestStreak));
    
    if (lastVisit) {
      const lastDate = new Date(lastVisit);
      const todayDate = new Date(today);
      const diffTime = todayDate.getTime() - lastDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        // Same day, restore current streak
        if (savedStreak) setStreak(parseInt(savedStreak));
      } else if (diffDays === 1) {
        // Consecutive day, increment streak
        const newStreak = savedStreak ? parseInt(savedStreak) + 1 : 1;
        setStreak(newStreak);
        localStorage.setItem('sebastianStreak', newStreak.toString());
        if (newStreak > (savedBestStreak ? parseInt(savedBestStreak) : 0)) {
          setBestStreak(newStreak);
          localStorage.setItem('sebastianBestStreak', newStreak.toString());
        }
      } else {
        // Streak broken
        setStreak(1);
        localStorage.setItem('sebastianStreak', '1');
      }
    } else {
      // First visit ever
      setStreak(1);
      localStorage.setItem('sebastianStreak', '1');
    }
    
    localStorage.setItem('sebastianLastVisit', today);
    
    // Load memory game best score
    const savedMemoryBest = localStorage.getItem('sebastianMemoryBest');
    if (savedMemoryBest) setMemoryBestScore(parseInt(savedMemoryBest));

    // Initialize memory game
    initMemoryGame();

    // Load typing game best streak
    const savedTypingBest = localStorage.getItem('sebastianTypingBestStreak');
    if (savedTypingBest) setTypingBestStreak(parseInt(savedTypingBest));
    pickTypingWord('cadet');
    
    // Load pet data
    const savedPet = localStorage.getItem('sebastianPet');
    if (savedPet) {
      const petData = JSON.parse(savedPet);
      // Decay stats based on time since last visit
      const lastVisit = localStorage.getItem('sebastianLastVisit');
      if (lastVisit && lastVisit !== today) {
        const daysSince = Math.min(3, Math.ceil((new Date(today).getTime() - new Date(lastVisit).getTime()) / (1000 * 60 * 60 * 24)));
        petData.hunger = Math.max(0, petData.hunger - (10 * daysSince));
        petData.happiness = Math.max(0, petData.happiness - (5 * daysSince));
        petData.energy = Math.min(100, petData.energy + (20 * daysSince));
      }
      setPet(petData);
    } else if (!localStorage.getItem('sebastianPetSkipped')) {
      setShowPetSelector(true);
    }
    
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
    // Require at least 2 characters to prevent empty clicks
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
    localStorage.setItem('jokeEarnedDate', today); // Mark as completed but no bucks
  };

  const checkRiddleAnswer = () => {
    const guess = riddleGuess.toLowerCase().trim();
    // Require at least 2 characters to prevent empty clicks
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
    localStorage.setItem('riddleEarnedDate', today); // Mark as completed but no bucks
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

  const addSticker = (sticker: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Add sticker at random position
        const x = Math.random() * (canvas.width - 40) + 20;
        const y = Math.random() * (canvas.height - 40) + 20;
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(sticker, x, y);
      }
    }
  };

  // Pet functions
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

  // Memory Match Game functions
  const initMemoryGame = () => {
    const emojis = ['🐢', '🐕', '🦁', '🦖', '🚀', '🌈', '💎', '⚡'];
    const pairs = [...emojis, ...emojis];
    // Shuffle
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
        // Match!
        setTimeout(() => {
          const matchedCards = [...memoryCards];
          matchedCards[first].isMatched = true;
          matchedCards[second].isMatched = true;
          setMemoryCards(matchedCards);
          setFlippedCards([]);
          
          // Check for win
          if (matchedCards.every(card => card.isMatched)) {
            setMemoryGameWon(true);
            const reward = memoryMoves <= 12 ? 5 : memoryMoves <= 16 ? 3 : 1;
            addBucks(reward);
            
            // Update best score
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
        // No match
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

  // Typing Game functions
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

      // Bash Bucks every 10 words
      if (newScore % 10 === 0) {
        addBucks(1);
        setTimeout(() => {
          alert(`⌨️ 10 words typed! +$1 Bash Buck! 🐷💰`);
        }, 500);
      }

      // Level progression: cadet 1-7, hero 8-19, legend 20+
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

  const loadTemplate = (template: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas first
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setSelectedTemplate(template);
    
    // Draw template outline (light gray)
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 2;
    
    const w = canvas.width;
    const h = canvas.height;
    
    switch (template) {
      case 'house':
        // House base
        ctx.strokeRect(w/2 - 60, h/2 + 20, 120, 80);
        // Roof (triangle)
        ctx.beginPath();
        ctx.moveTo(w/2 - 70, h/2 + 20);
        ctx.lineTo(w/2, h/2 - 60);
        ctx.lineTo(w/2 + 70, h/2 + 20);
        ctx.closePath();
        ctx.stroke();
        // Door
        ctx.strokeRect(w/2 - 20, h/2 + 50, 40, 50);
        // Window
        ctx.strokeRect(w/2 - 40, h/2 + 30, 30, 30);
        break;
        
      case 'sun':
        // Sun center
        ctx.beginPath();
        ctx.arc(w/2, h/2, 50, 0, 2 * Math.PI);
        ctx.stroke();
        // Sun rays
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI * 2) / 8;
          ctx.beginPath();
          ctx.moveTo(w/2 + Math.cos(angle) * 60, h/2 + Math.sin(angle) * 60);
          ctx.lineTo(w/2 + Math.cos(angle) * 85, h/2 + Math.sin(angle) * 85);
          ctx.stroke();
        }
        break;
        
      case 'tree':
        // Trunk
        ctx.strokeRect(w/2 - 15, h/2 + 60, 30, 70);
        // Leaves (3 circles)
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
        // Stem
        ctx.strokeRect(w/2 - 5, h/2 + 20, 10, 100);
        // Center
        ctx.beginPath();
        ctx.arc(w/2, h/2, 25, 0, 2 * Math.PI);
        ctx.stroke();
        // Petals
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
        // Head
        ctx.beginPath();
        ctx.arc(w/2, h/2 - 30, 45, 0, 2 * Math.PI);
        ctx.stroke();
        // Ears (triangles)
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
        // Body
        ctx.strokeRect(w/2 - 35, h/2 + 15, 70, 90);
        // Tail
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

        {/* TYPING GAME */}
        <div className="pixel-border bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 md:col-span-2">
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

        {/* STREAK COUNTER */}
        <div className="pixel-border bg-gradient-to-br from-orange-100 to-red-100 rounded-lg p-6 md:col-span-2">
          <div className="flex items-center justify-center gap-8">
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
              {/* Pet Display */}
              <div className="bg-white/80 rounded-lg p-4 pixel-border text-center">
                <div className="text-8xl mb-2 animate-bounce">{pet.emoji}</div>
                <h3 className="text-xl font-bold text-purple-700">{pet.name}</h3>
                <p className="text-sm text-gray-600">Level {pet.level} {pet.type}</p>
                <div className="text-4xl mt-2">{getPetMood()}</div>
                
                {/* XP Bar */}
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
              
              {/* Pet Stats */}
              <div className="space-y-3">
                {/* Hunger */}
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
                
                {/* Happiness */}
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
                
                {/* Energy */}
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
                
                {/* Action Buttons */}
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

        {/* DRAWING PAD */}
        <div className="pixel-border bg-indigo-100 rounded-lg p-6 md:col-span-2">
          <h2 className="text-2xl font-bold text-center mb-4 text-indigo-800">
            🎨 Drawing Pad 🎨
          </h2>
          <div className="bg-white rounded-lg p-4 pixel-border">
            {/* Templates */}
            <div className="mb-3">
              <p className="text-sm text-indigo-600 font-bold mb-2 text-center">📋 Templates:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <button 
                  onClick={() => loadTemplate('house')}
                  className={`px-3 py-1 rounded-lg text-sm font-bold ${selectedTemplate === 'house' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                >
                  🏠 House
                </button>
                <button 
                  onClick={() => loadTemplate('sun')}
                  className={`px-3 py-1 rounded-lg text-sm font-bold ${selectedTemplate === 'sun' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                >
                  ☀️ Sun
                </button>
                <button 
                  onClick={() => loadTemplate('tree')}
                  className={`px-3 py-1 rounded-lg text-sm font-bold ${selectedTemplate === 'tree' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                >
                  🌳 Tree
                </button>
                <button 
                  onClick={() => loadTemplate('flower')}
                  className={`px-3 py-1 rounded-lg text-sm font-bold ${selectedTemplate === 'flower' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                >
                  🌸 Flower
                </button>
                <button 
                  onClick={() => loadTemplate('cat')}
                  className={`px-3 py-1 rounded-lg text-sm font-bold ${selectedTemplate === 'cat' ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
                >
                  🐱 Cat
                </button>
                <button 
                  onClick={() => {setSelectedTemplate(null); clearCanvas();}}
                  className="px-3 py-1 rounded-lg text-sm font-bold bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  🧹 Clear
                </button>
              </div>
            </div>

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

            {/* Stickers Button */}
            <div className="flex justify-center mt-3">
              <button 
                onClick={() => setShowStickers(!showStickers)}
                className="bg-pink-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-500 transition-colors"
              >
                {showStickers ? 'Hide Stickers 🙈' : 'Add Stickers ✨'}
              </button>
            </div>

            {/* Stickers Panel */}
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
              <button onClick={() => {clearCanvas(); setSelectedTemplate(null);}} className="lego-btn text-white font-bold py-2 px-4 rounded-lg">
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
              <button 
                onClick={() => adoptPet('Dog', '🐕')}
                disabled={!petNameInput.trim()}
                className="bg-white border-4 border-purple-300 rounded-lg p-4 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-4xl mb-2">🐕</div>
                <div className="font-bold text-purple-700">Dog</div>
                <div className="text-xs text-gray-500">Loyal & playful</div>
              </button>
              <button 
                onClick={() => adoptPet('Sea Turtle', '🐢')}
                disabled={!petNameInput.trim()}
                className="bg-white border-4 border-purple-300 rounded-lg p-4 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-4xl mb-2">🐢</div>
                <div className="font-bold text-purple-700">Sea Turtle</div>
                <div className="text-xs text-gray-500">Chill & wise</div>
              </button>
              <button 
                onClick={() => adoptPet('Dragon', '🐉')}
                disabled={!petNameInput.trim()}
                className="bg-white border-4 border-purple-300 rounded-lg p-4 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-4xl mb-2">🐉</div>
                <div className="font-bold text-purple-700">Dragon</div>
                <div className="text-xs text-gray-500">Magical & brave</div>
              </button>
              <button
                onClick={() => adoptPet('Unicorn', '🦄')}
                disabled={!petNameInput.trim()}
                className="bg-white border-4 border-purple-300 rounded-lg p-4 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-4xl mb-2">🦄</div>
                <div className="font-bold text-purple-700">Unicorn</div>
                <div className="text-xs text-gray-500">Sparkly & kind</div>
              </button>
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
