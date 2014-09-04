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

	case "L":

	case "C":
			mesh = new drawC_Beta(shapeSize, D1, material, centerPivot);
			break;
	case "Pipe":
			mesh = new drawPipe_Beta(shapeSize, D1, material, centerPivot);
			break;
	case "HHS(Rect)":
			mesh = new drawHHS_Rect_Beta(shapeSize, D1, material, centerPivot);
			break;
	case "UBolt":

	default:
		break;
	}
	mesh.partNo = partNo;
	mesh.description = description;
	return(mesh)
}

function setMaterial(value){
	switch(value){
	case 'metal':
		material = new THREE.MeshPhongMaterial( { color: 0x333333, specular: 0xCCCCCC, shininess: 20 } );
		break;
	case 'aluminium':
		material = new THREE.MeshPhongMaterial( { color: 0xeeeeee, specular: 0xfefefe, shininess: 5 } );
		break;
	case 'chrome':
		material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, specular: 0xababab, shininess: 10, metal:true } );
		break;
	default:
		break;}
	return(material)
}

/////////////Drawing functions.
/////////////Please note that these functions now create a mesh and not a shape thus simplyfing drawElement function

function drawHHS_Rect_Beta(shapeSize, D1, material,centerPivot){
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
	return(mesh)
}

function drawC_Beta(shapeSize, D1, material,centerPivot){
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
	return(mesh)
}

function drawL_Beta(shapeSize, D1, material,centerPivot){
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
	return(mesh)
}

function drawPipe_Beta(shapeSize, D1, material,centerPivot){
	var shapeData = getshapeData('Pipe',shapeSize);
	var OD = parseFloat(shapeData.OD);
	var t_nom = parseFloat(shapeData.t);

	var shape = new THREE.Shape();
	shape.absarc( 0, 0, OD, 0, Math.PI*2, true );

	var holePath = new THREE.Path();
	holePath.absarc(0, 0, OD-t_nom, 0, Math.PI*2, false );
	shape.holes.push( holePath );

	geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:D1} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	mesh = new THREE.Mesh( geometry, setMaterial(material) );
	mesh.dimensions = {};
	mesh.dimensions.OD = OD;
	mesh.dimensions.t_nom = t_nom;
	mesh.dimensions.D1 = D1;
	mesh.name = 'Pipe ' + shapeSize;
	ray_objects.push(mesh);
	return(mesh)
}
