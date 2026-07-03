import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const Earth = () => {
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const Fallback = () => (
  <div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
    background: 'radial-gradient(circle at center, rgba(122,0,255,0.08), transparent)',
    border: '1px solid rgba(255,255,255,0.06)',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    flexDirection: 'column',
    gap: '0.5rem'
  }}>
    <div style={{ fontSize: '3rem' }}>&#127760;</div>
    <div>3D Earth unavailable</div>
  </div>
);

const EarthCanvas = () => {
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    try {
      const c = document.createElement('canvas');
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
      if (!gl) setWebgl(false);
    } catch {
      setWebgl(false);
    }
  }, []);

  if (!webgl) return <Fallback />;

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      onCreated={(state) => {
        state.gl.renderer?.domElement?.addEventListener('webglcontextlost', () => setWebgl(false));
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
