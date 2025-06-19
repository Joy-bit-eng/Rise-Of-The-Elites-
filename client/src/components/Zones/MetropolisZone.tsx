import React, { useMemo } from 'react';
import { Tree, WaterFeature, Building, Bridge } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function MetropolisZone() {
  const asphaltTexture = useTexture('/textures/asphalt.png');
  const grassTexture = useTexture('/textures/grass.png');
  
  // Generate metropolis layout - larger and denser than regular city
  const cityFeatures = useMemo(() => {
    const features = [];
    
    // Skyscrapers in dense grid
    const skyscraperGrid = [
      // Central business district
      { pos: [-20, 0, -20], type: 'tower', size: [8, 25, 8] },
      { pos: [-10, 0, -20], type: 'tower', size: [6, 20, 6] },
      { pos: [0, 0, -20], type: 'tower', size: [10, 30, 10] }, // Main tower
      { pos: [10, 0, -20], type: 'tower', size: [7, 22, 7] },
      { pos: [20, 0, -20], type: 'tower', size: [8, 24, 8] },
      
      // Mid-level buildings
      { pos: [-30, 0, -10], type: 'tower', size: [5, 15, 5] },
      { pos: [-20, 0, -10], type: 'house', size: [6, 12, 6] },
      { pos: [-10, 0, -10], type: 'tower', size: [4, 18, 4] },
      { pos: [10, 0, -10], type: 'tower', size: [5, 16, 5] },
      { pos: [20, 0, -10], type: 'house', size: [6, 14, 6] },
      { pos: [30, 0, -10], type: 'tower', size: [5, 15, 5] },
      
      // Residential area
      { pos: [-25, 0, 10], type: 'house', size: [4, 8, 4] },
      { pos: [-15, 0, 10], type: 'house', size: [3, 6, 3] },
      { pos: [-5, 0, 10], type: 'house', size: [4, 7, 4] },
      { pos: [5, 0, 10], type: 'house', size: [3, 6, 3] },
      { pos: [15, 0, 10], type: 'house', size: [4, 8, 4] },
      { pos: [25, 0, 10], type: 'house', size: [3, 7, 3] },
      
      // Shopping district
      { pos: [-20, 0, 25], type: 'tower', size: [8, 12, 8] },
      { pos: [-5, 0, 25], type: 'tower', size: [10, 16, 10] },
      { pos: [10, 0, 25], type: 'tower', size: [7, 14, 7] },
      { pos: [25, 0, 25], type: 'tower', size: [6, 13, 6] }
    ];
    
    skyscraperGrid.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Central park with multiple ponds
    features.push({
      type: 'water',
      position: [0, 0.1, 0] as [number, number, number],
      size: [12, 0, 12] as [number, number, number],
      waterType: 'pond' as const
    });
    
    features.push({
      type: 'water',
      position: [-15, 0.1, 5] as [number, number, number],
      size: [6, 0, 6] as [number, number, number],
      waterType: 'pond' as const
    });
    
    // Metropolitan river system
    features.push({
      type: 'water',
      position: [0, 0.1, -40] as [number, number, number],
      size: [90, 0, 8] as [number, number, number],
      waterType: 'river' as const
    });
    
    // Multiple bridges across the river
    for (let i = -30; i <= 30; i += 20) {
      features.push({
        type: 'bridge',
        position: [i, 2, -40] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number],
        length: 12
      });
    }
    
    // Urban parks with trees
    const parkTrees = [
      { pos: [-8, 0, -8], treeType: 'oak', scale: 1.4 },
      { pos: [8, 0, -8], treeType: 'oak', scale: 1.4 },
      { pos: [-8, 0, 8], treeType: 'oak', scale: 1.4 },
      { pos: [8, 0, 8], treeType: 'oak', scale: 1.4 },
      { pos: [-12, 0, 0], treeType: 'oak', scale: 1.3 },
      { pos: [12, 0, 0], treeType: 'oak', scale: 1.3 },
      { pos: [0, 0, -12], treeType: 'oak', scale: 1.3 },
      { pos: [0, 0, 12], treeType: 'oak', scale: 1.3 }
    ];
    
    parkTrees.forEach(tree => {
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
      {/* City ground (mostly paved) */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[100, 0.3, 100]} />
        <meshLambertMaterial map={asphaltTexture} color="#404040" />
      </mesh>
      
      {/* Central park area */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[18, 18, 0.1, 16]} />
        <meshLambertMaterial map={grassTexture} />
      </mesh>
      
      {/* Metropolitan street grid */}
      {[
        // Major avenues (horizontal)
        { pos: [0, -0.05, -30], size: [100, 0.05, 6] },
        { pos: [0, -0.05, -15], size: [100, 0.05, 4] },
        { pos: [0, -0.05, 15], size: [100, 0.05, 4] },
        { pos: [0, -0.05, 30], size: [100, 0.05, 6] },
        
        // Major streets (vertical)
        { pos: [-30, -0.05, 0], size: [6, 0.05, 100] },
        { pos: [-15, -0.05, 0], size: [4, 0.05, 100] },
        { pos: [15, -0.05, 0], size: [4, 0.05, 100] },
        { pos: [30, -0.05, 0], size: [6, 0.05, 100] }
      ].map((street, i) => (
        <mesh key={i} position={street.pos as [number, number, number]}>
          <boxGeometry args={street.size as [number, number, number]} />
          <meshLambertMaterial map={asphaltTexture} color="#303030" />
        </mesh>
      ))}
      
      {/* Render all city features */}
      {cityFeatures.map((feature, index) => {
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
      
      {/* Urban lighting */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 15, 0]} intensity={0.8} />
      <pointLight position={[-20, 12, -20]} intensity={0.6} />
      <pointLight position={[20, 12, 20]} intensity={0.6} />
    </group>
  );
}

export default MetropolisZone;