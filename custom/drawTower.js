function drawTowerLines(){
	var material = new THREE.LineBasicMaterial({color: 0x0000ff});
	var geometry = new THREE.Geometry();

	for(i=0;i<nodes.length;i++)
		{

		var posX = parseFloat(nodes[i].getAttribute("X"));
		var posY = parseFloat(nodes[i].getAttribute("Y"));
		var posZ = parseFloat(nodes[i].getAttribute("Z"));
		geometry.vertices.push(new THREE.Vector3(posX, posY, posZ));
		}

	var line = new THREE.Line(geometry, material);

    return (line);
}

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

function searchNodes(ID){
	for(i=0;i<nodes.length;i++)
	{
		if(nodes[i].getAttribute("ID") === ID)
			return (new THREE.Vector3(parseFloat(nodes[i].getAttribute("X")), parseFloat(nodes[i].getAttribute("Y")), parseFloat(nodes[i].getAttribute("Z"))))
	}
	return undefined
}



function drawBar(shapeSize, D1, material,centerPivot){
	var OD = shapeSize.OD*0.1
	var t_nom = shapeSize.t*0.1

	var shape = new THREE.Shape();
	shape.absarc( 0, 0, OD, 0, Math.PI*2, true );

	geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:D1, steps: 10, curveSegments:10} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0x333333, specular: 0xfefefe, shininess: 5}) );
	mesh.dimensions = {};
	mesh.dimensions.OD = OD;
	mesh.dimensions.t_nom = t_nom;
	mesh.dimensions.D1 = D1;
	mesh.name = 'Pipe ' + shapeSize;
	ray_objects.push(mesh);
	mesh.matValue = material;
	return(mesh)
}
function drawHHS_Rect2(shapeSize, D1, material,centerPivot){
	var h = shapeSize.B *0.1;
	var b = shapeSize.C *0.1;
	var t_des = shapeSize.A;
	var f1 = 0.01;

	var shape = new THREE.Shape();
	shape.moveTo(-b/2+f1,-h/2);
	shape.lineTo(b/2-f1,-h/2);
	shape.lineTo(b/2,-h/2+f1);
	shape.lineTo(b/2,h/2-f1);
	shape.lineTo(b/2-f1,h/2);
	shape.lineTo(-b/2+f1,h/2);
	shape.lineTo(-b/2,h/2-f1);
	shape.lineTo(-b/2,-h/2+f1);
	shape.lineTo(-b/2+f1,-h/2);

	var hole = new THREE.Path();
	hole.moveTo(-b/2+f1+t_des,-h/2+t_des);
	hole.lineTo(b/2-f1-t_des,-h/2+t_des);
	hole.lineTo(b/2-t_des,-h/2+f1+t_des);
	hole.lineTo(b/2-t_des,h/2-f1-t_des);
	hole.lineTo(b/2-f1-t_des,h/2-t_des);
	hole.lineTo(-b/2+f1+t_des,h/2-t_des);
	hole.lineTo(-b/2+t_des,h/2-f1-t_des);
	hole.lineTo(-b/2+t_des,-h/2+f1+t_des);
	hole.lineTo(-b/2+f1+t_des,-h/2+t_des);
	shape.holes.push( hole );

	geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:D1} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	mesh = new THREE.Mesh( geometry,  new THREE.MeshPhongMaterial( { color: 0x666666, specular: 0xfefefe, shininess: 5}) );
	mesh.dimensions = {};
	mesh.dimensions.h = h;
	mesh.dimensions.b = b;
	mesh.dimensions.t_des = t_des;
	mesh.dimensions.f1 = f1;
	mesh.dimensions.D1 = D1;
	mesh.name = 'HHS(Rect) ' + shapeSize;
	ray_objects.push(mesh);
	mesh.matValue = material;
	return(mesh)
}

function addNodePoints(object){
	//var sphereContainer = new THREE.Object3D();
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
	//return sphereContainer;
}

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
function addSingleText(name){
	var positioning = searchNodes(name);
	var textToDisplay = nodes[i].getAttribute("ID") + " (" + positioning.x + ", " + positioning.y + ", " + positioning.z + ") ";
	var sprite = makeTextSprite(textToDisplay , { fontsize: 24 } );
		sprite.position.set( positioning );
		scene.add( sprite );
}

function makeTextSprite( message, parameters )
{
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
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
    
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	
	// background color
	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
								  + backgroundColor.b + "," + backgroundColor.a + ")";
	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

	context.lineWidth = borderThickness;
	// text color
	context.fillStyle = "rgba(0, 0, 0, 1.0)";

	context.fillText( message, borderThickness, fontsize + borderThickness);
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture, useScreenCoordinates: false, alignment: spriteAlignment } );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(20,10,1.0);
	return sprite;	
}

