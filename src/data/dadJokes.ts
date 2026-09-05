export interface DadJoke {
  setup: string
  punchline: string
  category: 'braai' | 'cars' | 'rugby' | 'bikes' | 'music' | 'general'
}

export const dadJokes: DadJoke[] = [
  // Braai jokes
  { setup: "Why did the steak go to the braai?", punchline: "Because it wanted to meat everyone!", category: "braai" },
  { setup: "What do you call a fake braai?", punchline: "A sham-burger!", category: "braai" },
  { setup: "Why don't braai masters ever get lost?", punchline: "They always follow the smoke signals!", category: "braai" },
  { setup: "What did the braai say to the coal?", punchline: "You're fired!", category: "braai" },
  { setup: "Why was the braai such a good listener?", punchline: "Because it always lends an ear of corn!", category: "braai" },
  { setup: "What's a braai master's favourite day?", punchline: "Fry-day!", category: "braai" },
  { setup: "Why did the boerewors break up with the braai?", punchline: "It was a toxic relationship — too much heat!", category: "braai" },
  { setup: "What do you call a braai in the rain?", punchline: "A missed-steak!", category: "braai" },

  // Car jokes
  { setup: "What kind of car does a Jedi drive?", punchline: "A Toy-Yoda!", category: "cars" },
  { setup: "Why did the car apply for a job?", punchline: "It wanted to quit being so exhausted!", category: "cars" },
  { setup: "What do you call a car that's been sitting in the sun?", punchline: "A hot rod!", category: "cars" },
  { setup: "Why did the engine break up with the gearbox?", punchline: "Too much friction in the relationship!", category: "cars" },
  { setup: "What's a car's favourite meal?", punchline: "Brake-fast!", category: "cars" },
  { setup: "Why don't cars play cricket?", punchline: "They're afraid of getting bowled over!", category: "cars" },

  // Rugby jokes
  { setup: "Why did the rugby ball go to school?", punchline: "To get a better pass!", category: "rugby" },
  { setup: "What do you call a Springbok who scores all the tries?", punchline: "Try-umphant!", category: "rugby" },
  { setup: "Why are rugby players so good at making friends?", punchline: "They know how to make a good conversion!", category: "rugby" },
  { setup: "What's a rugby player's favourite sweet?", punchline: "A try-fle!", category: "rugby" },
  { setup: "Why did the rugby team go to the bakery?", punchline: "They needed a good roll!", category: "rugby" },
  { setup: "What do you call a rugby player with no arms?", punchline: "A hooker! Wait... that's a position!", category: "rugby" },

  // Bike/off-road jokes
  { setup: "Why did the dirt bike go to therapy?", punchline: "It had too many breakdowns on the trail!", category: "bikes" },
  { setup: "What do you call a bike that can't stop talking?", punchline: "A Yamaha-uth!", category: "bikes" },
  { setup: "Why don't mountain bikes ever win arguments?", punchline: "They always get derailed!", category: "bikes" },
  { setup: "What did the trail say to the bike?", punchline: "You really grind my gears!", category: "bikes" },
  { setup: "Why was the off-road bike so popular?", punchline: "It really knew how to handle the bumps in life!", category: "bikes" },

  // Rock music jokes
  { setup: "Why did the guitar go to jail?", punchline: "It was caught fingering a minor!", category: "music" },
  { setup: "What do you call a guitarist without a girlfriend?", punchline: "Homeless!", category: "music" },
  { setup: "Why did the drummer sit behind the drums?", punchline: "He couldn't face the music!", category: "music" },
  { setup: "How do you make a band stand?", punchline: "Take away their chairs!", category: "music" },
  { setup: "What's a rock star's favourite type of coffee?", punchline: "Heavy Metal roast!", category: "music" },
  { setup: "Why did AC/DC go to the electrician?", punchline: "They were having current problems!", category: "music" },

  // General dad jokes
  { setup: "I told my wife she was drawing her eyebrows too high.", punchline: "She looked surprised!", category: "general" },
  { setup: "What do you call a fake noodle?", punchline: "An impasta!", category: "general" },
  { setup: "Why don't eggs tell jokes?", punchline: "They'd crack each other up!", category: "general" },
  { setup: "I'm reading a book about anti-gravity.", punchline: "It's impossible to put down!", category: "general" },
  { setup: "What did the ocean say to the beach?", punchline: "Nothing, it just waved!", category: "general" },
  { setup: "Why did the scarecrow win an award?", punchline: "He was outstanding in his field!", category: "general" },
  { setup: "I used to hate facial hair, but then...", punchline: "It grew on me!", category: "general" },
  { setup: "What do you call cheese that isn't yours?", punchline: "Nacho cheese!", category: "general" },
  { setup: "Why did the bicycle fall over?", punchline: "It was two-tired!", category: "general" },
  { setup: "What do you call a boomerang that doesn't come back?", punchline: "A stick!", category: "general" },
]

const categoryEmojis: Record<DadJoke['category'], string> = {
  braai: '🔥',
  cars: '🚗',
  rugby: '🏉',
  bikes: '🏍️',
  music: '🎸',
  general: '😄',
}

export function getRandomJoke(): DadJoke {
  return dadJokes[Math.floor(Math.random() * dadJokes.length)]
}

export function getCategoryEmoji(category: DadJoke['category']): string {
  return categoryEmojis[category]
}
