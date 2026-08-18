import { useRef, Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import GradientBlinds from "./GradientBlinds";

export const scrollState = { progress: 0 };

const MODEL_URL = "/the_creation_of_adam.glb";

const AdamModel = ({ rig }) => {
  const { scene } = useGLTF(MODEL_URL);
  useLayoutEffect(() => {
    scene.updateMatrixWorld(true);
    
    // Apply obsidian/rough matte texture
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.map = null; // Remove existing image texture
        child.material.color = new THREE.Color("#111114"); // Dark obsidian color
        child.material.roughness = 0.85; // Rough matte finish
        child.material.metalness = 0.15; // Slight sheen for depth
        child.material.needsUpdate = true;
      }
    });

    const handRight = scene.getObjectByName("export_0");
    const handLeft = scene.getObjectByName("Other_hand_1");
    if (handRight && handLeft) {
      const parent = handRight.parent;
      const centerOf = (obj) => parent.worldToLocal(new THREE.Box3().setFromObject(obj).getCenter(new THREE.Vector3()));
      const sep = centerOf(handLeft).sub(centerOf(handRight));
      const bR = handRight.position.clone();
      const bL = handLeft.position.clone();
      // ==========================================
      // TUNE INDIVIDUAL HAND POSITIONS & 2D ANGLES
      // ==========================================
      const leftHeight = -0.50;  // Move left hand up/down
      const rightHeight = 0.50;  // Move right hand up/down
      
      const leftShift = 0;    // Positive = push left hand further LEFT (see more wrist)
      const rightShift = 0;    // Positive = push right hand further RIGHT
      
      const leftAngle = 5;       // Tilt left hand (degrees)
      const rightAngle = 6;      // Tilt right hand (degrees)
      // ==========================================

      bL.y += leftHeight;
      bR.y += rightHeight;
      
      bL.z += leftShift;
      bR.z -= rightShift;
      
      handLeft.rotation.x += (leftAngle * Math.PI) / 180;
      handRight.rotation.x += (rightAngle * Math.PI) / 180;
      
      rig.current = { handRight, handLeft, baseR: bR, baseL: bL, sep };
    }
  }, [scene, rig]);

  // ==========================================
  // TUNE CAMERA GAP ALIGNMENT & SCENE ROTATION
  // ==========================================
  // If the camera hits the fingers instead of flying through the gap, 
  // adjust these to push the entire model so the gap aligns with the dead-center crosshair!
  const gapOffsetX = 0.3; // Push model left/right
  const gapOffsetY = 0.0; // Push model up/down
  
  // Rotate the ENTIRE scene diagonally (like a steering wheel)
  const sceneTiltDegrees = -5; // Negative = Right hand Bottom-Right, Left hand Top-Left
  // ==========================================

  return (
    <group position={[gapOffsetX, gapOffsetY, 0]} rotation={[0, 0, (sceneTiltDegrees * Math.PI) / 180]}>
      <Center>
        <group rotation={[0.45, Math.PI / 2, 0]} scale={8.5}>
          <primitive object={scene} />
        </group>
      </Center>
    </group>
  );
};

const Artifact = () => {
  const group = useRef();
  const glow = useRef();
  const rig = useRef(null);
  // Internal smoothed progress — bridges Lenis updates to 60fps render
  const smoothP = useRef(0);

  useFrame((state) => {
    const rawP = scrollState.progress;
    const t = state.clock.elapsedTime;

    // Smooth the scroll progress at render-rate for buttery frames
    // 0.25 = tight enough to feel simultaneous, soft enough to kill micro-jitter
    smoothP.current += (rawP - smoothP.current) * 0.25;
    const p = smoothP.current;

    // ── HANDS: close FAST in the first ~65% of scroll ──
    if (rig.current) {
      const { handRight, handLeft, baseR, baseL, sep } = rig.current;
      // Hands fully close by p ≈ 0.65 — remapped so you SEE the closing motion
      const handP = Math.min(p / 0.65, 1);
      const easedHand = handP * handP * (3 - 2 * handP); // smoothstep
      const spread = 0.45 * (1 - easedHand);
      handRight.position.copy(baseR).addScaledVector(sep, -spread * 0.5);
      handLeft.position.copy(baseL).addScaledVector(sep, spread * 0.5);

      // Vertical swoop — hands converge diagonally
      const verticalSwoop = 0.3;
      handLeft.position.y -= spread * verticalSwoop;
      handRight.position.y += spread * verticalSwoop;
    }

    // ── CAMERA: zooms simultaneously, full range ──
    const easedCam = p * p * (3 - 2 * p); // smoothstep over full 0→1
    const cameraStart = 7.5;
    const cameraEnd = -1.5;
    state.camera.position.z = cameraStart + (cameraEnd - cameraStart) * easedCam;
    state.camera.position.y = 0;
    state.camera.lookAt(0, 0, -20);

    // Subtle mouse parallax
    if (group.current) {
      group.current.rotation.y += (state.mouse.x * 0.04 - group.current.rotation.y) * 0.1;
      group.current.rotation.x += (state.mouse.y * -0.04 - group.current.rotation.x) * 0.1;
    }

    if (glow.current) glow.current.intensity = 30 + Math.sin(t * 2) * 8 + p * 40;
  });

  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0} floatIntensity={0.08}>
        <AdamModel rig={rig} />
      </Float>
      <pointLight ref={glow} position={[0, 0.4, 1.4]} intensity={30} distance={9} color="#ff5a1f" />
      <Sparkles count={130} scale={[10, 7, 6]} size={2.2} speed={0.32} color="#ff9d6b" opacity={0.55} />
    </group>
  );
};

const HeroScene = () => (
  <div className="hero-canvas" data-testid="hero-3d-canvas">
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <GradientBlinds
        gradientColors={['#0b0c10', '#ff6333', '#0b0c10']}
        angle={20}
        noise={0.5}
        blindCount={16}
        blindMinWidth={60}
        spotlightRadius={0.5}
        spotlightSoftness={1}
        spotlightOpacity={1}
        mouseDampening={0.15}
        distortAmount={0}
        shineDirection="left"
        mixBlendMode="lighten"
      />
    </div>
    <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} camera={{ position: [0, 0, 7.5], fov: 40 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
      <fog attach="fog" args={['#09090b', 5, 12]} />
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
