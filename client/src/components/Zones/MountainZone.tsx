import React, { useMemo } from 'react';
import { Tree, WaterFeature, Rock, CaveEntrance, Hill } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function MountainZone() {
  const grassTexture = useTexture('/textures/grass.png');
  
  // Generate mountain terrain layout
  const mountainFeatures = useMemo(() => {
    const features = [];
    
    // Mountain peaks (large hills)
    const peaks = [
      { pos: [-30, 0, -20], size: [15, 12, 18] },
      { pos: [25, 0, -30], size: [20, 15, 20] },
      { pos: [0, 0, 30], size: [18, 10, 15] },
      { pos: [-40, 0, 20], size: [12, 8, 14] },
      { pos: [35, 0, 15], size: [16, 11, 16] }
    ];
    
    peaks.forEach(peak => {
      features.push({
        type: 'hill',
        position: peak.pos as [number, number, number],
        size: peak.size as [number, number, number]
      });
    });
    
    // Mountain caves
    features.push({
      type: 'cave',
      position: [-25, 3, -15] as [number, number, number],
      rotation: [0, Math.PI / 3, 0] as [number, number, number]
    });
    
    features.push({
      type: 'cave',
      position: [20, 4, -25] as [number, number, number],
      rotation: [0, -Math.PI / 4, 0] as [number, number, number]
    });
    
    // Mountain streams
    features.push({
      type: 'water',
      position: [0, 2, 0] as [number, number, number],
      size: [50, 0, 3] as [number, number, number],
      waterType: 'river' as const
    });
    
    // Alpine trees (mainly pine)
    for (let i = 0; i < 30; i++) {
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      const elevation = Math.abs(x) + Math.abs(z); // Higher elevation = fewer trees
      
      if (elevation < 50) {
        features.push({
          type: 'tree',
          position: [x, 0, z] as [number, number, number],
          treeType: 'pine' as const,
          scale: 0.7 + Math.random() * 0.4
        });
      }
    }
    
    // Rocky outcrops
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 70;
      const z = (Math.random() - 0.5) * 70;
      const size = [1.5 + Math.random() * 2, 2 + Math.random() * 3, 1.5 + Math.random() * 2] as [number, number, number];
      
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
      {/* Mountain terrain base */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <boxGeometry args={[100, 1.5, 100]} />
        <meshLambertMaterial map={grassTexture} color="#8FBC8F" />
      </mesh>
      
      {/* Render all mountain features */}
      {mountainFeatures.map((feature, index) => {
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
          case 'cave':
            const cave = feature as any;
            return (
              <CaveEntrance
                key={index}
                position={cave.position}
                rotation={cave.rotation}
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
      
      {/* Mountain atmosphere */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 5]} intensity={0.6} />
    </group>
  );
}

export default MountainZone;