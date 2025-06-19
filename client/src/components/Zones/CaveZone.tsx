import React, { useMemo } from 'react';
import { useBox } from '@react-three/cannon';
import Elite from '../Elite';
import { useElites } from '../../lib/stores/useElites';

function CaveZone() {
  const { getWildElites } = useElites();
  
  // Cave structures
  const rocks = useMemo(() => {
    const rockPositions = [];
    for (let i = 0; i < 15; i++) {
      rockPositions.push({
        position: [
          Math.random() * 30 - 15,
          Math.random() * 2 + 1,
          Math.random() * 30 - 15
        ],
        size: [
          Math.random() * 2 + 1,
          Math.random() * 3 + 1,
          Math.random() * 2 + 1
        ]
      });
    }
    return rockPositions;
  }, []);

  const wildElites = useMemo(() => getWildElites('cave'), [getWildElites]);

  return (
    <>
      {/* Cave floor - darker, rocky */}
      <mesh position={[0, -0.45, 0]} receiveShadow>
        <boxGeometry args={[100, 0.1, 100]} />
        <meshLambertMaterial color="#2F2F2F" />
      </mesh>

      {/* Dim lighting for cave atmosphere */}
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFD700" />
      <pointLight position={[10, 3, 10]} intensity={0.3} color="#FFD700" />
      <pointLight position={[-10, 3, -10]} intensity={0.3} color="#FFD700" />

      {/* Rock formations */}
      {rocks.map((rock, index) => (
        <Rock key={index} position={rock.position} size={rock.size} />
      ))}

      {/* Wild Elites - more rock/ground types */}
      {wildElites.map((elite) => (
        <Elite key={elite.id} eliteData={elite} />
      ))}

      {/* Return portal */}
      <Portal position={[0, 1, 25]} targetZone="starting" label="Return to Hub" />
    </>
  );
}

function Rock({ position, size }) {
  const [ref] = useBox(() => ({
    args: size,
    position,
    type: 'Static'
  }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshLambertMaterial color="#696969" />
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

export default CaveZone;
