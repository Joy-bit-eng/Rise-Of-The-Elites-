import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { eliteDatabase, EliteData } from '../eliteData';

export interface BattleElite extends EliteData {
  currentHP: number;
  maxHP: number;
}

interface ElitesState {
  // Wild Elite spawning
  getWildElites: (zone: string) => EliteData[];
  
  // Elite management
  createBattleElite: (baseElite: EliteData) => BattleElite;
  evolveElite: (eliteId: string) => EliteData | null;
  fuseElites: (elite1: EliteData, elite2: EliteData) => EliteData | null;
  
  // Elite database access
  getEliteById: (id: string) => EliteData | undefined;
  getElitesByType: (type: string) => EliteData[];
}

export const useElites = create<ElitesState>()(
  subscribeWithSelector((set, get) => ({
    getWildElites: (zone: string) => {
      // Get appropriate Elites for each zone
      const zoneElites = {
        starting: ['spark', 'leaf', 'boulder', 'splash'],
        forest: ['leaf', 'thorn', 'swift', 'nature'],
        cave: ['boulder', 'crystal', 'metal', 'earth'],
        rift: ['shadow', 'void', 'phantom', 'rift']
      };

      const eliteIds = zoneElites[zone] || zoneElites.starting;
      const wildElites = [];

      // Spawn 3-5 random Elites in the zone
      const spawnCount = Math.floor(Math.random() * 3) + 3;
      
      for (let i = 0; i < spawnCount; i++) {
        const randomEliteId = eliteIds[Math.floor(Math.random() * eliteIds.length)];
        const baseElite = eliteDatabase[randomEliteId];
        
        if (baseElite) {
          wildElites.push({
            ...baseElite,
            id: `${randomEliteId}_${i}_${Date.now()}`,
            level: Math.floor(Math.random() * 10) + 1,
            isWild: true,
            position: [
              Math.random() * 30 - 15,
              1,
              Math.random() * 30 - 15
            ] as [number, number, number]
          });
        }
      }

      return wildElites;
    },

    createBattleElite: (baseElite: EliteData): BattleElite => {
      const maxHP = baseElite.baseStats.hp + (baseElite.level * 5);
      return {
        ...baseElite,
        currentHP: maxHP,
        maxHP: maxHP
      };
    },

    evolveElite: (eliteId: string): EliteData | null => {
      const elite = eliteDatabase[eliteId];
      if (!elite || !elite.evolutionData) return null;

      const evolved = eliteDatabase[elite.evolutionData.evolvesTo];
      if (!evolved) return null;

      return {
        ...evolved,
        level: elite.level,
        id: `${evolved.name.toLowerCase()}_${Date.now()}`
      };
    },

    fuseElites: (elite1: EliteData, elite2: EliteData): EliteData | null => {
      // Simple fusion logic - combine stats and create hybrid
      const fusedStats = {
        hp: Math.floor((elite1.baseStats.hp + elite2.baseStats.hp) / 2),
        attack: Math.floor((elite1.baseStats.attack + elite2.baseStats.attack) / 2),
        defense: Math.floor((elite1.baseStats.defense + elite2.baseStats.defense) / 2),
        speed: Math.floor((elite1.baseStats.speed + elite2.baseStats.speed) / 2)
      };

      return {
        id: `fused_${Date.now()}`,
        name: `${elite1.name}${elite2.name}`,
        type: elite1.type, // Primary type
        secondaryType: elite2.type,
        level: Math.max(elite1.level, elite2.level),
        baseStats: fusedStats,
        abilities: [...(elite1.abilities || []), ...(elite2.abilities || [])],
        description: `A fusion of ${elite1.name} and ${elite2.name}`,
        rarity: 'legendary',
        color: '#FFD700', // Gold for fused Elites
        isWild: false,
        position: [0, 0, 0]
      };
    },

    getEliteById: (id: string) => {
      return eliteDatabase[id];
    },

    getElitesByType: (type: string) => {
      return Object.values(eliteDatabase).filter(elite => 
        elite.type === type || elite.secondaryType === type
      );
    }
  }))
);
