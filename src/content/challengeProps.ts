/** After Dark — challenge props & foods (Master) */

export const CHALLENGE_ITEMS = [
  'silk blindfold', 'ice cubes', 'feather', 'massage oil', 'lipstick',
  'body paint', 'handcuffs (soft)', 'vibrator / bullet', 'collar & leash (play)',
  'candle (drip-safe wax)', 'dice', 'timer / phone stopwatch', 'mirror', 'scarf',
  'whip / flogger (light)', 'paddle', 'stockings', 'collar', 'rope (soft bondage)',
  'butt plug', 'cock ring', 'lube', 'condoms', 'strap-on', 'remote toy',
] as const;

export const CHALLENGE_FOODS = [
  'whipped cream', 'chocolate syrup', 'strawberries', 'honey', 'ice cream',
  'cherries', 'banana', 'whiskey / shot', 'champagne', 'melted chocolate',
  'caramel', 'pop rocks', 'mint', 'cucumber', 'whipped cream can',
  'chocolate body sauce', 'edible underwear', 'lollipop',
] as const;

export function pickItem(seed?: number): string {
  const i = seed != null ? seed % CHALLENGE_ITEMS.length : Math.floor(Math.random() * CHALLENGE_ITEMS.length);
  return CHALLENGE_ITEMS[i];
}

export function pickFood(seed?: number): string {
  const i = seed != null ? seed % CHALLENGE_FOODS.length : Math.floor(Math.random() * CHALLENGE_FOODS.length);
  return CHALLENGE_FOODS[i];
}
