import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Preload } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, color, shape, speed }) => {
  const ref = useRef();
  const geometry = useMemo(() => {
    switch (shape) {
      case 'octahedron': return new THREE.OctahedronGeometry(0.3, 0);
      case 'tetrahedron': return new THREE.TetrahedronGeometry(0.35, 0);
      case 'torus': return new THREE.TorusGeometry(0.25, 0.1, 8, 12);
      case 'icosahedron': return new THREE.IcosahedronGeometry(0.3, 0);
      default: return new THREE.BoxGeometry(0.25, 0.25, 0.25);
    }
  }, [shape]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.getElapsedTime() * speed * 0.3;
      ref.current.rotation.y = clock.getElapsedTime() * speed * 0.5;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={ref} position={position} geometry={geometry}>
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.6}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

const Particles = ({ count = 80 }) => {
  const ref = useRef();
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#00d2ff'),
      new THREE.Color('#7a00ff'),
      new THREE.Color('#00ff88'),
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const SceneContent = () => (
  <group>
    <ambientLight intensity={0.3} />
    <directionalLight position={[2, 3, 4]} intensity={0.5} />
    <pointLight position={[-3, 1, 2]} intensity={0.3} color="#7a00ff" />
    <pointLight position={[3, -1, -2]} intensity={0.3} color="#00d2ff" />
    <Particles count={100} />
    <FloatingShape position={[-4, 2, -2]} color="#7a00ff" shape="octahedron" speed={0.8} />
    <FloatingShape position={[4, -1.5, -1]} color="#00d2ff" shape="tetrahedron" speed={1.2} />
    <FloatingShape position={[-3, -2, -3]} color="#00ff88" shape="torus" speed={0.6} />
    <FloatingShape position={[3.5, 1.5, -2.5]} color="#7a00ff" shape="icosahedron" speed={0.9} />
    <FloatingShape position={[0, 3, -4]} color="#00d2ff" shape="box" speed={0.7} />
  </group>
);

const SkillsScene = () => (
  <div style={{
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    opacity: 0.5,
  }}>
    <Canvas
      dpr={[1, 1.5]}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
      <Preload all />
    </Canvas>
  </div>
);

export default SkillsScene;
