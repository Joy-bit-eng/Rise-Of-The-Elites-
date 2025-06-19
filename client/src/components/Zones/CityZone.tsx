import React, { useMemo } from 'react';
import { Tree, WaterFeature, Building, Bridge } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function CityZone() {
  const asphaltTexture = useTexture('/textures/asphalt.png');
  const grassTexture = useTexture('/textures/grass.png');
  
  // Generate city layout
  const cityFeatures = useMemo(() => {
    const features = [];
    
    // City buildings in a grid pattern
    const buildingGrid = [
      // Row 1
      { pos: [-30, 0, -30], type: 'tower', size: [6, 12, 6] },
      { pos: [-15, 0, -30], type: 'house', size: [4, 8, 4] },
      { pos: [0, 0, -30], type: 'tower', size: [5, 15, 5] },
      { pos: [15, 0, -30], type: 'house', size: [4, 6, 4] },
      { pos: [30, 0, -30], type: 'tower', size: [6, 10, 6] },
      
      // Row 2
      { pos: [-30, 0, -15], type: 'house', size: [4, 7, 4] },
      { pos: [-15, 0, -15], type: 'house', size: [3, 5, 3] },
      { pos: [15, 0, -15], type: 'house', size: [3, 5, 3] },
      { pos: [30, 0, -15], type: 'house', size: [4, 7, 4] },
      
      // Row 3 (center - park area)
      { pos: [-30, 0, 15], type: 'house', size: [4, 6, 4] },
      { pos: [30, 0, 15], type: 'house', size: [4, 6, 4] },
      
      // Row 4
      { pos: [-30, 0, 30], type: 'tower', size: [5, 9, 5] },
      { pos: [-15, 0, 30], type: 'house', size: [4, 7, 4] },
      { pos: [0, 0, 30], type: 'tower', size: [6, 11, 6] },
      { pos: [15, 0, 30], type: 'house', size: [4, 7, 4] },
      { pos: [30, 0, 30], type: 'tower', size: [5, 9, 5] }
    ];
    
    buildingGrid.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Central park with pond
    features.push({
      type: 'water',
      position: [0, 0.1, 0] as [number, number, number],
      size: [8, 0, 8] as [number, number, number],
      waterType: 'pond'
    });
    
    // Park trees around the pond
    const parkTrees = [
      { pos: [-6, 0, -6], treeType: 'oak', scale: 1.3 },
      { pos: [6, 0, -6], treeType: 'oak', scale: 1.3 },
      { pos: [-6, 0, 6], treeType: 'oak', scale: 1.3 },
      { pos: [6, 0, 6], treeType: 'oak', scale: 1.3 },
      { pos: [-10, 0, 0], treeType: 'oak', scale: 1.3 },
      { pos: [10, 0, 0], treeType: 'oak', scale: 1.3 },
      { pos: [0, 0, -10], treeType: 'oak', scale: 1.3 },
      { pos: [0, 0, 10], treeType: 'oak', scale: 1.3 }
    ];
    
    parkTrees.forEach(tree => {
      features.push({
        type: 'tree',
        position: tree.pos as [number, number, number],
        treeType: tree.treeType,
        scale: tree.scale
      });
    });
    
    // City river
    features.push({
      type: 'water',
      position: [0, 0.1, -45] as [number, number, number],
      size: [80, 0, 6] as [number, number, number],
      waterType: 'river'
    });
    
    // Multiple bridges
    features.push({
      type: 'bridge',
      position: [-20, 1.5, -45] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      length: 10
    });
    
    features.push({
      type: 'bridge',
      position: [20, 1.5, -45] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      length: 10
    });
    
    return features;
  }, []);

  return (
    <group>
      {/* City ground (mostly paved) */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[100, 0.3, 100]} />
        <meshLambertMaterial map={asphaltTexture} />
      </mesh>
      
      {/* Central park area */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <cylinderGeometry args={[12, 12, 0.1, 16]} />
        <meshLambertMaterial map={grassTexture} />
      </mesh>
      
      {/* City streets */}
      {[
        // Main street (horizontal)
        { pos: [0, -0.05, -22.5], size: [80, 0.05, 4] },
        { pos: [0, -0.05, 22.5], size: [80, 0.05, 4] },
        
        // Cross streets (vertical)
        { pos: [-22.5, -0.05, 0], size: [4, 0.05, 45] },
        { pos: [22.5, -0.05, 0], size: [4, 0.05, 45] },
        
        // Center streets
        { pos: [0, -0.05, 0], size: [4, 0.05, 24] },
        { pos: [0, -0.05, 0], size: [24, 0.05, 4] }
      ].map((street, i) => (
        <mesh key={i} position={street.pos as [number, number, number]}>
          <boxGeometry args={street.size as [number, number, number]} />
          <meshLambertMaterial map={asphaltTexture} color="#404040" />
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
      
      {/* City lights for atmosphere */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 10, 0]} intensity={0.5} />
    </group>
  );
}

export default CityZone;