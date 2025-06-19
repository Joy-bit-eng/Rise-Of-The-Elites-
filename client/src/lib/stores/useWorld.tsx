import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { useElites } from './useElites';
import { useBattle } from './useBattle';

export type Zone = 'starting' | 'forest' | 'cave' | 'rift' | 'jungle' | 'village' | 'city' | 'valley' | 'mountain' | 'metropolis' | 'desert' | 'coastal' | 'capital' | 'industrial' | 'trading' | 'academic';

interface WorldState {
  currentZone: Zone;
  discoveredZones: Zone[];
  
  // Actions
  changeZone: (zone: Zone) => void;
  discoverZone: (zone: Zone) => void;
  checkForElites: (position: [number, number, number]) => void;
}

export const useWorld = create<WorldState>()(
  subscribeWithSelector((set, get) => ({
    currentZone: 'starting',
    discoveredZones: ['starting'],
    
    changeZone: (zone) => {
      set({ currentZone: zone });
      get().discoverZone(zone);
    },
    
    discoverZone: (zone) => {
      const { discoveredZones } = get();
      if (!discoveredZones.includes(zone)) {
        set({ discoveredZones: [...discoveredZones, zone] });
      }
    },
    
    checkForElites: (position) => {
      const { currentZone } = get();
      const { getWildElites } = useElites.getState();
      const { startBattle } = useBattle.getState();
      
      // Get wild Elites in current zone
      const wildElites = getWildElites(currentZone);
      
      // Check if player is near any Elite
      for (const elite of wildElites) {
        const distance = Math.sqrt(
          Math.pow(position[0] - elite.position[0], 2) +
          Math.pow(position[2] - elite.position[2], 2)
        );
        
        if (distance < 3) {
          // Random encounter chance
          if (Math.random() < 0.3) {
            startBattle(elite);
            break;
          }
        }
      }
    }
  }))
);
