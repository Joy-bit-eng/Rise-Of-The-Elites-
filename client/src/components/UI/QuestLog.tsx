import React from 'react';
import { usePlayer } from '../../lib/stores/usePlayer';
import { useQuests } from '../../lib/stores/useQuests';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

function QuestLog() {
  const { toggleQuests } = usePlayer();
  const { activeQuests, completedQuests } = useQuests();

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Quest Log</CardTitle>
          <Button onClick={toggleQuests} variant="outline" size="sm">
            Close
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Quests ({activeQuests.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({completedQuests.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-4">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {activeQuests.map((quest) => (
                  <Card key={quest.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">{quest.title}</h3>
                      <Badge variant={quest.priority === 'main' ? 'default' : 'secondary'}>
                        {quest.priority}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{quest.description}</p>
                    
                    {quest.objectives && (
                      <div className="space-y-2">
                        <div className="text-sm font-semibold">Objectives:</div>
                        {quest.objectives.map((objective, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className={`w-4 h-4 rounded border ${
                              objective.completed ? 'bg-green-500 border-green-500' : 'border-gray-400'
                            }`}>
                              {objective.completed && (
                                <div className="w-full h-full flex items-center justify-center text-white text-xs">
                                  ✓
                                </div>
                              )}
                            </div>
                            <span className={objective.completed ? 'line-through text-gray-500' : ''}>
                              {objective.description}
                            </span>
                            {objective.progress !== undefined && (
                              <span className="text-gray-500">
                                ({objective.progress}/{objective.target})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {quest.rewards && (
                      <div className="mt-3 p-2 bg-yellow-50 rounded border">
                        <div className="text-sm font-semibold">Rewards:</div>
                        <div className="text-sm text-gray-600">{quest.rewards}</div>
                      </div>
                    )}
                  </Card>
                ))}
                
                {activeQuests.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No active quests. Explore the world to find new adventures!
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-4">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {completedQuests.map((quest) => (
                  <Card key={quest.id} className="p-4 bg-green-50">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">{quest.title}</h3>
                      <Badge variant="outline" className="border-green-500 text-green-700">
                        Completed
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-3">{quest.description}</p>
                    {quest.rewards && (
                      <div className="text-sm text-green-700">
                        <strong>Rewards Claimed:</strong> {quest.rewards}
                      </div>
                    )}
                  </Card>
                ))}
                
                {completedQuests.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    No completed quests yet. Start your adventure!
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default QuestLog;
