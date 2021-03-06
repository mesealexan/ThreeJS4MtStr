
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

<script src="custom/functions.js"></script>
<script src="custom/drawElement.js"></script>
<script src="custom/drawPart.js"></script>
<script src="custom/drawAssemlyX.js"></script>
<script src="custom/setupGuiX.js"></script>
<script src="custom/updateX.js"></script>
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


function createText(){
	var coordinatesWindow = open('coordinates.html','coordinatesWindow','');
	//coordinatesWindow.document.bgColor='000000';
	//coordinatesWindow.document.style.fontSize = '40px';
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

var  Assembly2Draw = 'RMV12-363';
init(Assembly2Draw);

var Assembly =  new THREE.Object3D();
Assembly = drawAssembly(Assembly2Draw);
scene.add(Assembly);

/*
var dummy =  new THREE.Object3D();
RMV12_363.AssemblyA.dummy_vert_1.A.add(dummy);

var cube = new THREE.Mesh(new THREE.CubeGeometry(6, 12, 60), new THREE.MeshPhongMaterial({ color: 0x999999}));
cube.name = "cube";
ray_objects.push(cube);
dummy.add(cube);

dummy.rotation.z = 30*Math.PI/180;
dummy.rotation.y = 5*Math.PI/180;

cube.position.x = -6;
*/
/*
// THREE.GeometryUtils.center(cube);
dummy.position.x = -6;
// cube.position.y = -6;
dummy.rotation.z = 30*Math.PI/180;
dummy.rotation.y = 5*Math.PI/180;
*/


setupGui(Assembly2Draw);
animate();

function init()
{
	scene = new THREE.Scene();
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 200000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	camera.position.set(-150,150,150);   
	scene.add(camera); 

	keyboard = new THREEx.KeyboardState();

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

	//Reflection Cube

	var path = "art/1/";
	var format = '.jpg';
	var urls = [
			path + 'px' + format, path + 'nx' + format,
			path + 'py' + format, path + 'ny' + format,
			path + 'pz' + format, path + 'nz' + format
		];


	
	textureCube = THREE.ImageUtils.loadTextureCube( urls );
	var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

	var refractionCube = new THREE.Texture( textureCube.image, new THREE.CubeRefractionMapping() );
	refractionCube.format = THREE.RGBFormat;
				
	var shader = THREE.ShaderLib[ "cube" ];
				shader.uniforms[ "tCube" ].value = textureCube;

	var material = new THREE.ShaderMaterial( {

					fragmentShader: shader.fragmentShader,
					vertexShader: shader.vertexShader,
					uniforms: shader.uniforms,
					depthWrite: false,
					side: THREE.BackSide

				} ),

		mesh = new THREE.Mesh( new THREE.CubeGeometry( 300, 300, 300 ), material );
		mesh.visible = false;
		scene.add( mesh );


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
}

function animate() 
{
	requestAnimationFrame( animate ); 
	renderer.render( scene, camera );   
	cameraControls.update();
	update();
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
		if ( intersects[ 0 ].object != Intersected )
		{
			if ( Intersected ) 
				Intersected.material.color.setHex( Intersected.currentHex );


		Intersected = intersects[ 0 ].object;
		Intersected.currentHex = Intersected.material.color.getHex();
		Intersected.material.color.setHex( 0xff0000 );
console.log(Intersected.id)	
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
}
</script>
</div>
</body>
</html>


