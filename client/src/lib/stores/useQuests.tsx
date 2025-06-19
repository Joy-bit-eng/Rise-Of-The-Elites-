import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { questDatabase, QuestData } from '../questData';

interface QuestsState {
  activeQuests: QuestData[];
  completedQuests: QuestData[];
  
  // Actions
  startQuest: (questId: string) => void;
  completeObjective: (questId: string, objectiveIndex: number) => void;
  completeQuest: (questId: string) => void;
  updateQuestProgress: (questId: string, objectiveIndex: number, progress: number) => void;
}

export const useQuests = create<QuestsState>()(
  subscribeWithSelector((set, get) => ({
    activeQuests: [
      // Starting quest
      {
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
      }
    ],
    completedQuests: [],
    
    startQuest: (questId) => {
      const quest = questDatabase[questId];
      if (!quest) return;
      
      const { activeQuests } = get();
      if (activeQuests.find(q => q.id === questId)) return; // Already active
      
      set({
        activeQuests: [...activeQuests, quest]
      });
    },
    
    completeObjective: (questId, objectiveIndex) => {
      const { activeQuests } = get();
      
      set({
        activeQuests: activeQuests.map(quest => {
          if (quest.id === questId && quest.objectives) {
            const updatedObjectives = [...quest.objectives];
            if (updatedObjectives[objectiveIndex]) {
              updatedObjectives[objectiveIndex] = {
                ...updatedObjectives[objectiveIndex],
                completed: true,
                progress: updatedObjectives[objectiveIndex].target || 1
              };
            }
            
            return { ...quest, objectives: updatedObjectives };
          }
          return quest;
        })
      });
      
      // Check if quest is complete
      const updatedQuest = get().activeQuests.find(q => q.id === questId);
      if (updatedQuest?.objectives?.every(obj => obj.completed)) {
        get().completeQuest(questId);
      }
    },
    
    completeQuest: (questId) => {
      const { activeQuests, completedQuests } = get();
      const quest = activeQuests.find(q => q.id === questId);
      
      if (quest) {
        set({
          activeQuests: activeQuests.filter(q => q.id !== questId),
          completedQuests: [...completedQuests, { ...quest, completedAt: new Date() }]
        });
        
        // Grant rewards
        if (quest.rewards) {
          // TODO: Parse and grant rewards
          console.log(`Quest completed: ${quest.title}. Rewards: ${quest.rewards}`);
        }
      }
    },
    
    updateQuestProgress: (questId, objectiveIndex, progress) => {
      const { activeQuests } = get();
      
      set({
        activeQuests: activeQuests.map(quest => {
          if (quest.id === questId && quest.objectives) {
            const updatedObjectives = [...quest.objectives];
            if (updatedObjectives[objectiveIndex]) {
              updatedObjectives[objectiveIndex] = {
                ...updatedObjectives[objectiveIndex],
                progress: progress
              };
              
              // Auto-complete if target reached
              if (progress >= (updatedObjectives[objectiveIndex].target || 1)) {
                updatedObjectives[objectiveIndex].completed = true;
              }
            }
            
            return { ...quest, objectives: updatedObjectives };
          }
          return quest;
        })
      });
    }
  }))
);
