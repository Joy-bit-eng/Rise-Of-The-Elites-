import { EliteData } from './eliteData';

// Combat utilities
export function calculateDamage(
  attacker: EliteData,
  defender: EliteData,
  attackType: 'normal' | 'special' = 'normal'
): number {
  const baseAttack = attacker.baseStats.attack;
  const defense = defender.baseStats.defense;
  
  // Base damage calculation
  let damage = Math.floor(
    ((2 * attacker.level + 10) / 250) * 
    (baseAttack / defense) * 
    (attackType === 'special' ? 60 : 40) + 2
  );
  
  // Add some randomness
  damage = Math.floor(damage * (0.85 + Math.random() * 0.15));
  
  // Type effectiveness (simplified)
  const effectiveness = getTypeEffectiveness(attacker.type, defender.type);
  damage = Math.floor(damage * effectiveness);
  
  return Math.max(1, damage);
}

// Simplified type effectiveness chart
export function getTypeEffectiveness(attackType: string, defenseType: string): number {
  const typeChart: Record<string, Record<string, number>> = {
    electric: {
      water: 2.0,
      grass: 0.5,
      rock: 1.0,
      electric: 0.5
    },
    water: {
      fire: 2.0,
      rock: 2.0,
      grass: 0.5,
      electric: 0.5
    },
    fire: {
      grass: 2.0,
      water: 0.5,
      rock: 0.5
    },
    grass: {
      water: 2.0,
      rock: 2.0,
      fire: 0.5,
      grass: 0.5
    },
    rock: {
      fire: 2.0,
      electric: 2.0,
      water: 0.5,
      grass: 0.5
    },
    // Default effectiveness
    default: 1.0
  };
  
  return typeChart[attackType]?.[defenseType] ?? 1.0;
}

// Capture rate calculation
export function calculateCaptureRate(
  elite: EliteData,
  ballType: 'normal' | 'super' | 'master' = 'normal'
): number {
  const ballMultipliers = {
    normal: 1.0,
    super: 1.5,
    master: 3.0
  };
  
  const rarityMultipliers = {
    common: 1.0,
    uncommon: 0.8,
    rare: 0.6,
    epic: 0.4,
    legendary: 0.2
  };
  
  // Base capture rate affected by level and rarity
  let captureRate = 1.0 - (elite.level / 100);
  captureRate *= rarityMultipliers[elite.rarity] || 1.0;
  captureRate *= ballMultipliers[ballType];
  
  // Ensure reasonable bounds
  return Math.max(0.05, Math.min(0.95, captureRate));
}

// Experience calculation
export function calculateExperienceGain(defeatedElite: EliteData): number {
  const baseExp = 50;
  const levelMultiplier = defeatedElite.level * 0.5;
  const rarityMultipliers = {
    common: 1.0,
    uncommon: 1.2,
    rare: 1.5,
    epic: 2.0,
    legendary: 3.0
  };
  
  return Math.floor(
    baseExp + levelMultiplier * (rarityMultipliers[defeatedElite.rarity] || 1.0)
  );
}

// Evolution check
export function canEvolve(elite: EliteData): boolean {
  if (!elite.evolutionData) return false;
  
  // Level-based evolution
  if (elite.evolutionData.evolutionLevel) {
    return elite.level >= elite.evolutionData.evolutionLevel;
  }
  
  // Condition-based evolution (future implementation)
  if (elite.evolutionData.evolutionCondition) {
    // TODO: Implement condition checking
    return false;
  }
  
  return false;
}

// Random Elite generation for zones
export function generateRandomElite(zone: string, level?: number): EliteData {
  const zoneEliteTypes = {
    starting: ['electric', 'grass', 'rock', 'water'],
    forest: ['grass', 'wind', 'poison'],
    cave: ['rock', 'crystal', 'steel', 'earth'],
    rift: ['shadow', 'void', 'ghost', 'rift']
  };
  
  const types = zoneEliteTypes[zone] || zoneEliteTypes.starting;
  const randomType = types[Math.floor(Math.random() * types.length)];
  const randomLevel = level || Math.floor(Math.random() * 15) + 1;
  
  // Generate random stats based on type
  const typeStatBias = {
    electric: { hp: 0, attack: 5, defense: 0, speed: 10 },
    grass: { hp: 10, attack: 0, defense: 5, speed: 0 },
    rock: { hp: 15, attack: 5, defense: 10, speed: -5 },
    water: { hp: 5, attack: 5, defense: 5, speed: 5 },
    fire: { hp: 0, attack: 10, defense: 0, speed: 5 },
    // Add more as needed
  };
  
  const bias = typeStatBias[randomType] || { hp: 5, attack: 5, defense: 5, speed: 5 };
  
  return {
    id: `random_${randomType}_${Date.now()}`,
    name: `Wild ${randomType.charAt(0).toUpperCase() + randomType.slice(1)}`,
    type: randomType,
    level: randomLevel,
    baseStats: {
      hp: 40 + bias.hp + Math.floor(Math.random() * 20),
      attack: 30 + bias.attack + Math.floor(Math.random() * 20),
      defense: 25 + bias.defense + Math.floor(Math.random() * 20),
      speed: 30 + bias.speed + Math.floor(Math.random() * 20)
    },
    abilities: ['Basic Attack'],
    description: `A wild ${randomType}-type Elite found in the ${zone}.`,
    rarity: 'common',
    color: getTypeColor(randomType),
    isWild: true,
    position: [
      Math.random() * 20 - 10,
      1,
      Math.random() * 20 - 10
    ]
  };
}

// Get color for Elite type
export function getTypeColor(type: string): string {
  const typeColors = {
    electric: '#FFD700',
    grass: '#32CD32',
    rock: '#A0522D',
    water: '#1E90FF',
    fire: '#FF4500',
    wind: '#87CEEB',
    poison: '#8B008B',
    crystal: '#FF1493',
    steel: '#708090',
    earth: '#8B4513',
    shadow: '#4B0082',
    void: '#000000',
    ghost: '#8A2BE2',
    rift: '#9400D3'
  };
  
  return typeColors[type] || '#888888';
}

// Save game data to localStorage
export function saveGameData(data: any): void {
  try {
    localStorage.setItem('riseOfElites_saveData', JSON.stringify(data));
    console.log('Game saved successfully');
  } catch (error) {
    console.error('Failed to save game:', error);
  }
}

// Load game data from localStorage
export function loadGameData(): any {
  try {
    const data = localStorage.getItem('riseOfElites_saveData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
}

// Format large numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Distance calculation between two points
export function calculateDistance(
  pos1: [number, number, number],
  pos2: [number, number, number]
): number {
  return Math.sqrt(
    Math.pow(pos1[0] - pos2[0], 2) +
    Math.pow(pos1[1] - pos2[1], 2) +
    Math.pow(pos1[2] - pos2[2], 2)
  );
}
