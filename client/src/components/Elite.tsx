import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';
import { useElites } from '../lib/stores/useElites';
import { usePlayer } from '../lib/stores/usePlayer';
import { useBattle } from '../lib/stores/useBattle';
import * as THREE from 'three';

interface EliteProps {
  eliteData: {
    id: string;
    name: string;
    type: string;
    level: number;
    isWild: boolean;
    color: string;
    position: [number, number, number];
  };
}

function Elite({ eliteData }: EliteProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState(1);
  const { position: playerPos } = usePlayer();
  const { startBattle } = useBattle();
  
  const [eliteRef] = useBox(() => ({
    args: [1, 1, 1],
    position: eliteData.position,
    type: 'Static'
  }));

  // Random movement for wild elites
  useFrame((state, delta) => {
    if (eliteData.isWild && meshRef.current) {
      // Simple back and forth movement
      meshRef.current.position.x += direction * delta * 0.5;
      
      if (Math.abs(meshRef.current.position.x - eliteData.position[0]) > 3) {
        setDirection(direction * -1);
      }
    }
  });

  // Check distance to player for interaction
  useEffect(() => {
    const distance = Math.sqrt(
      Math.pow(playerPos[0] - eliteData.position[0], 2) +
      Math.pow(playerPos[2] - eliteData.position[2], 2)
    );
    
    setHovered(distance < 3);
  }, [playerPos, eliteData.position]);

  const handleClick = () => {
    if (hovered && eliteData.isWild) {
      startBattle(eliteData);
    }
  };

  return (
    <group position={eliteData.position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial 
          color={hovered ? '#FFD700' : eliteData.color}
          transparent
          opacity={eliteData.isWild ? 0.8 : 1.0}
        />
      </mesh>
      
      {hovered && (
        <Text
          position={[0, 2, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {eliteData.name} (Lv.{eliteData.level})
          {eliteData.isWild && '\nPress E to battle'}
        </Text>
      )}
    </group>
  );
}

export default Elite;
