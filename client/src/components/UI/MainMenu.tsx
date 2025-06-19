import React from 'react';
import { useGame } from '../../lib/stores/useGame';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

function MainMenu() {
  const { start } = useGame();

  return (
    <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <Card className="w-full max-w-md bg-black/80 text-white border-purple-500">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Rise of the Elites
          </CardTitle>
          <p className="text-gray-300 mt-2">
            Embark on an epic journey to collect and train Elite creatures
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={start}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6"
          >
            Start New Game
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-purple-500 text-purple-300 hover:bg-purple-900/50"
            disabled
          >
            Load Game (Coming Soon)
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-purple-500 text-purple-300 hover:bg-purple-900/50"
            disabled
          >
            Options (Coming Soon)
          </Button>
          
          <div className="text-center text-sm text-gray-400 mt-6">
            <p>Controls:</p>
            <p className="text-xs">WASD - Move | Space - Jump | E - Interact</p>
            <p className="text-xs">I - Inventory | F - Capture | Esc - Menu</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MainMenu;
