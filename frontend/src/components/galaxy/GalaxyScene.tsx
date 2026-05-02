import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, OrbitControls, Float, Text, Sparkles, Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';



const CharacterNode: React.FC<{ 
  position: [number, number, number], 
  name: string, 
  color: string,
  sentiment: number,
  onSelect: (name: string) => void 
}> = ({ position, name, color, sentiment, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Pulse logic based on sentiment
  const isDark = sentiment < -0.05;
  const pulseSpeed = isDark ? 8 : 2; // Dark magic pulses erratically and fast
  const pulseIntensity = isDark ? 0.15 : 0.05;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      const jitter = isDark ? (Math.random() - 0.5) * 0.08 : 0;
      const s = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * pulseIntensity + jitter;
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
          <icosahedronGeometry args={[0.5, 2]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={1.5} 
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
        
        {/* Outer Glow Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.6, 0.65, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>

        <Text
          position={[0, 1.2, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {name.toUpperCase()}
        </Text>
      </Float>
      
      <Sparkles 
        count={30} 
        scale={2} 
        size={3} 
        speed={0.5} 
        color={color} 
      />
    </group>
  );
};

const Constellations: React.FC<{ charactersData: any[], mappedChars: any[] }> = ({ charactersData, mappedChars }) => {
  const lines: any[] = [];
  
  charactersData.forEach((char) => {
    if (char.similar) {
      char.similar.slice(0, 2).forEach((sim: any) => {
        const target = mappedChars.find(c => c.name === sim.name);
        const source = mappedChars.find(c => c.name === char.name);
        if (target && source) {
          lines.push({ start: source.pos, end: target.pos });
        }
      });
    }
  });

  return (
    <group>
      {lines.map((line, i) => (
        <Line 
          key={i}
          points={[line.start, line.end]}
          color="#d4af37"
          opacity={0.3}
          transparent
          lineWidth={1.5}
          dashed={true}
          dashSize={0.2}
          gapSize={0.2}
          dashScale={1}
        />
      ))}
    </group>
  );
};

const CameraAnimator: React.FC<{ targetPos: [number, number, number] | null }> = ({ targetPos }) => {
  const { camera, controls } = useThree();
  
  useFrame(() => {
    if (targetPos && controls) {
      const targetVec = new THREE.Vector3(...targetPos);
      const camVec = new THREE.Vector3(targetPos[0], targetPos[1] + 2, targetPos[2] + 8);
      
      // Smoothly move the camera and orbit controls target
      (controls as any).target.lerp(targetVec, 0.05);
      camera.position.lerp(camVec, 0.05);
    }
  });
  return null;
};

const GalaxyScene: React.FC<{ charactersData: any[], selectedCharacter: string | null, onCharacterSelect: (name: string) => void }> = ({ charactersData, selectedCharacter, onCharacterSelect }) => {
  
  const mappedCharacters = useMemo(() => {
    return charactersData.map((char: any) => {
      // Magic color assignment based on name
      let color = "#4d94ff"; // default Ravenclaw blue (Luna, Cho)
      const nameLower = char.name.toLowerCase();
      
      const gryffindors = ["harry", "ron", "hermione", "sirius", "hagrid", "mcgonagall", "neville", "ginny", "fred", "george"];
      const slytherins = ["draco", "voldemort", "snape", "bellatrix", "lucius", "umbridge"];
      const hufflepuffs = ["cedric"];
      const specials = ["dumbledore", "dobby", "moody"]; // Golden aura

      if (gryffindors.some(n => nameLower.includes(n))) {
        color = "#ff4d4d"; // Gryffindor red
      } else if (slytherins.some(n => nameLower.includes(n))) {
        color = "#4dff88"; // Slytherin green
      } else if (hufflepuffs.some(n => nameLower.includes(n))) {
        color = "#ffdb4d"; // Hufflepuff yellow
      } else if (specials.some(n => nameLower.includes(n))) {
        color = "#d4af37"; // Golden
      }
      
      return {
        name: char.name,
        pos: [char.x * 0.8, char.y * 0.8, char.z * 0.8], 
        color: color,
        sentiment: char.sentiment_score || 0
      };
    });
  }, [charactersData]);

  const targetCharacter = useMemo((): [number, number, number] | null => {
    if (!selectedCharacter) return null;
    const char = mappedCharacters.find(c => c.name === selectedCharacter);
    return char ? [char.pos[0], char.pos[1], char.pos[2]] : null;
  }, [selectedCharacter, mappedCharacters]);

  return (
    <div className="w-full h-screen bg-[#020204]">
      <Canvas 
        camera={{ position: [0, 8, 20], fov: 45 }}
        gl={{ antialias: true, stencil: false, depth: true }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={['#020204']} />
          
          <fog attach="fog" args={['#020204', 15, 40]} />
          
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />

          <Stars 
            radius={100} 
            depth={50} 
            count={9000} 
            factor={5} 
            saturation={0.5} 
            fade 
            speed={1.5} 
          />
          
          <Sparkles 
            count={1500} 
            scale={60} 
            size={1.5} 
            speed={0.3} 
            opacity={0.3} 
            color="#d4af37" 
          />

          <Constellations charactersData={charactersData} mappedChars={mappedCharacters} />

          {mappedCharacters.map((char, i) => (
            <CharacterNode 
              key={i} 
              position={char.pos as [number, number, number]} 
              name={char.name} 
              color={char.color} 
              sentiment={char.sentiment}
              onSelect={onCharacterSelect}
            />
          ))}

          <OrbitControls 
            enablePan={false} 
            enableZoom={true} 
            maxDistance={40}
            minDistance={3}
            makeDefault 
            autoRotate={!selectedCharacter} 
            autoRotateSpeed={0.5}
          />
          
          <CameraAnimator targetPos={targetCharacter} />
          
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} opacity={1} intensity={0.8} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GalaxyScene;
