<?php 
require_once('db/database.php');
$db = new dbManagement();
?>

<head>
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
<title>3D Model</title>

<style>
body {
	font-family: monospace;
	background-color: #F5F5F5;
margin: 0px;
}

#container {
position: fixed;
height: 100%;
width: 100%;
}
#text{
top:10px;
left: 20px;
color: #000;
position: fixed;
	z-index: 100;
}
#local{
left: 250px;
top:10px;
color: #000;
position: fixed;
	z-index: 100;
}
#downloadLink{
position: fixed;
top:10px;
left: 500px;
	z-index: 100;
}
</style>
<script src="lib/jquery-1.8.3.min.js"></script>
<script src="lib/Coordinates.js"></script>
<script src="lib/three.min.js"></script>
<script src="lib/three.min.js"></script>
<script src="lib/OrbitAndPanControls.js"></script>
<script src="lib/dat.gui.min.js"></script>
<script src="lib/functions.js"></script>
</head>
<body>
<div id="container"></div>    
<div id="text"><b>Select Object</b><br> <u>World</u><br> X: <br> Y:<br> Z:</div>    
<div id="local"> <u>To Parent / Local</u><br> X: <br> Y:<br> Z:</div>
<button id="downloadLink" onclick="createText()">XML</button>
</a>
<script>

var accuracy = 4;

function createText(){
	var coordinatesWindow = open('coordinates.xml','coordinatesWindow','');
	coordinatesWindow.document.bgColor='000000';
	//coordinatesWindow.document.style.fontSize = '40px';
	if(ray_objects)
	for(i=0;i<ray_objects.length;i++){
		var vector = new THREE.Vector3();
		coordinatesWindow.document.write(
		"<h" + i+1 + "<b>" + ray_objects[i].name + "</b><hr>" +
		"<u>  World</u><br>" +
		"   X:" + (vector.getPositionFromMatrix( ray_objects[i].matrixWorld ).x).toFixed(accuracy) + "<br>" +
		"   Y:" + (vector.getPositionFromMatrix( ray_objects[i].matrixWorld ).y).toFixed(accuracy) + "<br>" +
		"   Z:" + (vector.getPositionFromMatrix( ray_objects[i].matrixWorld ).z).toFixed(accuracy) + "<br>" +
		"<u>To " + ray_objects[i].parent.parent.name  +  " / Local</u><br>" +
		"   X:" + (vector.getPositionFromMatrix( ray_objects[i].parent.parent.matrixWorld ).x).toFixed(accuracy) + "<br>" +
		"   Y:" + (vector.getPositionFromMatrix( ray_objects[i].parent.parent.matrixWorld ).y).toFixed(accuracy) + "<br>" +
		"   Z:" + (vector.getPositionFromMatrix( ray_objects[i].parent.parent.matrixWorld ).z).toFixed(accuracy) + "<br><br><br>" )
	}
}



var container, scene, camera, renderer, controls, effectController, Intersected;
var SCREEN_WIDTH = window.innerWidth; 
var SCREEN_HEIGHT = window.innerHeight; 
//Variables for raycaster
var projector = new THREE.Projector(), 
mouse_vector = new THREE.Vector3(),
mouse = { x: 0, y: 0, z: 1 },
ray = new THREE.Raycaster( new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0) );
intersects = []; 

var axis;
var world_text, local_text;

// -----------

var type_G = 'T-Arm';
var mftr_G = 'Site Pro 1';
var model_G = 'RMV12-3XX';
// var mesh = loadMtStr(type_G, mftr_G, model_G);

//Sections properties (to be read from SQL)
var I_d = 23.6, I_bf = 7.01, I_T = 20.75, I_tw = 0.395, I_tf = 0.505, I_k1 = 1;
var L_d = 5, L_b = 3.5, L_xbar = 0.854, L_ybar = 1.6, L_t = 0.375;
var Pipe_OD =2.25 , Pipe_tnom = 0.322;
var PipeS_OD =1.1875 , PipeS_tnom = 0.322;
var HHS_h = 5, HHS_b = 5 , HHS_tdes = 0.349 , HHS_f1 = 0.3;

var SCP_d = 4 , SCP_bf = 2.0 , SCP_tf = 0.436 , SCP_tw = 0.24 , SCP_xbar = 0.634; // C6X10.5
var LCP_d = 8 , LCP_bf = 2.6 , LCP_tf = 0.436 , LCP_tw = 0.24 , LCP_xbar = 0.634; // C10X15.3

var UB_rad = 2.6, UB_thick = 0.2, UB_Length = 5.2;
var Nut_rad = UB_thick*1.72, Nut_thick = UB_thick*1;



//Objects in the scene
var ExArm, ExPipe, LSCPlate, HangPipe, LSCPlate1, Pipe1, Pipe2 , Pipe1_Helper, Pipe2_Helper, UBolt1, UBolt2, Nut1_1, Nut1_2;

var ray_objects = [];


init();
setupGui()
animate();



function init()
{
	scene = new THREE.Scene();
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 200000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(-150,150,150);   
	scene.add(camera); 

	axis = new THREE.AxisHelper(50);
	axis.position.set(0,0,0);
	axis.useQuaternion = true
	scene.add(axis); 

	renderer = new THREE.WebGLRenderer({antialias:true, alpha: true });
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT); 
	renderer.domElement.addEventListener( 'mousedown', onMouseDown, false );
	container = document.getElementById( 'container' ); 
	container.appendChild( renderer.domElement ); 

	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	cameraControls.target.set(0,0,0); 

	Coordinates.drawGrid({size:1000,scale:0.05, orientation:"x"});

	var ambientLight = new THREE.AmbientLight( 0x222222 );
	var light = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light.position.set( 200, 400, 500 );
	var light2 = new THREE.DirectionalLight( 0xFFFFFF, 1.0 );
	light2.position.set( -500, 250, -200 );
	scene.add(ambientLight);
	scene.add(light);
	scene.add(light2);
	draw()
}

function animate()
{
	requestAnimationFrame( animate ); 
	renderer.render( scene, camera );   
	cameraControls.update();
	update();
}
var position = new THREE.Vector3();
var quaternion = new THREE.Quaternion();
var scale = new THREE.Vector3();

function update(){
	if(Intersected)
	{
		Intersected.matrixWorld.decompose( position, quaternion, scale )
		axis.position.copy(position);
		axis.quaternion.x = quaternion.x;
		axis.quaternion.y = quaternion.y;
		axis.quaternion.z = quaternion.z;
		axis.quaternion.w = quaternion.w;
		axis.updateMatrixWorld( true );
	}

	ExArm.rotation.y = effectController.EArmHR*Math.PI/180 + Math.PI;
	ExArm.position.y = effectController.EArmVO*100 + 20;
	ExPipe.rotation.z = effectController.PlateHR*Math.PI/180;
	LSCPlate1.position.z = effectController.mPipeAH*HangPipe.Length;
	LSCPlate2.position.z = effectController.mPipeBH*HangPipe.Length;
	Pipe1.position.z = effectController.mPipeAllV*Pipe1.Length;
	Pipe1_Helper.rotation.z = effectController.mPipe1Rot*Math.PI/180;
	Pipe2.position.z = effectController.mPipeAllV*Pipe2.Length;
	Pipe2_Helper.rotation.z = effectController.mPipe2Rot*Math.PI/180;
	HangPipe.position.z = effectController.HArmHO*HangPipe.Length;
}

function setupGui() {

	effectController = {
mPipeAllV: 0,
mPipeAH:0.35,
mPipe1Rot: 0,
mPipeBH:-0.35,
mPipe2Rot: 0,
HArmHO:0,
EArmVO:0,
EArmHR:0,
PlateHR:0
	};

	var gui = new dat.GUI();
	
	h = gui.addFolder("Mounting Structure");
	h.add(effectController, "mPipeAllV", -0.5, 0.5, 0.01).name("mPipes Vertical");
	h.add(effectController, "mPipeAH", -0.5, 0.5, 0.01).name("mPipe A Horizontal");
	h.add(effectController, "mPipe1Rot", -90.0, 90.0, 0.025).name("mPipe A Rot");
	h.add(effectController, "mPipeBH", -0.5, 0.5, 0.01).name("mPipe B Horizontal");
	h.add(effectController, "mPipe2Rot", -90.0, 90.0, 0.025).name("mPipe B Rot");
	h.add(effectController, "HArmHO", -0.5, 0.5, 0.01).name("H Arm Hori Offset");
	h.add(effectController, "EArmVO", -0.5, 0.5, 0.01).name("Extend Arm Vert Offset");
	h.add(effectController, "EArmHR", -180.0, 180.0, 0.025).name("Extend Arm Hori Rot");
	h.add(effectController, "PlateHR", -89.0, 89.0, 0.025).name("Rotate Plate");
	
}

function draw(){

	var material  = new THREE.MeshNormalMaterial();
	var material2  = new THREE.MeshPhongMaterial( { color: 0x333333, specular: 0xCC3399, shininess: 20 } );

	UBolt1 = new THREE.Object3D();
	UBolt1.name = "UBolt1";
	UBolt1.PartNo = "X-UB1212"
	// drawUBolt(UBolt1,UB_rad, UB_thick, UB_Length, material2);
	drawUBoltx(UBolt1);
	UBolt1.position.y = UB_Length;


	Nut1_1 = new THREE.Object3D();
	Nut1_1.name = "Nut1_1";
	createMbr(Nut1_1, drawNut(Nut_rad), Nut_thick, material2, true);
	Nut1_1.rotation.x = Math.PI/2;
	Nut1_1.position.x = -UB_rad;
	Nut1_1.position.y = -Nut_thick*1.3;
	UBolt1.add(Nut1_1);

	Nut1_2 = new THREE.Object3D();
	Nut1_2.name = "Nut1_2";
	createMbr(Nut1_2, drawNut(Nut_rad), Nut_thick, material2, true);
	Nut1_2.rotation.x = Math.PI/2;
	Nut1_2.position.x = UB_rad;
	Nut1_2.position.y = -Nut_thick*1.3;

	UBolt1.add(Nut1_2);

	//scene.add(UBolt1);

	ExArm = new THREE.Object3D();
	ExArm.name = "ExArm"
	ExArm.Length = 36;
	// createMbr( ExArm, drawSection('HHS','W44X335') , ExArm.Length , material , false);
	createMbr( ExArm, drawSection('HSS(Rect)','HSS5X5X3/8') , ExArm.Length , material , false);


	ExPipe = new THREE.Object3D(); 
	ExPipe.name = "ExPipe"
	ExPipe.Length = 12;
	createMbr( ExPipe, drawSection('Pipe Large','W44X335') , ExPipe.Length , material , true);
	ExPipe.rotation.x = Math.PI/2;
	ExPipe.position.z = ExArm.Length;
	ExArm.add(ExPipe)


	UBolt1.position.z = ExPipe.Length/2 * 0.5;

	UBolt2 = UBolt1.clone();

	UBolt2.position.z = -ExPipe.Length/2 * 0.5;
	UBolt2.name = "UBolt2";
	ExPipe.add(UBolt2)
	ExPipe.add(UBolt1)

	LSCPlate = new THREE.Object3D();
	LSCPlate.name = "LSCPlate";
	LSCPlate.PartNo = "X-SP216"
	LSCPlate.Length = 12;
	// createMbr( LSCPlate, drawSection('Large Cross Plate','W44X335') , LSCPlate.Length , material , true);
	createMbr( LSCPlate, drawSection('C','C10X15.3') , LSCPlate.Length , material , true);
	LSCPlate.rotation.x = Math.PI/2;
	LSCPlate.rotation.y = -Math.PI/2;
	LSCPlate.position.y = Pipe_OD + LCP_bf/2;
	ExPipe.add(LSCPlate);

	HangPipe = new THREE.Object3D();
	HangPipe.name = "HangPipe"
	HangPipe.Length = 150;
	createMbr( HangPipe, drawSection('Pipe Large','W44X335') , HangPipe.Length , material , true);
	HangPipe.position.x = -Pipe_OD - LCP_bf/2;
	LSCPlate.add(HangPipe);

	Pipe1_Helper = new THREE.Object3D(); 
	HangPipe.add(Pipe1_Helper);

	LSCPlate1 = new THREE.Object3D();
	LSCPlate1.name = "LSCPlate1";
	LSCPlate1.PartNo = "X-SP219";
	LSCPlate1.Length = 6;
	// createMbr( LSCPlate1, drawSection('Small Cross Plate','W44X335') , LSCPlate1.Length , material , true);
	createMbr( LSCPlate1, drawSection('C','C6X10.5') , LSCPlate1.Length , material , true);
	LSCPlate1.rotation.x = Math.PI/2;
	LSCPlate1.position.x = -Pipe_OD - SCP_bf/2;
	Pipe1_Helper.add(LSCPlate1);

	Pipe1 = new THREE.Object3D(); 
	Pipe1.name = "Pipe1"
	Pipe1.Length = 63;
	createMbr( Pipe1, drawSection('Pipe Small','W44X335') , Pipe1.Length , material , true);
	Pipe1.position.x = -PipeS_OD - SCP_bf/2;
	LSCPlate1.add(Pipe1)

	Pipe2_Helper = new THREE.Object3D(); 
	HangPipe.add(Pipe2_Helper);

	LSCPlate2 = new THREE.Object3D();
	LSCPlate2.name = "LSCPlate2"
	LSCPlate2.PartNo = "X-SP219";
	LSCPlate2.Length = 6;
	// createMbr( LSCPlate2, drawSection('Small Cross Plate','W44X335') , LSCPlate2.Length , material , true);
	createMbr( LSCPlate2, drawSection('C','C6X10.5') , LSCPlate2.Length , material , true);
	LSCPlate2.rotation.x = Math.PI/2;
	LSCPlate2.position.x = -Pipe_OD - SCP_bf/2;
	Pipe2_Helper.add(LSCPlate2);

	Pipe2 = new THREE.Object3D(); 
	Pipe2.name = "Pipe2"
	Pipe2.Length = 63;
	createMbr( Pipe2, drawSection('Pipe Small','W44X335') , Pipe2.Length , material , true);
	Pipe2.position.x = -PipeS_OD - SCP_bf/2;
	LSCPlate2.add(Pipe2)

	scene.add( ExArm );
	
}
var parentName;
function onMouseDown( event_info ) 
{
	
	event_info.preventDefault();  
	mouse.x = ( event_info.clientX / SCREEN_WIDTH ) * 2 - 1;
	mouse.y = - ( event_info.clientY / SCREEN_HEIGHT ) * 2 + 1; 
	mouse_vector.set( mouse.x, mouse.y, mouse.z );
	projector.unprojectVector( mouse_vector, camera );
	var direction = mouse_vector.sub( camera.position ).normalize();
	ray.set( camera.position, direction );
	intersects = ray.intersectObjects(ray_objects, false );

	if(intersects.length>0)
	{

		Intersected = intersects[0].object;
		parentName = Intersected.parent.parent.name;
		var vector = new THREE.Vector3();
		axis.position.x = vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).x;
		axis.position.y = vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).y;
		axis.position.z = vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).z;
		axis.rotation.x = intersects[0].object.rotation.x;
		axis.rotation.y = intersects[0].object.rotation.y;
		axis.rotation.z = intersects[0].object.rotation.z;
		world_text = document.getElementById("text").innerHTML = 
		intersects[0].object.name + '<br>' + '<u>World</u> <BR>' +
		'X: ' + (vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).x).toFixed(accuracy) + '<br>' +  
		'Y: ' + (vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).y).toFixed(accuracy) + '<br>' + 
		'Z: ' + (vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).z).toFixed(accuracy);
		local_text = '<u> To '+ parentName +' / Local</u> <BR>' +
		'X: ' +  (vector.getPositionFromMatrix( Intersected.parent.parent.matrixWorld ).x).toFixed(accuracy) + '<br>' +  
		'Y: ' + (vector.getPositionFromMatrix( Intersected.parent.parent.matrixWorld ).y).toFixed(accuracy) + '<br>' + 
		'Z: ' + (vector.getPositionFromMatrix( Intersected.parent.parent.matrixWorld ).z).toFixed(accuracy)
		document.getElementById("text").innerHTML = world_text;
		document.getElementById("local").innerHTML = local_text;
	}
}
</script>
</div>
</body>



