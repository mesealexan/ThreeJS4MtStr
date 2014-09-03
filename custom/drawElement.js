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


function drawElement(object, D1, shape, shapeSize,description, material, partNo, centerPivot){
	this.object = object;
	this.D1 = D1;	
	this.shape = shape;
	this.shapeSize = shapeSize;
	this.object.description = description;
	this.material = new setMaterial(material);
	this.object.partNo = partNo;
	this.object.dimensions = {};
	this.object.pivotCentered = centerPivot;
	var shape, geometry, mesh;
	//Set up the shape

	switch (this.shape){
	case "I":
		shape = new drawI(I_d,I_bf,I_T,I_tw,I_tf,I_k1);
		
		if(this.D1 === "36 inch"){
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:36} );
			this.object.dimensions.height = 36;
		}
		else if(this.D1 === "150 inch"){
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:150} );
			this.object.dimensions.height = 150;
		}
		else
		alert("D1 and shape do not match")
		//Push the properties
		for (var key in shape) { if(key!="shape")this.object.dimensions[key] =  shape[key]};
		if(centerPivot)
		THREE.GeometryUtils.center(geometry);
		mesh = new THREE.Mesh( geometry, this.material );
		break;

	case "L":
		shape = new drawL(L_d,L_b,L_xbar,L_ybar,L_t);
		if(this.D1){
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:this.D1} );
			this.object.dimensions.height = this.D1;
		}else
		alert("D1 and shape do not match")
		//Push the properties
		for (var key in shape) {if(key!="shape")this.object.dimensions[key] =  shape[key]};
		if(centerPivot)
		THREE.GeometryUtils.center(geometry);
		mesh = new THREE.Mesh( geometry, this.material );
		break;
		
	case "C":
		
		if(this.D1){
			shape = new drawC(shapeSize);
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:this.D1} );
			this.object.dimensions.height = this.D1;
		}
		else
		alert("D1 and shape do not match")
		//Push the properties
		for (var key in shape) {if(key!="shape")this.object.dimensions[key] =  shape[key]};
		if(centerPivot)
		THREE.GeometryUtils.center(geometry)
		mesh = new THREE.Mesh( geometry, this.material );
		break;
		
	case "Pipe":
		
		if(this.D1){
			shape = new drawPipe(shapeSize);
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:this.D1} );
			this.object.dimensions.height = this.D1;
		}
		else
		alert("D1 and shape do not match")
		//Push the properties
		for (var key in shape) {if(key!="shape")this.object.dimensions[key] =  shape[key]};
		
		if(centerPivot)
		THREE.GeometryUtils.center(geometry)
		mesh = new THREE.Mesh( geometry, this.material );
		break;
		
	case "HHS(Rect)":
		if(this.D1){
			shape = new drawHHS_Rect(shapeSize);
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:this.D1} );
			this.object.dimensions.height = this.D1;
		}
		else
		alert("D1 and shape do not match")
		//Push the properties
		for (var key in shape) {if(key!="shape")this.object.dimensions[key] =  shape[key]};

		if(centerPivot)
		THREE.GeometryUtils.center(geometry)
		mesh = new THREE.Mesh( geometry, this.material );
		break;
		
	case "UBolt":
	// alert(this.shapeSize);
		if(this.shapeSize === "Large"){
			shape = new drawUBolt(UB_Length, UB_Width, UB_thick, UB_thread, true, 0.26, true, 0.26, this.material);
			mesh = shape.meshu;
		}
		else if(this.shapeSize === "Large T2"){
			shape = new drawUBolt(UBT2_Length, UBT2_Width, UBT2_thick, UBT2_thread, true, 1.44, true, 1.44, this.material);
			mesh = shape.meshu;
		}
		else if(this.shapeSize === "Small"){
			shape = new drawUBolt(UBS_Length, UBS_Width, UBS_thick, UBS_thread, true, 0, true, 0, this.material);
			mesh = shape.meshu;
		}
		else if(this.shapeSize === "Small T2"){
			shape = new drawUBolt(UBST2_Length, UBST2_Width, UBST2_thick, UBST2_thread, true, 0, true, 0, this.material);
			mesh = shape.meshu;
		}
		else
		alert("D1 and shape do not match")
		for (var key in shape) {if(key!="shape")this.object.dimensions[key] =  shape[key]};
		break;
		
	default:
		break;
	}
	//Center the pivot if required

	this.object.add(mesh);  
	ray_objects.push(mesh)
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

function drawI(d,bf,T,tw,tf,k1){
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
	return({
		shape:shape,
		d:d,
		bf:bf,
		T:T,
		tw:tw,
		tf:tf,
		k1:k1
		});
}

function drawPipe(shapeSize){

	shapeData = getshapeData('Pipe',shapeSize);
	OD = parseFloat(shapeData.OD);
	t_nom = parseFloat(shapeData.t);

	var arcShape = new THREE.Shape();
	arcShape.absarc( 0, 0, OD, 0, Math.PI*2, true );

	var holePath = new THREE.Path();
	holePath.absarc(0, 0, OD-t_nom, 0, Math.PI*2, false );
	arcShape.holes.push( holePath );
	return({
		shape:arcShape,
		OD:OD,
		t_nom:t_nom
		});
}

function drawL(d,b,xbar,ybar,t){
	var shape = new THREE.Shape();
	shape.moveTo(-xbar,d-ybar);
	shape.lineTo(-xbar+t,d-ybar-t);
	shape.lineTo(-xbar+t,-ybar+t+t);
	shape.lineTo(-xbar+t+t,-ybar+t);
	shape.lineTo(-xbar+b-t,-ybar+t);
	shape.lineTo(-xbar+b,-ybar);
	shape.lineTo(-xbar,-ybar);
	shape.lineTo(-xbar,d-ybar);
	return({
		shape:shape,
		d:d,
		b:b,
		xbar:xbar,
		ybar:ybar,
		t:t
		});
}

function drawHHS_Rect(shapeSize){

	shapeData = getshapeData('HHS(Rect)',shapeSize);
	h = parseFloat(shapeData.Ht);
	b = parseFloat(shapeData.b);
	t_des = parseFloat(shapeData.t_des);
	f1 = 0.3; //This value represents the fillet of the corners.
	// shapeData.f1; // to be found out where the value is.
	// console.log('h: '+h+ ', b: '+b+', t_des:' +t_des+ ', f1:'+f1)
	// "h: 5.000, b: 5.0000, t_des:0.349, f1:0.3"

	// var h = 5;
	// var b = 5; 
	// var t_des = 0.349; 
	// var f1 = 0.3;

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
	return({
		shape:shape,
		h:h,
		b:b,
		t_des:t_des,
		f1:f1
			});
}

function drawC(shapeSize){

shapeData = getshapeData('C',shapeSize);
// console.log(shapeData);
var d  = parseFloat(shapeData.d);
var bf = parseFloat(shapeData.b_f);
var tf = parseFloat(shapeData.t_f);
var tw = parseFloat(shapeData.t_w);
var xbar = parseFloat(shapeData.x);
// console.log('d: ' +d+ ', bf:' +bf+ ', tf:' +tf+ ', tw:' + tw + ', xbar: ' + xbar );
// why the data from above query does not work???
// "d: 6.0000, bf:2.030, tf:0.343, tw:0.314, xbar: 0.500"

// switch(shapeSize){
// case 'C6X10.5':
	// var d = 4.6;
	// var bf = 2.0;
	// var tf = 0.436;
	// var tw = 0.24;
	// var xbar = 0.634;
	// break;
// case 'C10X15.3':
	"d: 10.0000, bf:2.600, tf:0.436, tw:0.240, xbar: 0.634"
	// var d = 10;
	// var bf = 2.6;
	// var tf = 0.436;
	// var tw = 0.24;
	// var xbar = 0.634;
	// break;
// default:
	// break;
// }

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
	return({
		shape:shape,
		d:d,
		bf:bf,
		tf:tf,
		tw:tw,
		xbar:xbar
		});
}
function drawUBolt(height, width, thickness, thread, leftNut, letNutOffset, rightNut, rightNutOffset, material){
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
//Create the mesh
    var geometry = new THREE.ExtrudeGeometry( arcShape, extrudeSettings );
    var mesh = new THREE.Mesh(geometry,material)
//Create the thread parts
	var cylinderL = new THREE.Mesh(new THREE.CylinderGeometry(thickness*0.8, thickness*0.8, thread, 16, resolution, false),material);
	cylinderL.position.x = -width/2;
	cylinderL.position.y = (height-width/2)-thread/2;
    mesh.add(cylinderL);

	var cylinderR = new THREE.Mesh(new THREE.CylinderGeometry(thickness*0.8, thickness*0.8, thread, 16, resolution, false),material);
	cylinderR.position.x = width/2;
	cylinderR.position.y = (height-width/2)-thread/2;
    mesh.add(cylinderR);

//Create Nuts
	if(leftNut){
		var NutLeft = new THREE.Object3D();
		drawNut(NutLeft, thickness*0.81, thickness ,material);
		NutLeft.rotation.x = Math.PI/2;
		NutLeft.position.y = thread/2 - letNutOffset;
		cylinderL.add(NutLeft)
	}
	if(rightNut){
		var NutRight = new THREE.Object3D();
		drawNut(NutRight, thickness*0.81, thickness ,material);
		NutRight.rotation.x = Math.PI/2;
		NutRight.position.y = thread/2 - rightNutOffset;
		cylinderR.add(NutRight)
	}

	return({
		meshu:mesh,
		height:height,
		width:width,
		thickness:thickness,
		thread:thread,
		leftNut:leftNut,
		letNutOffset:letNutOffset,
		rightNut:rightNut,
		rightNutOffset:rightNutOffset
	});

}

function drawNut(object, innerRadius, height ,material){
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
	var mesh = new THREE.Mesh( geometry, material );
	object.add(mesh);
}

/*
function drawBolt(object, radius, body_length, material){
	var shape = new THREE.Shape();
	shape.moveTo(-(radius*1.9*Math.sqrt(3))/2,-radius*1.9/2);
	shape.lineTo(0,-radius*1.9);	
	shape.lineTo((radius*1.9*Math.sqrt(3))/2,-radius*1.9/2);
	shape.lineTo((radius*1.9*Math.sqrt(3))/2,radius*1.9/2);
	shape.lineTo(0,radius*1.9);
	shape.lineTo(-(radius*1.9*Math.sqrt(3))/2,radius*1.9/2);
	shape.lineTo(-(radius*1.9*Math.sqrt(3))/2,-radius*1.9/2);

	var geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:radius*0.7} );
	var boltHead = new THREE.Mesh( geometry, material );

	var body = new THREE.Shape();
	body.absarc( 0, 0, radius, 0, Math.PI*2, false );
	var geometry2 = new THREE.ExtrudeGeometry( body, {bevelEnabled: false, amount:body_length} );
	var boltBody = new THREE.Mesh( geometry2, material );
	boltBody.position.z = radius*0.7;
	boltHead.add(boltBody)


	object.add(boltHead);  
	boltHead.name = object.name.toString();
	ray_objects.push(boltHead)
}

*/