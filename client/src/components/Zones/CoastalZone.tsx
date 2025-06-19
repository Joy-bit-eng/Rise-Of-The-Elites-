import React, { useMemo } from 'react';
import { Tree, WaterFeature, Rock, Building, Bridge } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function CoastalZone() {
  const sandTexture = useTexture('/textures/sand.jpg');
  const grassTexture = useTexture('/textures/grass.png');
  
  // Generate coastal city layout
  const coastalFeatures = useMemo(() => {
    const features = [];
    
    // Ocean
    features.push({
      type: 'water',
      position: [0, 0.1, -35] as [number, number, number],
      size: [100, 0, 30] as [number, number, number],
      waterType: 'river' as const // Using river for large water body
    });
    
    // Harbor/port buildings
    const portBuildings = [
      { pos: [-20, 0, -20], type: 'tower', size: [6, 8, 6] }, // Lighthouse
      { pos: [-10, 0, -15], type: 'house', size: [8, 4, 6] }, // Warehouse
      { pos: [5, 0, -18], type: 'house', size: [10, 5, 8] }, // Port authority
      { pos: [20, 0, -15], type: 'house', size: [6, 4, 8] }, // Customs house
      { pos: [30, 0, -20], type: 'tower', size: [4, 12, 4] } // Port tower
    ];
    
    portBuildings.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Coastal city
    const cityBuildings = [
      { pos: [-25, 0, 10], type: 'house', size: [4, 6, 4] },
      { pos: [-15, 0, 15], type: 'tower', size: [5, 10, 5] },
      { pos: [-5, 0, 8], type: 'house', size: [6, 8, 6] },
      { pos: [10, 0, 12], type: 'tower', size: [7, 12, 7] },
      { pos: [25, 0, 10], type: 'house', size: [5, 7, 5] },
      { pos: [35, 0, 15], type: 'house', size: [4, 5, 4] }
    ];
    
    cityBuildings.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Pier/dock structures (bridges extending into water)
    features.push({
      type: 'bridge',
      position: [-15, 1, -25] as [number, number, number],
      rotation: [0, Math.PI / 2, 0] as [number, number, number],
      length: 15
    });
    
    features.push({
      type: 'bridge',
      position: [10, 1, -28] as [number, number, number],
      rotation: [0, Math.PI / 2, 0] as [number, number, number],
      length: 12
    });
    
    // Coastal palm trees
    const beachTrees = [
      { pos: [-30, 0, 0], treeType: 'palm', scale: 1.3 },
      { pos: [-20, 0, 5], treeType: 'palm', scale: 1.1 },
      { pos: [-10, 0, 2], treeType: 'palm', scale: 1.4 },
      { pos: [15, 0, 0], treeType: 'palm', scale: 1.2 },
      { pos: [25, 0, 3], treeType: 'palm', scale: 1.0 },
      { pos: [35, 0, -2], treeType: 'palm', scale: 1.3 }
    ];
    
    beachTrees.forEach(tree => {
      features.push({
        type: 'tree',
        position: tree.pos as [number, number, number],
        treeType: tree.treeType as 'palm',
        scale: tree.scale
      });
    });
    
    // Inland vegetation
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 60;
      const z = 20 + Math.random() * 30; // Only on inland side
      
      features.push({
        type: 'tree',
        position: [x, 0, z] as [number, number, number],
        treeType: Math.random() < 0.7 ? 'palm' : 'oak' as 'palm' | 'oak',
        scale: 0.8 + Math.random() * 0.5
      });
    }
    
    // Rocky coastline
    for (let i = 0; i < 10; i++) {
      const x = (Math.random() - 0.5) * 80;
      const z = -10 + Math.random() * 8; // Along the shoreline
      const size = [1.5 + Math.random() * 2, 1 + Math.random() * 2, 1.5 + Math.random() * 2] as [number, number, number];
      
      features.push({
        type: 'rock',
        position: [x, size[1] / 2, z] as [number, number, number],
        size
      });
    }
    
    return features;
  }, []);

  return (
    <group>
      {/* Beach sand */}
      <mesh position={[0, -0.2, -10]} receiveShadow>
        <boxGeometry args={[100, 0.3, 20]} />
        <meshLambertMaterial map={sandTexture} />
      </mesh>
      
      {/* Inland terrain */}
      <mesh position={[0, -0.2, 25]} receiveShadow>
        <boxGeometry args={[100, 0.3, 50]} />
        <meshLambertMaterial map={grassTexture} />
      </mesh>
      
      {/* Coastal road */}
      <mesh position={[0, -0.1, 5]} receiveShadow>
        <boxGeometry args={[90, 0.05, 4]} />
        <meshLambertMaterial color="#404040" />
      </mesh>
      
      {/* Render all coastal features */}
      {coastalFeatures.map((feature, index) => {
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
          case 'rock':
            const rock = feature as any;
            return (
              <Rock
                key={index}
                position={rock.position}
                size={rock.size}
              />
            );
          default:
            return null;
        }
      })}
      
      {/* Ocean ambiance */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, -10]} intensity={0.7} color="#87CEEB" />
    </group>
  );
}

export default CoastalZone;