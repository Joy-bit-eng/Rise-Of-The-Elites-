import React, { Suspense } from 'react';
import { Physics } from '@react-three/cannon';
import World from './World';
import Player from './Player';

function Game() {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <Physics gravity={[0, -9.8, 0]}>
        <World />
        <Player />
      </Physics>
    </Suspense>
  );
}

export default Game;
