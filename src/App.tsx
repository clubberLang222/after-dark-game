import { useState, useEffect } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { PlayerSetup } from './components/setup/PlayerSetup';
import { Board } from './components/game/Board';
import { Dice3D } from './components/game/Dice3D';
import { PlayerRoster } from './components/game/PlayerRoster';
import { CardOverlay } from './components/game/CardOverlay';
import { AdminCMS, recordGameHistory } from './components/admin/AdminCMS';
import { MediaAtmosphere } from './components/game/MediaAtmosphere';
import { SparkFx } from './components/game/SparkFx';
import { AchievementToast } from './components/game/AchievementToast';
import { HostLobby } from './components/multiplayer/HostLobby';
import { ControllerView } from './components/multiplayer/ControllerView';
import { DisplayView } from './components/multiplayer/DisplayView';
import type { Player, GameMode, BoardId } from './types';
import { ACHIEVEMENT_DEFS } from './types';
import './App.css';

function getQueryCode(key: string): string | null {
  try {
    const q = new URLSearchParams(window.location.search);
    return q.get(key)?.toUpperCase() || null;
  } catch {
    return null;
  }
}

function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [networkHost, setNetworkHost] = useState(false);
  const [joinCode, setJoinCode] = useState<string | null>(() => getQueryCode('join'));
  const [displayCode, setDisplayCode] = useState<string | null>(() =>
    getQueryCode('display')
  );

  const {
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
    loadGame,
    returnToSetup,
    clearSave,
  } = useGameEngine();

  useEffect(() => {
    if (state.phase !== 'finished' || !state.startedAt) return;
    const winner = state.config.players.find(
      (p) => p.id === state.finalRound.winnerId
    );
    recordGameHistory({
      finishedAt: Date.now(),
      mode: state.config.mode,
      boardId: state.config.boardId,
      playerCount: state.config.players.length,
      winnerName: winner?.name,
      durationMin: Math.round((Date.now() - state.startedAt) / 60000),
    });
  }, [state.phase]);

  const handleStart = (
    players: Player[],
    mode: GameMode,
    boardId: BoardId,
    targetSparks: number
  ) => {
    if (mode === 'LOCAL_NETWORK') {
      setNetworkHost(true);
      return;
    }
    configure({ mode, boardId, targetSparks });
    setPlayers(players);
    startGame();
  };

  const clearQuery = (key: 'join' | 'display') => {
    if (key === 'join') setJoinCode(null);
    else setDisplayCode(null);
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete(key);
      window.history.replaceState({}, '', url.pathname + url.search);
    } catch {
      /* ignore */
    }
  };

  if (displayCode) {
    return (
      <div className="app after-dark">
        <MediaAtmosphere />
        <DisplayView roomCode={displayCode} onExit={() => clearQuery('display')} />
      </div>
    );
  }

  if (joinCode) {
    return (
      <div className="app after-dark">
        <MediaAtmosphere />
        <ControllerView roomCode={joinCode} onExit={() => clearQuery('join')} />
      </div>
    );
  }

  if (showAdmin) {
    return (
      <div className="app after-dark">
        <MediaAtmosphere />
        <AdminCMS onClose={() => setShowAdmin(false)} />
      </div>
    );
  }

  if (networkHost) {
    return (
      <div className="app after-dark">
        <MediaAtmosphere />
        <HostLobby onExit={() => setNetworkHost(false)} />
      </div>
    );
  }

  if (state.phase === 'setup') {
    return (
      <div className="app after-dark">
        <MediaAtmosphere />
        <PlayerSetup onStart={handleStart} onLoad={() => loadGame()} />
        <button type="button" className="admin-entry" onClick={() => setShowAdmin(true)} title="Admin CMS">Admin</button>
      </div>
    );
  }

  const canRoll =
    (state.phase === 'playing' || state.phase === 'final_round') &&
    !state.dice.rolling &&
    !state.card.current;

  return (
    <div className="app after-dark">
      <MediaAtmosphere />
      <header className="game-header">
        <h1>After Dark</h1>
        <span className="phase-badge">{state.phase.replace('_', ' ')}</span>
        {state.finalRound.active && <span className="final-badge">Final Round</span>}
        <button type="button" className="ghost" onClick={() => setShowAdmin(true)}>Admin</button>
        <button type="button" className="ghost" onClick={() => { if (confirm('End this night and return to setup?')) { clearSave(); returnToSetup(); } }}>End</button>
      </header>
      <main className="game-layout">
        <aside className="sidebar left">
          <PlayerRoster players={state.config.players} currentId={currentPlayer?.id ?? null} targetSparks={state.config.targetSparks} />
        </aside>
        <section className="center">
          <Board boardId={state.config.boardId} players={state.config.players} currentPlayerId={currentPlayer?.id ?? null} dice={state.dice} />
          <div className="controls">
            <Dice3D dice={state.dice} onRoll={() => requestRoll('MOVE')} disabled={!canRoll} />
            {currentPlayer && <p className="turn-indicator">{currentPlayer.name}'s turn</p>}
          </div>
        </section>
      </main>
      <CardOverlay
        cardState={state.card}
        phase={state.phase}
        players={state.config.players}
        currentPlayerId={currentPlayer?.id ?? null}
        onPrivacyComplete={completePrivacyGate}
        onResolve={(action) => { if (state.card.actionId) resolveCard(action, state.card.actionId); }}
        onSwitch={() => { if (state.card.actionId) switchCard(state.card.actionId); }}
        onVote={(voterId, choice) => castVote(voterId, choice)}
      />
      <SparkFx sparksTotal={state.config.players.reduce((s, p) => s + p.sparks, 0)} />
      <AchievementToast achievements={state.achievements} playerName={(id) => state.config.players.find((p) => p.id === id)?.name || 'Player'} />
      {state.phase === 'finished' && (
        <div className="card-overlay">
          <div className="card-panel winner">
            <h2>Night Over</h2>
            <p>Winner: {state.config.players.find((p) => p.id === state.finalRound.winnerId)?.name ?? '—'}</p>
            <button type="button" className="primary" onClick={() => { clearSave(); returnToSetup(); }}>New Night</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
