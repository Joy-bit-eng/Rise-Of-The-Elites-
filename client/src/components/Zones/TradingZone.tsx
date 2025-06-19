import React, { useMemo } from 'react';
import { Tree, WaterFeature, Building, Bridge } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function TradingZone() {
  const asphaltTexture = useTexture('/textures/asphalt.png');
  const sandTexture = useTexture('/textures/sand.jpg');
  
  // Generate trading hub layout
  const tradingFeatures = useMemo(() => {
    const features = [];
    
    // Central marketplace
    const marketplace = [
      { pos: [0, 0, 0], type: 'house', size: [8, 6, 8] }, // Main trading hall
      { pos: [-12, 0, -8], type: 'house', size: [4, 4, 6] }, // Shop 1
      { pos: [12, 0, -8], type: 'house', size: [4, 4, 6] }, // Shop 2
      { pos: [-12, 0, 8], type: 'house', size: [4, 4, 6] }, // Shop 3
      { pos: [12, 0, 8], type: 'house', size: [4, 4, 6] }, // Shop 4
      { pos: [-20, 0, 0], type: 'house', size: [6, 5, 4] }, // Bank
      { pos: [20, 0, 0], type: 'house', size: [6, 5, 4] } // Exchange
    ];
    
    marketplace.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Trading post districts
    const tradingPosts = [
      { pos: [-30, 0, -25], type: 'house', size: [8, 8, 6] }, // Exotic goods
      { pos: [30, 0, -25], type: 'house', size: [8, 8, 6] }, // Rare materials
      { pos: [-35, 0, 20], type: 'tower', size: [6, 10, 6] }, // Auction house
      { pos: [35, 0, 20], type: 'house', size: [10, 6, 8] }, // Caravan station
      { pos: [0, 0, -35], type: 'tower', size: [8, 12, 8] }, // Trade guild
      { pos: [0, 0, 35], type: 'house', size: [12, 5, 6] } // Logistics center
    ];
    
    tradingPosts.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Central fountain for gathering
    features.push({
      type: 'water',
      position: [0, 0.1, -15] as [number, number, number],
      size: [6, 0, 6] as [number, number, number],
      waterType: 'pond' as const
    });
    
    // Trading river for transport
    features.push({
      type: 'water',
      position: [40, 0.1, 0] as [number, number, number],
      size: [20, 0, 60] as [number, number, number],
      waterType: 'river' as const
    });
    
    // Trading bridge
    features.push({
      type: 'bridge',
      position: [40, 1.5, 0] as [number, number, number],
      rotation: [0, Math.PI / 2, 0] as [number, number, number],
      length: 10
    });
    
    // Decorative trees around plaza
    const plazaTrees = [
      { pos: [-25, 0, -15], treeType: 'oak', scale: 1.2 },
      { pos: [25, 0, -15], treeType: 'oak', scale: 1.2 },
      { pos: [-25, 0, 15], treeType: 'oak', scale: 1.2 },
      { pos: [25, 0, 15], treeType: 'oak', scale: 1.2 },
      { pos: [0, 0, 20], treeType: 'palm', scale: 1.3 },
      { pos: [-15, 0, 25], treeType: 'palm', scale: 1.1 },
      { pos: [15, 0, 25], treeType: 'palm', scale: 1.1 }
    ];
    
    plazaTrees.forEach(tree => {
      features.push({
        type: 'tree',
        position: tree.pos as [number, number, number],
        treeType: tree.treeType as 'oak' | 'palm',
        scale: tree.scale
      });
    });
    
    return features;
  }, []);

  return (
    <group>
      {/* Main trading plaza */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[20, 20, 0.1, 16]} />
        <meshLambertMaterial map={sandTexture} />
      </mesh>
      
      {/* Trading roads radiating from center */}
      {[
        { pos: [0, -0.05, -25], size: [40, 0.05, 6] }, // North road
        { pos: [0, -0.05, 25], size: [40, 0.05, 6] }, // South road
        { pos: [-25, -0.05, 0], size: [6, 0.05, 40] }, // West road
        { pos: [25, -0.05, 0], size: [6, 0.05, 40] }, // East road
        { pos: [-20, -0.05, -20], size: [20, 0.05, 4] }, // NW access
        { pos: [20, -0.05, -20], size: [20, 0.05, 4] }, // NE access
        { pos: [-20, -0.05, 20], size: [20, 0.05, 4] }, // SW access
        { pos: [20, -0.05, 20], size: [20, 0.05, 4] } // SE access
      ].map((road, i) => (
        <mesh key={i} position={road.pos as [number, number, number]}>
          <boxGeometry args={road.size as [number, number, number]} />
          <meshLambertMaterial map={asphaltTexture} color="#654321" />
        </mesh>
      ))}
      
      {/* Market stalls (small structures) */}
      {[
        { pos: [-8, 0.5, -3], size: [2, 1, 2] },
        { pos: [8, 0.5, -3], size: [2, 1, 2] },
        { pos: [-8, 0.5, 3], size: [2, 1, 2] },
        { pos: [8, 0.5, 3], size: [2, 1, 2] },
        { pos: [-3, 0.5, -8], size: [2, 1, 2] },
        { pos: [3, 0.5, -8], size: [2, 1, 2] },
        { pos: [-3, 0.5, 8], size: [2, 1, 2] },
        { pos: [3, 0.5, 8], size: [2, 1, 2] }
      ].map((stall, i) => (
        <mesh key={i} position={stall.pos as [number, number, number]}>
          <boxGeometry args={stall.size as [number, number, number]} />
          <meshLambertMaterial color="#8B4513" />
        </mesh>
      ))}
      
      {/* Render all trading features */}
      {tradingFeatures.map((feature, index) => {
        switch (feature.type) {
          case 'building':
            const building = feature as any;
            return (
              <Building
                key={index}
                position={building.position}
                size={building.size}
                type={building.buildingType}
              />
            );
          case 'tree':
            const tree = feature as any;
            return (
              <Tree 
                key={index}
                position={tree.position}
                scale={tree.scale}
                type={tree.treeType}
              />
            );
          case 'water':
            const water = feature as any;
            return (
              <WaterFeature
                key={index}
                position={water.position}
                size={water.size}
                type={water.waterType}
              />
            );
          case 'bridge':
            const bridge = feature as any;
            return (
              <Bridge
                key={index}
                position={bridge.position}
                rotation={bridge.rotation}
                length={bridge.length}
              />
            );
          default:
            return null;
        }
      })}
      
      {/* Bustling market atmosphere */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 20, 5]} intensity={0.8} />
      <pointLight position={[0, 8, 0]} intensity={0.7} color="#FFD700" />
    </group>
  );
}

export default TradingZone;