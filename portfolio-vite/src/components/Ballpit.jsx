import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Ballpit = ({ count = 90 }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Exact custom color palette matching image_4a6bdd.png
  const colors = [
    0x5c3aff, // Vibrant Glossy Purple
    0x401eff, // Deep Toy Purple
    0xf3f4f6, // High-Gloss White
    0xd1d5db, // Polished Light Grey
    0x111827, // Liquid Black / Charcoal
  ];

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 16;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 4. Lighting Upgrade (Crucial for getting those sharp balloon reflections)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Key bright light for the distinct white reflection circle hot-spots
    const specularLight = new THREE.DirectionalLight(0xffffff, 2.5);
    specularLight.position.set(10, 15, 15);
    scene.add(specularLight);

    // Fill light to prevent completely dark shadows on the bottom sides
    const fillLight = new THREE.DirectionalLight(0xbfdbfe, 0.8);
    fillLight.position.set(-10, -10, 5);
    scene.add(fillLight);

    // 5. Glossy Toy Material Formulation
    const geometry = new THREE.SphereGeometry(0.55, 32, 32); // Slightly larger, smoother spheres
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.12,         // Makes reflections look incredibly crisp and clean
      metalness: 0.15,         // Saturates color pigments underneath
      clearcoat: 1.0,          // Adds the secondary wet/glass outer shell layer
      clearcoatRoughness: 0.05 // Keeps the outer gloss shell perfectly flat and shiny
    });

    const mesh = new THREE.InstancedMesh(geometry, material, count);
    scene.add(mesh);

    // 6. Physics Simulation Parameters
    const dummy = new THREE.Object3D();
    const positions = [];
    const velocities = [];
    const ballColors = colors.map(c => new THREE.Color(c));

    let aspect = window.innerWidth / window.innerHeight;
    let maxY = 7.0;
    let maxX = maxY * aspect;

    for (let i = 0; i < count; i++) {
      positions.push(new THREE.Vector3(
        (Math.random() - 0.5) * maxX * 1.8,
        (Math.random() - 0.5) * maxY * 1.8,
        (Math.random() - 0.5) * 2.5
      ));
      
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.01
      ));

      // Distribute colors matching the reference density distribution
      const randomColor = ballColors[Math.floor(Math.random() * ballColors.length)];
      mesh.setColorAt(i, randomColor);
    }
    mesh.instanceColor.needsUpdate = true;

    // 7. Interactive Tracking Settings
    const mouseWorld = new THREE.Vector3(-1000, -1000, 0);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const mouseNDC = new THREE.Vector2(-1, -1);

    const handlePointerMove = (event) => {
      mouseNDC.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouseNDC, camera);
      raycaster.ray.intersectPlane(plane, mouseWorld);
    };

    window.addEventListener('pointermove', handlePointerMove);

    // 8. Continuous Simulation Animation Loop
    let animationFrameId;
    
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      aspect = window.innerWidth / window.innerHeight;
      maxX = 7.0 * aspect;

      for (let i = 0; i < count; i++) {
        const pos = positions[i];
        const vel = velocities[i];

        // Zero-gravity continuous organic drift configuration
        vel.multiplyScalar(0.996); 
        vel.clampLength(0, 0.06);
        pos.add(vel);

        // Interaction processing: Push particles away smoothly upon approach
        const distanceToMouse = pos.distanceTo(mouseWorld);
        if (distanceToMouse < 3.2) {
          const pushDir = new THREE.Vector3().subVectors(pos, mouseWorld).normalize();
          const force = (3.2 - distanceToMouse) * 0.01;
          vel.addScaledVector(pushDir, force);
        }

        // Boundary containment checking loops
        if (Math.abs(pos.x) > maxX) { pos.x = Math.sign(pos.x) * maxX; vel.x *= -0.85; }
        if (Math.abs(pos.y) > maxY) { pos.y = Math.sign(pos.y) * maxY; vel.y *= -0.85; }
        if (Math.abs(pos.z) > 2.5)  { pos.z = Math.sign(pos.z) * 2.5;  vel.z *= -0.85; }

        // Core Elastic Collisions logic calculations
        for (let j = i + 1; j < count; j++) {
          const otherPos = positions[j];
          const otherVel = velocities[j];
          const dist = pos.distanceTo(otherPos);
          const minDist = 1.1; // Balanced offset according to scaled bounds

          if (dist < minDist) {
            const overlap = minDist - dist;
            const normal = new THREE.Vector3().subVectors(otherPos, pos).normalize();

            pos.addScaledVector(normal, -overlap * 0.5);
            otherPos.addScaledVector(normal, overlap * 0.5);

            const relativeVelocity = new THREE.Vector3().subVectors(vel, otherVel);
            const speed = relativeVelocity.dot(normal);

            if (speed > 0) {
              const impulse = normal.multiplyScalar(speed * 0.75);
              vel.sub(impulse);
              otherVel.add(impulse);
            }
          }
        }

        dummy.position.copy(pos);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 10. Memory Cleanups Routine
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      mesh.dispose();
      renderer.dispose();
    };
  }, [count]);

  return (
    <div ref={containerRef} style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};

export default Ballpit;