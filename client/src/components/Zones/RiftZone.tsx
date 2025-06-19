import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import Elite from '../Elite';
import { useElites } from '../../lib/stores/useElites';
import * as THREE from 'three';

function RiftZone() {
  const { getWildElites } = useElites();
  
  // Floating platforms in the rift
  const platforms = useMemo(() => {
    const platformData = [];
    for (let i = 0; i < 10; i++) {
      platformData.push({
        position: [
          Math.random() * 40 - 20,
          Math.random() * 5 + 2,
          Math.random() * 40 - 20
        ],
        size: [
          Math.random() * 3 + 2,
          0.5,
          Math.random() * 3 + 2
        ]
      });
    }
    return platformData;
  }, []);

  const wildElites = useMemo(() => getWildElites('rift'), [getWildElites]);

  return (
    <>
      {/* Rift sky - purple/dark */}
      <color attach="background" args={['#2E0854']} />
      
      {/* Rift floor - darker, mystical */}
      <mesh position={[0, -0.45, 0]} receiveShadow>
        <boxGeometry args={[100, 0.1, 100]} />
        <meshLambertMaterial color="#4B0082" />
      </mesh>

      {/* Mystical lighting */}
      <pointLight position={[0, 10, 0]} intensity={0.8} color="#8A2BE2" />
      <ambientLight intensity={0.2} color="#4B0082" />

      {/* Floating platforms */}
      {platforms.map((platform, index) => (
        <FloatingPlatform key={index} position={platform.position} size={platform.size} />
      ))}

      {/* Rift crystals */}
      <RiftCrystal position={[5, 2, 5]} />
      <RiftCrystal position={[-8, 3, -3]} />
      <RiftCrystal position={[12, 1, -10]} />

      {/* Wild Elites - shadow/rift variants */}
      {wildElites.map((elite) => (
        <Elite key={elite.id} eliteData={elite} />
      ))}

      {/* Return portal */}
      <Portal position={[0, 1, 25]} targetZone="starting" label="Return to Hub" />
    </>
  );
}

function FloatingPlatform({ position, size }) {
  const [ref] = useBox(() => ({
    args: size,
    position,
    type: 'Static'
  }));

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshLambertMaterial color="#8A2BE2" transparent opacity={0.8} />
    </mesh>
  );
}

function RiftCrystal({ position }) {
  const crystalRef = React.useRef();

  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      crystalRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <mesh ref={crystalRef} position={position} castShadow>
      <octahedronGeometry args={[1, 0]} />
      <meshLambertMaterial color="#FF1493" emissive="#FF1493" emissiveIntensity={0.2} />
    </mesh>
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

export default RiftZone;
