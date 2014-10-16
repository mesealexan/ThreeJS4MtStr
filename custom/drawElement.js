
function getshapeData(shapeType,shapeSize){
	// shapeType_Temp = 'HSS(Rect)'; shapeSize_Temp = 'HSS6X3X1/8';
	var shapeResult = jQuery.ajax({
	url: "queryDatabase.php",
	data: {Data2Query: 'MtStr_G', Fields: 'Shape', Mbr_Shape: shapeType, Mbr_Shape_Model: shapeSize},
	dataType: 'json',
	async: false
	}).responseText; // get the response data as a string	
	// alert(shapeResult);
	var shapeArray = jQuery.parseJSON(shapeResult);
	// jQuery.each(shapeArray, function (idx, shapeData) { //Each shapeData form
	// the return would not return in "jQuery.each"
	shapeData = shapeArray[0];
	// console.log(shapeData);	
	return(shapeData);
}

function drawElement( D1, sectionType, shapeSize, description, material, partNo, centerPivot){
	var mesh;
	switch (sectionType){
	case "I":
			mesh = new drawI(shapeSize, D1, material,centerPivot);
			mesh.name = partNo + " ";
			break;
	case "L":
			mesh = new drawL(shapeSize, D1, material,centerPivot);
			mesh.name = partNo + " ";
			break;
	case "C":
			mesh = new drawC(shapeSize, D1, material, centerPivot);
			mesh.name = partNo + " ";
			break;
	case "Pipe":
			mesh = new drawPipe(shapeSize, D1, material, centerPivot);
			mesh.name = partNo + " ";
			break;
	case "HHS(Rect)":
			mesh = new drawHHS_Rect(shapeSize, D1, material, centerPivot);
			mesh.name = partNo + " ";
			break;
	case "U Bolt":
			//NOTE D1 = length, shapeSize = width
			mesh = new drawUBolt(D1, shapeSize, 0.2, D1/2, true, true, 0.5, material, centerPivot);
			mesh.name = partNo + " ";
			break;
	case "SR":
			mesh = new drawSR(shapeSize,D1, material, centerPivot);
			mesh.name = partNo + " ";
			break;
	case "Nut":
			//NOTE D1 = radius, shapeSize = thickness
			mesh = new drawNut(D1, shapeSize ,material, centerPivot);
			mesh.name = partNo + " ";
			break;
	case "Hex Bolt":
			mesh = new drawHexBolt(8, 1.125, 5, 0.5, material, centerPivot);
			mesh.name = partNo + " ";
			break;
	case "Donut":
			//NOTE D1 = radius, shapeSize = tubular radius
			mesh = new drawDonut(D1, shapeSize, material,centerPivot);
			mesh.name = partNo + " ";
			break;
	default:
		alert("Something went wrong! Check drawElement")
		break;
	}
	mesh.partNo = partNo;
	mesh.description = description;
	return(mesh)
}

function setMaterial(value){
	switch(value){
	case 'metal':
		var material = new THREE.MeshNormalMaterial(  );
		break;
	case 'aluminium':
		var material = new THREE.MeshPhongMaterial( { color: 0xeeeeee, specular: 0xfefefe, shininess: 5, side:THREE.DoubleSide } );
		break;
	case 'chrome':
		var material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, specular: 0xababab, shininess: 10, metal:true, side:THREE.DoubleSide } );
		break;
	default:
		break;}
	return(material)
}

/////////////Drawing functions.
/////////////Please note that these functions now create a mesh and not a shape thus simplyfing drawElement function

function drawHHS_Rect(shapeSize, D1, material,centerPivot){
	var shapeData = getshapeData('HHS(Rect)',shapeSize);
	var h = parseFloat(shapeData.Ht);
	var b = parseFloat(shapeData.b);
	var t_des = parseFloat(shapeData.t_des);
	var f1 = 0.3;

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
	mesh = new THREE.Mesh( geometry, setMaterial(material) );
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

function drawC(shapeSize, D1, material,centerPivot){
	var shapeData = getshapeData('C',shapeSize);
	var d  = parseFloat(shapeData.d);
	var bf = parseFloat(shapeData.b_f);
	var tf = parseFloat(shapeData.t_f);
	var tw = parseFloat(shapeData.t_w);
	var xbar = parseFloat(shapeData.x);

	var shape = new THREE.Shape();
	shape.moveTo(-xbar,-d/2);
	shape.lineTo(-xbar+bf,-d/2);
	shape.lineTo(-xbar+bf-tf,-d/2+tf);
	shape.lineTo(-xbar+tw+tw,-d/2+tf);
	shape.lineTo(-xbar+tw,-d/2+tf+tw);
	shape.lineTo(-xbar+tw,d/2-tf-tw);
	shape.lineTo(-xbar+tw+tw,d/2-tf);
	shape.lineTo(-xbar+bf-tf,d/2-tf);
	shape.lineTo(-xbar+bf,d/2);
	shape.lineTo(-xbar,d/2);
	shape.lineTo(-xbar,-d/2);

	geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:D1} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	mesh = new THREE.Mesh( geometry, setMaterial(material) );
	mesh.dimensions = {};
	mesh.dimensions.d = d;
	mesh.dimensions.bf = bf;
	mesh.dimensions.tf = tf;
	mesh.dimensions.tw = tw;
	mesh.dimensions.xbar = xbar;
	mesh.dimensions.D1 = D1;
	mesh.name = 'C ' + shapeSize;
	ray_objects.push(mesh);
	mesh.matValue = material;
	return(mesh)
}

function drawL(shapeSize, D1, material,centerPivot){
	var shapeData = getshapeData('L_E',shapeSize);
	var d  = parseFloat(shapeData.d);
	var b = parseFloat(shapeData.b);
	var t = parseFloat(shapeData.t);
	var xbar = parseFloat(shapeData.x);
	var ybar = parseFloat(shapeData.y);

	var shape = new THREE.Shape();
	shape.moveTo(-xbar,d-ybar);
	shape.lineTo(-xbar+t,d-ybar-t);
	shape.lineTo(-xbar+t,-ybar+t+t);
	shape.lineTo(-xbar+t+t,-ybar+t);
	shape.lineTo(-xbar+b-t,-ybar+t);
	shape.lineTo(-xbar+b,-ybar);
	shape.lineTo(-xbar,-ybar);
	shape.lineTo(-xbar,d-ybar);
	
	geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:D1} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	mesh = new THREE.Mesh( geometry, setMaterial(material) );
	mesh.dimensions = {};
	mesh.dimensions.d = d;
	mesh.dimensions.b = b;
	mesh.dimensions.t = t;
	mesh.dimensions.ybar = ybar;
	mesh.dimensions.xbar = xbar;
	mesh.dimensions.D1 = D1;
	mesh.name = 'L_E ' + shapeSize;
	ray_objects.push(mesh);
	mesh.matValue = material;
	return(mesh)
}

function drawSR(shapeSize, D1, material, centerPivot){
	var shapeData = getshapeData('SR',shapeSize);
	var OD = parseFloat(shapeData.OD);

	var shape = new THREE.Shape();
	shape.absarc( 0, 0, OD, 0, Math.PI*2, true );

	geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:D1} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	mesh = new THREE.Mesh( geometry, setMaterial(material) );
	mesh.dimensions = {};
	mesh.dimensions.OD = OD;
	mesh.dimensions.D1 = D1;
	mesh.name = 'SR ' + shapeSize;
	ray_objects.push(mesh);
	mesh.matValue = material;
	return(mesh)
}

function drawPipe(shapeSize, D1, material,centerPivot){
	var shapeData = getshapeData('Pipe',shapeSize);
	var OD = parseFloat(shapeData.OD);
	var t_nom = parseFloat(shapeData.t);

	var shape = new THREE.Shape();
	shape.absarc( 0, 0, OD, 0, Math.PI*2, true );

	var holePath = new THREE.Path();
	holePath.absarc(0, 0, OD-t_nom, 0, Math.PI*2, false );
	shape.holes.push( holePath );

	geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:D1, steps: 50, curveSegments:50} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	mesh = new THREE.Mesh( geometry, setMaterial(material) );
	mesh.dimensions = {};
	mesh.dimensions.OD = OD;
	mesh.dimensions.t_nom = t_nom;
	mesh.dimensions.D1 = D1;
	mesh.name = 'Pipe ' + shapeSize;
	ray_objects.push(mesh);
	mesh.matValue = material;
	return(mesh)
}

function drawHexBolt(height, radius, thread, NutOffset, material, centerPivot){
	var shape = new THREE.Shape();
	shape.moveTo(-(radius*Math.sqrt(3))/2,-radius/2);
	shape.lineTo(0,-radius);	
	shape.lineTo((radius*Math.sqrt(3))/2,-radius/2);
	shape.lineTo((radius*Math.sqrt(3))/2,radius/2);
	shape.lineTo(0,radius);
	shape.lineTo(-(radius*Math.sqrt(3))/2,radius/2);
	shape.lineTo(-(radius*Math.sqrt(3))/2,-radius/2);

	var geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:radius/2.25} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);

	

	var cylinder_geo = new THREE.CylinderGeometry(radius/2, radius/2, height - thread, 32, 32, false);
	cylinder_geo.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
	cylinder_geo.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, height/2 - thread/2) )

	var thread_geo = new THREE.CylinderGeometry(radius/2.2, radius/2.2, thread, 32, 32, false);
	thread_geo.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
	thread_geo.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, height - thread/2) )

	THREE.GeometryUtils.merge(geometry, cylinder_geo);
	THREE.GeometryUtils.merge(geometry, thread_geo);

	var nut = new drawNut(radius/2.2, radius/2.25 ,setMaterial(material), true);
	nut.position.z = height - NutOffset;

	THREE.GeometryUtils.merge(geometry, nut);

	mesh = new THREE.Mesh( geometry, setMaterial(material) );
	mesh.dimensions = {};
	mesh.dimensions.radius = radius;
	mesh.name = 'Hex Bolt ' + radius;
	ray_objects.push(mesh);
	mesh.matValue = material;
	return(mesh)
}

function drawNut(innerRadius, height ,material, centerPivot){
	var radius = innerRadius*1.8;
	var shape = new THREE.Shape();
	shape.moveTo(-(radius*Math.sqrt(3))/2,-radius/2);
	shape.lineTo(0,-radius);	
	shape.lineTo((radius*Math.sqrt(3))/2,-radius/2);
	shape.lineTo((radius*Math.sqrt(3))/2,radius/2);
	shape.lineTo(0,radius);
	shape.lineTo(-(radius*Math.sqrt(3))/2,radius/2);
	shape.lineTo(-(radius*Math.sqrt(3))/2,-radius/2);

	var holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI*2, false );
    shape.holes.push( holePath );

	var geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:height} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);

	mesh = new THREE.Mesh( geometry, setMaterial(material) );
	mesh.dimensions = {};
	mesh.dimensions.radius = radius;
	mesh.name = 'Nut ' + innerRadius;
	ray_objects.push(mesh);
	return(mesh)
}

function drawI(shapeSize, D1, material,centerPivot){
	////////////////////////////////////////////////
	//////////////Need DB entry for shapeType///////
	////////////////////////////////////////////////
	var shapeData = getshapeData('?????',shapeSize);
	var d  = parseFloat(shapeData.d);
	var bf = parseFloat(shapeData.b_f);
	var T = parseFloat(shapeData.t);
	var tw = parseFloat(shapeData.t_w);
	var tf = parseFloat(shapeData.t_f);
	var k1 = parseFloat(shapeData.k_1);

	var shape = new THREE.Shape();
	shape.moveTo(-bf/2, -d/2);
	shape.lineTo(bf/2, -d/2);
	shape.lineTo(bf/2, -d/2 + tf);
	shape.lineTo(k1, -d/2 + tf);
	shape.lineTo(tw/2, -T/2);
	shape.lineTo(tw/2, T/2);
	shape.lineTo(k1, d/2 - tf); 
	shape.lineTo(bf/2, d/2 - tf);
	shape.lineTo(bf/2, d/2);
	shape.lineTo(-bf/2, d/2);
	shape.lineTo(-bf/2, d/2 - tf);
	shape.lineTo(-k1, d/2 - tf);
	shape.lineTo(-tw/2, T/2);
	shape.lineTo(-tw/2, -T/2);
	shape.lineTo(-k1, -d/2 + tf);
	shape.lineTo(-bf/2, -d/2 + tf);
	shape.lineTo(-bf/2, -d/2);

	geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:D1} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	mesh = new THREE.Mesh( geometry, setMaterial(material) );
	mesh.dimensions = {};
	mesh.dimensions.d = d;
	mesh.dimensions.bf = bf;
	mesh.dimensions.T = T;
	mesh.dimensions.tw = tw;
	mesh.dimensions.tf = tf;
	mesh.dimensions.k1 = k1;
	mesh.name = '???? ' + shapeSize;
	ray_objects.push(mesh);
	mesh.matValue = material;
	return(mesh);
}

function drawDonut(radius, tubeRadius, material,centerPivot){
	var arc = 350*Math.PI/180;
	var geometry = new THREE.TorusGeometry( radius, tubeRadius, 16, 32, arc );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	mesh = new THREE.Mesh(geometry, setMaterial(material));
	mesh.dimensions = {};
	mesh.dimensions.radius = radius;
	mesh.dimensions.tubeRadius = tubeRadius;
	mesh.name = "Donut " + radius;
	ray_objects.push(mesh);
	mesh.matValue = material;
	return(mesh)
}
function drawUBolt(height, width, thickness, thread, leftNut, rightNut, NutOffset, material, centerPivot){
//Create the extrusion path
	var points = [];
	//Push the first point
	points.push(new THREE.Vector3(width/2 ,(height-width/2)-thread,0));
	points.push(new THREE.Vector3(width/2 ,((height-width/2)-thread)/2,0));
	//Draw half circle
	var resolution = 9;
	var size = 180/resolution;
	var radius = width/2;
	for(var i=0; i <=resolution; i++) {
	    var segment = ( i * size ) * Math.PI / 180;
	    points.push( 
	    	new THREE.Vector3( 
	    		Math.cos( segment ) * radius,
	    		-Math.sin( segment ) * radius,
	    		0
	    		));
	    }
	//Push the last point
	points.push(new THREE.Vector3(-width/2,((height-width/2)-thread)/2,0));
	points.push(new THREE.Vector3(-width/2,(height-width/2)-thread,0));
	//Create the spline from the above points
	var spline = new THREE.SplineCurve3(points);
	//Extrude settings
	var extrudeSettings = {
	        steps           : 100,
	        bevelEnabled    : false,
	        extrudePath     : spline
	    };
//Create the section shape
    var arcShape = new THREE.Shape();
    arcShape.absarc( 0, 0, thickness, 0, Math.PI*2, true );
//Create the geometry
    var geometry = new THREE.ExtrudeGeometry( arcShape, extrudeSettings );
    if(centerPivot)
		THREE.GeometryUtils.center(geometry);
//Create the thread parts
	var cylinderL = new THREE.Mesh(new THREE.CylinderGeometry(thickness*0.8, thickness*0.8, thread, 16, resolution, false),setMaterial(material));
	cylinderL.position.x = -width/2;
	cylinderL.position.y = height - width/2 -thread/2;

	THREE.GeometryUtils.merge(geometry, cylinderL);

	var cylinderR = new THREE.Mesh(new THREE.CylinderGeometry(thickness*0.8, thickness*0.8, thread, 16, resolution, false),setMaterial(material));
	cylinderR.position.x = width/2;
	cylinderR.position.y = height - width/2 -thread/2;

	THREE.GeometryUtils.merge(geometry, cylinderR);

//Create Nuts
	if(leftNut){
		var NutLeft = new drawNut(thickness*0.81, thickness ,setMaterial(material));
		NutLeft.rotation.x = Math.PI/2;
		NutLeft.position.x = -width/2;
		NutLeft.position.y = height - width/2 - NutOffset;
		THREE.GeometryUtils.merge(geometry, NutLeft);
	}
	if(rightNut){
		var NutRight = new drawNut(thickness*0.81, thickness ,setMaterial(material));
		NutRight.rotation.x = Math.PI/2;
		NutRight.position.x = width/2;
		NutRight.position.y = height - width/2 - NutOffset
		THREE.GeometryUtils.merge(geometry, NutRight);
	}

	var mesh = new THREE.Mesh(geometry,setMaterial(material));
	mesh.dimensions = {};
	mesh.dimensions.height = height;
	mesh.dimensions.width = width;
	mesh.dimensions.thickness = thickness;
	mesh.dimensions.thread = thread;
	mesh.dimensions.leftNut = leftNut;
	mesh.dimensions.rightNut = rightNut;
	mesh.dimensions.NutOffset = NutOffset;
	mesh.name = 'U Bolt ' + height + " " + width;
	ray_objects.push(mesh);
	mesh.matValue = material;
	return(mesh)
}

function drawBar(shapeSize, D1, material,centerPivot){
	var OD = shapeSize.OD*0.1
	var t_nom = shapeSize.t*0.1

	var shape = new THREE.Shape();
	shape.absarc( 0, 0, OD, 0, Math.PI*2, true );
	var material = new THREE.MeshPhongMaterial( { color: 0x616669, specular: 0xffffff, shininess: 30, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.33 , side:THREE.DoubleSide } );
	var material2 = new THREE.MeshPhongMaterial( { color: 0xCBE6F7, specular: 0xfffefe, shininess: 5 } );
	var materials = [ material, material2 ];

	geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:D1, steps: 25, curveSegments:25, material: 1,	extrudeMaterial : 0} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ));
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

	var material2 = new THREE.MeshPhongMaterial( { color: 0xCFE8E3, specular: 0xffffff, shininess: 30 } );
	var material = new THREE.MeshPhongMaterial( { color: 0x343B39, specular: 0xfffefe, shininess: 30, envMap: textureCube, combine: THREE.MixOperation, reflectivity: 0.33 , side:THREE.DoubleSide } );
	var materials = [ material, material2 ];


	geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:D1, material: 1,	extrudeMaterial : 0} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
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

	//Reflection Cube
function addReflectionEnvironment(){
	var path = "art/2/";
	var format = '.jpg';
	var urls = [
			path + 'px' + format, path + 'nx' + format,
			path + 'py' + format, path + 'ny' + format,
			path + 'pz' + format, path + 'nz' + format
		];


	
	textureCube = THREE.ImageUtils.loadTextureCube( urls );
	var material = new THREE.MeshBasicMaterial( { color: 0xff0000, envMap: textureCube } );
	var refractionCube = new THREE.Texture( textureCube.image, new THREE.CubeRefractionMapping() );
		refractionCube.format = THREE.RGBFormat;
	var shader = THREE.ShaderLib[ "cube" ];
		shader.uniforms[ "tCube" ].value = textureCube;
	var material = new THREE.ShaderMaterial( {
					fragmentShader: shader.fragmentShader,
					vertexShader: shader.vertexShader,
					uniforms: shader.uniforms,
					depthWrite: false,
					side: THREE.BackSide
				} ),
	mesh = new THREE.Mesh( new THREE.CubeGeometry( 900, 900, 900 ), material );
	mesh.visible = false;
	scene.add( mesh );
}