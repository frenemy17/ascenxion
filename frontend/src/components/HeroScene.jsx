import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

export const scrollState = { progress: 0 };

const Artifact = () => {
  const group = useRef();
  const core = useRef();
  useFrame((state) => {
    const p = scrollState.progress;
    const t = state.clock.elapsedTime;
    if (!group.current) return;
    group.current.rotation.y = t * 0.12 + p * Math.PI * 1.6;
    group.current.rotation.x = Math.sin(t * 0.15) * 0.08 + p * 0.35 + state.mouse.y * -0.12;
    group.current.rotation.z = state.mouse.x * 0.08;
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7.5 - p * 3.2, 0.08);
    state.camera.lookAt(0, 0, 0);
    if (core.current) core.current.material.emissiveIntensity = 1.6 + Math.sin(t * 2) * 0.5 + p * 1.2;
  });
  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.9}>
        <mesh>
          <torusKnotGeometry args={[1.5, 0.42, 220, 36]} />
          <meshPhysicalMaterial color="#17171c" metalness={0.92} roughness={0.22} clearcoat={1} clearcoatRoughness={0.3} />
        </mesh>
        <mesh ref={core} scale={0.55}>
          <sphereGeometry args={[1, 48, 48]} />
          <meshStandardMaterial color="#ff6333" emissive="#ff4d1c" emissiveIntensity={1.6} roughness={0.35} />
        </mesh>
      </Float>
      <Sparkles count={130} scale={[10, 7, 6]} size={2.2} speed={0.32} color="#ff9d6b" opacity={0.55} />
    </group>
  );
};

const HeroScene = () => (
  <div className="hero-canvas" data-testid="hero-3d-canvas">
    <Canvas camera={{ position: [0, 0, 7.5], fov: 40 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.18} />
      <spotLight position={[6, 5, 6]} angle={0.5} penumbra={1} intensity={140} color="#ff7a45" />
      <pointLight position={[-7, -3, -4]} intensity={60} color="#ffb58a" />
      <directionalLight position={[0, 2, -6]} intensity={1.1} color="#f5f3ed" />
      <Suspense fallback={null}>
        <Artifact />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroScene;
