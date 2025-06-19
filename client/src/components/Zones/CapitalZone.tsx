import React, { useMemo } from 'react';
import { Tree, WaterFeature, Building, Bridge } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function CapitalZone() {
  const asphaltTexture = useTexture('/textures/asphalt.png');
  const grassTexture = useTexture('/textures/grass.png');
  
  // Generate capital city layout - grandest city with monuments
  const capitalFeatures = useMemo(() => {
    const features = [];
    
    // Central palace/government complex
    features.push({
      type: 'building',
      position: [0, 0, 0] as [number, number, number],
      buildingType: 'tower',
      size: [15, 35, 15] as [number, number, number] // Massive central building
    });
    
    // Government district
    const govBuildings = [
      { pos: [-25, 0, 0], type: 'tower', size: [10, 20, 8] },
      { pos: [25, 0, 0], type: 'tower', size: [10, 20, 8] },
      { pos: [0, 0, -25], type: 'tower', size: [8, 18, 10] },
      { pos: [0, 0, 25], type: 'tower', size: [8, 18, 10] }
    ];
    
    govBuildings.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Embassy district
    const embassyRing = [
      { pos: [-35, 0, -15], type: 'house', size: [6, 12, 6] },
      { pos: [-35, 0, 15], type: 'house', size: [6, 12, 6] },
      { pos: [35, 0, -15], type: 'house', size: [6, 12, 6] },
      { pos: [35, 0, 15], type: 'house', size: [6, 12, 6] },
      { pos: [-15, 0, -35], type: 'house', size: [6, 12, 6] },
      { pos: [15, 0, -35], type: 'house', size: [6, 12, 6] },
      { pos: [-15, 0, 35], type: 'house', size: [6, 12, 6] },
      { pos: [15, 0, 35], type: 'house', size: [6, 12, 6] }
    ];
    
    embassyRing.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Grand fountains
    features.push({
      type: 'water',
      position: [-12, 0.1, -12] as [number, number, number],
      size: [8, 0, 8] as [number, number, number],
      waterType: 'pond' as const
    });
    
    features.push({
      type: 'water',
      position: [12, 0.1, 12] as [number, number, number],
      size: [8, 0, 8] as [number, number, number],
      waterType: 'pond' as const
    });
    
    features.push({
      type: 'water',
      position: [-12, 0.1, 12] as [number, number, number],
      size: [6, 0, 6] as [number, number, number],
      waterType: 'pond' as const
    });
    
    features.push({
      type: 'water',
      position: [12, 0.1, -12] as [number, number, number],
      size: [6, 0, 6] as [number, number, number],
      waterType: 'pond' as const
    });
    
    // Royal river
    features.push({
      type: 'water',
      position: [0, 0.1, -45] as [number, number, number],
      size: [100, 0, 10] as [number, number, number],
      waterType: 'river' as const
    });
    
    // Grand bridges
    features.push({
      type: 'bridge',
      position: [-30, 2.5, -45] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      length: 15
    });
    
    features.push({
      type: 'bridge',
      position: [0, 2.5, -45] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      length: 15
    });
    
    features.push({
      type: 'bridge',
      position: [30, 2.5, -45] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      length: 15
    });
    
    // Royal gardens with ceremonial trees
    const gardenTrees = [
      { pos: [-18, 0, -18], treeType: 'oak', scale: 1.6 },
      { pos: [18, 0, -18], treeType: 'oak', scale: 1.6 },
      { pos: [-18, 0, 18], treeType: 'oak', scale: 1.6 },
      { pos: [18, 0, 18], treeType: 'oak', scale: 1.6 },
      { pos: [-30, 0, 0], treeType: 'oak', scale: 1.5 },
      { pos: [30, 0, 0], treeType: 'oak', scale: 1.5 },
      { pos: [0, 0, -30], treeType: 'oak', scale: 1.5 },
      { pos: [0, 0, 30], treeType: 'oak', scale: 1.5 }
    ];
    
    gardenTrees.forEach(tree => {
      features.push({
        type: 'tree',
        position: tree.pos as [number, number, number],
        treeType: tree.treeType as 'oak',
        scale: tree.scale
      });
    });
    
    return features;
  }, []);

  return (
    <group>
      {/* Grand plaza */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[25, 25, 0.1, 32]} />
        <meshLambertMaterial color="#F5F5DC" />
      </mesh>
      
      {/* City streets in perfect grid */}
      {[
        // Major ceremonial avenues
        { pos: [0, -0.05, -22.5], size: [50, 0.05, 8] },
        { pos: [0, -0.05, 22.5], size: [50, 0.05, 8] },
        { pos: [-22.5, -0.05, 0], size: [8, 0.05, 50] },
        { pos: [22.5, -0.05, 0], size: [8, 0.05, 50] },
        
        // Outer ring road
        { pos: [0, -0.05, -40], size: [100, 0.05, 6] },
        { pos: [0, -0.05, 40], size: [100, 0.05, 6] },
        { pos: [-40, -0.05, 0], size: [6, 0.05, 100] },
        { pos: [40, -0.05, 0], size: [6, 0.05, 100] }
      ].map((street, i) => (
        <mesh key={i} position={street.pos as [number, number, number]}>
          <boxGeometry args={street.size as [number, number, number]} />
          <meshLambertMaterial color="#2F2F2F" />
        </mesh>
      ))}
      
      {/* Render all capital features */}
      {capitalFeatures.map((feature, index) => {
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
      
      {/* Majestic lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 30, 0]} intensity={0.8} color="#FFD700" />
      <pointLight position={[0, 20, 0]} intensity={1.0} color="#FFFFFF" />
    </group>
  );
}

export default CapitalZone;