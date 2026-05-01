import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Float, Text, Points, PointMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const Nebula: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.001;
      mesh.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={mesh} scale={100}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial 
        side={THREE.BackSide}
        transparent
        opacity={0.1}
      >
        <primitive attach="map" object={new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmo.jpg')} />
      </meshBasicMaterial>
    </mesh>
  );
};

const CharacterNode: React.FC<{ 
  position: [number, number, number], 
  name: string, 
  color: string,
  onSelect: (name: string) => void 
}> = ({ position, name, color, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group position={position} onClick={() => onSelect(name)}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh 
          ref={meshRef}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <icosahedronGeometry args={[0.4, 2]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={4} 
            roughness={0}
            metalness={1}
          />
        </mesh>
        
        {/* Outer Glow Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.65, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>

        <Text
          position={[0, 0.9, 0]}
          fontSize={0.25}
          color="white"
          font="https://fonts.gstatic.com/s/cinzel/v11/8vXp7wwm_m0L40Vbg7mP.woff"
          anchorX="center"
          anchorY="middle"
        >
          {name.toUpperCase()}
          <meshBasicMaterial color="white" />
        </Text>
      </Float>
      
      <Sparkles 
        count={20} 
        scale={1.5} 
        size={2} 
        speed={0.4} 
        color={color} 
      />
    </group>
  );
};

const GalaxyScene: React.FC<{ onCharacterSelect: (name: string) => void }> = ({ onCharacterSelect }) => {
  const characters = [
    { name: "Harry Potter", pos: [3, 2, 0], color: "#ff4d4d" },
    { name: "Hermione Granger", pos: [4, 3, 1], color: "#ff4d4d" },
    { name: "Ron Weasley", pos: [2, 1, -1], color: "#ff4d4d" },
    { name: "Draco Malfoy", pos: [-4, 2, 0], color: "#4dff88" },
    { name: "Severus Snape", pos: [-2, -2, 2], color: "#4dff88" },
    { name: "Albus Dumbledore", pos: [0, 6, 0], color: "#4d94ff" },
    { name: "Luna Lovegood", pos: [5, 5, -2], color: "#4d94ff" },
    { name: "Cedric Diggory", pos: [-2, -4, -3], color: "#ffdb4d" },
    { name: "Voldemort", pos: [-6, 0, -2], color: "#ffffff" },
  ];

  return (
    <div className="w-full h-screen bg-[#020204]">
      <Canvas 
        camera={{ position: [0, 8, 20], fov: 45 }}
        gl={{ antialias: true, stencil: false, depth: true }}
      >
        <color attach="background" args={['#020204']} />
        
        <fog attach="fog" args={['#020204', 10, 50]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />

        <Stars 
          radius={100} 
          depth={50} 
          count={7000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
        
        <Sparkles 
          count={1000} 
          scale={50} 
          size={1.5} 
          speed={0.2} 
          opacity={0.2} 
          color="#d4af37" 
        />

        {characters.map((char, i) => (
          <CharacterNode 
            key={i} 
            position={char.pos as [number, number, number]} 
            name={char.name} 
            color={char.color} 
            onSelect={onCharacterSelect}
          />
        ))}

        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          maxDistance={40}
          minDistance={5}
          makeDefault 
          autoRotate 
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
};

export default GalaxyScene;
