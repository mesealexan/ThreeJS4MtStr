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
	
	if(SV197_36){
	SV197_36.rotation.y = effectController.EArmHR*Math.PI/180 + Math.PI;
	SV197_36.position.y = effectController.EArmVO*100 + 20;
	SV197_36_B.rotation.y = effectController.EArmHR*Math.PI/180 + Math.PI + Math.PI*2/3;
	SV197_36_B.position.y = effectController.EArmVO*100 + 20;
	SV197_36_C.rotation.y = effectController.EArmHR*Math.PI/180 + Math.PI - Math.PI*2/3;
	SV197_36_C.position.y = effectController.EArmVO*100 + 20;
	}
	
	if(dummy_plate)
	dummy_plate.rotation.y = effectController.PlateAHR*Math.PI/180;

	if(dummy_vert_1){
	dummy_vert_1.position.z = effectController.mPipeA1H*P3150.dimensions.D1*0.97;
	dummy_vert_1.rotation.y = effectController.mPipeA1R*Math.PI/180;
	}
	if(dummy_vert_2){
	dummy_vert_2.position.z = effectController.mPipeA2H*P3150.dimensions.D1*0.97;
	dummy_vert_2.rotation.y = effectController.mPipeA2R*Math.PI/180 + Math.PI/2;
	}
	if(dummy_vert_3){
	dummy_vert_3.position.z = effectController.mPipeA3H*P3150.dimensions.D1*0.97;
	dummy_vert_3.rotation.y = effectController.mPipeA3R*Math.PI/180 + Math.PI/2;
	}

	if(dummy_plate_B)
	dummy_plate_B.rotation.y = effectController.PlateBHR*Math.PI/180;

	if(dummy_vert_1_B){
	dummy_vert_1_B.position.z = effectController.mPipeB1H*P3150.dimensions.D1*0.97;
	dummy_vert_1_B.rotation.y = effectController.mPipeB1R*Math.PI/180;
	}
	if(dummy_vert_2_B){
	dummy_vert_2_B.position.z = effectController.mPipeB2H*P3150.dimensions.D1*0.97;
	dummy_vert_2_B.rotation.y = effectController.mPipeB2R*Math.PI/180 + Math.PI/2;
	}
	if(dummy_vert_3_B){
	dummy_vert_3_B.position.z = effectController.mPipeB3H*P3150.dimensions.D1*0.97;
	dummy_vert_3_B.rotation.y = effectController.mPipeB3R*Math.PI/180 + Math.PI/2;
	}

	if(dummy_plate_C)
	dummy_plate_C.rotation.y = effectController.PlateCHR*Math.PI/180;

	if(dummy_vert_1_C){
	dummy_vert_1_C.position.z = effectController.mPipeC1H*P3150.dimensions.D1*0.97;
	dummy_vert_1_C.rotation.y = effectController.mPipeC1R*Math.PI/180;
	}
	if(dummy_vert_2_C){
	dummy_vert_2_C.position.z = effectController.mPipeC2H*P3150.dimensions.D1*0.97;
	dummy_vert_2_C.rotation.y = effectController.mPipeC2R*Math.PI/180 + Math.PI/2;
	}
	if(dummy_vert_3_C){
	dummy_vert_3_C.position.z = effectController.mPipeC3H*P3150.dimensions.D1*0.97;
	dummy_vert_3_C.rotation.y = effectController.mPipeC3R*Math.PI/180 + Math.PI/2;
	}
/*
	//  LSCPlate2.position.z = effectController.mPipeBH*P3150.Length;
	if(P3150)
	P3150.position.x = effectController.mPipeAllV*P3150.dimensions.height*0.9;
	if(P263_Helper)
	P263_Helper.rotation.z = effectController.mP263Rot*Math.PI/180;
	if(Pipe2)
	Pipe2.position.z = effectController.mPipeAllV*Pipe2.Length;
	if(Pipe2_Helper)
	Pipe2_Helper.rotation.z = effectController.mPipe2Rot*Math.PI/180;
	if(P3150)
	P3150.position.z = effectController.HArmHO*P3150.Length;
*/
}
