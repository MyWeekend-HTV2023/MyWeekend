import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function Globe() {
  const globeRef = useRef(null);

  useEffect(() => {
    // Check if the WebGLRenderer is supported in the browser.
    if (!globeRef.current || !THREE.WebGLRenderer) {
      console.error('WebGL and/or globeRef not available.');
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor('#111827');
    globeRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(5, 32, 32);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/land_ocean_ice_cloud_2048.jpg'
    );

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      globe.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();
  }, []);

  return <div ref={globeRef} />;
}

export default Globe;
