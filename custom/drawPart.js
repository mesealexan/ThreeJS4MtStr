//This function will read all the object's childrena nd will transform them intro properties
var all_childrens = [];
function pushProperties(object){
var i=0;
	do{
		if(object.children[i].name!=="")
			all_childrens.push(object.children[i]);
		if(object.children[i].children.length>0)
			pushProperties(object.children[i])
		i++
	} while (i < object.children.length)
}

var SV197_36;
function drawPart(PartNo){
	switch(PartNo){
	case 'LWRM':  break;
	case 'G58R-24':  break;
	case 'G58R-48':  break;
	case 'SV197-36':  
	dummy = new THREE.Object3D(); //create a dummy object that will hold all the objects
	ExArm = new drawElement( 36, "HHS(Rect)", "HSS5X5X3/8", "36 HHS Rect", "chrome", "NP", false);

	ExPipe = new drawElement(12, "Pipe",'P4x.237',"18 in P4x.237", "chrome", "NP", true);
		ExPipe.rotation.x = Math.PI/2;
		ExPipe.position.z = ExArm.dimensions.D1;
	
	ExArm.add(ExPipe);
	dummy.add(ExArm); //make the dummy parent of all objects
	dummy.ExArm = ExArm; //We will push the object's properties to the dummy so it will be reocgnized by the assembly object
	dummy.ExArm.ExPipe = ExPipe;
	return(dummy) //returns the dummy object which will be passed to the assemly object this way avoiding the script to create several objects for one
		break;
	case 'A58234':  break;
	case 'A58FW':  break;
	case 'G58LW':  break;
	case 'A58NUT':  break;
	case 'UB5458':  break;
	case 'G58FW':  break;
	case 'G58NUT':  break;
	case 'UB1306':  break;
	case 'G12NUT':  break;
	case 'G12FW':  break;
	case 'G12LW':  break;
	case 'UB1212':  break;
	case 'P3150':  break;
	case 'A':  break;
	case 'SP219':  break;
	case 'SP216': break;
	break;	
	default:
		break;
	};
	
};