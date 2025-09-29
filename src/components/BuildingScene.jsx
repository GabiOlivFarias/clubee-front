import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three'; 

function Model() {
  const { scene } = useGLTF('/models/building.glb');
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      // calcula a caix que envolve o modelo
      const box = new THREE.Box3().setFromObject(modelRef.current);
      // encontra o centro dessa caixa
      const center = box.getCenter(new THREE.Vector3());
      // move o modelo para que seu centro fique na posição (0,0,0) da cena
      modelRef.current.position.sub(center);
      modelRef.current.position.y += 2.0;
    }
  }, [scene]);


  // Animação
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.002;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={1.2} />;
}

// Componente principal que monta a cena 3D
function BuildingScene() {
  return (
    <div className="scene-3d-container">
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <ambientLight intensity={0.5} />
        <pointLight color="#FFC93C" position={[5, 5, 5]} intensity={50} />
        <pointLight color="#3A86FF" position={[-5, -5, -5]} intensity={50} />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}

export default BuildingScene;
