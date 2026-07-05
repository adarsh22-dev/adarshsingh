import React, { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Decal, Float, useTexture, Preload } from '@react-three/drei';

const techs = [
  { name: 'HTML 5', icon: '/tech/html.png' },
  { name: 'CSS 3', icon: '/tech/css.png' },
  { name: 'JavaScript', icon: '/tech/javascript.png' },
  { name: 'TypeScript', icon: '/tech/typescript.png' },
  { name: 'React JS', icon: '/tech/reactjs.png' },
  { name: 'Redux Toolkit', icon: '/tech/redux.png' },
  { name: 'Tailwind CSS', icon: '/tech/tailwind.png' },
  { name: 'Node JS', icon: '/tech/nodejs.png' },
  { name: 'MongoDB', icon: '/tech/mongodb.png' },
  { name: 'Three JS', icon: '/tech/threejs.svg' },
  { name: 'Git', icon: '/tech/git.png' },
  { name: 'Figma', icon: '/tech/figma.png' },
  { name: 'Docker', icon: '/tech/docker.png' },
  { name: 'Python', icon: '/tech/python.svg' },
  { name: 'C', icon: '/tech/c.svg' },
  { name: 'C++', icon: '/tech/cpp.svg' },
  { name: '.NET', icon: '/tech/dotnet.svg' },
  { name: 'WordPress', icon: '/tech/wordpress.svg' },
  { name: 'Shopify', icon: '/tech/shopify.svg' },
  { name: 'Magento', icon: '/tech/magento.svg' },
  { name: 'CRM', icon: '/tech/crm.svg' },
];

function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function Ball({ imgUrl, position, scale, floatSpeed, floatRot, floatInt }) {
  const decal = useTexture(imgUrl);
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * floatSpeed + position[0]) * 0.3;
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * floatRot * 0.5 + position[0]) * 0.2;
      meshRef.current.rotation.y += 0.005 * floatRot;
    }
  });

  return (
    <group position={[position[0], position[1], position[2]]}>
      <mesh ref={meshRef} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#fff8eb" flatShading />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </group>
  );
}

function SkillsScene({ isMobile }) {
  const cols = isMobile ? 5 : 7;
  const spacing = isMobile ? 1.3 : 2.2;
  const startX = -(cols - 1) * spacing / 2;
  const scaleVal = isMobile ? 0.8 : 1.8;
  const maxRow = Math.ceil(techs.length / cols) - 1;
  const centerY = isMobile ? maxRow * spacing / 2 : maxRow * -spacing / 2 + 1.2;

  const rows = useMemo(() => {
    const r = [];
    techs.forEach((t, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const seed = i * 137;
      const xOff = (seededRandom(seed) - 0.5) * 0.2;
      const yOff = (seededRandom(seed + 1) - 0.5) * 0.2;
      r.push({
        ...t,
        position: [startX + col * spacing + xOff, isMobile ? centerY - row * spacing + yOff : row * -spacing + centerY + yOff, (seededRandom(seed + 2) - 0.5) * 0.4],
        key: t.name,
        floatSpeed: 0.6 + seededRandom(seed + 3) * 0.8,
        floatRot: 0.5 + seededRandom(seed + 4) * 0.8,
        floatInt: 0.3 + seededRandom(seed + 5) * 0.4,
      });
    });
    return r;
  }, []);

  const camZ = isMobile ? 9 : 8;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, camZ], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Suspense fallback={null}>
        {rows.map((r) => (
          <Ball
            key={r.key}
            imgUrl={r.icon}
            position={r.position}
            scale={scaleVal}
            floatSpeed={r.floatSpeed}
            floatRot={r.floatRot}
            floatInt={r.floatInt}
          />
        ))}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

export default SkillsScene;
