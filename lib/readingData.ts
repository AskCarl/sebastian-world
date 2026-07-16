// 📚 READING ROOM DATA — short stories with questions
// ✏️ SEBASTIAN: You and Dad can write your own stories here! Just copy the pattern.
// level 1 = ⭐ easier, level 2 = ⭐⭐ medium, level 3 = ⭐⭐⭐ challenge

export interface Passage {
  id: string;
  title: string;
  emoji: string;
  level: 1 | 2 | 3;
  text: string;
  questions: {
    q: string;
    options: string[];
    answer: number; // which option is correct (0, 1, 2, or 3)
  }[];
}

export const passages: Passage[] = [
  // ── LEVEL 1 ──
  {
    id: 'moby-beach',
    title: 'Moby at the Beach',
    emoji: '🐕',
    level: 1,
    text: `Moby is a big white dog. One sunny day, Moby went to the beach. He dug a deep hole in the sand. Then he saw a crab! The crab waved its claw at Moby. Moby barked and jumped back. The little crab was not scared at all. It walked slowly back into the sea. Moby decided to chase the waves instead. He got wet and sandy, but he was very happy.`,
    questions: [
      { q: 'Where did Moby go?', options: ['To the park', 'To the beach', 'To school', 'To the moon'], answer: 1 },
      { q: 'What did Moby see?', options: ['A shark', 'A seagull', 'A crab', 'A turtle'], answer: 2 },
      { q: 'How did Moby feel at the end?', options: ['Sad', 'Scared', 'Angry', 'Happy'], answer: 3 },
    ],
  },
  {
    id: 'lost-tooth',
    title: 'The Lost Tooth',
    emoji: '🦷',
    level: 1,
    text: `Max had a wiggly tooth. He wiggled it at breakfast. He wiggled it at school. He wiggled it at soccer practice. Then, while eating an apple, POP! The tooth came out! Max put the tiny tooth in his pocket. That night, he placed it under his pillow. In the morning, the tooth was gone. In its place was a shiny gold dollar coin!`,
    questions: [
      { q: 'What was wrong with Max\'s tooth?', options: ['It was blue', 'It was wiggly', 'It was huge', 'It hurt'], answer: 1 },
      { q: 'What made the tooth come out?', options: ['Eating an apple', 'Playing soccer', 'Brushing teeth', 'A sneeze'], answer: 0 },
      { q: 'What did Max find in the morning?', options: ['A new tooth', 'A candy bar', 'A gold coin', 'A toy car'], answer: 2 },
    ],
  },
  {
    id: 'rainy-day',
    title: 'The Rainy Day Fort',
    emoji: '🏰',
    level: 1,
    text: `Rain tapped on the window all morning. Mia could not go outside to play. She had a better idea. She took all the pillows from the couch. She grabbed blankets from her bed. She built a huge fort in the living room! Inside the fort, she read books with a flashlight. Her cat, Waffles, snuck in and fell asleep on her lap. It was the best rainy day ever.`,
    questions: [
      { q: 'Why couldn\'t Mia play outside?', options: ['It was raining', 'It was too hot', 'It was nighttime', 'She was sick'], answer: 0 },
      { q: 'What did Mia build?', options: ['A robot', 'A sandcastle', 'A fort', 'A treehouse'], answer: 2 },
      { q: 'Who fell asleep in the fort?', options: ['Mia\'s brother', 'Waffles the cat', 'Mia\'s mom', 'A puppy'], answer: 1 },
    ],
  },
  // ── LEVEL 2 ──
  {
    id: 'sea-turtle',
    title: 'The Sea Turtle\'s Long Trip',
    emoji: '🐢',
    level: 2,
    text: `Green sea turtles are amazing travelers. They can swim thousands of miles across the ocean. When a mother turtle is ready to lay her eggs, she swims all the way back to the very same beach where she was born! Scientists believe turtles use Earth's invisible magnetic field like a map to find their way. Baby turtles hatch at night and race to the water as fast as they can. Only a few babies out of one hundred will grow into adults. That is why it is so important to protect sea turtles and keep our oceans clean.`,
    questions: [
      { q: 'Where does a mother turtle lay her eggs?', options: ['Any beach she likes', 'The beach where she was born', 'On the ocean floor', 'In a coral reef'], answer: 1 },
      { q: 'What do turtles use like a map?', options: ['The stars', 'Ocean waves', 'Earth\'s magnetic field', 'Other turtles'], answer: 2 },
      { q: 'When do baby turtles hatch?', options: ['At night', 'In the morning', 'At lunchtime', 'In winter'], answer: 0 },
      { q: 'Why should we keep oceans clean?', options: ['So boats go faster', 'To protect sea turtles', 'To find treasure', 'To make bigger waves'], answer: 1 },
    ],
  },
  {
    id: 'fu-bao',
    title: 'Fu Bao the Famous Panda',
    emoji: '🐼',
    level: 2,
    text: `Fu Bao is a giant panda who was born in South Korea. Her name means "lucky treasure," and she became a superstar! Thousands of people lined up just to watch her play, tumble, and munch on bamboo. Giant pandas spend up to twelve hours a day eating. Bamboo is not very filling, so they must eat a LOT of it — sometimes eighty pounds in one day! Pandas are also excellent climbers and love to roll down grassy hills just for fun. When Fu Bao grew up, she moved to China, where keepers take care of her and fans still send her gifts.`,
    questions: [
      { q: 'What does the name Fu Bao mean?', options: ['Brave bear', 'Lucky treasure', 'Bamboo lover', 'Little cloud'], answer: 1 },
      { q: 'How long do pandas spend eating each day?', options: ['One hour', 'Three hours', 'Up to twelve hours', 'They never stop'], answer: 2 },
      { q: 'What do pandas love to do for fun?', options: ['Swim in rivers', 'Roll down hills', 'Chase birds', 'Dig tunnels'], answer: 1 },
      { q: 'Where did Fu Bao move when she grew up?', options: ['America', 'Japan', 'A zoo in Korea', 'China'], answer: 3 },
    ],
  },
  {
    id: 'cave-explorer',
    title: 'The Deep Cave Adventure',
    emoji: '⛏️',
    level: 2,
    text: `Leo strapped on his helmet and switched on his headlamp. Today he was exploring the crystal cave with his dad. The tunnel twisted deeper and deeper underground. Drip. Drip. Water fell from pointy rocks on the ceiling called stalactites. "Look!" whispered Leo. The walls sparkled with purple crystals! His dad explained that the crystals took thousands of years to grow. Leo carefully placed one small loose crystal in his backpack to show his science class. On the way out, they drew a map so they could find the crystal room again next time.`,
    questions: [
      { q: 'What did Leo wear on his head?', options: ['A baseball cap', 'A helmet with a headlamp', 'A crown', 'Nothing'], answer: 1 },
      { q: 'What are the pointy rocks on cave ceilings called?', options: ['Stalactites', 'Icicles', 'Crystals', 'Boulders'], answer: 0 },
      { q: 'How long did the crystals take to grow?', options: ['One week', 'A year', 'Thousands of years', 'One day'], answer: 2 },
      { q: 'Why did they draw a map?', options: ['For homework', 'To sell it', 'To find the crystal room again', 'To scare people'], answer: 2 },
    ],
  },
  // ── LEVEL 3 ──
  {
    id: 'volcano',
    title: 'Inside a Volcano',
    emoji: '🌋',
    level: 3,
    text: `Deep beneath a volcano, the rock is so hot that it melts into a thick, glowing liquid called magma. Magma collects in a giant underground pocket called a magma chamber. When pressure builds up, the volcano can erupt, shooting melted rock, ash, and gas high into the sky. Once magma flows out onto the surface, scientists give it a new name: lava. Fresh lava can be over 2,000 degrees Fahrenheit — hot enough to melt metal! But volcanoes are not only destroyers. Over many years, cooled lava breaks down into rich soil where plants grow strong. Some of the most beautiful islands on Earth, like Hawaii, were built entirely by volcanoes erupting under the sea, layer after layer, for millions of years.`,
    questions: [
      { q: 'What is melted rock called while it is still underground?', options: ['Lava', 'Magma', 'Ash', 'Soil'], answer: 1 },
      { q: 'What makes a volcano erupt?', options: ['Strong wind', 'Earthquakes only', 'Pressure building up', 'Heavy rain'], answer: 2 },
      { q: 'What good thing can cooled lava become?', options: ['Rich soil for plants', 'Drinking water', 'Gold', 'Glass windows'], answer: 0 },
      { q: 'Which islands were built by volcanoes?', options: ['England', 'Hawaii', 'Florida', 'Greenland'], answer: 1 },
    ],
  },
  {
    id: 'octopus',
    title: 'The Ocean\'s Smartest Escape Artist',
    emoji: '🐙',
    level: 3,
    text: `The octopus might be the strangest genius in the ocean. It has three hearts, blue blood, and nine brains — one main brain plus a small one in each of its eight arms! Each arm can taste and touch on its own, like it has a mind of its own. Octopuses are famous escape artists. In aquariums, they have opened jar lids from the inside, squeezed through gaps the size of a coin, and even snuck into other tanks at night to eat crabs. An octopus can also change both the color AND the texture of its skin in less than one second to vanish against rocks or coral. Scientists study octopuses to learn how their amazing bodies work, and some engineers even design soft robots based on octopus arms.`,
    questions: [
      { q: 'How many hearts does an octopus have?', options: ['One', 'Two', 'Three', 'Eight'], answer: 2 },
      { q: 'What is special about each octopus arm?', options: ['It glows in the dark', 'It has its own small brain', 'It is made of bone', 'It can fly'], answer: 1 },
      { q: 'What can an octopus change in less than a second?', options: ['Its size only', 'Its color and texture', 'Its number of arms', 'Its voice'], answer: 1 },
      { q: 'What do engineers design based on octopus arms?', options: ['Airplanes', 'Soft robots', 'Submarines', 'Fishing nets'], answer: 1 },
    ],
  },
  {
    id: 'mars',
    title: 'A Day on Mars',
    emoji: '🔴',
    level: 3,
    text: `Imagine waking up on Mars, the red planet. Your morning would last a little longer than on Earth — a Martian day is about 24 hours and 37 minutes. Look outside and the sky is not blue, but butterscotch orange, colored by fine red dust floating in the thin air. You would need a spacesuit to step outside, because the air on Mars is mostly carbon dioxide, and it is freezing — an average of about 80 degrees below zero Fahrenheit! Gravity on Mars is only about one-third as strong as Earth's, so you could jump nearly three times higher. Robotic rovers like Perseverance are already exploring Mars, drilling into rocks and searching for signs that tiny life may have existed there billions of years ago, when Mars had rivers and lakes.`,
    questions: [
      { q: 'What color is the sky on Mars?', options: ['Blue', 'Butterscotch orange', 'Green', 'Black'], answer: 1 },
      { q: 'Why would you need a spacesuit on Mars?', options: ['The air is mostly carbon dioxide and freezing', 'It rains too much', 'The sun is too bright', 'There are aliens'], answer: 0 },
      { q: 'How high could you jump on Mars compared to Earth?', options: ['Half as high', 'The same', 'Nearly three times higher', 'Ten times higher'], answer: 2 },
      { q: 'What are rovers searching for on Mars?', options: ['Gold and diamonds', 'Signs of ancient tiny life', 'New animals', 'Water to drink'], answer: 1 },
    ],
  },
];
