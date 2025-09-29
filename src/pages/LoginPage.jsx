import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Login from '../components/Login';
import '../App.css';

function BeeModel() {
  const { scene } = useGLTF('/models/duck.glb'); 
  return <primitive object={scene} scale={1.5} />;
}

function LoginPage() {
  return (
    <div className="main-layout-container">
      {/* Lado esquerdo: Abelha 3D e frase */}
      <div className="left-panel">
        <div className="bee-3d-wrapper">
          <Canvas camera={{ position: [0, 2, 8], fov: 25 }}>
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 10, 5]} intensity={2.5} />
            <Suspense fallback={null}>
              <BeeModel />
            </Suspense>
            <OrbitControls autoRotate autoRotateSpeed={0.5} enablePan={false} />
          </Canvas>
        </div>
        <div className="motto-text">
          <h1>Junte-se à Colmeia Clubee!</h1>
          <p>Alunos da Escola Abel, façam parte da nossa comunidade.</p>
        </div>
      </div>
      {/* Lado direito: Formulário de Login */}
      <div className="right-panel">
        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
