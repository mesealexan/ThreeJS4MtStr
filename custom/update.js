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
	/*
	if(ExArm){
	ExArm.rotation.y = effectController.EArmHR*Math.PI/180 + Math.PI;
	ExArm.position.y = effectController.EArmVO*100 + 20;
	}
	if(ExPipe_dummy)
	ExPipe_dummy.rotation.z = effectController.PlateHR*Math.PI/180;
	if(P263_Helper)
	P263_Helper.position.z = effectController.mPipeAH*P3150.dimensions.height*0.97;
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
