import React, { useMemo } from 'react';
import { Tree, WaterFeature, Building, Rock } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function IndustrialZone() {
  const asphaltTexture = useTexture('/textures/asphalt.png');
  
  // Generate industrial complex layout
  const industrialFeatures = useMemo(() => {
    const features = [];
    
    // Factory buildings
    const factories = [
      { pos: [-25, 0, -20], type: 'tower', size: [12, 15, 8] }, // Main factory
      { pos: [-10, 0, -25], type: 'house', size: [8, 8, 12] }, // Workshop
      { pos: [10, 0, -20], type: 'tower', size: [10, 12, 10] }, // Processing plant
      { pos: [25, 0, -25], type: 'house', size: [6, 6, 8] }, // Storage
      { pos: [-30, 0, 5], type: 'house', size: [15, 6, 6] }, // Warehouse
      { pos: [0, 0, 10], type: 'tower', size: [8, 20, 8] }, // Smokestack building
      { pos: [20, 0, 15], type: 'house', size: [10, 8, 12] }, // Assembly hall
      { pos: [-15, 0, 25], type: 'house', size: [8, 5, 10] } // Office building
    ];
    
    factories.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Industrial water treatment
    features.push({
      type: 'water',
      position: [30, 0.1, 0] as [number, number, number],
      size: [8, 0, 8] as [number, number, number],
      waterType: 'pond' as const
    });
    
    // Drainage canal
    features.push({
      type: 'water',
      position: [0, 0.1, -35] as [number, number, number],
      size: [60, 0, 4] as [number, number, number],
      waterType: 'river' as const
    });
    
    // Scrap piles (rocks)
    for (let i = 0; i < 12; i++) {
      const x = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 60;
      const size = [2 + Math.random() * 2, 1.5 + Math.random() * 2, 2 + Math.random() * 2] as [number, number, number];
      
      features.push({
        type: 'rock',
        position: [x, size[1] / 2, z] as [number, number, number],
        size
      });
    }
    
    // Minimal vegetation
    const industrialTrees = [
      { pos: [-40, 0, 30], treeType: 'oak', scale: 0.8 },
      { pos: [35, 0, 25], treeType: 'oak', scale: 0.7 },
      { pos: [-35, 0, -40], treeType: 'pine', scale: 0.9 }
    ];
    
    industrialTrees.forEach(tree => {
      features.push({
        type: 'tree',
        position: tree.pos as [number, number, number],
        treeType: tree.treeType as 'oak' | 'pine',
        scale: tree.scale
      });
    });
    
    return features;
  }, []);

  return (
    <group>
      {/* Industrial ground (concrete/asphalt) */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[100, 0.3, 100]} />
        <meshLambertMaterial map={asphaltTexture} color="#555555" />
      </mesh>
      
      {/* Industrial roads and loading areas */}
      {[
        { pos: [0, -0.05, 0], size: [80, 0.05, 8] }, // Main road
        { pos: [-20, -0.05, -15], size: [6, 0.05, 20] }, // Factory access
        { pos: [15, -0.05, 10], size: [6, 0.05, 30] }, // Loading zone
        { pos: [0, -0.05, 25], size: [40, 0.05, 6] } // Perimeter road
      ].map((road, i) => (
        <mesh key={i} position={road.pos as [number, number, number]}>
          <boxGeometry args={road.size as [number, number, number]} />
          <meshLambertMaterial color="#333333" />
        </mesh>
      ))}
      
      {/* Render all industrial features */}
      {industrialFeatures.map((feature, index) => {
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
      
      {/* Industrial lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[15, 25, 10]} intensity={0.7} color="#FFA500" />
      <pointLight position={[0, 15, 10]} intensity={0.5} color="#FF6347" />
    </group>
  );
}

export default IndustrialZone;