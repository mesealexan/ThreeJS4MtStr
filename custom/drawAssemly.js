var RMV12_363 =  new THREE.Object3D();

function drawAssembly(AssemblyNo){
 	
	switch (AssemblyNo){
	case 'RMV12-363':
		//var PartNo = 'G58R-24'; G58R_24 = new drawPart(PartNo);  Assembly.add(G58R_24);
		//var PartNo = 'G58R-48'; G58R_48 = new drawPart(PartNo);  Assembly.add(G58R_48);
		/*
		var PartNo = 'A58234'; A58234 = new drawPart(PartNo);   Assembly.add(A58234);
		var PartNo = 'A58FW'; A58FW = new drawPart(PartNo);   Assembly.add(A58FW);
		var PartNo = 'G58LW'; G58LW = new drawPart(PartNo);   Assembly.add(G58LW);
  		var PartNo = 'A58NUT'; A58NUT = new drawPart(PartNo);   Assembly.add(A58NUT);
  		
  		var PartNo = 'G58FW'; G58FW = new drawPart(PartNo);   Assembly.add(G58FW);
  		var PartNo = 'G58NUT'; G58NUT = new drawPart(PartNo);   Assembly.add(G58NUT);
  		
  		var PartNo = 'G12NUT'; G12NUT = new drawPart(PartNo);   Assembly.add(G12NUT);
		var PartNo = 'G12FW'; G12FW = new drawPart(PartNo);   Assembly.add(G12FW);
		var PartNo = 'G12LW'; G12LW = new drawPart(PartNo);   Assembly.add(G12LW);
		
		var PartNo = 'P3150'; P3150 = new drawPart(PartNo);   Assembly.add(P3150);
		var PartNo = 'A'; A = new drawPart(PartNo);   Assembly.add(A);
		*/

		//Assembly A
		var AssemblyA = new THREE.Object3D();
		var PartNo = 'SV197-36'; SV197_36 = new drawPart(PartNo); 

		SV197_36.matrixWorldNeedsUpdate = true
		dummy_plate = new THREE.Object3D();
			dummy_plate.position.z = SV197_36.ExArm.dimensions.D1;
			SV197_36.add(dummy_plate);

		var PartNo = 'SP216'; SP216 = new drawPart(PartNo); 
			SP216.rotation.y = Math.PI/2;
			SP216.position.z = SP216.SP216.dimensions.bf/2 + SV197_36.ExArm.ExPipe.dimensions.OD; 
			dummy_plate.add(SP216);

		var PartNo = 'UB1306'; UB1306 = new drawPart(PartNo);  
			UB1306.rotation.z = Math.PI/2;
			UB1306.rotation.x = Math.PI/2;
			UB1306.position.x = SP216.SP216.dimensions.bf/2 + SV197_36.ExArm.ExPipe.dimensions.OD;
			UB1306.position.y = SV197_36.ExArm.ExPipe.dimensions.D1/2 * 0.6;

			UB1306_2 = duplicate(UB1306);
			UB1306_2.position.y = -SV197_36.ExArm.ExPipe.dimensions.D1/2 * 0.6;
			SP216.add(UB1306_2);
			SP216.add(UB1306);

		var PartNo = 'P3150'; P3150 = new drawPart(PartNo);   
			P3150.position.x = -(SP216.SP216.dimensions.bf/2 + P3150.P3150.dimensions.OD);
			SP216.add(P3150);

		var PartNo = 'UB5458'; UB5458 = new drawPart(PartNo);  
		UB5458_5 = duplicate(UB5458);
			UB5458.rotation.z = -Math.PI/2;
			UB5458.position.z = SP216.SP216.dimensions.d/2 *0.9;

		UB5458_2 = duplicate(UB5458);
			UB5458_2.position.z = SP216.SP216.dimensions.d/2 *0.4;

		UB5458_3 = duplicate(UB5458);
			UB5458_3.position.z = -SP216.SP216.dimensions.d/2 *0.4;

		UB5458_4 = duplicate(UB5458);
			UB5458_4.position.z = -SP216.SP216.dimensions.d/2 *0.9;

			P3150.add(UB5458);
			P3150.add(UB5458_2);
			P3150.add(UB5458_3);
			P3150.add(UB5458_4);

		dummy_vert_1 = new THREE.Object3D();
			dummy_vert_1.rotation.x = Math.PI/2
			P3150.add(dummy_vert_1);

		var PartNo = 'SP219'; SP219 = new drawPart(PartNo);   
			SP219.position.x = - (SP219.SP219.dimensions.bf/2 + P3150.P3150.dimensions.OD)
			dummy_vert_1.add(SP219);

			UB5458_5.rotation.z = Math.PI/2;
			UB5458_5.rotation.x = Math.PI/2;
			UB5458_5.position.y = SP219.SP219.dimensions.d/2*0.6;

		UB5458_6 = duplicate(UB5458_5);
			UB5458_5.position.y = -SP219.SP219.dimensions.d/2*0.6;
			dummy_vert_1.add(UB5458_6);
			dummy_vert_1.add(UB5458_5);

		var PartNo = 'A'; A = new drawPart(PartNo);  
			A.position.x = - (SP219.SP219.dimensions.bf/2 + A.A.dimensions.OD) 
			SP219.add(A);

		var PartNo = 'UB1212'; UB1212 = new drawPart(PartNo);
			UB1212.rotation.z = -Math.PI/2;
			UB1212.position.x = -(P3150.P3150.dimensions.OD + SP219.SP219.dimensions.bf + A.A.dimensions.OD);
			UB1212.position.z = SP219.SP219.dimensions.d/2*0.8;

		UB1212_2 = duplicate(UB1212);
			UB1212_2.position.z = -SP219.SP219.dimensions.d/2*0.8;
			dummy_vert_1.add(UB1212);
			dummy_vert_1.add(UB1212_2);

		dummy_vert_2 = duplicate(dummy_vert_1);
			UB5458.add(dummy_vert_2);

		dummy_vert_3 = duplicate(dummy_vert_1);
			UB5458.add(dummy_vert_3);
					
			AssemblyA.add(SV197_36);
			RMV12_363.AssemblyA = AssemblyA;
			RMV12_363.AssemblyA.dummy_vert_1 = dummy_vert_1;
			RMV12_363.AssemblyA.dummy_vert_1.A = A;

			RMV12_363.AssemblyA.dummy_vert_2 = dummy_vert_2;
			RMV12_363.AssemblyA.dummy_vert_2.A = A;

			RMV12_363.AssemblyA.dummy_vert_3 = dummy_vert_3;
			RMV12_363.AssemblyA.dummy_vert_3.A = A;

		//Assembly B
	var AssemblyB = new THREE.Object3D();
		var PartNo = 'SV197-36'; SV197_36_B = new drawPart(PartNo); 

		dummy_plate_B = new THREE.Object3D();
			dummy_plate_B.position.z = SV197_36_B.ExArm.dimensions.D1;
			SV197_36_B.add(dummy_plate_B);

		var PartNo = 'SP216'; SP216_B = new drawPart(PartNo); 
			SP216_B.rotation.y = Math.PI/2;
			SP216_B.position.z = SP216_B.SP216.dimensions.bf/2 + SV197_36_B.ExArm.ExPipe.dimensions.OD; 
			dummy_plate_B.add(SP216_B);

		var PartNo = 'UB1306'; UB1306_B = new drawPart(PartNo);  
			UB1306_B.rotation.z = Math.PI/2;
			UB1306_B.rotation.x = Math.PI/2;
			UB1306_B.position.x = SP216_B.SP216.dimensions.bf/2 + SV197_36_B.ExArm.ExPipe.dimensions.OD;
			UB1306_B.position.y = SV197_36_B.ExArm.ExPipe.dimensions.D1/2 * 0.6;

			UB1306_B_2 = duplicate(UB1306_B);
			UB1306_B_2.position.y = -SV197_36_B.ExArm.ExPipe.dimensions.D1/2 * 0.6;
			SP216_B.add(UB1306_B_2);
			SP216_B.add(UB1306_B);

		var PartNo = 'P3150'; P3150_B = new drawPart(PartNo);   
			P3150_B.position.x = -(SP216_B.SP216.dimensions.bf/2 + P3150_B.P3150.dimensions.OD);
			SP216_B.add(P3150_B);

		var PartNo = 'UB5458'; UB5458_B = new drawPart(PartNo);  
		UB5458_B_5 = duplicate(UB5458_B);
			UB5458_B.rotation.z = -Math.PI/2;
			UB5458_B.position.z = SP216_B.SP216.dimensions.d/2 *0.9;

		UB5458_B_2 = duplicate(UB5458_B);
			UB5458_B_2.position.z = SP216_B.SP216.dimensions.d/2 *0.4;

		UB5458_B_3 = duplicate(UB5458_B);
			UB5458_B_3.position.z = -SP216_B.SP216.dimensions.d/2 *0.4;

		UB5458_B_4 = duplicate(UB5458_B);
			UB5458_B_4.position.z = -SP216_B.SP216.dimensions.d/2 *0.9;

			P3150_B.add(UB5458_B);
			P3150_B.add(UB5458_B_2);
			P3150_B.add(UB5458_B_3);
			P3150_B.add(UB5458_B_4);

		dummy_vert_1_B = new THREE.Object3D();
			dummy_vert_1_B.rotation.x = Math.PI/2
			P3150_B.add(dummy_vert_1_B);

		var PartNo = 'SP219'; SP219_B = new drawPart(PartNo);   
			SP219_B.position.x = - (SP219_B.SP219.dimensions.bf/2 + P3150_B.P3150.dimensions.OD)
			dummy_vert_1_B.add(SP219_B);

			UB5458_B_5.rotation.z = Math.PI/2;
			UB5458_B_5.rotation.x = Math.PI/2;
			UB5458_B_5.position.y = SP219_B.SP219.dimensions.d/2*0.6;

		UB5458_B_6 = duplicate(UB5458_B_5);
			UB5458_B_5.position.y = -SP219_B.SP219.dimensions.d/2*0.6;
			dummy_vert_1_B.add(UB5458_B_6);
			dummy_vert_1_B.add(UB5458_B_5);

		var PartNo = 'A'; A_B = new drawPart(PartNo);  
			A_B.position.x = - (SP219_B.SP219.dimensions.bf/2 + A_B.A.dimensions.OD) 
			SP219_B.add(A_B);

		var PartNo = 'UB1212'; UB1212_B = new drawPart(PartNo);
			UB1212_B.rotation.z = -Math.PI/2;
			UB1212_B.position.x = -(P3150_B.P3150.dimensions.OD + SP219_B.SP219.dimensions.bf + A_B.A.dimensions.OD);
			UB1212_B.position.z = SP219_B.SP219.dimensions.d/2*0.8;

		UB1212_B_2 = duplicate(UB1212_B);
			UB1212_B_2.position.z = -SP219_B.SP219.dimensions.d/2*0.8;
			dummy_vert_1_B.add(UB1212_B);
			dummy_vert_1_B.add(UB1212_B_2);

		dummy_vert_2_B = duplicate(dummy_vert_1_B);
			UB5458_B.add(dummy_vert_2_B);

		dummy_vert_3_B = duplicate(dummy_vert_1_B);
			UB5458_B.add(dummy_vert_3_B);

			AssemblyB.add(SV197_36_B);
			RMV12_363.AssemblyB = AssemblyB;

//Assembly C
		var AssemblyC = new THREE.Object3D();
		var PartNo = 'SV197-36'; SV197_36_C = new drawPart(PartNo); 

		dummy_plate_C = new THREE.Object3D();
			dummy_plate_C.position.z = SV197_36_C.ExArm.dimensions.D1;
			SV197_36_C.add(dummy_plate_C);

		var PartNo = 'SP216'; SP216_C = new drawPart(PartNo); 
			SP216_C.rotation.y = Math.PI/2;
			SP216_C.position.z = SP216_C.SP216.dimensions.bf/2 + SV197_36_C.ExArm.ExPipe.dimensions.OD; 
			dummy_plate_C.add(SP216_C);

		var PartNo = 'UB1306'; UB1306_C = new drawPart(PartNo);  
			UB1306_C.rotation.z = Math.PI/2;
			UB1306_C.rotation.x = Math.PI/2;
			UB1306_C.position.x = SP216_C.SP216.dimensions.bf/2 + SV197_36_C.ExArm.ExPipe.dimensions.OD;
			UB1306_C.position.y = SV197_36_C.ExArm.ExPipe.dimensions.D1/2 * 0.6;

			UB1306_C_2 = duplicate(UB1306_C);
			UB1306_C_2.position.y = -SV197_36_C.ExArm.ExPipe.dimensions.D1/2 * 0.6;
			SP216_C.add(UB1306_C_2);
			SP216_C.add(UB1306_C);

		var PartNo = 'P3150'; P3150_C = new drawPart(PartNo);   
			P3150_C.position.x = -(SP216_C.SP216.dimensions.bf/2 + P3150_C.P3150.dimensions.OD);
			SP216_C.add(P3150_C);

		var PartNo = 'UB5458'; UB5458_C = new drawPart(PartNo);  
		UB5458_C_5 = duplicate(UB5458_C);
			UB5458_C.rotation.z = -Math.PI/2;
			UB5458_C.position.z = SP216_C.SP216.dimensions.d/2 *0.9;

		UB5458_C_2 = duplicate(UB5458_C);
			UB5458_C_2.position.z = SP216_C.SP216.dimensions.d/2 *0.4;

		UB5458_C_3 = duplicate(UB5458_C);
			UB5458_C_3.position.z = -SP216_C.SP216.dimensions.d/2 *0.4;

		UB5458_C_4 = duplicate(UB5458_C);
			UB5458_C_4.position.z = -SP216_C.SP216.dimensions.d/2 *0.9;

			P3150_C.add(UB5458_C);
			P3150_C.add(UB5458_C_2);
			P3150_C.add(UB5458_C_3);
			P3150_C.add(UB5458_C_4);

		dummy_vert_1_C = new THREE.Object3D();
			dummy_vert_1_C.rotation.x = Math.PI/2
			P3150_C.add(dummy_vert_1_C);

		var PartNo = 'SP219'; SP219_C = new drawPart(PartNo);   
			SP219_C.position.x = - (SP219_C.SP219.dimensions.bf/2 + P3150_C.P3150.dimensions.OD)
			dummy_vert_1_C.add(SP219_C);

			UB5458_C_5.rotation.z = Math.PI/2;
			UB5458_C_5.rotation.x = Math.PI/2;
			UB5458_C_5.position.y = SP219_C.SP219.dimensions.d/2*0.6;

		UB5458_C_6 = duplicate(UB5458_C_5);
			UB5458_C_5.position.y = -SP219_C.SP219.dimensions.d/2*0.6;
			dummy_vert_1_C.add(UB5458_C_6);
			dummy_vert_1_C.add(UB5458_C_5);

		var PartNo = 'A'; A_C = new drawPart(PartNo);  
			A_C.position.x = - (SP219_C.SP219.dimensions.bf/2 + A_C.A.dimensions.OD) 
			SP219_C.add(A_C);

		var PartNo = 'UB1212'; UB1212_C = new drawPart(PartNo);
			UB1212_C.rotation.z = -Math.PI/2;
			UB1212_C.position.x = -(P3150_C.P3150.dimensions.OD + SP219_C.SP219.dimensions.bf + A_C.A.dimensions.OD);
			UB1212_C.position.z = SP219_C.SP219.dimensions.d/2*0.8;

		UB1212_C_2 = duplicate(UB1212_C);
			UB1212_C_2.position.z = -SP219_C.SP219.dimensions.d/2*0.8;
			dummy_vert_1_C.add(UB1212_C);
			dummy_vert_1_C.add(UB1212_C_2);

		dummy_vert_2_C = duplicate(dummy_vert_1_C);
			UB5458_C.add(dummy_vert_2_C);

		dummy_vert_3_C = duplicate(dummy_vert_1_C);
			UB5458_C.add(dummy_vert_3_C);


			AssemblyC.add(SV197_36_C);
			RMV12_363.AssemblyC = AssemblyC;

			RMV12_363.add(AssemblyA);
			RMV12_363.add(AssemblyB);
			RMV12_363.add(AssemblyC);
			pushNamesA(RMV12_363.AssemblyA);
			pushNamesB(RMV12_363.AssemblyB);
			pushNamesC(RMV12_363.AssemblyC);
		break;
	case 'RMV12-372':
		break;
	case 'RMV12-384':
		break;
	case 'RMV12-396':
		break;	
	default:
		break;
	};
	scene.add(RMV12_363);
};

function pushNamesA(object){
var i=0;
	do{
			object.children[i].name = "A: " + object.children[i].name
		if(object.children[i].children.length>0)
			pushNamesA(object.children[i])
		i++
	} while (i < object.children.length)
}
function pushNamesB(object){
var i=0;
	do{
			object.children[i].name = "B: " + object.children[i].name
		if(object.children[i].children.length>0)
			pushNamesB(object.children[i])
		i++
	} while (i < object.children.length)
}
function pushNamesC(object){
var i=0;
	do{
			object.children[i].name = "C: " + object.children[i].name
		if(object.children[i].children.length>0)
			pushNamesC(object.children[i])
		i++
	} while (i < object.children.length)
}

