export interface PokemonItem {
  id: string;
  name: string;
  category: 'pokeball' | 'medicine' | 'berry' | 'tm' | 'evolution' | 'battle' | 'key' | 'held';
  description: string;
  price?: number;
  effect?: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'ultra_rare' | 'legendary';
}

export const pokemonItems: Record<string, PokemonItem> = {
  // Pokeballs
  'pokeball': {
    id: 'pokeball',
    name: 'Poké Ball',
    category: 'pokeball',
    description: 'A device for catching wild Pokémon. It is thrown like a ball at the target.',
    price: 200,
    effect: 'Catch rate: 1x',
    rarity: 'common'
  },
  'great_ball': {
    id: 'great_ball',
    name: 'Great Ball',
    category: 'pokeball',
    description: 'A good, high-performance Poké Ball that provides a higher success rate for catching Pokémon.',
    price: 600,
    effect: 'Catch rate: 1.5x',
    rarity: 'uncommon'
  },
  'ultra_ball': {
    id: 'ultra_ball',
    name: 'Ultra Ball',
    category: 'pokeball',
    description: 'An ultra-high-performance Poké Ball that provides a higher success rate for catching Pokémon.',
    price: 1200,
    effect: 'Catch rate: 2x',
    rarity: 'rare'
  },
  'master_ball': {
    id: 'master_ball',
    name: 'Master Ball',
    category: 'pokeball',
    description: 'The best Poké Ball with the ultimate level of performance. It will catch any wild Pokémon without fail.',
    price: 0,
    effect: 'Catch rate: 100%',
    rarity: 'legendary'
  },
  'premier_ball': {
    id: 'premier_ball',
    name: 'Premier Ball',
    category: 'pokeball',
    description: 'A commemorative Poké Ball that has different coloring from a normal Poké Ball.',
    price: 0,
    effect: 'Catch rate: 1x (Special)',
    rarity: 'uncommon'
  },
  'luxury_ball': {
    id: 'luxury_ball',
    name: 'Luxury Ball',
    category: 'pokeball',
    description: 'A comfortable Poké Ball that makes a caught wild Pokémon quickly grow friendlier.',
    price: 1000,
    effect: 'Increases friendship gain',
    rarity: 'rare'
  },
  'timer_ball': {
    id: 'timer_ball',
    name: 'Timer Ball',
    category: 'pokeball',
    description: 'A somewhat different Poké Ball that becomes more effective the more turns that are taken in battle.',
    price: 1000,
    effect: 'Effectiveness increases over time',
    rarity: 'rare'
  },
  'repeat_ball': {
    id: 'repeat_ball',
    name: 'Repeat Ball',
    category: 'pokeball',
    description: 'A Poké Ball that works especially well on Pokémon species that were previously caught.',
    price: 1000,
    effect: '3x catch rate for caught species',
    rarity: 'rare'
  },
  'dusk_ball': {
    id: 'dusk_ball',
    name: 'Dusk Ball',
    category: 'pokeball',
    description: 'A Poké Ball that makes it easier to catch wild Pokémon at night or in dark places.',
    price: 1000,
    effect: '3x catch rate in dark areas',
    rarity: 'rare'
  },
  'quick_ball': {
    id: 'quick_ball',
    name: 'Quick Ball',
    category: 'pokeball',
    description: 'A Poké Ball that provides a better catch rate if it is used at the start of a wild encounter.',
    price: 1000,
    effect: '5x catch rate on first turn',
    rarity: 'rare'
  },

  // Medicine
  'potion': {
    id: 'potion',
    name: 'Potion',
    category: 'medicine',
    description: 'A spray-type medicine for wounds. It restores the HP of one Pokémon by just 20 points.',
    price: 300,
    effect: 'Restores 20 HP',
    rarity: 'common'
  },
  'super_potion': {
    id: 'super_potion',
    name: 'Super Potion',
    category: 'medicine',
    description: 'A spray-type medicine for wounds. It restores the HP of one Pokémon by 50 points.',
    price: 700,
    effect: 'Restores 50 HP',
    rarity: 'common'
  },
  'hyper_potion': {
    id: 'hyper_potion',
    name: 'Hyper Potion',
    category: 'medicine',
    description: 'A spray-type medicine for wounds. It restores the HP of one Pokémon by 120 points.',
    price: 1500,
    effect: 'Restores 120 HP',
    rarity: 'uncommon'
  },
  'max_potion': {
    id: 'max_potion',
    name: 'Max Potion',
    category: 'medicine',
    description: 'A spray-type medicine for wounds. It fully restores the HP of a single Pokémon.',
    price: 2500,
    effect: 'Fully restores HP',
    rarity: 'rare'
  },
  'full_restore': {
    id: 'full_restore',
    name: 'Full Restore',
    category: 'medicine',
    description: 'A medicine that fully restores the HP and heals any status conditions of a single Pokémon.',
    price: 3000,
    effect: 'Fully restores HP and status',
    rarity: 'rare'
  },
  'revive': {
    id: 'revive',
    name: 'Revive',
    category: 'medicine',
    description: 'A medicine that revives a fainted Pokémon. It restores half the Pokémon\'s maximum HP.',
    price: 2000,
    effect: 'Revives with 50% HP',
    rarity: 'uncommon'
  },
  'max_revive': {
    id: 'max_revive',
    name: 'Max Revive',
    category: 'medicine',
    description: 'A medicine that revives a fainted Pokémon. It fully restores the Pokémon\'s HP.',
    price: 4000,
    effect: 'Revives with full HP',
    rarity: 'rare'
  },
  'antidote': {
    id: 'antidote',
    name: 'Antidote',
    category: 'medicine',
    description: 'A spray-type medicine. It lifts the effect of poison from one Pokémon.',
    price: 100,
    effect: 'Cures poison',
    rarity: 'common'
  },
  'paralyze_heal': {
    id: 'paralyze_heal',
    name: 'Paralyze Heal',
    category: 'medicine',
    description: 'A spray-type medicine. It eliminates paralysis from a single Pokémon.',
    price: 200,
    effect: 'Cures paralysis',
    rarity: 'common'
  },
  'burn_heal': {
    id: 'burn_heal',
    name: 'Burn Heal',
    category: 'medicine',
    description: 'A spray-type medicine. It heals a single Pokémon that is suffering from a burn.',
    price: 250,
    effect: 'Cures burn',
    rarity: 'common'
  },
  'ice_heal': {
    id: 'ice_heal',
    name: 'Ice Heal',
    category: 'medicine',
    description: 'A spray-type medicine. It defrosts a Pokémon that has been frozen solid.',
    price: 250,
    effect: 'Cures freeze',
    rarity: 'common'
  },
  'awakening': {
    id: 'awakening',
    name: 'Awakening',
    category: 'medicine',
    description: 'A spray-type medicine. It awakens a Pokémon from the clutches of sleep.',
    price: 250,
    effect: 'Cures sleep',
    rarity: 'common'
  },
  'full_heal': {
    id: 'full_heal',
    name: 'Full Heal',
    category: 'medicine',
    description: 'A spray-type medicine. It heals all the status conditions of a single Pokémon.',
    price: 600,
    effect: 'Cures all status conditions',
    rarity: 'uncommon'
  },

  // Berries
  'oran_berry': {
    id: 'oran_berry',
    name: 'Oran Berry',
    category: 'berry',
    description: 'A Berry to be consumed by Pokémon. If a Pokémon holds one, it restores its HP by 10 points in battle.',
    price: 0,
    effect: 'Restores 10 HP when held',
    rarity: 'common'
  },
  'sitrus_berry': {
    id: 'sitrus_berry',
    name: 'Sitrus Berry',
    category: 'berry',
    description: 'A Berry to be consumed by Pokémon. If a Pokémon holds one, it restores its HP by 1/4 of its max HP.',
    price: 0,
    effect: 'Restores 25% HP when held',
    rarity: 'uncommon'
  },
  'pecha_berry': {
    id: 'pecha_berry',
    name: 'Pecha Berry',
    category: 'berry',
    description: 'A Berry to be consumed by Pokémon. If a Pokémon holds one, it recovers from poison on its own.',
    price: 0,
    effect: 'Cures poison when held',
    rarity: 'common'
  },
  'rawst_berry': {
    id: 'rawst_berry',
    name: 'Rawst Berry',
    category: 'berry',
    description: 'A Berry to be consumed by Pokémon. If a Pokémon holds one, it recovers from a burn on its own.',
    price: 0,
    effect: 'Cures burn when held',
    rarity: 'common'
  },
  'aspear_berry': {
    id: 'aspear_berry',
    name: 'Aspear Berry',
    category: 'berry',
    description: 'A Berry to be consumed by Pokémon. If a Pokémon holds one, it recovers from being frozen on its own.',
    price: 0,
    effect: 'Cures freeze when held',
    rarity: 'common'
  },
  'leppa_berry': {
    id: 'leppa_berry',
    name: 'Leppa Berry',
    category: 'berry',
    description: 'A Berry to be consumed by Pokémon. If a Pokémon holds one, it restores a move\'s PP by 10.',
    price: 0,
    effect: 'Restores 10 PP when held',
    rarity: 'uncommon'
  },
  'lum_berry': {
    id: 'lum_berry',
    name: 'Lum Berry',
    category: 'berry',
    description: 'A Berry to be consumed by Pokémon. If a Pokémon holds one, it recovers from any status condition.',
    price: 0,
    effect: 'Cures all status when held',
    rarity: 'rare'
  },

  // Evolution Items
  'fire_stone': {
    id: 'fire_stone',
    name: 'Fire Stone',
    category: 'evolution',
    description: 'A peculiar stone that makes certain species of Pokémon evolve. It has a fiery orange heart.',
    price: 3000,
    effect: 'Evolves Fire-type Pokémon',
    rarity: 'rare'
  },
  'water_stone': {
    id: 'water_stone',
    name: 'Water Stone',
    category: 'evolution',
    description: 'A peculiar stone that makes certain species of Pokémon evolve. It is a clear, light blue.',
    price: 3000,
    effect: 'Evolves Water-type Pokémon',
    rarity: 'rare'
  },
  'thunder_stone': {
    id: 'thunder_stone',
    name: 'Thunder Stone',
    category: 'evolution',
    description: 'A peculiar stone that makes certain species of Pokémon evolve. It has a thunderbolt pattern.',
    price: 3000,
    effect: 'Evolves Electric-type Pokémon',
    rarity: 'rare'
  },
  'leaf_stone': {
    id: 'leaf_stone',
    name: 'Leaf Stone',
    category: 'evolution',
    description: 'A peculiar stone that makes certain species of Pokémon evolve. It has a leaf pattern.',
    price: 3000,
    effect: 'Evolves Grass-type Pokémon',
    rarity: 'rare'
  },
  'moon_stone': {
    id: 'moon_stone',
    name: 'Moon Stone',
    category: 'evolution',
    description: 'A peculiar stone that makes certain species of Pokémon evolve. It is as black as the night sky.',
    price: 3000,
    effect: 'Evolves certain Pokémon',
    rarity: 'rare'
  },
  'sun_stone': {
    id: 'sun_stone',
    name: 'Sun Stone',
    category: 'evolution',
    description: 'A peculiar stone that makes certain species of Pokémon evolve. It burns as red as the evening sun.',
    price: 3000,
    effect: 'Evolves certain Pokémon',
    rarity: 'rare'
  },
  'kings_rock': {
    id: 'kings_rock',
    name: 'King\'s Rock',
    category: 'evolution',
    description: 'An item to be held by a Pokémon. When the holder successfully inflicts damage, the target may flinch.',
    price: 5000,
    effect: 'Evolution item / 10% flinch chance',
    rarity: 'ultra_rare'
  },
  'metal_coat': {
    id: 'metal_coat',
    name: 'Metal Coat',
    category: 'evolution',
    description: 'An item to be held by a Pokémon. It is a special metallic film that can boost Steel-type moves.',
    price: 5000,
    effect: 'Evolution item / Boosts Steel moves',
    rarity: 'ultra_rare'
  },
  'dragon_scale': {
    id: 'dragon_scale',
    name: 'Dragon Scale',
    category: 'evolution',
    description: 'A thick and tough scale shed by a legendary Pokémon. It\'s very shiny.',
    price: 5000,
    effect: 'Evolution item',
    rarity: 'ultra_rare'
  },
  'upgrade': {
    id: 'upgrade',
    name: 'Up-Grade',
    category: 'evolution',
    description: 'A transparent device filled with all sorts of data. It was produced by Silph Co.',
    price: 5000,
    effect: 'Evolution item for Porygon',
    rarity: 'ultra_rare'
  },
  'dubious_disc': {
    id: 'dubious_disc',
    name: 'Dubious Disc',
    category: 'evolution',
    description: 'A transparent device overflowing with dubious data. Its producer is unknown.',
    price: 5000,
    effect: 'Evolution item for Porygon2',
    rarity: 'ultra_rare'
  },

  // Battle Items
  'x_attack': {
    id: 'x_attack',
    name: 'X Attack',
    category: 'battle',
    description: 'An item that raises the Attack stat of a Pokémon during a battle. It wears off once the Pokémon is withdrawn.',
    price: 500,
    effect: 'Raises Attack in battle',
    rarity: 'common'
  },
  'x_defense': {
    id: 'x_defense',
    name: 'X Defense',
    category: 'battle',
    description: 'An item that raises the Defense stat of a Pokémon during a battle. It wears off once the Pokémon is withdrawn.',
    price: 550,
    effect: 'Raises Defense in battle',
    rarity: 'common'
  },
  'x_sp_atk': {
    id: 'x_sp_atk',
    name: 'X Sp. Atk',
    category: 'battle',
    description: 'An item that raises the Sp. Atk stat of a Pokémon during a battle. It wears off once the Pokémon is withdrawn.',
    price: 350,
    effect: 'Raises Sp. Attack in battle',
    rarity: 'common'
  },
  'x_sp_def': {
    id: 'x_sp_def',
    name: 'X Sp. Def',
    category: 'battle',
    description: 'An item that raises the Sp. Def stat of a Pokémon during a battle. It wears off once the Pokémon is withdrawn.',
    price: 350,
    effect: 'Raises Sp. Defense in battle',
    rarity: 'common'
  },
  'x_speed': {
    id: 'x_speed',
    name: 'X Speed',
    category: 'battle',
    description: 'An item that raises the Speed stat of a Pokémon during a battle. It wears off once the Pokémon is withdrawn.',
    price: 350,
    effect: 'Raises Speed in battle',
    rarity: 'common'
  },
  'x_accuracy': {
    id: 'x_accuracy',
    name: 'X Accuracy',
    category: 'battle',
    description: 'An item that raises the accuracy of a Pokémon during a battle. It wears off once the Pokémon is withdrawn.',
    price: 950,
    effect: 'Raises Accuracy in battle',
    rarity: 'uncommon'
  },
  'dire_hit': {
    id: 'dire_hit',
    name: 'Dire Hit',
    category: 'battle',
    description: 'An item that raises the critical-hit ratio greatly during a battle. It wears off once the Pokémon is withdrawn.',
    price: 650,
    effect: 'Raises critical hit ratio',
    rarity: 'uncommon'
  },
  'guard_spec': {
    id: 'guard_spec',
    name: 'Guard Spec.',
    category: 'battle',
    description: 'An item that prevents stat reduction among the Trainer\'s party Pokémon for five turns after use.',
    price: 700,
    effect: 'Prevents stat reduction',
    rarity: 'uncommon'
  },

  // Held Items
  'leftovers': {
    id: 'leftovers',
    name: 'Leftovers',
    category: 'held',
    description: 'An item to be held by a Pokémon. The holder\'s HP is slowly but steadily restored throughout every battle.',
    price: 10000,
    effect: 'Restores HP each turn',
    rarity: 'ultra_rare'
  },
  'choice_band': {
    id: 'choice_band',
    name: 'Choice Band',
    category: 'held',
    description: 'An item to be held by a Pokémon. This curious headband boosts Attack but only allows the use of one move.',
    price: 15000,
    effect: '+50% Attack, locks move',
    rarity: 'legendary'
  },
  'choice_specs': {
    id: 'choice_specs',
    name: 'Choice Specs',
    category: 'held',
    description: 'An item to be held by a Pokémon. These curious glasses boost Sp. Atk but only allow the use of one move.',
    price: 15000,
    effect: '+50% Sp. Attack, locks move',
    rarity: 'legendary'
  },
  'choice_scarf': {
    id: 'choice_scarf',
    name: 'Choice Scarf',
    category: 'held',
    description: 'An item to be held by a Pokémon. This curious scarf boosts Speed but only allows the use of one move.',
    price: 15000,
    effect: '+50% Speed, locks move',
    rarity: 'legendary'
  },
  'focus_sash': {
    id: 'focus_sash',
    name: 'Focus Sash',
    category: 'held',
    description: 'An item to be held by a Pokémon. If it has full HP, the holder will endure one potential KO attack, leaving 1 HP.',
    price: 8000,
    effect: 'Survives KO with 1 HP',
    rarity: 'ultra_rare'
  },
  'life_orb': {
    id: 'life_orb',
    name: 'Life Orb',
    category: 'held',
    description: 'An item to be held by a Pokémon. It boosts the power of moves, but at the cost of some HP on each attack.',
    price: 12000,
    effect: '+30% damage, costs HP',
    rarity: 'ultra_rare'
  },
  'assault_vest': {
    id: 'assault_vest',
    name: 'Assault Vest',
    category: 'held',
    description: 'An item to be held by a Pokémon. This offensive vest raises Sp. Def but prevents the use of status moves.',
    price: 10000,
    effect: '+50% Sp. Def, no status moves',
    rarity: 'ultra_rare'
  },
  'rocky_helmet': {
    id: 'rocky_helmet',
    name: 'Rocky Helmet',
    category: 'held',
    description: 'An item to be held by a Pokémon. If the holder is hit by a physical attack, the attacker is also damaged.',
    price: 8000,
    effect: 'Damages physical attackers',
    rarity: 'ultra_rare'
  },

  // Key Items
  'bike': {
    id: 'bike',
    name: 'Bicycle',
    category: 'key',
    description: 'A folding bicycle that enables much faster movement than the Running Shoes.',
    price: 0,
    effect: 'Fast travel',
    rarity: 'rare'
  },
  'surf_board': {
    id: 'surf_board',
    name: 'Surf Board',
    category: 'key',
    description: 'A board that allows you to travel across water surfaces.',
    price: 0,
    effect: 'Water travel',
    rarity: 'rare'
  },
  'old_rod': {
    id: 'old_rod',
    name: 'Old Rod',
    category: 'key',
    description: 'An old and beat-up fishing rod. Use it to fish for wild aquatic Pokémon.',
    price: 0,
    effect: 'Catch common water Pokémon',
    rarity: 'common'
  },
  'good_rod': {
    id: 'good_rod',
    name: 'Good Rod',
    category: 'key',
    description: 'A new, good-quality fishing rod. Use it to fish for wild aquatic Pokémon.',
    price: 0,
    effect: 'Catch uncommon water Pokémon',
    rarity: 'uncommon'
  },
  'super_rod': {
    id: 'super_rod',
    name: 'Super Rod',
    category: 'key',
    description: 'An awesome, high-tech fishing rod. Use it to fish for wild aquatic Pokémon.',
    price: 0,
    effect: 'Catch rare water Pokémon',
    rarity: 'rare'
  },
  'pokedex': {
    id: 'pokedex',
    name: 'Pokédex',
    category: 'key',
    description: 'A high-tech encyclopedia that records data on Pokémon you\'ve seen and caught.',
    price: 0,
    effect: 'Records Pokémon data',
    rarity: 'legendary'
  },
  'town_map': {
    id: 'town_map',
    name: 'Town Map',
    category: 'key',
    description: 'A very convenient map that can be viewed anytime. It shows your present location clearly.',
    price: 0,
    effect: 'Shows world map',
    rarity: 'rare'
  },
  'vs_seeker': {
    id: 'vs_seeker',
    name: 'Vs. Seeker',
    category: 'key',
    description: 'A device that indicates Trainers who want to battle. Its battery charges while you walk.',
    price: 0,
    effect: 'Find trainers to battle',
    rarity: 'rare'
  }
};

export const getItemsByCategory = (category: PokemonItem['category']) => {
  return Object.values(pokemonItems).filter(item => item.category === category);
};

export const getItemsByRarity = (rarity: PokemonItem['rarity']) => {
  return Object.values(pokemonItems).filter(item => item.rarity === rarity);
};

export const searchItems = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(pokemonItems).filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery)
  );
};