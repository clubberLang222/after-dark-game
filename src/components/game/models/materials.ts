export const PAWN_FINISH: Record<
  string,
  { color: string; metalness: number; roughness: number; emissive?: string }
> = {
  MIDNIGHT: { color: '#0c0c0e', metalness: 0.95, roughness: 0.25 },
  PASSION: { color: '#8b0a1a', metalness: 0.85, roughness: 0.3 },
  ROYAL: { color: '#c9a227', metalness: 0.95, roughness: 0.2 },
  DESIRE: { color: '#6b2d8e', metalness: 0.8, roughness: 0.28 },
  TEMPTRESS: { color: '#0d8a8a', metalness: 0.85, roughness: 0.25 },
  MYSTERY: { color: '#b8b8c0', metalness: 0.98, roughness: 0.18 },
  ALLURE: { color: '#b76e79', metalness: 0.9, roughness: 0.25 },
  NIGHTFALL: { color: '#1e3a8a', metalness: 0.85, roughness: 0.28 },
  LUCKY: { color: '#14532d', metalness: 0.8, roughness: 0.3 },
  ANGEL: { color: '#e8e8ec', metalness: 0.95, roughness: 0.15 },
};

export const DICE_MATERIAL = {
  color: '#e8eef5',
  metalness: 0.15,
  roughness: 0.35,
};
