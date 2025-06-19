import React from 'react';
import { usePlayer } from '../../lib/stores/usePlayer';
import { useWorld } from '../../lib/stores/useWorld';
import { useQuests } from '../../lib/stores/useQuests';

function GameHUD() {
  const { health, maxHealth, level, experience, maxExperience } = usePlayer();
  const { currentZone } = useWorld();
  const { activeQuests } = useQuests();

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top left - Player info */}
      <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg pointer-events-auto">
        <div className="text-sm font-bold mb-2">Player Status</div>
        <div className="space-y-1 text-xs">
          <div>Level: {level}</div>
          <div className="flex items-center gap-2">
            <span>HP:</span>
            <div className="w-20 h-2 bg-gray-600 rounded">
              <div 
                className="h-full bg-red-500 rounded" 
                style={{ width: `${(health / maxHealth) * 100}%` }}
              />
            </div>
            <span>{health}/{maxHealth}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>EXP:</span>
            <div className="w-20 h-2 bg-gray-600 rounded">
              <div 
                className="h-full bg-blue-500 rounded" 
                style={{ width: `${(experience / maxExperience) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top right - Zone info */}
      <div className="absolute top-4 right-4 bg-black/80 text-white p-4 rounded-lg pointer-events-auto">
        <div className="text-sm font-bold">Current Zone</div>
        <div className="text-xs capitalize">{currentZone}</div>
      </div>

      {/* Bottom left - Active quest */}
      {activeQuests.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg pointer-events-auto max-w-xs">
          <div className="text-sm font-bold mb-2">Active Quest</div>
          <div className="text-xs">
            <div className="font-semibold">{activeQuests[0].title}</div>
            <div className="text-gray-300 mt-1">{activeQuests[0].description}</div>
          </div>
        </div>
      )}

      {/* Bottom center - Controls */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white p-3 rounded-lg pointer-events-auto">
        <div className="text-xs text-center space-y-1">
          <div>WASD - Move | Space - Jump | E - Interact</div>
          <div>I - Inventory | Esc - Menu | F - Capture</div>
        </div>
      </div>
    </div>
  );
}

export default GameHUD;
