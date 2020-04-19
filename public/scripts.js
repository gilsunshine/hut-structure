

let scene = new THREE.Scene
scene.background = new THREE.Color( 0xffffff);
let camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 100000 );
let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild (renderer.domElement);

window.addEventListener('resize', ()=>{
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
})

camera.position.y = 20000;
// camera.rotation.y = 3.1415;

let controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.dampingFactor = 0.25;
controls.enableZoom = true;

let keyLight = new THREE.DirectionalLight(0xddaaff,.5);
keyLight.position.set(-100,0,100);

let fillLight = new THREE.DirectionalLight(0xffaadd, .55);
fillLight.position.set(100,0,100);

let backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100,0,-100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

let mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('/assets/');
mtlLoader.setPath('/assets/');
mtlLoader.load('200419.mtl', function(materials){
	materials.preload();

	let objLoader = new THREE.OBJLoader();
	objLoader.setMaterials(materials);
	objLoader.setPath('/assets/');
	objLoader.load('200419.obj', function(object){

		scene.add(object);
	})

})



let animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);

}

animate();
