
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
	
	if(RMV12_363)
	{
		RMV12_363.rotation.y = effectController.EArmRot*Math.PI/180;
		RMV12_363.position.y = effectController.EArmVO*100 + 20;
	}
	
	if(RMV12_363.AssemblyA) //check for assembly A
	{
	RMV12_363.AssemblyA.rotation.y = effectController.ArmARot*Math.PI/180 + Math.PI;
	RMV12_363.AssemblyA.position.z = -effectController.ArmADist;
	RMV12_363.AssemblyA.dummy_plate.rotation.y = effectController.PlateAHR*Math.PI/180;

	RMV12_363.AssemblyA.dummy_vert_1.position.z = effectController.mPipeA1H*P3150.P3150.dimensions.D1*0.97;
	RMV12_363.AssemblyA.dummy_vert_1.rotation.y = effectController.mPipeA1R*Math.PI/180;
	RMV12_363.AssemblyA.dummy_vert_1.VP.position.z = -effectController.mPipeA1V*A.A.dimensions.D1;

	RMV12_363.AssemblyA.dummy_vert_2.position.z = effectController.mPipeA2H*P3150.P3150.dimensions.D1*0.97;
	RMV12_363.AssemblyA.dummy_vert_2.rotation.y = effectController.mPipeA2R*Math.PI/180;
	RMV12_363.AssemblyA.dummy_vert_2.VP.position.z = -effectController.mPipeA2V*A.A.dimensions.D1;

	RMV12_363.AssemblyA.dummy_vert_3.position.z = effectController.mPipeA3H*P3150.P3150.dimensions.D1*0.97;
	RMV12_363.AssemblyA.dummy_vert_3.rotation.y = effectController.mPipeA3R*Math.PI/180;
	RMV12_363.AssemblyA.dummy_vert_3.VP.position.z = -effectController.mPipeA3V*A.A.dimensions.D1;

	}
	
	if(RMV12_363.AssemblyB) //check for assembly B
	{
	RMV12_363.AssemblyB.rotation.y = effectController.ArmBRot*Math.PI/180 + Math.PI + Math.PI*2/3;
	RMV12_363.AssemblyB.position.z = effectController.ArmBDist*0.49999999999999933;
	RMV12_363.AssemblyB.position.x = effectController.ArmBDist*(-0.866025403784439);
	RMV12_363.AssemblyB.dummy_plate.rotation.y = effectController.PlateBHR*Math.PI/180;

	RMV12_363.AssemblyB.dummy_vert_1.position.z = effectController.mPipeB1H*P3150.P3150.dimensions.D1*0.97;
	RMV12_363.AssemblyB.dummy_vert_1.rotation.y = effectController.mPipeB1R*Math.PI/180;
	RMV12_363.AssemblyB.dummy_vert_1.VP.position.z = -effectController.mPipeB1V*A.A.dimensions.D1;

	RMV12_363.AssemblyB.dummy_vert_2.position.z = effectController.mPipeB2H*P3150.P3150.dimensions.D1*0.97;
	RMV12_363.AssemblyB.dummy_vert_2.rotation.y = effectController.mPipeB2R*Math.PI/180;
	RMV12_363.AssemblyB.dummy_vert_2.VP.position.z = -effectController.mPipeB2V*A.A.dimensions.D1;

	RMV12_363.AssemblyB.dummy_vert_3.position.z = effectController.mPipeB3H*P3150.P3150.dimensions.D1*0.97;
	RMV12_363.AssemblyB.dummy_vert_3.rotation.y = effectController.mPipeB3R*Math.PI/180;
	RMV12_363.AssemblyB.dummy_vert_3.VP.position.z = -effectController.mPipeB3V*A.A.dimensions.D1;
	}

	if(RMV12_363.AssemblyC) ////check for assembly C
	{
	RMV12_363.AssemblyC.rotation.y = effectController.ArmCRot*Math.PI/180 + Math.PI - Math.PI*2/3;
	RMV12_363.AssemblyC.position.z = effectController.ArmCDist*0.4999999999999999;
	RMV12_363.AssemblyC.position.x = effectController.ArmCDist*0.8660254037844387;
	RMV12_363.AssemblyC.dummy_plate.rotation.y = effectController.PlateCHR*Math.PI/180;

	RMV12_363.AssemblyC.dummy_vert_1.position.z = effectController.mPipeC1H*P3150.P3150.dimensions.D1*0.97;
	RMV12_363.AssemblyC.dummy_vert_1.rotation.y = effectController.mPipeC1R*Math.PI/180;
	RMV12_363.AssemblyC.dummy_vert_1.VP.position.z = -effectController.mPipeC1V*A.A.dimensions.D1;

	RMV12_363.AssemblyC.dummy_vert_2.position.z = effectController.mPipeC2H*P3150.P3150.dimensions.D1*0.97;
	RMV12_363.AssemblyC.dummy_vert_2.rotation.y = effectController.mPipeC2R*Math.PI/180;
	RMV12_363.AssemblyC.dummy_vert_2.VP.position.z = -effectController.mPipeC2V*A.A.dimensions.D1;

	RMV12_363.AssemblyC.dummy_vert_3.position.z = effectController.mPipeC3H*P3150.P3150.dimensions.D1*0.97;
	RMV12_363.AssemblyC.dummy_vert_3.rotation.y = effectController.mPipeC3R*Math.PI/180;
	RMV12_363.AssemblyC.dummy_vert_3.VP.position.z = -effectController.mPipeC3V*A.A.dimensions.D1;
	}

}
