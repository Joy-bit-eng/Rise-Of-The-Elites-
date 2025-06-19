import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { EliteData } from '../eliteData';

interface PlayerState {
  // Player stats
  level: number;
  experience: number;
  maxExperience: number;
  health: number;
  maxHealth: number;
  position: [number, number, number];
  
  // Captured Elites
  capturedElites: EliteData[];
  activeElite: EliteData | null;
  
  // UI state
  showInventory: boolean;
  showElites: boolean;
  showQuests: boolean;
  
  // Actions
  setPosition: (position: [number, number, number]) => void;
  gainExperience: (amount: number) => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  
  // Elite management
  addCapturedElite: (elite: EliteData) => void;
  setActiveElite: (elite: EliteData) => void;
  
  // UI toggles
  toggleInventory: () => void;
  toggleElites: () => void;
  toggleQuests: () => void;
}

export const usePlayer = create<PlayerState>()(
  subscribeWithSelector((set, get) => ({
    // Initial stats
    level: 1,
    experience: 0,
    maxExperience: 100,
    health: 100,
    maxHealth: 100,
    position: [0, 2, 0],
    
    // Elites
    capturedElites: [],
    activeElite: null,
    
    // UI state
    showInventory: false,
    showElites: false,
    showQuests: false,
    
    // Actions
    setPosition: (position) => set({ position }),
    
    gainExperience: (amount) => {
      const { experience, maxExperience, level } = get();
      const newExp = experience + amount;
      
      if (newExp >= maxExperience) {
        // Level up!
        set({
          level: level + 1,
          experience: newExp - maxExperience,
          maxExperience: maxExperience + 50,
          maxHealth: get().maxHealth + 10,
          health: get().maxHealth + 10
        });
      } else {
        set({ experience: newExp });
      }
    },
    
    takeDamage: (amount) => {
      const { health } = get();
      set({ health: Math.max(0, health - amount) });
    },
    
    heal: (amount) => {
      const { health, maxHealth } = get();
      set({ health: Math.min(maxHealth, health + amount) });
    },
    
    addCapturedElite: (elite) => {
      const { capturedElites } = get();
      set({ 
        capturedElites: [...capturedElites, { ...elite, isWild: false }]
      });
    },
    
    setActiveElite: (elite) => set({ activeElite: elite }),
    
    // UI toggles
    toggleInventory: () => set((state) => ({ showInventory: !state.showInventory })),
    toggleElites: () => set((state) => ({ showElites: !state.showElites })),
    toggleQuests: () => set((state) => ({ showQuests: !state.showQuests }))
  }))
);
