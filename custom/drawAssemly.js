
function drawAssembly(AssemblyNo){

	switch (AssemblyNo){
	case 'RMV12-363':
		var PartNo = 'SV197-36';
		SV197_36 = new drawPart(PartNo); //This will be the main object that will control all it's components. In order to have id displayed it needs to be added to scene
			scene.add(SV197_36)

		var PartNo = 'SP216'; 
		SP216 = new drawPart(PartNo);
			//move the entire assembly to the center of the pipe. All parts will be created in resepct to this point
			SP216.position.z = SV197_36.ExArm.dimensions.D1 +  SV197_36.ExArm.ExPipe.dimensions.OD; 
			scene.add(SP216)
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
	
};