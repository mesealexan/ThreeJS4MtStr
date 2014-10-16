//fixed variables
var container, scene, camera, renderer, controls, effectController;
var SCREEN_WIDTH = window.innerWidth; 
var SCREEN_HEIGHT = window.innerHeight; 

//Variables for raycaster
var projector = new THREE.Projector(), 
mouse_vector = new THREE.Vector3(),
mouse = { x: 0, y: 0, z: 1 },
ray = new THREE.Raycaster( new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,0) );
intersects = []; 
var Intersected;

var keyboard;
//Accuracy for displaying numbers on screen and XML
var accuracy = 4;
var axis;
var world_text, local_text;

//Variables to get wolrd coordinates from world
var parentName;
var position = new THREE.Vector3();
var quaternion = new THREE.Quaternion();
var scale = new THREE.Vector3();

//Collector for on click event
var ray_objects = [];

//Objects in the scene
var ExArm, ExPipe ; 
var LCP1, P3150, P263_Helper, SP219, P263;

var selectedTrigger = false;

//Assemblies

var SV197_36,SP216;
var textureCube;
var reflectivityValue = 0.33;