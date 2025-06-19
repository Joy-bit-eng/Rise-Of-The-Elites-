import React, { useState } from 'react';
import { usePlayer } from '../../lib/stores/usePlayer';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';

function EliteScreen() {
  const { capturedElites, toggleElites } = usePlayer();
  const [selectedElite, setSelectedElite] = useState(null);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Elite Collection</CardTitle>
          <Button onClick={toggleElites} variant="outline" size="sm">
            Close
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 h-96">
            {/* Elite List */}
            <div className="w-1/3 border-r pr-4">
              <div className="space-y-2 max-h-full overflow-y-auto">
                {capturedElites.map((elite) => (
                  <Card 
                    key={elite.id} 
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedElite?.id === elite.id ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => setSelectedElite(elite)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">{elite.name[0]}</span>
                      </div>
                      <div>
                        <div className="font-semibold">{elite.name}</div>
                        <div className="text-sm text-gray-500">
                          Lv. {elite.level} • {elite.type}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                {capturedElites.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No Elites captured yet!
                    <br />
                    Go explore and catch some Elites!
                  </div>
                )}
              </div>
            </div>

            {/* Elite Details */}
            <div className="flex-1 pl-4">
              {selectedElite ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">{selectedElite.name[0]}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{selectedElite.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary">{selectedElite.type}</Badge>
                        <Badge>Level {selectedElite.level}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-3">
                      <div className="text-sm font-semibold mb-2">Stats</div>
                      <div className="space-y-1 text-sm">
                        <div>HP: {selectedElite.maxHP}</div>
                        <div>Attack: {selectedElite.attack}</div>
                        <div>Defense: {selectedElite.defense}</div>
                        <div>Speed: {selectedElite.speed}</div>
                      </div>
                    </Card>

                    <Card className="p-3">
                      <div className="text-sm font-semibold mb-2">Abilities</div>
                      <div className="space-y-1 text-sm">
                        {selectedElite.abilities?.map((ability, index) => (
                          <div key={index}>{ability}</div>
                        )) || <div className="text-gray-500">No special abilities</div>}
                      </div>
                    </Card>
                  </div>

                  <Card className="p-3">
                    <div className="text-sm font-semibold mb-2">Evolution Path</div>
                    <div className="text-sm text-gray-600">
                      {selectedElite.evolutionLevel ? 
                        `Evolves at level ${selectedElite.evolutionLevel}` : 
                        'No evolution available'
                      }
                    </div>
                  </Card>

                  <div className="flex gap-2">
                    <Button size="sm">Set as Active</Button>
                    <Button size="sm" variant="outline">View in 3D</Button>
                    <Button size="sm" variant="outline">Release</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select an Elite to view details
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EliteScreen;
