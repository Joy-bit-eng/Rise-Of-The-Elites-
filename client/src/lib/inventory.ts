import { pokemonItems, PokemonItem } from './pokemonItems';

export interface InventoryItem {
  id: string;
  itemId: string;
  quantity: number;
  item: PokemonItem;
}

export interface PlayerInventory {
  items: InventoryItem[];
  maxSlots: number;
  money: number;
}

export class InventoryManager {
  private inventory: PlayerInventory;

  constructor() {
    this.inventory = {
      items: [],
      maxSlots: 40,
      money: 3000 // Starting money
    };
    
    // Give starter items
    this.addItem('pokeball', 10);
    this.addItem('potion', 5);
    this.addItem('antidote', 3);
  }

  getInventory(): PlayerInventory {
    return this.inventory;
  }

  addItem(itemId: string, quantity: number = 1): boolean {
    const item = pokemonItems[itemId];
    if (!item) return false;

    // Check if item already exists in inventory
    const existingItem = this.inventory.items.find(invItem => invItem.itemId === itemId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      return true;
    }

    // Check if we have space for new item
    if (this.inventory.items.length >= this.inventory.maxSlots) {
      return false; // Inventory full
    }

    // Add new item
    this.inventory.items.push({
      id: `inv_${Date.now()}_${Math.random()}`,
      itemId,
      quantity,
      item
    });

    return true;
  }

  removeItem(itemId: string, quantity: number = 1): boolean {
    const existingItem = this.inventory.items.find(invItem => invItem.itemId === itemId);
    
    if (!existingItem || existingItem.quantity < quantity) {
      return false; // Not enough items
    }

    existingItem.quantity -= quantity;

    // Remove item if quantity reaches 0
    if (existingItem.quantity <= 0) {
      this.inventory.items = this.inventory.items.filter(invItem => invItem.id !== existingItem.id);
    }

    return true;
  }

  hasItem(itemId: string, quantity: number = 1): boolean {
    const existingItem = this.inventory.items.find(invItem => invItem.itemId === itemId);
    return existingItem ? existingItem.quantity >= quantity : false;
  }

  getItemQuantity(itemId: string): number {
    const existingItem = this.inventory.items.find(invItem => invItem.itemId === itemId);
    return existingItem ? existingItem.quantity : 0;
  }

  addMoney(amount: number): void {
    this.inventory.money += amount;
  }

  removeMoney(amount: number): boolean {
    if (this.inventory.money < amount) {
      return false; // Not enough money
    }
    this.inventory.money -= amount;
    return true;
  }

  getMoney(): number {
    return this.inventory.money;
  }

  getItemsByCategory(category: PokemonItem['category']): InventoryItem[] {
    return this.inventory.items.filter(invItem => invItem.item.category === category);
  }

  getItemsByRarity(rarity: PokemonItem['rarity']): InventoryItem[] {
    return this.inventory.items.filter(invItem => invItem.item.rarity === rarity);
  }

  sortItemsByName(): void {
    this.inventory.items.sort((a, b) => a.item.name.localeCompare(b.item.name));
  }

  sortItemsByCategory(): void {
    const categoryOrder = ['pokeball', 'medicine', 'berry', 'tm', 'evolution', 'battle', 'held', 'key'];
    this.inventory.items.sort((a, b) => {
      const aIndex = categoryOrder.indexOf(a.item.category);
      const bIndex = categoryOrder.indexOf(b.item.category);
      return aIndex - bIndex;
    });
  }

  sortItemsByRarity(): void {
    const rarityOrder = ['common', 'uncommon', 'rare', 'ultra_rare', 'legendary'];
    this.inventory.items.sort((a, b) => {
      const aIndex = rarityOrder.indexOf(a.item.rarity);
      const bIndex = rarityOrder.indexOf(b.item.rarity);
      return bIndex - aIndex; // Reverse order (legendary first)
    });
  }

  useItem(itemId: string, targetEliteId?: string): boolean {
    if (!this.hasItem(itemId)) return false;

    const item = pokemonItems[itemId];
    if (!item) return false;

    // Handle different item effects
    switch (item.category) {
      case 'medicine':
        // Apply healing effects to target elite
        if (targetEliteId) {
          // Implementation would interact with elite system
          console.log(`Used ${item.name} on elite ${targetEliteId}`);
        }
        break;
      
      case 'pokeball':
        // Used for catching - handled by battle system
        console.log(`Attempted to catch with ${item.name}`);
        break;
      
      case 'evolution':
        // Used for evolution - handled by evolution system
        if (targetEliteId) {
          console.log(`Attempted to evolve elite ${targetEliteId} with ${item.name}`);
        }
        break;
      
      case 'battle':
        // Used in battle for stat boosts
        if (targetEliteId) {
          console.log(`Used ${item.name} to boost stats of elite ${targetEliteId}`);
        }
        break;
      
      default:
        console.log(`Used ${item.name}`);
    }

    // Remove item from inventory after use (except for held items)
    if (item.category !== 'held' && item.category !== 'key') {
      this.removeItem(itemId, 1);
    }

    return true;
  }

  expandInventory(additionalSlots: number): void {
    this.inventory.maxSlots += additionalSlots;
  }

  getInventorySpace(): number {
    return this.inventory.maxSlots - this.inventory.items.length;
  }

  isInventoryFull(): boolean {
    return this.inventory.items.length >= this.inventory.maxSlots;
  }

  clearInventory(): void {
    this.inventory.items = [];
  }

  // Save/Load functionality
  saveToLocalStorage(): void {
    localStorage.setItem('pokemon_inventory', JSON.stringify(this.inventory));
  }

  loadFromLocalStorage(): boolean {
    const saved = localStorage.getItem('pokemon_inventory');
    if (saved) {
      try {
        this.inventory = JSON.parse(saved);
        return true;
      } catch (error) {
        console.error('Failed to load inventory from localStorage:', error);
        return false;
      }
    }
    return false;
  }
}

// Global inventory manager instance
export const inventoryManager = new InventoryManager();