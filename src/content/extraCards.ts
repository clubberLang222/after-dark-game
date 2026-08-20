/** Expanded question & challenge pool */
import type { Card } from '../types';

export const EXTRA_CARDS: Card[] = [
  { id: 'x_01', category: 'REVEAL', level: 1, title: 'First Spark', body: 'What first made you notice someone at this table?', sparks: 1, active: true },
  { id: 'x_02', category: 'REVEAL', level: 1, title: 'Soft Limit', body: 'Name one soft limit you want respected tonight.', sparks: 1, active: true },
  { id: 'x_03', category: 'DARE', level: 1, title: 'Whisper Route', body: 'Whisper a compliment about their mouth to the person on your right.', sparks: 1, active: true },
  { id: 'x_04', category: 'CHEMISTRY', level: 1, title: 'Pulse Check', body: 'Two fingers on their wrist or neck. Count their pulse for 20 seconds in silence.', sparks: 1, active: true },
  { id: 'x_05', category: 'DARE', level: 2, title: 'Blind Sip', body: 'Blindfold optional: feed them a sip or bite without using your hands.', sparks: 2, minFrisky: 'SPICY', active: true },
  { id: 'x_06', category: 'REVEAL', level: 2, title: 'Late Night Truth', body: 'What is something you want tonight but have not asked for yet?', sparks: 2, active: true },
  { id: 'x_07', category: 'CHEMISTRY', level: 2, title: 'Breath Sync', body: 'Foreheads together. Match breathing for one full minute.', sparks: 2, active: true },
  { id: 'x_08', category: 'COUPLE', level: 2, title: 'Private Signal', body: 'Invent a silent signal that means "more" for the rest of the night.', sparks: 2, coupleRequired: true, active: true },
  { id: 'x_09', category: 'WILDCARD', level: 2, title: 'Table Vote Tease', body: 'The table votes: kiss cheek, lips, or neck. You deliver once.', sparks: 2, voting: true, active: true },
  { id: 'x_10', category: 'DARE', level: 3, title: 'Slow Undress Layer', body: 'Remove one layer as slowly as you can while making eye contact with someone you choose.', sparks: 3, minFrisky: 'SPICY', privacyGate: true, active: true },
  { id: 'x_11', category: 'REVEAL', level: 3, title: 'Heat Confession', body: 'Describe the last time you were this turned on — keep it honest.', sparks: 3, active: true },
  { id: 'x_12', category: 'CHEMISTRY', level: 3, title: 'Edge the Air', body: 'Hands on them over clothes only. Bring them as close as you can in 90 seconds without finishing anything.', sparks: 3, minFrisky: 'EXPLICIT', privacyGate: true, active: true },
  { id: 'x_13', category: 'COUPLE', level: 3, title: 'Command Chain', body: 'Give three short commands. They follow. Then switch for one command.', sparks: 3, coupleRequired: true, minFrisky: 'SPICY', active: true },
  { id: 'x_14', category: 'WILDCARD', level: 3, title: 'Dare Auction', body: 'Two players each offer a dare. Table votes which one you must do.', sparks: 3, voting: true, active: true },
  { id: 'x_15', category: 'DARE', level: 4, title: 'No-Hands Kiss Trail', body: 'Kiss from mouth to navel without using your hands. Stop if they say the safe word.', sparks: 4, minFrisky: 'EXPLICIT', privacyGate: true, active: true },
  { id: 'x_16', category: 'REVEAL', level: 4, title: 'Filthiest Want', body: 'Say out loud the filthiest thing you still want before the night ends.', sparks: 4, minFrisky: 'FILTHY', active: true },
  { id: 'x_17', category: 'CHEMISTRY', level: 4, title: 'Hold the Edge', body: 'Bring them to the edge twice. They decide if a third is allowed.', sparks: 4, minFrisky: 'FILTHY', privacyGate: true, active: true },
  { id: 'x_18', category: 'FINAL', level: 4, title: 'Last Pose', body: 'Strike one pose that sums up your night. Table rates 1–5 for flair only.', sparks: 5, voting: true, active: true },
  { id: 'x_19', category: 'DARE', level: 1, title: 'Seat Swap', body: 'Switch seats with someone. Stay for two full turns.', sparks: 1, active: true },
  { id: 'x_20', category: 'REVEAL', level: 2, title: 'Body Favorite', body: 'Name a body part of yours you like being paid attention to.', sparks: 2, active: true },
];
