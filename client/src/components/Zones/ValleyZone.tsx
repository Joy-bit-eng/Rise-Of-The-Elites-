import React, { useMemo } from 'react';
import { Tree, WaterFeature, Rock, Hill, Bridge } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function ValleyZone() {
  const grassTexture = useTexture('/textures/grass.png');
  
  // Generate valley layout
  const valleyFeatures = useMemo(() => {
    const features = [];
    
    // Valley hills surrounding the area
    const hillPositions = [
      { pos: [-40, 0, -30], size: [8, 4, 12] },
      { pos: [40, 0, -30], size: [10, 5, 15] },
      { pos: [-35, 0, 30], size: [9, 4, 10] },
      { pos: [35, 0, 30], size: [8, 6, 12] },
      { pos: [0, 0, -45], size: [20, 3, 8] },
      { pos: [0, 0, 45], size: [25, 4, 10] }
    ];
    
    hillPositions.forEach(hill => {
      features.push({
        type: 'hill',
        position: hill.pos as [number, number, number],
        size: hill.size as [number, number, number]
      });
    });
    
    // Valley river flowing through the center
    features.push({
      type: 'water',
      position: [0, 0.1, 0] as [number, number, number],
      size: [60, 0, 8] as [number, number, number],
      waterType: 'river'
    });
    
    // Smaller streams feeding into main river
    features.push({
      type: 'water',
      position: [-20, 0.1, -15] as [number, number, number],
      size: [25, 0, 3] as [number, number, number],
      waterType: 'river'
    });
    
    features.push({
      type: 'water',
      position: [20, 0.1, 15] as [number, number, number],
      size: [25, 0, 3] as [number, number, number],
      waterType: 'river'
    });
    
    // Bridge crossing the main river
    features.push({
      type: 'bridge',
      position: [0, 1.2, 0] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      length: 12
    });
    
    // Valley meadow trees (scattered)
    for (let i = 0; i < 25; i++) {
      let x, z;
      do {
        x = (Math.random() - 0.5) * 60;
        z = (Math.random() - 0.5) * 60;
      } while (Math.abs(z) < 6); // Avoid river area
      
      const treeType = Math.random() < 0.7 ? 'oak' : 'pine';
      const scale = 0.9 + Math.random() * 0.4;
      
      features.push({
        type: 'tree',
        position: [x, 0, z] as [number, number, number],
        treeType: treeType as 'oak' | 'pine',
        scale
      });
    }
    
    // Rocky outcrops
    for (let i = 0; i < 12; i++) {
      const x = (Math.random() - 0.5) * 70;
      const z = (Math.random() - 0.5) * 70;
      const size = [1 + Math.random() * 1.5, 1 + Math.random() * 2, 1 + Math.random() * 1.5] as [number, number, number];
      
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
      {/* Valley floor */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[100, 0.8, 100]} />
        <meshLambertMaterial map={grassTexture} color="#7CFC00" />
      </mesh>
      
      {/* Valley slopes/sides */}
      <mesh position={[-45, 1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[10, 4, 100]} />
        <meshLambertMaterial map={grassTexture} color="#9ACD32" />
      </mesh>
      
      <mesh position={[45, 1, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[10, 4, 100]} />
        <meshLambertMaterial map={grassTexture} color="#9ACD32" />
      </mesh>
      
      {/* Render all valley features */}
      {valleyFeatures.map((feature, index) => {
        switch (feature.type) {
          case 'hill':
            const hill = feature as any;
            return (
              <Hill
                key={index}
                position={hill.position}
                size={hill.size}
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
    </group>
  );
}

export default ValleyZone;