//Function used to draw members
function drawTower(obj){
	for(j=0;j<members.length;j++)
	{
		var CrossSectionType = members[j].getAttribute("CrossSectionType");
		var Shape = members[j].getAttribute("Shape");
		var shapeSize = searchShapes(CrossSectionType, Shape);
		var fromPoint = members[j].getAttribute("N_I");
		var toPoint = members[j].getAttribute("N_J");
		var vectorStart = searchNodes(fromPoint);
		var vectorEnd = searchNodes(toPoint);
		var pointLength = vectorStart.distanceTo(vectorEnd);
		if(shapeSize !== undefined)
		{
			if(shapeSize.type === "PIPE"){
				var object = drawBar(shapeSize, pointLength, setMaterial("chrome"), false);
				object.position.copy(vectorStart);
				object.lookAt(vectorEnd);
				object.scale.z = 0.8;
				object.translateZ(pointLength*((1 - object.scale.z)/2))
				object.name = members[j].getAttribute("CrossSectionType") + " " + members[j].getAttribute("Shape");
				obj.add(object);
			}
			if(shapeSize.type === "ANGLE")
			{
				var object = drawHHS_Rect2(shapeSize, pointLength, setMaterial("chrome"), false);
				object.position.copy(vectorStart);
				object.lookAt(vectorEnd);
				object.scale.z = 0.8;
				object.translateZ(pointLength*((1 - object.scale.z)/2));
				object.name = members[j].getAttribute("CrossSectionType") + " " + members[j].getAttribute("Shape");
				obj.add(object)
			}
		}
	}
}

//Function used to draw lines
function drawLines(obj){
	var material = new THREE.LineBasicMaterial({color: 0x444444});
	for(j=0;j<members.length;j++)
	{
		var geometry = new THREE.Geometry();
		var fromPoint = members[j].getAttribute("N_I");
		var toPoint = members[j].getAttribute("N_J");
		geometry.vertices.push(searchNodes(fromPoint));
		geometry.vertices.push(searchNodes(toPoint));
		var line = new THREE.Line(geometry, material);
		obj.add(line)
	}
}

//Function used to return the shape that has this type and name
function searchShapes(type, name){
	if(type === 'Pipe')
		type = 'PIPE'
	if(type === 'Single Angle')
		type = 'ANGLE'
	for(var i=0;i<shapes.length;i++)
	{
		if(shapes[i].getAttribute("TYPE") === type && shapes[i].getAttribute("NAME") === name)
			if(type === 'PIPE')
				return {
					type: "PIPE",
					OD: parseFloat(shapes[i].getAttribute('OD')),
					t: parseFloat(shapes[i].getAttribute('t'))
				}
			else if(type === 'ANGLE')
				return {
					type: "ANGLE",
					B: parseFloat(shapes[i].getAttribute('B')),
					C: parseFloat(shapes[i].getAttribute('C')),
					A: parseFloat(shapes[i].getAttribute('A'))
				}
	}
	return undefined
}

//Function used to return the Node that has this ID
function searchNodes(ID){
	for(i=0;i<nodes.length;i++)
	{
		if(nodes[i].getAttribute("ID") === ID)
			return (new THREE.Vector3(parseFloat(nodes[i].getAttribute("X")), parseFloat(nodes[i].getAttribute("Y")), parseFloat(nodes[i].getAttribute("Z"))))
	}
	return undefined
}

//Function used to create the sphere nodes
function addNodePoints(object){
	for(i=0;i<nodes.length;i++){
		var posX = parseFloat(nodes[i].getAttribute("X"));
		var posY = parseFloat(nodes[i].getAttribute("Y"));
		var posZ = parseFloat(nodes[i].getAttribute("Z"));
		var sphere = new THREE.Mesh(new THREE.SphereGeometry(0.4, 8, 8), new THREE.MeshPhongMaterial({color: 0x111111}));
		sphere.position.set(posX,posY,posZ);
		sphere.name = nodes[i].getAttribute("ID");
		ray_objects.push(sphere);
		object.add(sphere);
	}

}

//Function used to display all nodes texts
function addNodesText(object){
	for(i=0;i<nodes.length;i++){
		var posX = parseFloat(nodes[i].getAttribute("X"));
		var posY = parseFloat(nodes[i].getAttribute("Y"));
		var posZ = parseFloat(nodes[i].getAttribute("Z"));
		var textToDisplay = nodes[i].getAttribute("ID") + " (" + posX + ", " + posY + ", " + posZ + ") "
		var sprite = makeTextSprite(textToDisplay , { fontsize: 24 } );
		sprite.position.set( posX, posY, posZ);
		object.add( sprite );
	}
}

//Function used to display single node texts
function addSingleText( name){
	if(textHolder)
		scene.remove(textHolder)
	var positioning = searchNodes(name);
	var textToDisplay = name + " (" + positioning.x + ", " + positioning.y + ", " + positioning.z + ") ";
	textHolder = makeTextSprite(textToDisplay , { fontsize: 24 } );
		textHolder.position.set( positioning.x, positioning.y, positioning.z );
		scene.add( textHolder );
}

//Function used to generate text boxes
function makeTextSprite( message, parameters )
{
	if ( parameters === undefined ) parameters = {};
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 16;
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
	var spriteAlignment = THREE.SpriteAlignment.topLeft;
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "Bold " + fontsize + "px " + fontface;
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";
	context.lineWidth = borderThickness;
	context.fillStyle = "rgba(0, 0, 0, 1.0)";
	context.fillText( message, borderThickness, fontsize + borderThickness);
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;
	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture, useScreenCoordinates: false, alignment: spriteAlignment } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(20,10,1.0);
	return sprite;	
}

