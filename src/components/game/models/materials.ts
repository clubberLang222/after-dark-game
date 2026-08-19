export const PAWN_FINISH: Record<
  string,
  { color: string; metalness: number; roughness: number; emissive?: string }
> = {
  MIDNIGHT: { color: '#0a0a0c', metalness: 0.95, roughness: 0.22, emissive: '#a78bfa' },
  PASSION: { color: '#7f1d1d', metalness: 0.85, roughness: 0.28, emissive: '#fb7185' },
  ROYAL: { color: '#a16207', metalness: 0.95, roughness: 0.18, emissive: '#fde047' },
  DESIRE: { color: '#4c1d95', metalness: 0.88, roughness: 0.25, emissive: '#c084fc' },
  TEMPTRESS: { color: '#0f766e', metalness: 0.85, roughness: 0.25, emissive: '#2dd4bf' },
  MYSTERY: { color: '#374151', metalness: 0.98, roughness: 0.16, emissive: '#93c5fd' },
  ALLURE: { color: '#9d174d', metalness: 0.9, roughness: 0.24, emissive: '#f9a8d4' },
  NIGHTFALL: { color: '#1e3a8a', metalness: 0.88, roughness: 0.26, emissive: '#60a5fa' },
  LUCKY: { color: '#14532d', metalness: 0.82, roughness: 0.28, emissive: '#4ade80' },
  ANGEL: { color: '#e7e5e4', metalness: 0.92, roughness: 0.14, emissive: '#fde68a' },
};

export const DICE_MATERIAL = {
  color: '#e8eef5',
  metalness: 0.15,
  roughness: 0.35,
};
