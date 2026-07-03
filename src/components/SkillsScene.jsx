import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
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

function Ball({ imgUrl, position, scale = 1.8 }) {
  const decal = useTexture(imgUrl);

  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.2} position={position}>
      <mesh scale={scale}>
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
    </Float>
  );
}

function SkillsScene({ isMobile }) {
  const cols = isMobile ? 5 : 7;
  const spacing = isMobile ? 2.6 : 2.0;
  const startX = -(cols - 1) * spacing / 2;
  const scaleVal = isMobile ? 1.4 : 1.8;

  const rows = useMemo(() => {
    const r = [];
    techs.forEach((t, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      r.push({
        ...t,
        position: [startX + col * spacing, row * -spacing + 2, 0],
        key: t.name,
      });
    });
    return r;
  }, []);

  const camZ = isMobile ? 11 : 8;

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, camZ], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <Suspense fallback={null}>
        {rows.map((r) => (
          <Ball key={r.key} imgUrl={r.icon} position={r.position} scale={scaleVal} />
        ))}
        <Preload all />
      </Suspense>
    </Canvas>
  );
}

export default SkillsScene;
