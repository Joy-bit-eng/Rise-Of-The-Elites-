import React from 'react';
import GameHUD from './UI/GameHUD';
import BattleScreen from './UI/BattleScreen';
import InventoryScreen from './UI/InventoryScreen';
import EliteScreen from './UI/EliteScreen';
import QuestLog from './UI/QuestLog';
import MobileControls from './UI/MobileControls';
import { useBattle } from '../lib/stores/useBattle';
import { usePlayer } from '../lib/stores/usePlayer';

function GameUI() {
  const { inBattle } = useBattle();
  const { showInventory, showElites, showQuests } = usePlayer();

  return (
    <>
      {/* HUD always visible */}
      <GameHUD />
      
      {/* Mobile controls for touch devices */}
      <MobileControls />
      
      {/* Modal screens */}
      {inBattle && <BattleScreen />}
      {showInventory && <InventoryScreen />}
      {showElites && <EliteScreen />}
      {showQuests && <QuestLog />}
    </>
  );
}

export default GameUI;