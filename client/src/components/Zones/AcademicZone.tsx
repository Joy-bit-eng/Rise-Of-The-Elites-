import React, { useMemo } from 'react';
import { Tree, WaterFeature, Building, Bridge } from '../Terrain/TerrainFeatures';
import { useTexture } from '@react-three/drei';

function AcademicZone() {
  const grassTexture = useTexture('/textures/grass.png');
  const sandTexture = useTexture('/textures/sand.jpg');
  
  // Generate university campus layout
  const academicFeatures = useMemo(() => {
    const features = [];
    
    // Main university buildings
    const mainBuildings = [
      { pos: [0, 0, 0], type: 'tower', size: [12, 18, 12] }, // Central library
      { pos: [-20, 0, -15], type: 'house', size: [8, 8, 12] }, // Science hall
      { pos: [20, 0, -15], type: 'house', size: [8, 8, 12] }, // Arts building
      { pos: [-20, 0, 15], type: 'house', size: [10, 6, 8] }, // Engineering
      { pos: [20, 0, 15], type: 'house', size: [10, 6, 8] }, // Medicine
      { pos: [0, 0, -30], type: 'tower', size: [10, 12, 8] }, // Admin building
      { pos: [0, 0, 30], type: 'house', size: [15, 4, 8] } // Student center
    ];
    
    mainBuildings.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Dormitory complex
    const dormitories = [
      { pos: [-35, 0, -25], type: 'house', size: [6, 10, 6] },
      { pos: [-35, 0, -10], type: 'house', size: [6, 10, 6] },
      { pos: [-35, 0, 5], type: 'house', size: [6, 10, 6] },
      { pos: [-35, 0, 20], type: 'house', size: [6, 10, 6] },
      { pos: [35, 0, -25], type: 'house', size: [6, 10, 6] },
      { pos: [35, 0, -10], type: 'house', size: [6, 10, 6] },
      { pos: [35, 0, 5], type: 'house', size: [6, 10, 6] },
      { pos: [35, 0, 20], type: 'house', size: [6, 10, 6] }
    ];
    
    dormitories.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Research facilities
    const researchBuildings = [
      { pos: [-15, 0, -35], type: 'tower', size: [8, 15, 6] }, // Observatory
      { pos: [15, 0, -35], type: 'house', size: [10, 8, 8] }, // Lab complex
      { pos: [-25, 0, 35], type: 'house', size: [8, 6, 10] }, // Research center
      { pos: [25, 0, 35], type: 'tower', size: [6, 12, 6] } // Tech tower
    ];
    
    researchBuildings.forEach(building => {
      features.push({
        type: 'building',
        position: building.pos as [number, number, number],
        buildingType: building.type,
        size: building.size as [number, number, number]
      });
    });
    
    // Campus pond and reflection pool
    features.push({
      type: 'water',
      position: [0, 0.1, -10] as [number, number, number],
      size: [8, 0, 8] as [number, number, number],
      waterType: 'pond' as const
    });
    
    features.push({
      type: 'water',
      position: [0, 0.1, 10] as [number, number, number],
      size: [6, 0, 6] as [number, number, number],
      waterType: 'pond' as const
    });
    
    // Campus river
    features.push({
      type: 'water',
      position: [-45, 0.1, 0] as [number, number, number],
      size: [10, 0, 80] as [number, number, number],
      waterType: 'river' as const
    });
    
    // Academic bridge
    features.push({
      type: 'bridge',
      position: [-45, 1.5, 0] as [number, number, number],
      rotation: [0, Math.PI / 2, 0] as [number, number, number],
      length: 8
    });
    
    // Campus greenery - extensive tree coverage
    const campusTrees = [
      // Quad area trees
      { pos: [-10, 0, -5], treeType: 'oak', scale: 1.4 },
      { pos: [10, 0, -5], treeType: 'oak', scale: 1.4 },
      { pos: [-10, 0, 5], treeType: 'oak', scale: 1.4 },
      { pos: [10, 0, 5], treeType: 'oak', scale: 1.4 },
      
      // Pathway trees
      { pos: [-15, 0, 0], treeType: 'oak', scale: 1.2 },
      { pos: [15, 0, 0], treeType: 'oak', scale: 1.2 },
      { pos: [0, 0, -20], treeType: 'oak', scale: 1.3 },
      { pos: [0, 0, 20], treeType: 'oak', scale: 1.3 },
      
      // Scattered academic trees
      { pos: [-30, 0, -30], treeType: 'pine', scale: 1.1 },
      { pos: [30, 0, -30], treeType: 'pine', scale: 1.1 },
      { pos: [-30, 0, 30], treeType: 'oak', scale: 1.2 },
      { pos: [30, 0, 30], treeType: 'oak', scale: 1.2 },
      { pos: [-25, 0, 0], treeType: 'oak', scale: 1.0 },
      { pos: [25, 0, 0], treeType: 'oak', scale: 1.0 }
    ];
    
    campusTrees.forEach(tree => {
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
      {/* Campus grounds */}
      <mesh position={[0, -0.2, 0]} receiveShadow>
        <boxGeometry args={[100, 0.3, 100]} />
        <meshLambertMaterial map={grassTexture} />
      </mesh>
      
      {/* Central quad */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[25, 0.1, 20]} />
        <meshLambertMaterial map={grassTexture} color="#228B22" />
      </mesh>
      
      {/* Campus pathways */}
      {[
        // Main walkways
        { pos: [0, -0.05, 0], size: [30, 0.05, 3] }, // Central path
        { pos: [0, -0.05, -22.5], size: [40, 0.05, 3] }, // North path
        { pos: [0, -0.05, 22.5], size: [40, 0.05, 3] }, // South path
        { pos: [-22.5, -0.05, 0], size: [3, 0.05, 50] }, // West path
        { pos: [22.5, -0.05, 0], size: [3, 0.05, 50] }, // East path
        
        // Connecting walkways
        { pos: [-17.5, -0.05, -15], size: [15, 0.05, 2] },
        { pos: [17.5, -0.05, -15], size: [15, 0.05, 2] },
        { pos: [-17.5, -0.05, 15], size: [15, 0.05, 2] },
        { pos: [17.5, -0.05, 15], size: [15, 0.05, 2] }
      ].map((path, i) => (
        <mesh key={i} position={path.pos as [number, number, number]}>
          <boxGeometry args={path.size as [number, number, number]} />
          <meshLambertMaterial map={sandTexture} />
        </mesh>
      ))}
      
      {/* Render all academic features */}
      {academicFeatures.map((feature, index) => {
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
      
      {/* Scholarly lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 25, 5]} intensity={0.8} />
      <pointLight position={[0, 12, 0]} intensity={0.6} color="#E6E6FA" />
    </group>
  );
}

export default AcademicZone;