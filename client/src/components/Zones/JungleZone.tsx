import React, { useMemo } from 'react';
import { Tree, WaterFeature, Rock, CaveEntrance } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function JungleZone() {
  const grassTexture = useTexture('/textures/grass.png');
  
  // Generate random jungle layout
  const jungleFeatures = useMemo(() => {
    const features = [];
    
    // Dense forest of mixed trees
    for (let i = 0; i < 80; i++) {
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      const treeType = Math.random() < 0.3 ? 'palm' : Math.random() < 0.5 ? 'pine' : 'oak';
      const scale = 0.8 + Math.random() * 0.6;
      
      features.push({
        type: 'tree',
        position: [x, 0, z] as [number, number, number],
        treeType: treeType as 'oak' | 'pine' | 'palm',
        scale
      });
    }
    
    // Jungle streams
    for (let i = 0; i < 3; i++) {
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      features.push({
        type: 'water',
        position: [x, 0.1, z] as [number, number, number],
        size: [15, 0, 2] as [number, number, number],
        waterType: 'river'
      });
    }
    
    // Hidden cave
    features.push({
      type: 'cave',
      position: [25, 0, 30] as [number, number, number],
      rotation: [0, Math.PI / 4, 0] as [number, number, number]
    });
    
    // Large rocks and boulders
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 70;
      const z = (Math.random() - 0.5) * 70;
      const size = [1 + Math.random() * 2, 1 + Math.random() * 3, 1 + Math.random() * 2] as [number, number, number];
      
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
      {/* Jungle ground with elevated terrain */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <boxGeometry args={[100, 0.5, 100]} />
        <meshLambertMaterial map={grassTexture} color="#228B22" />
      </mesh>
      
      {/* Render all jungle features */}
      {jungleFeatures.map((feature, index) => {
        switch (feature.type) {
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
      
      {/* Jungle atmosphere - thick canopy effect */}
      <mesh position={[0, 8, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshLambertMaterial color="#0F4F0F" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default JungleZone;