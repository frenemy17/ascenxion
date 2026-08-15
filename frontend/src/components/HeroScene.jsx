import { useRef, Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

export const scrollState = { progress: 0 };

const MODEL_URL = "/the_creation_of_adam.glb";

const AdamModel = () => {
  const { scene } = useGLTF(MODEL_URL);
  useLayoutEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.metalness = 0.25;
        child.material.roughness = 0.55;
        child.material.envMapIntensity = 1.1;
      }
    });
  }, [scene]);
  return (
    <Center>
      <group rotation={[0.45, Math.PI / 2, 0]} scale={5.4}>
        <primitive object={scene} />
      </group>
    </Center>
  );
};

const Artifact = () => {
  const group = useRef();
  const glow = useRef();
  useFrame((state) => {
    const p = scrollState.progress;
    const t = state.clock.elapsedTime;
    if (!group.current) return;
    group.current.rotation.y = t * 0.08 + p * Math.PI * 0.75;
    group.current.rotation.x = Math.sin(t * 0.15) * 0.05 + p * 0.18 + state.mouse.y * -0.1;
    group.current.rotation.z = state.mouse.x * 0.06;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7.2 - p * 3.4, 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, p * 0.45, 0.08);
    state.camera.lookAt(0, 0, 0);
    if (glow.current) glow.current.intensity = 30 + Math.sin(t * 2) * 8 + p * 40;
  });
  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.55}>
        <AdamModel />
      </Float>
      <pointLight ref={glow} position={[0, 0.4, 1.4]} intensity={30} distance={9} color="#ff5a1f" />
      <Sparkles count={130} scale={[10, 7, 6]} size={2.2} speed={0.32} color="#ff9d6b" opacity={0.55} />
    </group>
  );
};

const HeroScene = () => (
  <div className="hero-canvas" data-testid="hero-3d-canvas">
    <Canvas camera={{ position: [0, 0, 7.5], fov: 40 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.25} />
      <spotLight position={[6, 5, 6]} angle={0.5} penumbra={1} intensity={140} color="#ff7a45" />
      <pointLight position={[-7, -3, -4]} intensity={60} color="#ffb58a" />
      <directionalLight position={[0, 2, -6]} intensity={1.1} color="#f5f3ed" />
      <Suspense fallback={null}>
        <Artifact />
      </Suspense>
    </Canvas>
  </div>
);

useGLTF.preload(MODEL_URL);

export default HeroScene;
