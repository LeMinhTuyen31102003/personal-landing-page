"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type SceneObject = THREE.Object3D & {
  geometry?: THREE.BufferGeometry;
  material?: THREE.Material | THREE.Material[];
};

type FloatingObject = {
  object: THREE.Object3D;
  baseY: number;
  phase: number;
  speed: number;
  distance: number;
};

function createPanel(
  width: number,
  height: number,
  color: number,
  accent: number
) {
  const panel = new THREE.Group();
  const panelGeometry = new THREE.BoxGeometry(width, height, 0.06);
  const panelMaterial = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.58,
    metalness: 0.04,
    transparent: true,
    opacity: 0.58,
  });

  const body = new THREE.Mesh(panelGeometry, panelMaterial);
  panel.add(body);

  const edgeGeometry = new THREE.EdgesGeometry(panelGeometry);
  const edgeMaterial = new THREE.LineBasicMaterial({
    color: accent,
    transparent: true,
    opacity: 0.28,
  });
  panel.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));

  const barMaterial = new THREE.MeshStandardMaterial({
    color: accent,
    roughness: 0.46,
    transparent: true,
    opacity: 0.72,
  });
  const bar = new THREE.Mesh(new THREE.BoxGeometry(width * 0.7, 0.08, 0.08), barMaterial);
  bar.position.set(-width * 0.08, height * 0.34, 0.07);
  panel.add(bar);

  const rowMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.62,
    transparent: true,
    opacity: 0.82,
  });

  for (let index = 0; index < 3; index += 1) {
    const row = new THREE.Mesh(new THREE.BoxGeometry(width * 0.46, 0.045, 0.05), rowMaterial);
    row.position.set(-width * 0.14, height * (0.1 - index * 0.17), 0.075);
    panel.add(row);
  }

  return panel;
}

export default function SoftWebScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.2, 7.6);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    const keyLight = new THREE.DirectionalLight(0xb7e7ff, 2.4);
    keyLight.position.set(4, 5, 6);
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-4, -2, 5);
    scene.add(ambientLight, keyLight, fillLight);

    const stage = new THREE.Group();
    stage.position.set(1.05, 0.08, 0);
    scene.add(stage);

    const floatingObjects: FloatingObject[] = [];

    const mainPanel = createPanel(2.3, 1.45, 0xffffff, 0x35b8d4);
    mainPanel.position.set(0.18, 0.42, -0.2);
    mainPanel.rotation.set(-0.12, -0.34, 0.06);
    stage.add(mainPanel);
    floatingObjects.push({ object: mainPanel, baseY: mainPanel.position.y, phase: 0, speed: 0.55, distance: 0.1 });

    const sidePanel = createPanel(1.32, 1.04, 0xe8f9ff, 0x4f93ff);
    sidePanel.position.set(-1.25, -0.46, 0.42);
    sidePanel.rotation.set(0.08, 0.42, -0.07);
    stage.add(sidePanel);
    floatingObjects.push({ object: sidePanel, baseY: sidePanel.position.y, phase: 1.7, speed: 0.5, distance: 0.08 });

    const microPanel = createPanel(1.05, 0.72, 0xf8fdff, 0x7dd3fc);
    microPanel.position.set(1.55, -0.7, 0.18);
    microPanel.rotation.set(0.04, -0.42, 0.12);
    stage.add(microPanel);
    floatingObjects.push({ object: microPanel, baseY: microPanel.position.y, phase: 2.6, speed: 0.48, distance: 0.07 });

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.36,
      metalness: 0.16,
      transparent: true,
      opacity: 0.44,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.018, 18, 120), ringMaterial);
    ring.position.set(1.16, 0.72, -0.68);
    ring.rotation.set(1.1, 0.1, 0.2);
    stage.add(ring);
    floatingObjects.push({ object: ring, baseY: ring.position.y, phase: 0.8, speed: 0.36, distance: 0.08 });

    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.5,
      transparent: true,
      opacity: 0.74,
    });

    const nodePositions = [
      [-1.72, 0.48, 0.6],
      [-0.72, 1.12, -0.36],
      [1.88, 0.08, -0.2],
      [0.7, -1.2, 0.34],
      [-1.58, -1.08, -0.18],
    ];

    nodePositions.forEach(([x, y, z], index) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.055, 24, 16), nodeMaterial);
      node.position.set(x, y, z);
      stage.add(node);
      floatingObjects.push({
        object: node,
        baseY: node.position.y,
        phase: index * 0.64,
        speed: 0.58,
        distance: 0.05,
      });
    });

    const connectionPoints = new Float32Array([
      -1.72, 0.48, 0.6, -0.72, 1.12, -0.36,
      -0.72, 1.12, -0.36, 1.88, 0.08, -0.2,
      1.88, 0.08, -0.2, 0.7, -1.2, 0.34,
      0.7, -1.2, 0.34, -1.58, -1.08, -0.18,
      -1.58, -1.08, -0.18, -1.72, 0.48, 0.6,
    ]);
    const connectionGeometry = new THREE.BufferGeometry();
    connectionGeometry.setAttribute("position", new THREE.BufferAttribute(connectionPoints, 3));
    const connectionMaterial = new THREE.LineBasicMaterial({
      color: 0x87ceeb,
      transparent: true,
      opacity: 0.2,
    });
    stage.add(new THREE.LineSegments(connectionGeometry, connectionMaterial));

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let frameId = 0;

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);

      camera.aspect = width / height;
      camera.position.z = width < 768 ? 8.9 : 7.6;
      stage.position.x = width < 768 ? 0.08 : 1.05;
      stage.position.y = width < 768 ? -0.18 : 0.08;
      stage.scale.setScalar(width < 768 ? 0.72 : 1);
      camera.updateProjectionMatrix();
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const render = () => {
      const elapsed = clock.getElapsedTime();

      stage.rotation.y = THREE.MathUtils.lerp(stage.rotation.y, pointerRef.current.x * 0.1, 0.04);
      stage.rotation.x = THREE.MathUtils.lerp(stage.rotation.x, -pointerRef.current.y * 0.04, 0.04);

      floatingObjects.forEach((item, index) => {
        item.object.position.y =
          item.baseY + Math.sin(elapsed * item.speed + item.phase) * item.distance;
        item.object.rotation.z += index % 2 === 0 ? 0.0008 : -0.0007;
      });

      ring.rotation.z += 0.003;
      ring.rotation.x += 0.001;
      renderer.render(scene, camera);
    };

    const animate = () => {
      render();
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    if (reducedMotion) {
      render();
    } else {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(frameId);

      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();

      scene.traverse((object) => {
        const sceneObject = object as SceneObject;
        if (sceneObject.geometry) {
          geometries.add(sceneObject.geometry);
        }

        if (Array.isArray(sceneObject.material)) {
          sceneObject.material.forEach((material) => materials.add(material));
        } else if (sceneObject.material) {
          materials.add(sceneObject.material);
        }
      });

      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="soft-3d-scene" aria-hidden="true" />;
}
