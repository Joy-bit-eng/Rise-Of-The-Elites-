import React, { useCallback, useState } from 'react';
import { usePlayer } from '../../lib/stores/usePlayer';
import { useWorld } from '../../lib/stores/useWorld';

enum Controls {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  jump = 'jump',
  interact = 'interact',
  capture = 'capture'
}

function MobileControls() {
  const { toggleInventory, toggleElites, toggleQuests, position } = usePlayer();
  const { checkForElites } = useWorld();
  const [activeButtons, setActiveButtons] = useState<Set<Controls>>(new Set());

  const handleButtonPress = useCallback((action: Controls, pressed: boolean) => {
    setActiveButtons(prev => {
      const newSet = new Set(prev);
      if (pressed) {
        newSet.add(action);
      } else {
        newSet.delete(action);
      }
      return newSet;
    });

    // Simulate keyboard events for the existing system
    const keyMap = {
      forward: 'KeyW',
      backward: 'KeyS', 
      left: 'KeyA',
      right: 'KeyD',
      jump: 'Space',
      interact: 'KeyE',
      capture: 'KeyF'
    };

    const event = new KeyboardEvent(pressed ? 'keydown' : 'keyup', {
      code: keyMap[action],
      bubbles: true
    });
    
    document.dispatchEvent(event);

    // Handle special actions immediately
    if (pressed && action === Controls.interact) {
      checkForElites(position);
    }
  }, [position, checkForElites]);

  // Check if device is mobile or tablet
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Movement Controls - Bottom Left */}
      <div className="absolute bottom-4 left-4 pointer-events-auto">
        <div className="relative w-32 h-32">
          {/* D-Pad Style Controls */}
          <button
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 text-white rounded-lg border-2 border-white/30 flex items-center justify-center text-xl font-bold ${
              activeButtons.has(Controls.forward) ? 'bg-white/40' : 'bg-black/60'
            } active:bg-white/20`}
            onTouchStart={(e) => { e.preventDefault(); handleButtonPress(Controls.forward, true); }}
            onTouchEnd={(e) => { e.preventDefault(); handleButtonPress(Controls.forward, false); }}
            onMouseDown={(e) => { e.preventDefault(); handleButtonPress(Controls.forward, true); }}
            onMouseUp={(e) => { e.preventDefault(); handleButtonPress(Controls.forward, false); }}
            onMouseLeave={(e) => { e.preventDefault(); handleButtonPress(Controls.forward, false); }}
          >
            ↑
          </button>
          
          <button
            className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-12 text-white rounded-lg border-2 border-white/30 flex items-center justify-center text-xl font-bold ${
              activeButtons.has(Controls.backward) ? 'bg-white/40' : 'bg-black/60'
            } active:bg-white/20`}
            onTouchStart={(e) => { e.preventDefault(); handleButtonPress(Controls.backward, true); }}
            onTouchEnd={(e) => { e.preventDefault(); handleButtonPress(Controls.backward, false); }}
            onMouseDown={(e) => { e.preventDefault(); handleButtonPress(Controls.backward, true); }}
            onMouseUp={(e) => { e.preventDefault(); handleButtonPress(Controls.backward, false); }}
            onMouseLeave={(e) => { e.preventDefault(); handleButtonPress(Controls.backward, false); }}
          >
            ↓
          </button>
          
          <button
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 text-white rounded-lg border-2 border-white/30 flex items-center justify-center text-xl font-bold ${
              activeButtons.has(Controls.left) ? 'bg-white/40' : 'bg-black/60'
            } active:bg-white/20`}
            onTouchStart={(e) => { e.preventDefault(); handleButtonPress(Controls.left, true); }}
            onTouchEnd={(e) => { e.preventDefault(); handleButtonPress(Controls.left, false); }}
            onMouseDown={(e) => { e.preventDefault(); handleButtonPress(Controls.left, true); }}
            onMouseUp={(e) => { e.preventDefault(); handleButtonPress(Controls.left, false); }}
            onMouseLeave={(e) => { e.preventDefault(); handleButtonPress(Controls.left, false); }}
          >
            ←
          </button>
          
          <button
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 text-white rounded-lg border-2 border-white/30 flex items-center justify-center text-xl font-bold ${
              activeButtons.has(Controls.right) ? 'bg-white/40' : 'bg-black/60'
            } active:bg-white/20`}
            onTouchStart={(e) => { e.preventDefault(); handleButtonPress(Controls.right, true); }}
            onTouchEnd={(e) => { e.preventDefault(); handleButtonPress(Controls.right, false); }}
            onMouseDown={(e) => { e.preventDefault(); handleButtonPress(Controls.right, true); }}
            onMouseUp={(e) => { e.preventDefault(); handleButtonPress(Controls.right, false); }}
            onMouseLeave={(e) => { e.preventDefault(); handleButtonPress(Controls.right, false); }}
          >
            →
          </button>
        </div>
      </div>

      {/* Action Controls - Bottom Right */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <div className="flex flex-col gap-2">
          {/* Jump Button */}
          <button
            className={`w-16 h-16 text-white rounded-full border-2 border-white/30 flex items-center justify-center text-sm font-bold ${
              activeButtons.has(Controls.jump) ? 'bg-blue-400/80' : 'bg-blue-600/80'
            } active:bg-blue-400/80`}
            onTouchStart={(e) => { e.preventDefault(); handleButtonPress(Controls.jump, true); }}
            onTouchEnd={(e) => { e.preventDefault(); handleButtonPress(Controls.jump, false); }}
            onMouseDown={(e) => { e.preventDefault(); handleButtonPress(Controls.jump, true); }}
            onMouseUp={(e) => { e.preventDefault(); handleButtonPress(Controls.jump, false); }}
            onMouseLeave={(e) => { e.preventDefault(); handleButtonPress(Controls.jump, false); }}
          >
            JUMP
          </button>
          
          {/* Interact Button */}
          <button
            className={`w-16 h-16 text-white rounded-full border-2 border-white/30 flex items-center justify-center text-sm font-bold ${
              activeButtons.has(Controls.interact) ? 'bg-green-400/80' : 'bg-green-600/80'
            } active:bg-green-400/80`}
            onTouchStart={(e) => { e.preventDefault(); handleButtonPress(Controls.interact, true); }}
            onTouchEnd={(e) => { e.preventDefault(); handleButtonPress(Controls.interact, false); }}
            onMouseDown={(e) => { e.preventDefault(); handleButtonPress(Controls.interact, true); }}
            onMouseUp={(e) => { e.preventDefault(); handleButtonPress(Controls.interact, false); }}
            onMouseLeave={(e) => { e.preventDefault(); handleButtonPress(Controls.interact, false); }}
          >
            USE
          </button>
          
          {/* Capture Button */}
          <button
            className={`w-16 h-16 text-white rounded-full border-2 border-white/30 flex items-center justify-center text-sm font-bold ${
              activeButtons.has(Controls.capture) ? 'bg-red-400/80' : 'bg-red-600/80'
            } active:bg-red-400/80`}
            onTouchStart={(e) => { e.preventDefault(); handleButtonPress(Controls.capture, true); }}
            onTouchEnd={(e) => { e.preventDefault(); handleButtonPress(Controls.capture, false); }}
            onMouseDown={(e) => { e.preventDefault(); handleButtonPress(Controls.capture, true); }}
            onMouseUp={(e) => { e.preventDefault(); handleButtonPress(Controls.capture, false); }}
            onMouseLeave={(e) => { e.preventDefault(); handleButtonPress(Controls.capture, false); }}
          >
            CATCH
          </button>
        </div>
      </div>

      {/* Menu Controls - Top Right */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <div className="flex gap-2">
          <button
            className="w-12 h-12 bg-purple-600/80 text-white rounded-lg border-2 border-white/30 flex items-center justify-center text-xs font-bold active:bg-purple-400/80"
            onClick={toggleInventory}
          >
            INV
          </button>
          
          <button
            className="w-12 h-12 bg-orange-600/80 text-white rounded-lg border-2 border-white/30 flex items-center justify-center text-xs font-bold active:bg-orange-400/80"
            onClick={toggleElites}
          >
            PETS
          </button>
          
          <button
            className="w-12 h-12 bg-yellow-600/80 text-white rounded-lg border-2 border-white/30 flex items-center justify-center text-xs font-bold active:bg-yellow-400/80"
            onClick={toggleQuests}
          >
            QUEST
          </button>
        </div>
      </div>

      {/* Instructions for mobile */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto bg-black/60 text-white p-4 rounded-lg text-center text-sm">
        <div className="mb-2 font-bold">Mobile Controls</div>
        <div>Use D-Pad to move</div>
        <div>Blue: Jump | Green: Interact | Red: Capture</div>
        <div>Top buttons: Inventory, Elites, Quests</div>
      </div>
    </div>
  );
}

export default MobileControls;