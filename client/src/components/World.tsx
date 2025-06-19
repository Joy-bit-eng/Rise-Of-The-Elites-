import React from 'react';
import { useBox } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';
import { useWorld } from '../lib/stores/useWorld';
import StartingArea from './Zones/StartingArea';
import ForestZone from './Zones/ForestZone';
import CaveZone from './Zones/CaveZone';
import RiftZone from './Zones/RiftZone';
import JungleZone from './Zones/JungleZone';
import VillageZone from './Zones/VillageZone';
import CityZone from './Zones/CityZone';
import ValleyZone from './Zones/ValleyZone';
import MountainZone from './Zones/MountainZone';
import MetropolisZone from './Zones/MetropolisZone';
import DesertZone from './Zones/DesertZone';
import CoastalZone from './Zones/CoastalZone';
import CapitalZone from './Zones/CapitalZone';
import IndustrialZone from './Zones/IndustrialZone';
import TradingZone from './Zones/TradingZone';
import AcademicZone from './Zones/AcademicZone';

function World() {
  const { currentZone } = useWorld();

  // Ground plane
  const [groundRef] = useBox(() => ({
    args: [100, 0.1, 100],
    position: [0, -0.5, 0],
    type: 'Static'
  }));

  return (
    <>
      {/* Ground */}
      <mesh ref={groundRef} receiveShadow>
        <boxGeometry args={[100, 0.1, 100]} />
        <meshLambertMaterial color="#90EE90" />
      </mesh>

      {/* Zone-specific content */}
      {currentZone === 'starting' && <StartingArea />}
      {currentZone === 'forest' && <ForestZone />}
      {currentZone === 'cave' && <CaveZone />}
      {currentZone === 'rift' && <RiftZone />}
      {currentZone === 'jungle' && <JungleZone />}
      {currentZone === 'village' && <VillageZone />}
      {currentZone === 'city' && <CityZone />}
      {currentZone === 'valley' && <ValleyZone />}
      {currentZone === 'mountain' && <MountainZone />}
      {currentZone === 'metropolis' && <MetropolisZone />}
      {currentZone === 'desert' && <DesertZone />}
      {currentZone === 'coastal' && <CoastalZone />}
      {currentZone === 'capital' && <CapitalZone />}
      {currentZone === 'industrial' && <IndustrialZone />}
      {currentZone === 'trading' && <TradingZone />}
      {currentZone === 'academic' && <AcademicZone />}
    </>
  );
}

export default World;
