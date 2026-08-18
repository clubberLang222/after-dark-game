import { useCallback, useEffect, useMemo, useSyncExternalStore } from 'react';
import { getEngine } from '../engine/GameEngine';
import { BUILTIN_CARDS } from '../content/builtinCards';
import type { Player, GameConfig, DiceKind } from '../types';

const engine = getEngine(BUILTIN_CARDS);

export function useGameEngine() {
  const state = useSyncExternalStore(
    (onStoreChange) => engine.subscribe(onStoreChange),
    () => engine.getState(),
    () => engine.getState()
  );

  useEffect(() => {
    try {
      engine.loadSettings();
    } catch {
      /* ignore */
    }
  }, []);

  const currentPlayer = useMemo(() => {
    const players = state.config?.players ?? [];
    if (!players.length) return null;
    const idx = ((state.turnIndex % players.length) + players.length) % players.length;
    return players[idx] ?? null;
  }, [state.config?.players, state.turnIndex]);

  const configure = useCallback((config: Partial<GameConfig>) => engine.configure(config), []);
  const setPlayers = useCallback((players: Player[]) => engine.setPlayers(players), []);
  const startGame = useCallback(() => engine.startGame(), []);
  const requestRoll = useCallback((kind: DiceKind = 'MOVE') => engine.requestRoll(kind), []);
  const completePrivacyGate = useCallback(() => engine.completePrivacyGate(), []);
  const resolveCard = useCallback(
    (action: 'accept' | 'pass' | 'downgrade', actionId: string) =>
      engine.resolveCard(action, actionId),
    []
  );
  const switchCard = useCallback((actionId: string) => engine.switchCard(actionId), []);
  const castVote = useCallback(
    (voterId: string, choice: 'yes' | 'no') => engine.castVote(voterId, choice),
    []
  );
  const saveGame = useCallback(() => engine.saveGame(), []);
  const loadGame = useCallback(() => engine.loadGame(), []);
  const clearSave = useCallback(() => engine.clearSave(), []);
  const returnToSetup = useCallback(() => engine.returnToSetup(), []);

  return {
    state,
    currentPlayer,
    configure,
    setPlayers,
    startGame,
    requestRoll,
    completePrivacyGate,
    resolveCard,
    switchCard,
    castVote,
    saveGame,
    loadGame,
    clearSave,
    returnToSetup,
    getAllCards: () => engine.getAllCards(),
    settings: engine.getSettings(),
  };
}

export type UseGameEngine = ReturnType<typeof useGameEngine>;
