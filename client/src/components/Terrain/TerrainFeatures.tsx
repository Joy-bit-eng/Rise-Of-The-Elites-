import React, { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Tree component with random variations
export function Tree({ position, scale = 1, type = 'oak' }: { position: [number, number, number], scale?: number, type?: 'oak' | 'pine' | 'palm' }) {
  const woodTexture = useTexture('/textures/wood.jpg');
  
  const treeData = useMemo(() => {
    const variations = Math.random();
    return {
      trunkHeight: 2 + variations * 2,
      trunkRadius: 0.1 + variations * 0.05,
      leafColor: type === 'pine' ? '#0f5132' : type === 'palm' ? '#228b22' : '#32cd32',
      leafScale: 0.8 + variations * 0.4
    };
  }, [type]);

  return (
    <group position={position} scale={scale}>
      {/* Tree trunk */}
      <mesh position={[0, treeData.trunkHeight / 2, 0]}>
        <cylinderGeometry args={[treeData.trunkRadius, treeData.trunkRadius * 1.2, treeData.trunkHeight, 8]} />
        <meshLambertMaterial map={woodTexture} />
      </mesh>
      
      {/* Tree leaves/canopy */}
      {type === 'pine' ? (
        // Pine tree - cone shape
        <mesh position={[0, treeData.trunkHeight + 1, 0]}>
          <coneGeometry args={[1.5 * treeData.leafScale, 3, 8]} />
          <meshLambertMaterial color={treeData.leafColor} />
        </mesh>
      ) : type === 'palm' ? (
        // Palm tree - sphere with elongated leaves
        <>
          <mesh position={[0, treeData.trunkHeight + 0.5, 0]}>
            <sphereGeometry args={[0.8 * treeData.leafScale, 8, 6]} />
            <meshLambertMaterial color={treeData.leafColor} />
          </mesh>
          {/* Palm fronds */}
          {[0, 1, 2, 3, 4].map(i => (
            <mesh key={i} position={[Math.cos(i * 1.25) * 1.2, treeData.trunkHeight + 0.5, Math.sin(i * 1.25) * 1.2]} rotation={[0, i * 1.25, Math.PI / 6]}>
              <boxGeometry args={[2, 0.1, 0.3]} />
              <meshLambertMaterial color="#228b22" />
            </mesh>
          ))}
        </>
      ) : (
        // Oak tree - sphere canopy
        <mesh position={[0, treeData.trunkHeight + 0.8, 0]}>
          <sphereGeometry args={[1.2 * treeData.leafScale, 8, 6]} />
          <meshLambertMaterial color={treeData.leafColor} />
        </mesh>
      )}
    </group>
  );
}

// Rock formations
export function Rock({ position, size = [1, 1, 1] }: { position: [number, number, number], size?: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshLambertMaterial color="#696969" />
    </mesh>
  );
}

// Water features
export function WaterFeature({ position, size, type = 'pond' }: { position: [number, number, number], size: [number, number, number], type?: 'pond' | 'river' }) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      {type === 'river' ? (
        <planeGeometry args={size} />
      ) : (
        <circleGeometry args={[size[0], 16]} />
      )}
      <meshLambertMaterial color="#4169E1" transparent opacity={0.7} />
    </mesh>
  );
}

// Bridge component
export function Bridge({ position, rotation = [0, 0, 0], length = 8 }: { position: [number, number, number], rotation?: [number, number, number], length?: number }) {
  const woodTexture = useTexture('/textures/wood.jpg');
  
  return (
    <group position={position} rotation={rotation}>
      {/* Bridge deck */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[length, 0.2, 2]} />
        <meshLambertMaterial map={woodTexture} />
      </mesh>
      
      {/* Bridge railings */}
      <mesh position={[0, 1, 0.9]}>
        <boxGeometry args={[length, 0.1, 0.1]} />
        <meshLambertMaterial map={woodTexture} />
      </mesh>
      <mesh position={[0, 1, -0.9]}>
        <boxGeometry args={[length, 0.1, 0.1]} />
        <meshLambertMaterial map={woodTexture} />
      </mesh>
      
      {/* Support posts */}
      {[-length/3, 0, length/3].map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0.7, 0.9]}>
            <boxGeometry args={[0.1, 1.4, 0.1]} />
            <meshLambertMaterial map={woodTexture} />
          </mesh>
          <mesh position={[x, 0.7, -0.9]}>
            <boxGeometry args={[0.1, 1.4, 0.1]} />
            <meshLambertMaterial map={woodTexture} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Simple building for villages/cities
export function Building({ position, size = [3, 4, 3], type = 'house' }: { position: [number, number, number], size?: [number, number, number], type?: 'house' | 'tower' | 'hut' }) {
  const woodTexture = useTexture('/textures/wood.jpg');
  
  const colors = {
    house: '#D2B48C',
    tower: '#708090',
    hut: '#8B4513'
  };

  return (
    <group position={position}>
      {/* Building base */}
      <mesh position={[0, size[1] / 2, 0]}>
        <boxGeometry args={size} />
        <meshLambertMaterial color={colors[type]} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, size[1] + 0.5, 0]}>
        <coneGeometry args={[Math.max(size[0], size[2]) * 0.7, 1.5, 4]} />
        <meshLambertMaterial color="#8B0000" />
      </mesh>
      
      {/* Door */}
      <mesh position={[0, size[1] / 4, size[2] / 2 + 0.01]}>
        <boxGeometry args={[0.8, size[1] / 2, 0.1]} />
        <meshLambertMaterial map={woodTexture} />
      </mesh>
      
      {/* Windows */}
      <mesh position={[-size[0] / 3, size[1] * 0.6, size[2] / 2 + 0.01]}>
        <boxGeometry args={[0.6, 0.6, 0.05]} />
        <meshLambertMaterial color="#87CEEB" />
      </mesh>
      <mesh position={[size[0] / 3, size[1] * 0.6, size[2] / 2 + 0.01]}>
        <boxGeometry args={[0.6, 0.6, 0.05]} />
        <meshLambertMaterial color="#87CEEB" />
      </mesh>
    </group>
  );
}

// Hills and valleys
export function Hill({ position, size = [10, 3, 10] }: { position: [number, number, number], size?: [number, number, number] }) {
  const grassTexture = useTexture('/textures/grass.png');
  
  return (
    <mesh position={position}>
      <sphereGeometry args={[size[0], 16, 8]} />
      <meshLambertMaterial map={grassTexture} />
    </mesh>
  );
}

// Cave entrance
export function CaveEntrance({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Cave opening */}
      <mesh position={[0, 1, -0.5]}>
        <sphereGeometry args={[2, 8, 8]} />
        <meshLambertMaterial color="#2F4F4F" />
      </mesh>
      
      {/* Cave entrance (dark interior) */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1.8, 8, 8]} />
        <meshLambertMaterial color="#000000" />
      </mesh>
      
      {/* Rocks around entrance */}
      <Rock position={[-2, 0, 1]} size={[1, 1.5, 1]} />
      <Rock position={[2, 0, 0.5]} size={[1.2, 1, 1.2]} />
      <Rock position={[0, 0, 2]} size={[0.8, 1, 0.8]} />
    </group>
  );
}