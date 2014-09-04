
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
<script src="custom/dictionary.js"></script>
<script src="lib/OrbitAndPanControls.js"></script>
<script src="lib/dat.gui.min.js"></script>
<script src="custom/drawElement.js"></script>
<script src="custom/drawPart.js"></script>
<script src="custom/drawAssemly.js"></script>
<script src="custom/update.js"></script>
</head>
<body>
<div id="container"></div>    
<div id="text"><b>Select Object</b><br> <u>World</u><br> X: <br> Y:<br> Z:</div>    
<div id="local"> <u>To Parent / Local</u><br> X: <br> Y:<br> Z:</div>
<button id="downloadLink" >XML</button>
</a>
<script>

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


