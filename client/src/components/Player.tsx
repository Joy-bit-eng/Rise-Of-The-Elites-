import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { useSphere } from '@react-three/cannon';
import { usePlayer } from '../lib/stores/usePlayer';
import { useWorld } from '../lib/stores/useWorld';
import * as THREE from 'three';

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

function Player() {
  const { camera } = useThree();
  const [subscribe, get] = useKeyboardControls<Controls>();
  const { position, setPosition, health, level, toggleInventory, toggleElites, toggleQuests } = usePlayer();
  const { checkForElites } = useWorld();
  
  const [playerRef, api] = useSphere(() => ({
    mass: 1,
    args: [0.5],
    position: [0, 2, 0],
    type: 'Dynamic'
  }));

  const velocity = useRef([0, 0, 0]);
  const isOnGround = useRef(false);

  useEffect(() => {
    const unsubscribeVelocity = api.velocity.subscribe((v) => {
      velocity.current = v;
      isOnGround.current = Math.abs(v[1]) < 0.1;
    });

    const unsubscribePosition = api.position.subscribe((p) => {
      setPosition([p[0], p[1], p[2]]);
    });

    return () => {
      unsubscribeVelocity();
      unsubscribePosition();
    };
  }, [api, setPosition]);

  // Subscribe to key presses
  useEffect(() => {
    const unsubscribeJump = subscribe(
      (state) => state.jump,
      (pressed) => {
        if (pressed && isOnGround.current) {
          api.velocity.set(velocity.current[0], 8, velocity.current[2]);
        }
      }
    );

    const unsubscribeInteract = subscribe(
      (state) => state.interact,
      (pressed) => {
        if (pressed) {
          checkForElites(position);
        }
      }
    );

    const unsubscribeInventory = subscribe(
      (state) => state.inventory,
      (pressed) => {
        if (pressed) {
          toggleInventory();
        }
      }
    );

    return () => {
      unsubscribeJump();
      unsubscribeInteract();
      unsubscribeInventory();
    };
  }, [subscribe, api, position, checkForElites, toggleInventory]);

  useFrame((state, delta) => {
    const controls = get();
    
    // Movement
    const moveSpeed = 5;
    let moveX = 0;
    let moveZ = 0;

    if (controls.forward) {
      moveZ -= 1;
      console.log('Moving forward');
    }
    if (controls.backward) {
      moveZ += 1;
      console.log('Moving backward');
    }
    if (controls.left) {
      moveX -= 1;
      console.log('Moving left');
    }
    if (controls.right) {
      moveX += 1;
      console.log('Moving right');
    }

    // Normalize movement
    if (moveX !== 0 || moveZ !== 0) {
      const length = Math.sqrt(moveX * moveX + moveZ * moveZ);
      moveX /= length;
      moveZ /= length;
    }

    api.velocity.set(
      moveX * moveSpeed,
      velocity.current[1],
      moveZ * moveSpeed
    );

    // Camera follow
    if (playerRef.current) {
      const playerPos = playerRef.current.position;
      camera.position.lerp(
        new THREE.Vector3(playerPos.x, playerPos.y + 5, playerPos.z + 8),
        delta * 2
      );
      camera.lookAt(playerPos);
    }
  });

  return (
    <mesh ref={playerRef} castShadow>
      <capsuleGeometry args={[0.5, 1]} />
      <meshLambertMaterial color="#4A90E2" />
    </mesh>
  );
}

export default Player;
