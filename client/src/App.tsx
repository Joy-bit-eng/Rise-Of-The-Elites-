import React from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Game from './components/Game';
import GameUI from './components/GameUI';
import { useGame } from './lib/stores/useGame';
import MainMenu from './components/UI/MainMenu';
import './index.css';

const queryClient = new QueryClient();

// Define control keys for the game
enum Controls {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  jump = 'jump',
  interact = 'interact',
  capture = 'capture',
  menu = 'menu',
  inventory = 'inventory'
}

const keyMap = [
  { name: Controls.forward, keys: ['KeyW', 'ArrowUp'] },
  { name: Controls.backward, keys: ['KeyS', 'ArrowDown'] },
  { name: Controls.left, keys: ['KeyA', 'ArrowLeft'] },
  { name: Controls.right, keys: ['KeyD', 'ArrowRight'] },
  { name: Controls.jump, keys: ['Space'] },
  { name: Controls.interact, keys: ['KeyE'] },
  { name: Controls.capture, keys: ['KeyF'] },
  { name: Controls.menu, keys: ['Escape'] },
  { name: Controls.inventory, keys: ['KeyI'] }
];

function App() {
  const { phase } = useGame();

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        {phase === 'ready' ? (
          <MainMenu />
        ) : (
          <>
            <KeyboardControls map={keyMap}>
              <Canvas
                shadows
                camera={{
                  position: [0, 5, 10],
                  fov: 60,
                  near: 0.1,
                  far: 1000
                }}
                gl={{
                  antialias: true,
                  alpha: false
                }}
              >
                <color attach="background" args={['#87CEEB']} />
                <Game />
              </Canvas>
            </KeyboardControls>
            <GameUI />
          </>
        )}
      </div>
    </QueryClientProvider>
  );
}

export default App;
