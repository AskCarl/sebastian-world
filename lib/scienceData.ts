// 🔬 SCIENCE STATION DATA
// ✏️ SEBASTIAN: Add your own amazing facts, quiz questions, and animal riddles here!

export const scienceFacts = [
  { fact: 'A bolt of lightning is five times hotter than the surface of the Sun!', emoji: '⚡' },
  { fact: 'Octopuses have three hearts and blue blood.', emoji: '🐙' },
  { fact: 'Honey never goes bad. Archaeologists found 3,000-year-old honey that was still good to eat!', emoji: '🍯' },
  { fact: 'A day on Venus is longer than a whole year on Venus!', emoji: '🪐' },
  { fact: 'Sharks have been on Earth longer than trees.', emoji: '🦈' },
  { fact: 'Your heart beats about 100,000 times every single day.', emoji: '❤️' },
  { fact: 'Sea otters hold hands while they sleep so they don\'t drift apart.', emoji: '🦦' },
  { fact: 'The Eiffel Tower grows about 6 inches taller in summer because heat makes metal expand.', emoji: '🗼' },
  { fact: 'Sloths can hold their breath underwater longer than dolphins can — up to 40 minutes!', emoji: '🦥' },
  { fact: 'There are more stars in the universe than grains of sand on all of Earth\'s beaches.', emoji: '✨' },
  { fact: 'A group of flamingos is called a "flamboyance."', emoji: '🦩' },
  { fact: 'Water can boil and freeze at the same time. Scientists call it the "triple point."', emoji: '💧' },
  { fact: 'Wombat poop is cube-shaped!', emoji: '🟫' },
  { fact: 'The blue whale\'s heart is as big as a small car.', emoji: '🐋' },
  { fact: 'Bananas are radioactive — just a teeny tiny safe amount.', emoji: '🍌' },
  { fact: 'Astronauts grow about 2 inches taller in space because gravity stops squishing their spines.', emoji: '👨‍🚀' },
  { fact: 'A cheetah can go from 0 to 60 miles per hour in just 3 seconds.', emoji: '🐆' },
  { fact: 'Butterflies taste with their feet.', emoji: '🦋' },
  { fact: 'The Sun is so big that about one million Earths could fit inside it.', emoji: '☀️' },
  { fact: 'Some jellyfish can live forever — they can turn back into babies!', emoji: '🪼' },
  { fact: 'Polar bear fur isn\'t white — it\'s actually clear, and their skin is black!', emoji: '🐻‍❄️' },
  { fact: 'Sound travels about 4 times faster in water than in air.', emoji: '🔊' },
  { fact: 'Dogs can smell about 10,000 times better than humans.', emoji: '🐕' },
  { fact: 'One teaspoon of a neutron star would weigh about 6 billion tons.', emoji: '🌟' },
  { fact: 'Ants never sleep the way we do — they take hundreds of tiny power naps instead.', emoji: '🐜' },
  { fact: 'Mount Everest grows about 4 millimeters taller every year.', emoji: '🏔️' },
  { fact: 'Your bones are about 5 times stronger than steel of the same weight.', emoji: '🦴' },
  { fact: 'Saturn is so light it would float in a giant bathtub of water.', emoji: '🪐' },
  { fact: 'Hummingbirds are the only birds that can fly backwards.', emoji: '🐦' },
  { fact: 'The human brain uses about 20% of the body\'s energy — and it\'s only 2% of your weight!', emoji: '🧠' },
];

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

export const quizTopics: { key: string; name: string; emoji: string; questions: QuizQuestion[] }[] = [
  {
    key: 'animals',
    name: 'Animals',
    emoji: '🦁',
    questions: [
      { q: 'What is the biggest animal that has EVER lived?', options: ['T-Rex', 'Blue whale', 'Elephant', 'Megalodon'], answer: 1 },
      { q: 'How do dolphins sleep?', options: ['Upside down', 'With one half of their brain awake', 'On the beach', 'They never sleep'], answer: 1 },
      { q: 'What do you call a baby kangaroo?', options: ['A cub', 'A kit', 'A joey', 'A pup'], answer: 2 },
      { q: 'Which animal can change its color to hide?', options: ['Chameleon', 'Zebra', 'Penguin', 'Moose'], answer: 0 },
      { q: 'How many legs does a spider have?', options: ['Six', 'Eight', 'Ten', 'Twelve'], answer: 1 },
      { q: 'What do pandas eat almost all day?', options: ['Fish', 'Honey', 'Bamboo', 'Leaves from tall trees'], answer: 2 },
      { q: 'Which bird cannot fly but is the fastest runner?', options: ['Penguin', 'Chicken', 'Ostrich', 'Duck'], answer: 2 },
      { q: 'What does a caterpillar turn into?', options: ['A bee', 'A dragonfly', 'A moth or butterfly', 'A beetle'], answer: 2 },
    ],
  },
  {
    key: 'space',
    name: 'Space',
    emoji: '🚀',
    questions: [
      { q: 'Which planet is closest to the Sun?', options: ['Earth', 'Mars', 'Mercury', 'Venus'], answer: 2 },
      { q: 'What is the red planet called?', options: ['Jupiter', 'Mars', 'Saturn', 'Neptune'], answer: 1 },
      { q: 'What keeps us from floating off the Earth?', options: ['Wind', 'Magnets', 'Gravity', 'Air pressure'], answer: 2 },
      { q: 'Which planet has beautiful rings?', options: ['Saturn', 'Mercury', 'Venus', 'Earth'], answer: 0 },
      { q: 'What is the Sun?', options: ['A planet', 'A star', 'A moon', 'A comet'], answer: 1 },
      { q: 'Who was the first person to walk on the Moon?', options: ['Buzz Lightyear', 'Neil Armstrong', 'Albert Einstein', 'George Washington'], answer: 1 },
      { q: 'How many planets are in our solar system?', options: ['Seven', 'Eight', 'Nine', 'Ten'], answer: 1 },
      { q: 'What is a shooting star really?', options: ['A falling star', 'A space rock burning up in the air', 'A tiny sun', 'An airplane'], answer: 1 },
    ],
  },
  {
    key: 'body',
    name: 'Human Body',
    emoji: '🫀',
    questions: [
      { q: 'What pumps blood all around your body?', options: ['Your brain', 'Your lungs', 'Your heart', 'Your stomach'], answer: 2 },
      { q: 'How many bones does an adult have?', options: ['About 106', 'About 206', 'About 500', 'About 1,000'], answer: 1 },
      { q: 'What do your lungs help you do?', options: ['Think', 'Breathe', 'Jump', 'See'], answer: 1 },
      { q: 'Which body part never stops growing your whole life?', options: ['Your ears and nose', 'Your feet', 'Your eyes', 'Your teeth'], answer: 0 },
      { q: 'What is the hardest thing in your body?', options: ['Your skull', 'Your knee', 'Your tooth enamel', 'Your elbow'], answer: 2 },
      { q: 'Where is your brain?', options: ['In your chest', 'In your head', 'In your belly', 'In your back'], answer: 1 },
      { q: 'Why do you shiver when you\'re cold?', options: ['To scare germs away', 'Your muscles shake to make heat', 'Your bones are rattling', 'It\'s just a habit'], answer: 1 },
      { q: 'What carries messages from your brain to your body?', options: ['Blood', 'Nerves', 'Bones', 'Skin'], answer: 1 },
    ],
  },
  {
    key: 'earth',
    name: 'Earth & Weather',
    emoji: '🌍',
    questions: [
      { q: 'What is at the very center of the Earth?', options: ['Water', 'A super-hot core', 'Empty space', 'Dinosaur bones'], answer: 1 },
      { q: 'What makes thunder?', options: ['Clouds bumping together', 'Lightning heating the air super fast', 'Giant drums', 'The wind'], answer: 1 },
      { q: 'What is a tornado?', options: ['A big wave', 'A spinning column of wind', 'A type of cloud', 'An earthquake'], answer: 1 },
      { q: 'Where does rain come from?', options: ['The ocean spraying up', 'Water drops falling from clouds', 'Melting stars', 'Airplanes'], answer: 1 },
      { q: 'What covers most of the Earth?', options: ['Forests', 'Deserts', 'Oceans', 'Cities'], answer: 2 },
      { q: 'What do we call melted rock that comes out of a volcano?', options: ['Mud', 'Lava', 'Steam', 'Coal'], answer: 1 },
      { q: 'Why do we have day and night?', options: ['The Sun turns off', 'The Earth spins', 'Clouds block the Sun', 'The Moon glows'], answer: 1 },
      { q: 'What is the biggest rainforest in the world?', options: ['The Amazon', 'The Sahara', 'Yellowstone', 'The Everglades'], answer: 0 },
    ],
  },
];

// Guess the Animal — clues go from hard to easy. Fewer clues = more bucks!
export const animalRiddles = [
  { answer: 'elephant', emoji: '🐘', clues: ['I never forget my friends.', 'I have big flappy ears and love mud baths.', 'I have a long trunk I use like a hand.'] },
  { answer: 'penguin', emoji: '🐧', clues: ['I am a bird, but I cannot fly.', 'I live where it is very, very cold.', 'I waddle on ice and slide on my belly.'] },
  { answer: 'shark', emoji: '🦈', clues: ['I never stop swimming, even when I rest.', 'I can grow new teeth my whole life.', 'I have a big fin on my back and live in the ocean.'] },
  { answer: 'owl', emoji: '🦉', clues: ['I sleep all day and hunt all night.', 'I can turn my head almost all the way around.', 'I say "hoo hoo" from up in the trees.'] },
  { answer: 'kangaroo', emoji: '🦘', clues: ['I live in Australia.', 'I carry my baby in a pouch.', 'I hop everywhere on strong back legs.'] },
  { answer: 'giraffe', emoji: '🦒', clues: ['My tongue is blue-purple and super long.', 'I eat leaves from the tallest trees.', 'I am the tallest animal in the world.'] },
  { answer: 'bee', emoji: '🐝', clues: ['I dance to tell my friends where food is.', 'I visit flowers all day long.', 'I am black and yellow and make honey.'] },
  { answer: 'turtle', emoji: '🐢', clues: ['Some of my family live over 100 years.', 'I am slow on land but fast in water.', 'I carry my house on my back.'] },
  { answer: 'wolf', emoji: '🐺', clues: ['I live in a family called a pack.', 'I look like a big wild dog.', 'I howl at the moon.'] },
  { answer: 'frog', emoji: '🐸', clues: ['I started life as a tadpole.', 'I catch bugs with my sticky tongue.', 'I am green and say "ribbit"!'] },
];
