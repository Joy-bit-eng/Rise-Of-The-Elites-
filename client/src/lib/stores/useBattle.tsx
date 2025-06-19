import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { EliteData } from '../eliteData';
import { useElites, BattleElite } from './useElites';
import { usePlayer } from './usePlayer';
import { useAudio } from './useAudio';

type BattlePhase = 'menu' | 'animation' | 'victory' | 'defeat' | 'captured';

interface BattleState {
  inBattle: boolean;
  battlePhase: BattlePhase;
  playerElite: BattleElite | null;
  enemyElite: BattleElite | null;
  playerTurn: boolean;
  battleLog: string[];
  
  // Actions
  startBattle: (enemyElite: EliteData) => void;
  attack: (attackType: string) => void;
  capture: () => void;
  flee: () => void;
  endBattle: () => void;
}

export const useBattle = create<BattleState>()(
  subscribeWithSelector((set, get) => ({
    inBattle: false,
    battlePhase: 'menu',
    playerElite: null,
    enemyElite: null,
    playerTurn: true,
    battleLog: [],
    
    startBattle: (enemyElite: EliteData) => {
      const { capturedElites } = usePlayer.getState();
      const { createBattleElite } = useElites.getState();
      
      // Use first captured Elite or create a default starter
      let playerElite = capturedElites[0];
      if (!playerElite) {
        // Default starter Elite
        playerElite = {
          id: 'starter_spark',
          name: 'Spark',
          type: 'electric',
          level: 5,
          baseStats: { hp: 45, attack: 30, defense: 25, speed: 35 },
          abilities: ['Thunderbolt', 'Quick Attack'],
          description: 'A loyal Electric-type Elite that bonds quickly with trainers.',
          rarity: 'common',
          color: '#FFD700',
          isWild: false,
          position: [0, 0, 0]
        };
      }
      
      set({
        inBattle: true,
        battlePhase: 'menu',
        playerElite: createBattleElite(playerElite),
        enemyElite: createBattleElite(enemyElite),
        playerTurn: true,
        battleLog: [`A wild ${enemyElite.name} appeared!`]
      });
    },
    
    attack: (attackType: string) => {
      const { playerElite, enemyElite, playerTurn } = get();
      if (!playerElite || !enemyElite || !playerTurn) return;
      
      set({ battlePhase: 'animation' });
      
      // Calculate damage
      const baseDamage = attackType === 'special' ? 
        playerElite.baseStats.attack * 1.5 : 
        playerElite.baseStats.attack;
      
      const damage = Math.floor(baseDamage * (0.8 + Math.random() * 0.4));
      const newEnemyHP = Math.max(0, enemyElite.currentHP - damage);
      
      // Play hit sound
      const { playHit } = useAudio.getState();
      playHit();
      
      setTimeout(() => {
        set((state) => ({
          enemyElite: state.enemyElite ? {
            ...state.enemyElite,
            currentHP: newEnemyHP
          } : null,
          battleLog: [...state.battleLog, `${playerElite.name} used ${attackType}! Dealt ${damage} damage!`]
        }));
        
        if (newEnemyHP <= 0) {
          // Victory!
          const { gainExperience } = usePlayer.getState();
          gainExperience(enemyElite.level * 10);
          
          set({ 
            battlePhase: 'victory',
            battleLog: [...get().battleLog, `${enemyElite.name} fainted! You won!`]
          });
        } else {
          // Enemy turn
          set({ playerTurn: false, battlePhase: 'menu' });
          get().enemyAttack();
        }
      }, 1000);
    },
    
    capture: () => {
      const { enemyElite } = get();
      if (!enemyElite) return;
      
      set({ battlePhase: 'animation' });
      
      // Capture chance based on enemy HP and level
      const captureRate = (1 - (enemyElite.currentHP / enemyElite.maxHP)) * 0.7 + 0.1;
      const success = Math.random() < captureRate;
      
      setTimeout(() => {
        if (success) {
          const { addCapturedElite } = usePlayer.getState();
          const { playSuccess } = useAudio.getState();
          
          addCapturedElite({
            ...enemyElite,
            id: `captured_${enemyElite.name}_${Date.now()}`,
            isWild: false
          });
          
          playSuccess();
          
          set({ 
            battlePhase: 'captured',
            battleLog: [...get().battleLog, `${enemyElite.name} was captured!`]
          });
        } else {
          set({ 
            playerTurn: false,
            battlePhase: 'menu',
            battleLog: [...get().battleLog, `${enemyElite.name} broke free!`]
          });
          get().enemyAttack();
        }
      }, 1500);
    },
    
    flee: () => {
      set({
        inBattle: false,
        battlePhase: 'menu',
        playerElite: null,
        enemyElite: null,
        battleLog: []
      });
    },
    
    endBattle: () => {
      set({
        inBattle: false,
        battlePhase: 'menu',
        playerElite: null,
        enemyElite: null,
        battleLog: []
      });
    },
    
    // Internal method for enemy attacks
    enemyAttack: () => {
      const { playerElite, enemyElite } = get();
      if (!playerElite || !enemyElite) return;
      
      setTimeout(() => {
        const damage = Math.floor(enemyElite.baseStats.attack * (0.6 + Math.random() * 0.4));
        const newPlayerHP = Math.max(0, playerElite.currentHP - damage);
        
        set((state) => ({
          playerElite: state.playerElite ? {
            ...state.playerElite,
            currentHP: newPlayerHP
          } : null,
          battleLog: [...state.battleLog, `${enemyElite.name} attacked! Dealt ${damage} damage!`]
        }));
        
        if (newPlayerHP <= 0) {
          set({ 
            battlePhase: 'defeat',
            battleLog: [...get().battleLog, `${playerElite.name} fainted! You lost!`]
          });
        } else {
          set({ playerTurn: true, battlePhase: 'menu' });
        }
      }, 1000);
    }
  }))
);
