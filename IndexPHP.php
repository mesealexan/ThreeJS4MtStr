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
    <script src="lib/three.min.js"></script>
    <script src="lib/OrbitAndPanControls.js"></script>
    <script src="lib/dat.gui.min.js"></script>
    <script src="custom/functions.js"></script>
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
var HHS_h = 5, HHS_b = 5 , HHS_tdes = 0.349 , HHS_f1 = 0.3;
var SCP_d = 4.6 , SCP_bf = 2.0 , SCP_tf = 0.436 , SCP_tw = 0.24 , SCP_xbar = 0.634;
var LCP_d = 10 , LCP_bf = 2.6 , LCP_tf = 0.436 , LCP_tw = 0.24 , LCP_xbar = 0.634;
var UB_rad = 2.6, UB_thick = 0.2, UB_Length = 5.2;
var UB_Length = 7.6, UB_Width = 4.7, UB_thread = 2.75, UB_thick = 0.26;
var UBT2_Length = 6.6, UBT2_Width = 4.7, UBT2_thread = 3.2, UBT2_thick = 0.26;

var Nut_rad = UB_thick*1.72, Nut_thick = UB_thick*1;


//Objects in the scene
var ExArm ; 
var ExPipe, LSCPlate, HangPipe, LSCPlate1, Pipe1, Pipe2 , Pipe1_Helper, Pipe2_Helper, UBolt1, UBolt3, UBolt4 , UBolt5, UBolt6;
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
    ExPipe_dummy.rotation.z = effectController.PlateHR*Math.PI/180;
    Pipe1_Helper.position.z = effectController.mPipeAH*HangPipe.dimensions.height*0.97;
  //  LSCPlate2.position.z = effectController.mPipeBH*HangPipe.Length;
    HangPipe.position.x = effectController.mPipeAllV*HangPipe.dimensions.height*0.9;
    Pipe1_Helper.rotation.z = effectController.mPipe1Rot*Math.PI/180;
   /* Pipe2.position.z = effectController.mPipeAllV*Pipe2.Length;
    Pipe2_Helper.rotation.z = effectController.mPipe2Rot*Math.PI/180;
    HangPipe.position.z = effectController.HArmHO*HangPipe.Length;*/
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
    //Start building the scene with the new function
    //Parent of all
    ExArm = new THREE.Object3D();
    drawElement(ExArm, "36 inch", "HHS Rect", "36 HHS Rect", "chrome", "W44X335", false);

        ExPipe = new THREE.Object3D(); 
        drawElement(ExPipe, "12 inch", "Pipe", "12 Inch Pipe", "chrome", "W44X335", true);
        ExPipe.rotation.x = Math.PI/2;
        ExPipe.position.z = ExArm.dimensions.height;
        ExArm.add(ExPipe);
            //ExPipe_dummy is the first node that will connect the horizontal pipe to the horizontal arm. It's placed here to simplify rotation
            ExPipe_dummy = new THREE.Object3D(); 
            ExPipe.add(ExPipe_dummy);

                LSCPlate = new THREE.Object3D(); 
                drawElement(LSCPlate, "Large", "C Plate", "Large C Plate", "chrome", "W44X335", true);
                LSCPlate.rotation.x = Math.PI/2;
                LSCPlate.rotation.y = -Math.PI/2;
                LSCPlate.position.y = ExPipe.dimensions.OD + LSCPlate.dimensions.bf/2;
                ExPipe_dummy.add(LSCPlate)

                //UBolts that fix the plate
                UBolt1 = new THREE.Object3D(); 
                drawElement(UBolt1, "Large", "U Bolt", "U Bolt 1", "metal", "W44X335", false);
                UBolt1.position.z = -ExArm.dimensions.h*0.7;
                ExPipe_dummy.add(UBolt1);

                UBolt2 = new THREE.Object3D(); 
                drawElement(UBolt2, "Large", "U Bolt", "U Bolt 2", "metal", "W44X335", false);
                UBolt2.position.z = ExArm.dimensions.h*0.7;
                ExPipe_dummy.add(UBolt2);

                HangPipe = new THREE.Object3D();
                drawElement(HangPipe, "150 inch", "Pipe", "150 Inch Pipe", "chrome", "W44X335", true);
                HangPipe.rotation.y = Math.PI/2;
                HangPipe.position.y = ExPipe.dimensions.OD + LSCPlate.dimensions.bf + HangPipe.dimensions.OD;
                ExPipe_dummy.add(HangPipe);

                //UBolts that fix the hortizontal pipe
                UBolt3 = new THREE.Object3D(); 
                drawElement(UBolt3, "Large T2", "U Bolt", "U Bolt 3", "metal", "W44X335", false);
                UBolt3.rotation.x = Math.PI;
                UBolt3.rotation.y = Math.PI/2
                UBolt3.position.y = ExPipe.dimensions.OD + LSCPlate.dimensions.bf + HangPipe.dimensions.OD;
                UBolt3.position.x = LSCPlate.dimensions.height * 0.4;
                ExPipe_dummy.add(UBolt3);

                UBolt4 = new THREE.Object3D(); 
                drawElement(UBolt4, "Large T2", "U Bolt", "U Bolt 3", "metal", "W44X335", false);
                UBolt4.rotation.x = Math.PI;
                UBolt4.rotation.y = Math.PI/2
                UBolt4.position.y = ExPipe.dimensions.OD + LSCPlate.dimensions.bf + HangPipe.dimensions.OD;
                UBolt4.position.x = LSCPlate.dimensions.height * 0.2;
                ExPipe_dummy.add(UBolt4);

                UBolt5 = new THREE.Object3D(); 
                drawElement(UBolt5, "Large T2", "U Bolt", "U Bolt 3", "metal", "W44X335", false);
                UBolt5.rotation.x = Math.PI;
                UBolt5.rotation.y = Math.PI/2
                UBolt5.position.y = ExPipe.dimensions.OD + LSCPlate.dimensions.bf + HangPipe.dimensions.OD;
                UBolt5.position.x = - LSCPlate.dimensions.height * 0.4;
                ExPipe_dummy.add(UBolt5);

                UBolt6 = new THREE.Object3D(); 
                drawElement(UBolt6, "Large T2", "U Bolt", "U Bolt 3", "metal", "W44X335", false);
                UBolt6.rotation.x = Math.PI;
                UBolt6.rotation.y = Math.PI/2
                UBolt6.position.y = ExPipe.dimensions.OD + LSCPlate.dimensions.bf + HangPipe.dimensions.OD;
                UBolt6.position.x = - LSCPlate.dimensions.height * 0.2;
                ExPipe_dummy.add(UBolt6);

                //The second node that will fix the horizontal pipes to the vertical one
                Pipe1_Helper = new THREE.Object3D(); 
                HangPipe.add(Pipe1_Helper);

                    LSCPlate1 = new THREE.Object3D();
                    drawElement(LSCPlate1, "Small", "C Plate", "U Bolt 1", "chrome", "W44X335", true);
                    LSCPlate1.rotation.y = -Math.PI/2
                    LSCPlate1.rotation.x = Math.PI/2
                    LSCPlate1.position.y = HangPipe.dimensions.OD + LSCPlate1.dimensions.bf/2;
                    Pipe1_Helper.add(LSCPlate1);

                    Pipe1 = new THREE.Object3D(); 
                    drawElement(Pipe1, "63 inch", "Pipe", "U Bolt 1", "chrome", "W44X335", true);
                    Pipe1.rotation.y = Math.PI/2;
                    Pipe1.position.y = HangPipe.dimensions.OD + LSCPlate1.dimensions.bf + Pipe1.dimensions.OD;
                    Pipe1_Helper.add(Pipe1);

                    UBolt1_1 = new THREE.Object3D(); 
                    drawElement(UBolt1_1, "Large", "U Bolt", "U Bolt 3", "metal", "W44X335", false);
                    UBolt1_1.position.z = 1.5;
                    Pipe1_Helper.add(UBolt1_1);

                    UBolt1_2 = new THREE.Object3D(); 
                    drawElement(UBolt1_2, "Large", "U Bolt", "U Bolt 3", "metal", "W44X335", false);
                    UBolt1_2.position.z = -1.5;
                    Pipe1_Helper.add(UBolt1_2);

                    scene.add(ExArm);




/*



    LSCPlate1 = new THREE.Object3D();
    LSCPlate1.name = "LSCPlate1"
    LSCPlate1.Length = 6;
    createMbr( LSCPlate1, drawSection('Small Cross Plate','W44X335') , LSCPlate1.Length , material , true);
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
    LSCPlate2.Length = 6;
    createMbr( LSCPlate2, drawSection('Small Cross Plate','W44X335') , LSCPlate2.Length , material , true);
    LSCPlate2.rotation.x = Math.PI/2;
    LSCPlate2.position.x = -Pipe_OD - SCP_bf/2;
    Pipe2_Helper.add(LSCPlate2);

    Pipe2 = new THREE.Object3D(); 
    Pipe2.name = "Pipe2"
    Pipe2.Length = 63;
    createMbr( Pipe2, drawSection('Pipe Small','W44X335') , Pipe2.Length , material , true);
    Pipe2.position.x = -PipeS_OD - SCP_bf/2;
    LSCPlate2.add(Pipe2)

    //scene.add( ExArm );
    */
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
</html>


