export interface QuestObjective {
  description: string;
  completed: boolean;
  progress?: number;
  target?: number;
}

export interface QuestData {
  id: string;
  title: string;
  description: string;
  priority: 'main' | 'side' | 'daily';
  objectives?: QuestObjective[];
  rewards?: string;
  prerequisites?: string[];
  completedAt?: Date;
}

export const questDatabase: Record<string, QuestData> = {
  welcome: {
    id: 'welcome',
    title: 'Welcome to Rise of the Elites',
    description: 'Learn the basics of the world and capture your first Elite.',
    priority: 'main',
    objectives: [
      {
        description: 'Explore the starting area',
        completed: false,
        progress: 0,
        target: 1
      },
      {
        description: 'Find and battle a wild Elite',
        completed: false,
        progress: 0,
        target: 1
      },
      {
        description: 'Capture your first Elite',
        completed: false,
        progress: 0,
        target: 1
      }
    ],
    rewards: 'Elite Ball x5, Health Potion x3'
  },

  forest_explorer: {
    id: 'forest_explorer',
    title: 'Forest Explorer',
    description: 'Venture into the mysterious forest and discover its secrets.',
    priority: 'main',
    objectives: [
      {
        description: 'Enter the Forest Zone',
        completed: false,
        progress: 0,
        target: 1
      },
      {
        description: 'Battle 3 different Elite types in the forest',
        completed: false,
        progress: 0,
        target: 3
      },
      {
        description: 'Find the Nature Guardian',
        completed: false,
        progress: 0,
        target: 1
      }
    ],
    rewards: 'Super Ball x3, Fusion Crystal x1',
    prerequisites: ['welcome']
  },

  cave_delver: {
    id: 'cave_delver',
    title: 'Cave Delver',
    description: 'Explore the deep cave system and uncover rare crystals.',
    priority: 'main',
    objectives: [
      {
        description: 'Enter the Cave Zone',
        completed: false,
        progress: 0,
        target: 1
      },
      {
        description: 'Collect 5 crystal shards',
        completed: false,
        progress: 0,
        target: 5
      },
      {
        description: 'Defeat the Earthshaker',
        completed: false,
        progress: 0,
        target: 1
      }
    ],
    rewards: 'Master Ball x1, Evolution Stone x2',
    prerequisites: ['welcome']
  },

  rift_walker: {
    id: 'rift_walker',
    title: 'Rift Walker',
    description: 'Enter the dangerous Rift dimension and face Shadow Elites.',
    priority: 'main',
    objectives: [
      {
        description: 'Enter the Rift Zone',
        completed: false,
        progress: 0,
        target: 1
      },
      {
        description: 'Survive 10 minutes in the Rift',
        completed: false,
        progress: 0,
        target: 600 // seconds
      },
      {
        description: 'Capture a Shadow Elite',
        completed: false,
        progress: 0,
        target: 1
      }
    ],
    rewards: 'Rift Key x1, Shadow Stone x1',
    prerequisites: ['forest_explorer', 'cave_delver']
  },

  elite_collector: {
    id: 'elite_collector',
    title: 'Elite Collector',
    description: 'Build a diverse collection of Elite creatures.',
    priority: 'side',
    objectives: [
      {
        description: 'Capture 10 different Elite species',
        completed: false,
        progress: 0,
        target: 10
      },
      {
        description: 'Have at least one Elite of each common type',
        completed: false,
        progress: 0,
        target: 6 // electric, grass, rock, water, fire, wind
      }
    ],
    rewards: 'Elite Encyclopedia, Rare Candy x5'
  },

  evolution_master: {
    id: 'evolution_master',
    title: 'Evolution Master',
    description: 'Master the art of Elite evolution.',
    priority: 'side',
    objectives: [
      {
        description: 'Evolve 3 different Elites',
        completed: false,
        progress: 0,
        target: 3
      },
      {
        description: 'Reach level 25 with any Elite',
        completed: false,
        progress: 0,
        target: 25
      }
    ],
    rewards: 'Evolution Stone x3, EXP Boost x5'
  },

  fusion_scientist: {
    id: 'fusion_scientist',
    title: 'Fusion Scientist',
    description: 'Experiment with Elite fusion to create new species.',
    priority: 'side',
    objectives: [
      {
        description: 'Successfully fuse 2 Elites',
        completed: false,
        progress: 0,
        target: 1
      },
      {
        description: 'Create a legendary fusion Elite',
        completed: false,
        progress: 0,
        target: 1
      }
    ],
    rewards: 'Master Fusion Crystal x1, Legendary Capsule x1'
  },

  // Daily quests
  daily_trainer: {
    id: 'daily_trainer',
    title: 'Daily Training',
    description: 'Complete daily training exercises with your Elites.',
    priority: 'daily',
    objectives: [
      {
        description: 'Win 5 battles',
        completed: false,
        progress: 0,
        target: 5
      },
      {
        description: 'Capture 2 wild Elites',
        completed: false,
        progress: 0,
        target: 2
      }
    ],
    rewards: 'EXP Boost x2, Elite Ball x3'
  },

  daily_explorer: {
    id: 'daily_explorer',
    title: 'Daily Exploration',
    description: 'Explore different zones and discover new areas.',
    priority: 'daily',
    objectives: [
      {
        description: 'Visit 3 different zones',
        completed: false,
        progress: 0,
        target: 3
      },
      {
        description: 'Walk 1000 steps',
        completed: false,
        progress: 0,
        target: 1000
      }
    ],
    rewards: 'Health Potion x3, Zone Map Fragment x1'
  }
};
