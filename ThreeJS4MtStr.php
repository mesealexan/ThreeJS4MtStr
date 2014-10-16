
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
<script src='lib/THREEx.KeyboardState.js'></script>
<script src="custom/dictionary.js"></script>
<script src="lib/OrbitAndPanControls.js"></script>
<script src="lib/dat.gui.min.js"></script>
<script src="lib/helvetiker_regular.typeface.js"></script>
<script src="custom/functions.js"></script>
<script src="custom/drawElement.js"></script>
<script src="custom/drawPart.js"></script>
<script src="custom/drawTower.js"></script>
<script src="custom/setupGuiX.js"></script>
<script src="custom/updateX.js"></script>

<xml id="writersXML" SRC="xml/Tower_full.xml"></xml>

</head>
<body>
<div id="container"></div>    
<div id="text" style="background-color:yellow;">
<b>Select Object</b><br>
<u>In World CS</u><br>
X:<br>
Y:<br>
Z:</div> 
<br>

<div id="local">
<u>To Parent / Local</u><br>
X:<br>
Y:<br>
Z:</div>
<br>

<button id="downloadLink" onclick="createText()">Coordinates</button>

<script>


///Parse XML

function loadXMLDoc(filename)
{
	if (window.XMLHttpRequest)
	  xhttp=new XMLHttpRequest();
	else
	  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
	xhttp.open("GET",filename,false);
	xhttp.send();
return xhttp.responseXML;
}

var xmlDoc = loadXMLDoc("xml/Tower_full.xml"); //Loads the XML document

var nodes = xmlDoc.getElementsByTagName("NODE"); //stores all nodex
var members = xmlDoc.getElementsByTagName("MEMBER"); //stores all members
var shapes = xmlDoc.getElementsByTagName("SHAPE"); //stores all shapes


function createText(){
	var coordinatesWindow = open('coordinates.html','coordinatesWindow','');
	if(ray_objects)
	for(i=0;i<ray_objects.length;i++){
		var vector = new THREE.Vector3();
		if(ray_objects[i].name !== "")
		coordinatesWindow.document.write(
		"<h" + i+1 + "<b> PartNo: " + ray_objects[i].name + " Element No. " + i + "</b><hr>" +
		"<u>  Position</u><br>" +
		"   X: " + (vector.getPositionFromMatrix( ray_objects[i].matrixWorld ).x).toFixed(accuracy) + "<br>" +
		"   Y: " + (vector.getPositionFromMatrix( ray_objects[i].matrixWorld ).y).toFixed(accuracy) + "<br>" +
		"   Z: " + (vector.getPositionFromMatrix( ray_objects[i].matrixWorld ).z).toFixed(accuracy) + "<br>" + "<br>" + "<br>")
	}
}
//Helper objects for different parts
var Tower = new THREE.Object3D();
var nodeText = new THREE.Object3D();
var lines = new THREE.Object3D();
var textHolder = new THREE.Object3D();
var nodePoints = new THREE.Object3D();

init();

function init()
{
	scene = new THREE.Scene();
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 200000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(-250,250,250);   
	scene.add(camera); 

	keyboard = new THREEx.KeyboardState();
	axis = new THREE.AxisHelper(20);
	axis.position.set(0,0,0);
	axis.useQuaternion = true
	scene.add(axis); 

	renderer = new THREE.WebGLRenderer({antialias:true, alpha: true });
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT); 
	renderer.domElement.addEventListener( 'mousedown', onMouseDown, false );
	container = document.getElementById( 'container' ); 
	container.appendChild( renderer.domElement ); 

	cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
	cameraControls.target.set(0,116,0); 

	Coordinates.drawGrid({size:300,scale:0.1, orientation:"x"});
	addReflectionEnvironment();
	//Add the Tower and subcomponents
	drawTower(Tower);
	scene.add(Tower);

	addNodePoints(nodePoints);
	scene.add(nodePoints);

	addNodesText(nodeText);

	drawLines(lines);
	scene.add(lines);


	var ambientLight = new THREE.AmbientLight( 0x222222 );
	scene.add(ambientLight);

	var light = new THREE.PointLight( 0xffffff, 1.3, 1000 );
	light.position.set( 400, 300, 400 );
	scene.add( light );

	var light1 = new THREE.PointLight( 0xffffff, 1.3, 1000 );
	light1.position.set( -400, 300, 400 );
	scene.add( light1 );

	var light2 = new THREE.PointLight( 0xffffff, 1.3, 1000 );
	light2.position.set( 400, 300, -400 );
	scene.add( light2 );

	var light3 = new THREE.PointLight( 0xffffff, 1.3, 1000 );
	light3.position.set( -400, 300, -400 );
	scene.add( light3 );
	setupGui();
	animate();
	
}

function animate() 
{
	requestAnimationFrame( animate ); 
	renderer.render( scene, camera );   
	cameraControls.update();
	update();
}


</script>
</div>
</body>
</html>


