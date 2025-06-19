import React from 'react';
import { usePlayer } from '../../lib/stores/usePlayer';
import { useInventory } from '../../lib/stores/useInventory';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

function InventoryScreen() {
  const { toggleInventory } = usePlayer();
  const { items, useItem } = useInventory();

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Inventory</CardTitle>
          <Button onClick={toggleInventory} variant="outline" size="sm">
            Close
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="items" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="eliteballs">Elite Balls</TabsTrigger>
              <TabsTrigger value="equipment">Equipment</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="items" className="mt-4">
              <div className="grid grid-cols-6 gap-4 max-h-96 overflow-y-auto">
                {items.filter(item => item.category === 'consumable').map((item) => (
                  <Card key={item.id} className="p-2 text-center hover:bg-gray-100 cursor-pointer">
                    <div className="w-12 h-12 bg-blue-500 rounded mb-2 mx-auto flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{item.name[0]}</span>
                    </div>
                    <div className="text-xs font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">x{item.quantity}</div>
                    <Button 
                      size="sm" 
                      className="mt-2 text-xs"
                      onClick={() => useItem(item.id)}
                    >
                      Use
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="eliteballs" className="mt-4">
              <div className="grid grid-cols-6 gap-4 max-h-96 overflow-y-auto">
                {items.filter(item => item.category === 'capture').map((item) => (
                  <Card key={item.id} className="p-2 text-center">
                    <div className="w-12 h-12 bg-red-500 rounded-full mb-2 mx-auto flex items-center justify-center">
                      <span className="text-white text-xs font-bold">B</span>
                    </div>
                    <div className="text-xs font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">x{item.quantity}</div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="equipment" className="mt-4">
              <div className="text-center text-gray-500 py-8">
                Equipment system coming soon!
              </div>
            </TabsContent>
            
            <TabsContent value="materials" className="mt-4">
              <div className="grid grid-cols-6 gap-4 max-h-96 overflow-y-auto">
                {items.filter(item => item.category === 'material').map((item) => (
                  <Card key={item.id} className="p-2 text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded mb-2 mx-auto flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{item.name[0]}</span>
                    </div>
                    <div className="text-xs font-semibold">{item.name}</div>
                    <div className="text-xs text-gray-500">x{item.quantity}</div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default InventoryScreen;
