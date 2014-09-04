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
	case 'SP216': 
	dummy = new THREE.Object3D(); //create a dummy object that will hold all the objects
	SP216 =  new drawElement(15, "C",'C10X15.3',"LARGE SUPPORT CROSS PLATE", "chrome", "SP216", true);
	SP216.rotation.y = Math.PI/2
	//Move the plate from the center of the pipe
	SP216.position.z = SP216.dimensions.bf/2;
	
	P3150 =  new drawElement(150, "Pipe",'P3x.216', "3-1/2 in X 150 in SCH 40 GALVANIZED PIPE", "chrome", "P3150", true);
	P3150.position.x = -(P3150.dimensions.OD + SP216.dimensions.bf/2);
	SP216.add(P3150)

	P263_Helper = new THREE.Object3D(); 
	P263_Helper.position.z = P3150.dimensions.D1*0.5*0.75
	P3150.add(P263_Helper);

	SP219 = new drawElement(6, "C",'C6X10.5', "U Bolt 1", "chrome", "SP219", true);
	SP219.rotation.x = Math.PI/2
	SP219.position.x = -(P3150.dimensions.OD + SP219.dimensions.bf/2);
	P263_Helper.add(SP219);

	P263 = new drawElement(63, "Pipe",'P2.375x.154', "2-3/8 in O.D. SCH. 40 in PIPE", "chrome", "P263", true);
	//P263.rotation.y = Math.PI/2;
	P263.position.x = -(SP219.dimensions.bf/2 + P263.dimensions.OD);
	SP219.add(P263)

	dummy.SP216 = SP216;
	dummy.SP216.P3150 = P3150;
	dummy.SP216.P3150.SP219 = SP219;
	dummy.SP216.P3150.SP219.P263 = P263;
	dummy.add(SP216)
	return(dummy)
	break;
	default:
		break;
	};
	
};