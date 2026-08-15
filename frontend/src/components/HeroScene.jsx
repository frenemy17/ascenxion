import { useRef, Suspense, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

export const scrollState = { progress: 0 };

const MODEL_URL = "/the_creation_of_adam.glb";

const AdamModel = ({ rig }) => {
  const { scene } = useGLTF(MODEL_URL);
  useLayoutEffect(() => {
    scene.updateMatrixWorld(true);
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
      
      const leftShift = -0.1;    // Positive = push left hand further LEFT (see more wrist)
      const rightShift = 0.1;    // Positive = push right hand further RIGHT
      
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
  useFrame((state) => {
    const p = scrollState.progress;
    const t = state.clock.elapsedTime;
    if (rig.current) {
      const { handRight, handLeft, baseR, baseL, sep } = rig.current;
      const spread = 0.45 * Math.max(0, 1 - (p / 0.8));
      handRight.position.copy(baseR).addScaledVector(sep, -spread * 0.5);
      handLeft.position.copy(baseL).addScaledVector(sep, spread * 0.5);
      
      // ==========================================
      // TUNE SEPARATION PATH (SWOOP)
      // ==========================================
      // Positive number makes the Right Hand drop DOWN (bottom-right) 
      // and Left Hand fly UP (top-left) when they are far apart.
      const verticalSwoop = 0.3; 
      
      handLeft.position.y -= spread * verticalSwoop;
      handRight.position.y += spread * verticalSwoop;
      // ==========================================
    }
    if (group.current) {
      group.current.rotation.y = state.mouse.x * 0.05;
      group.current.rotation.x = state.mouse.y * -0.05;
    }
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7.5 - p * 8.5, 0.08);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 0, 0.08);
    state.camera.lookAt(0, 0, -20);
        const cameraSpeed = 9; 
    // ==========================================
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 7.5 - p * cameraSpeed, 0.08);
    if (glow.current) glow.current.intensity = 30 + Math.sin(t * 2) * 8 + p * 40;
  });
  return (
    <group ref={group}>
      <Float speed={1.3} rotationIntensity={0} floatIntensity={0.45}>
        <AdamModel rig={rig} />
      </Float>
      <pointLight ref={glow} position={[0, 0.4, 1.4]} intensity={30} distance={9} color="#ff5a1f" />
      <Sparkles count={130} scale={[10, 7, 6]} size={2.2} speed={0.32} color="#ff9d6b" opacity={0.55} />
    </group>
  );
};

const HeroScene = () => (
  <div className="hero-canvas" data-testid="hero-3d-canvas">
    <Canvas camera={{ position: [0, 0, 7.5], fov: 40 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
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
