import React, { useMemo } from 'react';
import { Tree, WaterFeature, Building, Bridge } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function VillageZone() {
  const grassTexture = useTexture('/textures/grass.png');
  const sandTexture = useTexture('/textures/sand.jpg');
  
  // Generate village layout
  const villageFeatures = useMemo(() => {
    const features = [];
    
    // Village houses in a circular pattern
    const housePositions = [
      { pos: [-15, 0, -10], buildingType: 'house', size: [3, 4, 3] },
      { pos: [15, 0, -10], buildingType: 'house', size: [3, 4, 3] },
      { pos: [-20, 0, 5], buildingType: 'hut', size: [3, 4, 3] },
      { pos: [20, 0, 5], buildingType: 'hut', size: [3, 4, 3] },
      { pos: [-10, 0, 20], buildingType: 'house', size: [3, 4, 3] },
      { pos: [10, 0, 20], buildingType: 'house', size: [3, 4, 3] },
      { pos: [0, 0, -25], buildingType: 'house', size: [4, 5, 4] },
      { pos: [0, 0, 25], buildingType: 'house', size: [3, 4, 3] }
    ];
    
    housePositions.forEach((house) => {
      features.push({
        type: 'building',
        position: house.pos as [number, number, number],
        buildingType: house.buildingType,
        size: house.size as [number, number, number]
      });
    });
    
    // Central well (water feature)
    features.push({
      type: 'water',
      position: [0, 0.1, 0] as [number, number, number],
      size: [3, 0, 3] as [number, number, number],
      waterType: 'pond'
    });
    
    // Village river
    features.push({
      type: 'water',
      position: [0, 0.1, -40] as [number, number, number],
      size: [60, 0, 4] as [number, number, number],
      waterType: 'river'
    });
    
    // Bridge over the river
    features.push({
      type: 'bridge',
      position: [0, 1, -40] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      length: 8
    });
    
    // Village trees (decorative, not dense)
    const treePositions = [
      { pos: [-30, 0, -5], treeType: 'oak', scale: 1.2 },
      { pos: [30, 0, -5], treeType: 'oak', scale: 1.2 },
      { pos: [-25, 0, 15], treeType: 'oak', scale: 1.2 },
      { pos: [25, 0, 15], treeType: 'oak', scale: 1.2 },
      { pos: [-5, 0, 35], treeType: 'oak', scale: 1.2 },
      { pos: [5, 0, 35], treeType: 'oak', scale: 1.2 },
      { pos: [-35, 0, 25], treeType: 'oak', scale: 1.2 },
      { pos: [35, 0, 25], treeType: 'oak', scale: 1.2 }
    ];
    
    treePositions.forEach(tree => {
      features.push({
        type: 'tree',
        position: tree.pos as [number, number, number],
        treeType: tree.treeType,
        scale: tree.scale
      });
    });
    
    return features;
  }, []);

  return (
    <group>
      {/* Village ground */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[100, 0.3, 100]} />
        <meshLambertMaterial map={grassTexture} />
      </mesh>
      
      {/* Village square/center */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[15, 15, 0.1, 16]} />
        <meshLambertMaterial map={sandTexture} />
      </mesh>
      
      {/* Paths connecting buildings */}
      {[
        { pos: [0, -0.05, -12.5], size: [30, 0.05, 2] },
        { pos: [0, -0.05, 12.5], size: [30, 0.05, 2] },
        { pos: [-12.5, -0.05, 0], size: [2, 0.05, 25] },
        { pos: [12.5, -0.05, 0], size: [2, 0.05, 25] }
      ].map((path, i) => (
        <mesh key={i} position={path.pos as [number, number, number]}>
          <boxGeometry args={path.size as [number, number, number]} />
          <meshLambertMaterial map={sandTexture} />
        </mesh>
      ))}
      
      {/* Render all village features */}
      {villageFeatures.map((feature, index) => {
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
    </group>
  );
}

export default VillageZone;