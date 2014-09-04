var SV197_36;
function drawAssembly(AssemblyNo){

	switch (AssemblyNo){
	case 'RMV12-363':
		var PartNo = 'SV197-36';
		SV197_36 = new drawPart(PartNo); //This will be the main object that will control all it's components. In order to have id displayed it needs to be added to scene
		scene.add(SV197_36)
		//var PartNo = 'SP216'; drawPart(PartNo);
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