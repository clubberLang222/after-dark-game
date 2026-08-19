/**
 * Medium menu of sexual acts that may appear on challenge cards.
 * Players select which acts are in play during setup.
 */

export const SEXUAL_ACTS = [
  'kissing',
  'making out',
  'neck kissing',
  'grinding (clothed)',
  'lap sitting',
  'hand exploration over clothes',
  'hand exploration under clothes',
  'undressing a layer',
  'massage (sensual)',
  'blindfold tease',
  'ice / temperature play',
  'oral (receiving)',
  'oral (giving)',
  'manual stimulation',
  'mutual manual',
  'toy use (external)',
  'toy use (insertable)',
  'penetration',
  'edge / deny',
  'roleplay command',
  'dirty talk',
  'body worship',
  'spanking (light)',
  'exhibition / show',
  'camera still',
  'camera video',
  'sixty-nine',
  'from behind',
  'riding',
  'finish / climax',
] as const;

export type SexualAct = (typeof SEXUAL_ACTS)[number];

export const DEFAULT_SELECTED_ACTS: string[] = [
  'kissing',
  'making out',
  'neck kissing',
  'grinding (clothed)',
  'lap sitting',
  'hand exploration over clothes',
  'undressing a layer',
  'massage (sensual)',
  'dirty talk',
  'body worship',
  'exhibition / show',
];

export function pickAct(allowed?: string[], seed?: number): string {
  const pool = allowed?.length ? allowed : [...SEXUAL_ACTS];
  const i =
    seed != null ? seed % pool.length : Math.floor(Math.random() * pool.length);
  return pool[i];
}
