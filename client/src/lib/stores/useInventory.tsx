import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: 'consumable' | 'capture' | 'material' | 'equipment';
  quantity: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  effect?: {
    type: 'heal' | 'boost' | 'capture';
    value: number;
  };
}

interface InventoryState {
  items: InventoryItem[];
  
  // Actions
  addItem: (item: Omit<InventoryItem, 'quantity'>, quantity?: number) => void;
  removeItem: (itemId: string, quantity?: number) => void;
  useItem: (itemId: string) => boolean;
  getItemsByCategory: (category: string) => InventoryItem[];
}

export const useInventory = create<InventoryState>()(
  subscribeWithSelector((set, get) => ({
    items: [
      // Starting items
      {
        id: 'health_potion',
        name: 'Health Potion',
        description: 'Restores 50 HP',
        category: 'consumable',
        quantity: 5,
        rarity: 'common',
        effect: { type: 'heal', value: 50 }
      },
      {
        id: 'elite_ball',
        name: 'Elite Ball',
        description: 'Standard ball for capturing Elites',
        category: 'capture',
        quantity: 10,
        rarity: 'common',
        effect: { type: 'capture', value: 1 }
      },
      {
        id: 'super_ball',
        name: 'Super Ball',
        description: 'Enhanced ball with higher capture rate',
        category: 'capture',
        quantity: 3,
        rarity: 'uncommon',
        effect: { type: 'capture', value: 1.5 }
      },
      {
        id: 'fusion_crystal',
        name: 'Fusion Crystal',
        description: 'Required for Elite fusion',
        category: 'material',
        quantity: 2,
        rarity: 'rare'
      }
    ],
    
    addItem: (item, quantity = 1) => {
      const { items } = get();
      const existingItem = items.find(i => i.id === item.id);
      
      if (existingItem) {
        set({
          items: items.map(i => 
            i.id === item.id 
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        });
      } else {
        set({
          items: [...items, { ...item, quantity }]
        });
      }
    },
    
    removeItem: (itemId, quantity = 1) => {
      const { items } = get();
      set({
        items: items.map(item => 
          item.id === itemId 
            ? { ...item, quantity: Math.max(0, item.quantity - quantity) }
            : item
        ).filter(item => item.quantity > 0)
      });
    },
    
    useItem: (itemId) => {
      const { items } = get();
      const item = items.find(i => i.id === itemId);
      
      if (!item || item.quantity <= 0) return false;
      
      // Apply item effect
      if (item.effect) {
        switch (item.effect.type) {
          case 'heal':
            const { heal } = usePlayer.getState();
            heal(item.effect.value);
            break;
          case 'boost':
            // TODO: Implement stat boosts
            break;
        }
      }
      
      // Remove one item
      get().removeItem(itemId, 1);
      return true;
    },
    
    getItemsByCategory: (category) => {
      return get().items.filter(item => item.category === category);
    }
  }))
);

// Import usePlayer here to avoid circular dependency
import { usePlayer } from './usePlayer';
