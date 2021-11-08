import * as THREE from '../../libs/three126/three.module.js';
import { OrbitControls } from '../../libs/three126/OrbitControls.js';

class App{
	constructor(){
    const container = document.createElement("div");
    document.body.appendChild(container);
    // frustum : field of view of camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    // position : x, y, z
    this.camera.position.set(0, 0, 5);
    // scene
    this.scene = new THREE.Scene();
    // set the scene to the color gray
    this.scene.background = new THREE.Color(0xaaaaaa);
    // create a renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    // set the size of the renderer, to avoid blurring in the retina display
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    // add the renderer to the container
    container.appendChild(this.renderer.domElement);
    // set animation loop to the render function
    this.renderer.setAnimationLoop(this.render.bind(this));
    window.addEventListener("resize", this.resize.bind(this));

    // creating 3D Sphere Object using Geometry and Material
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    this.mesh = new THREE.Mesh(geometry, material);
    // add the sphere to the scene
    this.scene.add(this.mesh);

    // add hemisphere light
	const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.3);
    this.scene.add(hemisphereLight);

    // add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(.2,1,1);
    this.scene.add(directionalLight);

	// add orbit controls
	const controls = new OrbitControls(this.camera, this.renderer.domElement);
  }	
    
    resize(){
		// resizing according to the window size
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
	render( ) {   
		this.mesh.rotateX(.1);
		this.renderer.render( this.scene, this.camera );
    }
}

export { App };