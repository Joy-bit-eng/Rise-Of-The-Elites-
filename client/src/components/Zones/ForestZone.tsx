import React, { useMemo } from 'react';
import { useBox } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';
import Elite from '../Elite';
import { Tree as TerrainTree, WaterFeature, Rock, CaveEntrance } from '../Terrain/TerrainFeatures';
import { useElites } from '../../lib/stores/useElites';
import { useWorld } from '../../lib/stores/useWorld';

function ForestZone() {
  const { getWildElites } = useElites();
  const grassTexture = useTexture('/textures/grass.png');
  
  // Generate enhanced forest layout with terrain features
  const forestFeatures = useMemo(() => {
    const features = [];
    
    // Dense forest trees with variety
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      const treeType = Math.random() < 0.2 ? 'pine' : 'oak';
      const scale = 0.8 + Math.random() * 0.5;
      
      features.push({
        type: 'tree',
        position: [x, 0, z] as [number, number, number],
        treeType: treeType as 'oak' | 'pine',
        scale
      });
    }
    
    // Forest creek
    features.push({
      type: 'water',
      position: [-20, 0.1, 0] as [number, number, number],
      size: [40, 0, 3] as [number, number, number],
      waterType: 'river' as const
    });
    
    // Forest pond
    features.push({
      type: 'water',
      position: [25, 0.1, 25] as [number, number, number],
      size: [6, 0, 6] as [number, number, number],
      waterType: 'pond' as const
    });
    
    // Rocky areas
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      const size = [1 + Math.random(), 1 + Math.random() * 1.5, 1 + Math.random()] as [number, number, number];
      
      features.push({
        type: 'rock',
        position: [x, size[1] / 2, z] as [number, number, number],
        size
      });
    }
    
    return features;
  }, []);

  const wildElites = useMemo(() => getWildElites('forest'), [getWildElites]);

  return (
    <>
      {/* Forest floor - richer terrain */}
      <mesh position={[0, -0.3, 0]} receiveShadow>
        <boxGeometry args={[100, 0.5, 100]} />
        <meshLambertMaterial map={grassTexture} color="#2E8B57" />
      </mesh>

      {/* Render all forest features */}
      {forestFeatures.map((feature, index) => {
        switch (feature.type) {
          case 'tree':
            return (
              <TerrainTree 
                key={index}
                position={feature.position}
                scale={feature.scale}
                type={feature.treeType}
              />
            );
          case 'water':
            return (
              <WaterFeature
                key={index}
                position={feature.position}
                size={feature.size}
                type={feature.waterType}
              />
            );
          case 'rock':
            return (
              <Rock
                key={index}
                position={feature.position}
                size={feature.size}
              />
            );
          default:
            return null;
        }
      })}

      {/* Wild Elites - more grass/nature types */}
      {wildElites.map((elite) => (
        <Elite key={elite.id} eliteData={elite} />
      ))}

      {/* Return portal */}
      <Portal position={[0, 1, 25]} targetZone="starting" label="Return to Hub" />
    </>
  );
}

function Tree({ position }) {
  const [trunkRef] = useBox(() => ({
    args: [1, 4, 1],
    position: [position[0], position[1], position[2]],
    type: 'Static'
  }));

  const [leavesRef] = useBox(() => ({
    args: [3, 3, 3],
    position: [position[0], position[1] + 3, position[2]],
    type: 'Static'
  }));

  return (
    <>
      {/* Trunk */}
      <mesh ref={trunkRef} castShadow>
        <boxGeometry args={[1, 4, 1]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>
      
      {/* Leaves */}
      <mesh ref={leavesRef} castShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshLambertMaterial color="#228B22" />
      </mesh>
    </>
  );
}

function Portal({ position, targetZone, label }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[2, 3, 0.5]} />
        <meshLambertMaterial color="#4169E1" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export default ForestZone;
