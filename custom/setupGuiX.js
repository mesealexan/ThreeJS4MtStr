function setupGui() {

effectController = {
Nodes:'none',
Members:true,
Lines:true
};

var gui = new dat.GUI();

var h = gui.addFolder("Toggle Display");
h.open();
h.add(effectController, "Nodes", [ 'none','selected','all']).name("Node Names").onChange( function() { 
	if(effectController.Nodes === 'all')
	{
		scene.add(nodeText);
		selectedTrigger = false
	}
	else if(effectController.Nodes === 'none' && nodeText)
	{
		scene.remove(nodeText);
		selectedTrigger = false
	}
	else{
		selectedTrigger = true;
	}
	} ); 
h.add(effectController, 'Members', true).name("Members").onChange( function() { 
	if(effectController.Members === true)
		scene.add(Tower);
	else 
		scene.remove(Tower);
	} ); 
h.add(effectController, 'Lines', true).name("Lines").onChange( function() { 
	if(effectController.Lines === true)
		scene.add(lines);
	else 
		scene.remove(lines);
	} ); 


}