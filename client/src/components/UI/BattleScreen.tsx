import React from 'react';
import { useBattle } from '../../lib/stores/useBattle';
import { usePlayer } from '../../lib/stores/usePlayer';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

function BattleScreen() {
  const { 
    playerElite, 
    enemyElite, 
    battlePhase, 
    playerTurn,
    attack,
    capture,
    flee,
    endBattle
  } = useBattle();
  
  const { capturedElites } = usePlayer();

  if (!playerElite || !enemyElite) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-900 to-blue-900 flex flex-col">
      {/* Battle Arena */}
      <div className="flex-1 flex items-center justify-between p-8">
        {/* Player Elite */}
        <div className="text-center">
          <div className="w-32 h-32 bg-blue-500 rounded-lg mb-4 mx-auto flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{playerElite.name[0]}</span>
          </div>
          <div className="text-white">
            <div className="font-bold">{playerElite.name}</div>
            <div className="text-sm">Lv. {playerElite.level}</div>
            <div className="w-32 h-2 bg-gray-600 rounded mt-2">
              <div 
                className="h-full bg-green-500 rounded" 
                style={{ width: `${(playerElite.currentHP / playerElite.maxHP) * 100}%` }}
              />
            </div>
            <div className="text-xs mt-1">{playerElite.currentHP}/{playerElite.maxHP} HP</div>
          </div>
        </div>

        {/* VS Text */}
        <div className="text-white text-4xl font-bold">VS</div>

        {/* Enemy Elite */}
        <div className="text-center">
          <div className="w-32 h-32 bg-red-500 rounded-lg mb-4 mx-auto flex items-center justify-center">
            <span className="text-white text-2xl font-bold">{enemyElite.name[0]}</span>
          </div>
          <div className="text-white">
            <div className="font-bold">{enemyElite.name}</div>
            <div className="text-sm">Lv. {enemyElite.level}</div>
            <div className="w-32 h-2 bg-gray-600 rounded mt-2">
              <div 
                className="h-full bg-green-500 rounded" 
                style={{ width: `${(enemyElite.currentHP / enemyElite.maxHP) * 100}%` }}
              />
            </div>
            <div className="text-xs mt-1">{enemyElite.currentHP}/{enemyElite.maxHP} HP</div>
          </div>
        </div>
      </div>

      {/* Battle UI */}
      <Card className="m-4 p-4 bg-black/80 text-white">
        {battlePhase === 'menu' && playerTurn && (
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => attack('tackle')} className="bg-red-600 hover:bg-red-700">
              Tackle
            </Button>
            <Button onClick={() => attack('special')} className="bg-purple-600 hover:bg-purple-700">
              Special Attack
            </Button>
            <Button onClick={capture} className="bg-green-600 hover:bg-green-700">
              Capture
            </Button>
            <Button onClick={flee} className="bg-gray-600 hover:bg-gray-700">
              Flee
            </Button>
          </div>
        )}

        {battlePhase === 'animation' && (
          <div className="text-center py-8">
            <div className="text-xl font-bold">Battle in progress...</div>
          </div>
        )}

        {battlePhase === 'victory' && (
          <div className="text-center py-8">
            <div className="text-xl font-bold text-green-400 mb-4">Victory!</div>
            <Button onClick={endBattle} className="bg-blue-600 hover:bg-blue-700">
              Continue
            </Button>
          </div>
        )}

        {battlePhase === 'defeat' && (
          <div className="text-center py-8">
            <div className="text-xl font-bold text-red-400 mb-4">Defeat!</div>
            <Button onClick={endBattle} className="bg-blue-600 hover:bg-blue-700">
              Continue
            </Button>
          </div>
        )}

        {battlePhase === 'captured' && (
          <div className="text-center py-8">
            <div className="text-xl font-bold text-yellow-400 mb-4">Elite Captured!</div>
            <Button onClick={endBattle} className="bg-blue-600 hover:bg-blue-700">
              Continue
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default BattleScreen;
