import React, { useMemo } from 'react';
import { useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';
import Elite from '../Elite';
import { useElites } from '../../lib/stores/useElites';

function StartingArea() {
  const { getWildElites } = useElites();
  
  // Generate some structures for the starting area
  const structures = useMemo(() => [
    { position: [10, 1, 10], size: [2, 2, 2], color: '#8B4513' }, // Building
    { position: [-10, 1, -10], size: [3, 1, 3], color: '#654321' }, // Platform
    { position: [0, 1, 15], size: [1, 3, 1], color: '#228B22' }, // Tree
  ], []);

  const wildElites = useMemo(() => getWildElites('starting'), [getWildElites]);

  return (
    <>
      {/* Welcome Sign */}
      <Text
        position={[0, 3, -5]}
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Welcome to Rise of the Elites!
      </Text>

      {/* Structures */}
      {structures.map((structure, index) => (
        <Structure key={index} {...structure} />
      ))}

      {/* Wild Elites */}
      {wildElites.map((elite) => (
        <Elite key={elite.id} eliteData={elite} />
      ))}

      {/* Zone portals - First ring (basic zones) */}
      <Portal position={[-30, 1, 0]} targetZone="forest" label="Forest" color="#228B22" />
      <Portal position={[30, 1, 0]} targetZone="village" label="Village" color="#DEB887" />
      <Portal position={[0, 1, -30]} targetZone="jungle" label="Jungle" color="#006400" />
      <Portal position={[0, 1, 30]} targetZone="mountain" label="Mountains" color="#696969" />
      <Portal position={[-21, 1, -21]} targetZone="valley" label="Valley" color="#9ACD32" />
      <Portal position={[21, 1, -21]} targetZone="desert" label="Desert" color="#F4A460" />
      <Portal position={[-21, 1, 21]} targetZone="cave" label="Caves" color="#8B4513" />
      <Portal position={[21, 1, 21]} targetZone="rift" label="Rift" color="#8A2BE2" />
      
      {/* Second ring (cities) */}
      <Portal position={[-40, 1, 0]} targetZone="city" label="City" color="#708090" />
      <Portal position={[40, 1, 0]} targetZone="metropolis" label="Metropolis" color="#4682B4" />
      <Portal position={[0, 1, -40]} targetZone="coastal" label="Coastal City" color="#20B2AA" />
      <Portal position={[0, 1, 40]} targetZone="capital" label="Capital" color="#FFD700" />
      <Portal position={[-28, 1, -28]} targetZone="industrial" label="Industrial" color="#A0522D" />
      <Portal position={[28, 1, -28]} targetZone="trading" label="Trading Hub" color="#FF8C00" />
      <Portal position={[-28, 1, 28]} targetZone="academic" label="University" color="#9370DB" />
    </>
  );
}

function Structure({ position, size, color }) {
  const [ref] = useBox(() => ({
    args: size,
    position,
    type: 'Static'
  }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshLambertMaterial color={color} />
    </mesh>
  );
}

function Portal({ position, targetZone, label, color }) {
  const [ref] = useBox(() => ({
    args: [2, 3, 0.5],
    position,
    type: 'Static'
  }));

  return (
    <group position={position}>
      <mesh ref={ref}>
        <boxGeometry args={[2, 3, 0.5]} />
        <meshLambertMaterial color={color} transparent opacity={0.7} />
      </mesh>
      <Text
        position={[0, 4, 0]}
        fontSize={0.5}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

export default StartingArea;
