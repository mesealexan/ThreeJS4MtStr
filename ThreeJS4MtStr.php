<?php 
require_once('db/database.php');
$db = new dbManagement();
?>

<head>
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
<title>3D Model</title>
<link rel="stylesheet" href="css/style.css">
<script src="lib/jquery-1.8.3.min.js"></script>
<script src="lib/Coordinates.js"></script>
<script src="lib/three.min.js"></script>
<script src="lib/OrbitAndPanControls.js"></script>
<script src="lib/dat.gui.min.js"></script>
<script src="custom/drawElement.js"></script>
<script src="custom/drawPart.js"></script>
<script src="custom/drawAssemly.js"></script>
</head>
<body>
<div id="container"></div>    
<div id="text"><b>Select Object</b><br> <u>World</u><br> X: <br> Y:<br> Z:</div>    
<div id="local"> <u>To Parent / Local</u><br> X: <br> Y:<br> Z:</div>
<button id="downloadLink" >XML</button>
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

var hoho;

var axis;
var world_text, local_text;

//Sections properties (to be read from SQL)
var I_d = 23.6, I_bf = 7.01, I_T = 20.75, I_tw = 0.395, I_tf = 0.505, I_k1 = 1,I_height = 200;
var L_d = 5, L_b = 3.5, L_xbar = 0.854, L_ybar = 1.6, L_t = 0.375;

var Pipe_OD =2.25 , Pipe_tnom = 0.322;
var PipeS_OD =1 , PipeS_tnom = 0.322;

// var HHS_h = 5, HHS_b = 5 , HHS_tdes = 0.349 , HHS_f1 = 0.3;

// var SCP_d = 4.6 , SCP_bf = 2.0 , SCP_tf = 0.436 , SCP_tw = 0.24 , SCP_xbar = 0.634;
// var LCP_d = 10 , LCP_bf = 2.6 , LCP_tf = 0.436 , LCP_tw = 0.24 , LCP_xbar = 0.634;

var UB_rad = 2.6, UB_thick = 0.2, UB_Length = 5.2;
var UB_Length = 7.6, UB_Width = 4.7, UB_thread = 2.75, UB_thick = 0.26;
var UBT2_Length = 6.6, UBT2_Width = 4.7, UBT2_thread = 3.2, UBT2_thick = 0.26;

var Nut_rad = UB_thick*1.72, Nut_thick = UB_thick*1;


//Objects in the scene
var ExArm ; 
var ExPipe, LSCPlate, P3150, SP219, P263, Pipe2 , P263_Helper, Pipe2_Helper, UBolt1, UBolt3, UBolt4 , UBolt5, UBolt6;
var haha;
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
	drawAssembly('RMV12-363')
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
	if(ExArm){
	ExArm.rotation.y = effectController.EArmHR*Math.PI/180 + Math.PI;
	ExArm.position.y = effectController.EArmVO*100 + 20;
	}
	if(ExPipe)
	ExPipe_dummy.rotation.z = effectController.PlateHR*Math.PI/180;
	if(P263_Helper)
	P263_Helper.position.z = effectController.mPipeAH*P3150.dimensions.height*0.97;
	//  LSCPlate2.position.z = effectController.mPipeBH*P3150.Length;
	if(P3150)
	P3150.position.x = effectController.mPipeAllV*P3150.dimensions.height*0.9;
	if(P263_Helper)
	P263_Helper.rotation.z = effectController.mP263Rot*Math.PI/180;
	/* Pipe2.position.z = effectController.mPipeAllV*Pipe2.Length;
	Pipe2_Helper.rotation.z = effectController.mPipe2Rot*Math.PI/180;
	P3150.position.z = effectController.HArmHO*P3150.Length;*/
}

function setupGui() {

	effectController = {
mPipeAllV: 0,
mPipeAH:0.35,
mP263Rot: 0,
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
	h.add(effectController, "mP263Rot", -90.0, 90.0, 0.025).name("mPipe A Rot");
	h.add(effectController, "mPipeBH", -0.5, 0.5, 0.01).name("mPipe B Horizontal");
	h.add(effectController, "mPipe2Rot", -90.0, 90.0, 0.025).name("mPipe B Rot");
	h.add(effectController, "HArmHO", -0.5, 0.5, 0.01).name("H Arm Hori Offset");
	h.add(effectController, "EArmVO", -0.5, 0.5, 0.01).name("Extend Arm Vert Offset");
	h.add(effectController, "EArmHR", -180.0, 180.0, 0.025).name("Extend Arm Hori Rot");
	h.add(effectController, "PlateHR", -89.0, 89.0, 0.025).name("Rotate Plate");
	
}



//Start building the scene with the new function
//Parent of all



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
</html>


