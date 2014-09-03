function drawPart(PartNo){
	Part = new THREE.Object3D();
	switch(PartNo){
	case 'LWRM':  break;
	case 'G58R-24':  break;
	case 'G58R-48':  break;
	case 'SV197-36':  
	// I want to have an object named as 'SV197-36' which has children including ExArm and ExPipe. So when referring to ExArm.dimensions, 
	// it would be SV197-36.ExArm.dimensions
		ExArm = new THREE.Object3D();
		// the size, HSS5X5X3/8, needs adjustment.
		drawElement(ExArm, 36, "HHS(Rect)",'HSS5X5X3/8', "36 HHS Rect", "chrome", "NP", false);

		ExPipe = new THREE.Object3D(); 
		drawElement(ExPipe, 12, "Pipe",'P4x.237',"18 in P4x.237", "chrome", "NP", true);
		ExPipe.rotation.x = Math.PI/2;
		ExPipe.position.z = ExArm.dimensions.height;
		
		ExArm.add(ExPipe);
		//ExPipe_dummy is the first node that will connect the horizontal pipe to the horizontal arm. It's placed here to simplify rotation
		ExPipe_dummy = new THREE.Object3D(); 
		ExPipe.add(ExPipe_dummy);	
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
// why I can't put the section of code here?	
	SP216 = new THREE.Object3D(); 
	drawElement(SP216, 15, "C",'C10X15.3',"LARGE SUPPORT CROSS PLATE", "chrome", "SP216", true);
	SP216.rotation.x = Math.PI/2;
	SP216.rotation.y = -Math.PI/2;
	SP216.position.y = ExPipe.dimensions.OD + SP216.dimensions.bf/2;
	ExPipe_dummy.add(SP216);
	break;	
	default:
		break;
	};
	
	SP216 = new THREE.Object3D(); 
	drawElement(SP216, 15, "C",'C10X15.3',"LARGE SUPPORT CROSS PLATE", "chrome", "SP216", true);
	SP216.rotation.x = Math.PI/2;
	SP216.rotation.y = -Math.PI/2;
	SP216.position.y = ExPipe.dimensions.OD + SP216.dimensions.bf/2;
	ExPipe_dummy.add(SP216);	

	//UBolts that fix the plate
	UBolt1 = new THREE.Object3D(); 
	drawElement(UBolt1, "",'UBolt',"Large", "U Bolt 1", "metal", "W44X335", false);
	UBolt1.position.z = -ExArm.dimensions.h*0.7;
	ExPipe_dummy.add(UBolt1);

	UBolt2 = new THREE.Object3D(); 
	drawElement(UBolt2, "Large",'',"UBolt", "U Bolt 2", "metal", "W44X335", false);
	UBolt2.position.z = ExArm.dimensions.h*0.7;
	ExPipe_dummy.add(UBolt2);

	P3150 = new THREE.Object3D();
	// has three(QTY=3), they would be P3150.A/B/C
	drawElement(P3150, 150, "Pipe",'P3x.216', "3-1/2 in X 150 in SCH 40 GALVANIZED PIPE", "chrome", "P3150", true);
	P3150.rotation.y = Math.PI/2;
	P3150.position.y = ExPipe.dimensions.OD + SP216.dimensions.bf + P3150.dimensions.OD;
	ExPipe_dummy.add(P3150);

	//UBolts that fix the hortizontal pipe
	UB5458 = new THREE.Object3D();
	// has six(QTY=6), they would be UB5458.A1/A2/B1/B2/C1/C2
	// UB5458.A1 OR named as UB5458A1
	drawElement(UB5458, '','UBolt', "Large T2", "5/8in X 4-5/8in X 7in X 3ft U-BOLT (HDG.)", "metal", "UB5458", false);
	UB5458.rotation.x = Math.PI;
	UB5458.rotation.y = Math.PI/2
	UB5458.position.y = ExPipe.dimensions.OD + SP216.dimensions.bf + P3150.dimensions.OD;
	UB5458.position.x = SP216.dimensions.height * 0.4;
	ExPipe_dummy.add(UB5458);

	UB1306_A2L = new THREE.Object3D(); 
	// has ten(QTY=30/3), they would be UB1306_A2L: Face A, Pipe#2, UBolt on the Left
	drawElement(UB1306_A2L, "",'UBolt',"Large T2", "U Bolt 3", "metal", "W44X335", false);
	UB1306_A2L.rotation.x = Math.PI;
	UB1306_A2L.rotation.y = Math.PI/2
	UB1306_A2L.position.y = ExPipe.dimensions.OD + SP216.dimensions.bf + P3150.dimensions.OD;
	UB1306_A2L.position.x = SP216.dimensions.height * 0.2;
	ExPipe_dummy.add(UB1306_A2L);

	UB1306_A2R = new THREE.Object3D(); 
	// can this be cloned from UB1306_A2L and then change its property?
	// UB1306_A2R: Face A, Pipe#2, UBolt on the Right
	drawElement(UB1306_A2R, "",'UBolt', "Large T2", "U Bolt 3", "metal", "W44X335", false);
	UB1306_A2R.rotation.x = Math.PI;
	UB1306_A2R.rotation.y = Math.PI/2
	UB1306_A2R.position.y = ExPipe.dimensions.OD + SP216.dimensions.bf + P3150.dimensions.OD;
	UB1306_A2R.position.x = - SP216.dimensions.height * 0.4;
	ExPipe_dummy.add(UB1306_A2R);

	UBolt6 = new THREE.Object3D(); 
	drawElement(UBolt6, "",'UBolt', "Large T2", "U Bolt 3", "metal", "W44X335", false);
	UBolt6.rotation.x = Math.PI;
	UBolt6.rotation.y = Math.PI/2
	UBolt6.position.y = ExPipe.dimensions.OD + SP216.dimensions.bf + P3150.dimensions.OD;
	UBolt6.position.x = - SP216.dimensions.height * 0.2;
	ExPipe_dummy.add(UBolt6);

	//The second node that will fix the horizontal pipes to the vertical one
	P263_Helper = new THREE.Object3D(); 
	P3150.add(P263_Helper);

	SP219 = new THREE.Object3D();
	drawElement(SP219, 6, "C",'C6X10.5', "U Bolt 1", "chrome", "SP219", true);
	SP219.rotation.y = -Math.PI/2
	SP219.rotation.x = Math.PI/2
	SP219.position.y = P3150.dimensions.OD + SP219.dimensions.bf/2;
	P263_Helper.add(SP219);

	P263 = new THREE.Object3D(); 
	drawElement(P263, 63, "Pipe",'P2.375x.154', "2-3/8 in O.D. SCH. 40 in PIPE", "chrome", "P263", true);
	P263.rotation.y = Math.PI/2;
	P263.position.y = P3150.dimensions.OD + SP219.dimensions.bf + P263.dimensions.OD;
	P263_Helper.add(P263);

	// UB1212
	UBolt1_1 = new THREE.Object3D(); 
	drawElement(UBolt1_1, "",'UBolt', "Large", "U Bolt 3", "metal", "W44X335", false);
	UBolt1_1.position.z = 1.5;
	P263_Helper.add(UBolt1_1);

	UBolt1_2 = new THREE.Object3D(); 
	drawElement(UBolt1_2, "",'UBolt', "Large", "U Bolt 3", "metal", "W44X335", false);
	UBolt1_2.position.z = -1.5;
	P263_Helper.add(UBolt1_2);

	scene.add(ExArm);
};