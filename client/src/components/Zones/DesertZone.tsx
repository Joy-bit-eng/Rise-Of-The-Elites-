import React, { useMemo } from 'react';
import { Tree, WaterFeature, Rock, CaveEntrance, Building } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function DesertZone() {
  const sandTexture = useTexture('/textures/sand.jpg');
  
  // Generate desert oasis layout
  const desertFeatures = useMemo(() => {
    const features = [];
    
    // Central oasis
    features.push({
      type: 'water',
      position: [0, 0.1, 0] as [number, number, number],
      size: [15, 0, 15] as [number, number, number],
      waterType: 'pond' as const
    });
    
    // Palm trees around oasis
    const oasisTrees = [
      { pos: [-8, 0, -8], treeType: 'palm', scale: 1.2 },
      { pos: [8, 0, -8], treeType: 'palm', scale: 1.3 },
      { pos: [-8, 0, 8], treeType: 'palm', scale: 1.1 },
      { pos: [8, 0, 8], treeType: 'palm', scale: 1.4 },
      { pos: [-12, 0, 0], treeType: 'palm', scale: 1.0 },
      { pos: [12, 0, 0], treeType: 'palm', scale: 1.2 },
      { pos: [0, 0, -12], treeType: 'palm', scale: 1.3 },
      { pos: [0, 0, 12], treeType: 'palm', scale: 1.1 }
    ];
    
    oasisTrees.forEach(tree => {
      features.push({
        type: 'tree',
        position: tree.pos as [number, number, number],
        treeType: tree.treeType as 'palm',
        scale: tree.scale
      });
    });
    
    // Desert settlement
    const settlement = [
      { pos: [25, 0, 15], type: 'hut', size: [3, 3, 3] },
      { pos: [30, 0, 10], type: 'hut', size: [2.5, 2.5, 2.5] },
      { pos: [20, 0, 20], type: 'house', size: [4, 4, 4] },
      { pos: [35, 0, 5], type: 'hut', size: [3, 3, 3] }
    ];
    
    settlement.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Desert caves
    features.push({
      type: 'cave',
      position: [-35, 0, -25] as [number, number, number],
      rotation: [0, Math.PI / 6, 0] as [number, number, number]
    });
    
    // Rocky formations
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      
      // Avoid oasis area
      if (Math.abs(x) > 20 || Math.abs(z) > 20) {
        const size = [2 + Math.random() * 3, 2 + Math.random() * 4, 2 + Math.random() * 3] as [number, number, number];
        
        features.push({
          type: 'rock',
          position: [x, size[1] / 2, z] as [number, number, number],
          size
        });
      }
    }
    
    // Scattered cacti (represented as small palm trees)
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 90;
      const z = (Math.random() - 0.5) * 90;
      
      // Avoid oasis and settlement areas
      if (Math.abs(x) > 18 && (Math.abs(x - 25) > 15 || Math.abs(z - 12) > 10)) {
        features.push({
          type: 'tree',
          position: [x, 0, z] as [number, number, number],
          treeType: 'palm' as const,
          scale: 0.3 + Math.random() * 0.4 // Smaller for cactus effect
        });
      }
    }
    
    return features;
  }, []);

  return (
    <group>
      {/* Desert sand terrain */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[100, 0.3, 100]} />
        <meshLambertMaterial map={sandTexture} color="#F4A460" />
      </mesh>
      
      {/* Sand dunes */}
      {[
        { pos: [-40, 0, 30], size: [12, 3, 8] },
        { pos: [35, 0, -35], size: [15, 4, 10] },
        { pos: [-30, 0, -40], size: [10, 2, 12] },
        { pos: [40, 0, 25], size: [8, 2, 6] }
      ].map((dune, i) => (
        <mesh key={i} position={dune.pos as [number, number, number]}>
          <sphereGeometry args={dune.size as [number, number, number]} />
          <meshLambertMaterial map={sandTexture} color="#DEB887" />
        </mesh>
      ))}
      
      {/* Render all desert features */}
      {desertFeatures.map((feature, index) => {
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
      
      {/* Desert lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[20, 30, 10]} intensity={0.8} color="#FFE4B5" />
    </group>
  );
}

export default DesertZone;