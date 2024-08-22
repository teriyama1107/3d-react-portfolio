import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("./desktop_pc/heri/scene.gltf");

  

  return (
    <mesh>
      {/* intensityは光の強さを制御 primitiveコンポーネントはcomputerをsceneに追加しています。*/}
      <hemisphereLight intensity={3} groundColor="black" /> 
      <pointLight intensity={4}/>
      <spotLight 
        position={[-20, 30, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive 
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [-1, -2.25, -0.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }

  }, []);

  return (
    <Canvas
      frameloop = "demand" 
      shadows
      camera={{ position: [20, 3, 5], fov: 25 } }
      gl={{ preserveDrawingBuffer: true }}
      >
    {/* カメラの設定 positionはx,y,zでfovは広さ
      preserveDrawingBuffer を true に設定すると、描画バッファがクリアされずに次のフレームに渡されます。これにより、スクリーンショットの撮影や他のフレーム間での描画バッファの利用が可能になります。
    */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2 }
          minPolarAngle={Math.PI / 2 }
        />
      <Computers isMobile={isMobile} />
      </Suspense>
      {/*
      enableZoomはzoom機能を無効にする。マウスホイールやタッチ操作ができなくなる。
      PolarAngle は、カメラがオービットする際の垂直方向の角度です。
      Math.PI / 2 は90度を表し、カメラの垂直方向の角度を固定します。
      maxPolarAngle と minPolarAngle の両方を Math.PI / 2 に設定することで、カメラが真横の位置（水平）から上下に回転しないように制限しています。これにより、ユーザーはカメラを水平面内でのみ回転させることができます。
    */}
    <Preload all/>
    </Canvas>
  )
}

export default ComputersCanvas;
