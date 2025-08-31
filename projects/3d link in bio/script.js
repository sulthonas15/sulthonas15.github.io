// --- THREE.JS 3D BACKGROUND SCRIPT ---

// 1. Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true // Make canvas transparent to show body background
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(15);

// 2. Create the 3D Objects

// The main rotating shape (TorusKnot for something more complex)
const geometry = new THREE.TorusKnotGeometry( 5, 1.5, 100, 16 );
const material = new THREE.MeshBasicMaterial({
    color: 0xec4899, // A nice pink color
    wireframe: true
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Background stars
const starVertices = [];
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}
const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const starMaterial = new THREE.PointsMaterial({ 
    color: 0x555555, // Dim gray stars
    size: 0.7 
});
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// 3. Mouse Interaction
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// 4. Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Animate objects
    torusKnot.rotation.x += 0.001;
    torusKnot.rotation.y += 0.002;
    stars.rotation.y += 0.0001;

    // Move camera based on mouse position for a cool parallax effect
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// 5. Handle Window Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start the animation
animate();
