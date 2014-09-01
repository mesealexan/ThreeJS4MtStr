

function drawElement(object, type, profile, name, material, partNo, centerPivot){
	//example drawElement(obj, '8 inch', 'Pipe', 'metal', 5, false)
	this.object = object;
	this.profile = profile;
	this.type = type;
	this.name = name;
	this.material = new setMaterial(material);
	this.partNo = partNo;
	this.dimensions = {};
	this.pivotCentered = centerPivot;
	var shape, geometry, mesh;
//Set up the profile

	if(this.profile === "I Section"){
		shape = new drawI(I_d,I_bf,I_T,I_tw,I_tf,I_k1);
		if(this.type === "36 inch"){
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:36} );
			this.dimensions.height = 36;
		}
		else if(this.type === "150 inch"){
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:150} );
			this.dimensions.height = 150;
		}
		else
			alert("Type and Profile do not match")
		//Push the properties
		for (var key in shape) { if(key!="shape")this.dimensions[key] =  shape[key]};
		if(centerPivot)
			THREE.GeometryUtils.center(geometry);
		mesh = new THREE.Mesh( geometry, this.material );
	}

	if(this.profile === "L Section"){
		shape = new drawL(L_d,L_b,L_xbar,L_ybar,L_t);
		if(this.type === "36 inch"){
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:36} );
			this.dimensions.height = 36;
		}
		else if(this.type === "150 inch"){
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:150} );
			this.dimensions.height = 150;
		}
		else
			alert("Type and Profile do not match")
		//Push the properties
		for (var key in shape) {if(key!="shape")this.dimensions[key] =  shape[key]};
		if(centerPivot)
			THREE.GeometryUtils.center(geometry);
		mesh = new THREE.Mesh( geometry, this.material );
	}
	if(this.profile === "C Plate"){
		if(this.type === "Large"){
			shape = new drawCS(LCP_d,LCP_bf,LCP_tf,LCP_tw,LCP_xbar);
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:12} );
			this.dimensions.height = 12;
		}
		else if(this.type === "Small"){
			shape = new drawCS(SCP_d,SCP_bf,SCP_tf,SCP_tw,SCP_xbar);
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:6} );
			this.dimensions.height = 6;
		}
		else
			alert("Type and Profile do not match")
		//Push the properties
		for (var key in shape) {if(key!="shape")this.dimensions[key] =  shape[key]};
		if(centerPivot)
			THREE.GeometryUtils.center(geometry)
		mesh = new THREE.Mesh( geometry, this.material );
	}
	if(this.profile === "Pipe"){
		if(this.type === "12 inch"){
			shape = new drawPipe(Pipe_OD,Pipe_tnom);
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:12} );
			this.dimensions.height = 12;
		}
		else if(this.type === "150 inch"){
			shape = new drawPipe(Pipe_OD,Pipe_tnom);
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:150} );
			this.dimensions.height = 150;
		}
		else if(this.type === "63 inch"){
			shape = new drawPipe(PipeS_OD,PipeS_tnom);
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:63} );
			this.dimensions.height = 63;
		}
		else
			alert("Type and Profile do not match")
		//Push the properties
		for (var key in shape) {if(key!="shape")this.dimensions[key] =  shape[key]};
		if(centerPivot)
			THREE.GeometryUtils.center(geometry)
		mesh = new THREE.Mesh( geometry, this.material );
	}
	if(this.profile === "HHS Rect"){
		if(this.type === "36 inch"){
			shape = new drawHHS(HHS_h,HHS_b,HHS_tdes,HHS_f1);
			geometry = new THREE.ExtrudeGeometry( shape.shape, {bevelEnabled: false, amount:36} );
			this.dimensions.height = 36;
		}
		else
			alert("Type and Profile do not match")
		//Push the properties
		for (var key in shape) {if(key!="shape")this.dimensions[key] =  shape[key]};
		if(centerPivot)
			THREE.GeometryUtils.center(geometry)
		mesh = new THREE.Mesh( geometry, this.material );
	}
	if(this.profile === "U Bolt"){
		shape = new drawUBolt(UB_Length, UB_Width, UB_thread, UB_thread, true, 0, true, 0, this.material);
		for (var key in shape) {if(key!="shape")this.dimensions[key] =  shape[key]};
	}
	//Center the pivot if required

	
	this.object.add(mesh);  
	ray_objects.push(mesh)

/*
	if(this.profile === "HHS Rect")
	if(this.profile === "U Bolt")
*/
	//object.add(mesh); 
	//ray_objects.push(mesh)
}


function createMbr(object, shape, height, material, centerPivot){
	var geometry = new THREE.ExtrudeGeometry( shape, {bevelEnabled: false, amount:height} );
	if(centerPivot)
		THREE.GeometryUtils.center(geometry);
	geometry.computeFaceNormals()
	var mesh = new THREE.Mesh( geometry, material );
	object.add(mesh);  
	mesh.name = object.name.toString();
	//mesh.name = object.toString();
	ray_objects.push(mesh) //Push all the geometry in the array for later picking
}
//Example of usage   drawI(23.6,7.01,20.75,0.395,0.505,1)

function setMaterial(value){
	if(value === 'metal')
		material = new THREE.MeshPhongMaterial( { color: 0x333333, specular: 0xCC3399, shininess: 20 } );
	if(value === 'aluminium')
		material = new THREE.MeshPhongMaterial( { color: 0xeeeeee, specular: 0xfefefe, shininess: 5 } );
	if(value === 'chrome')
		material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, specular: 0xababab, shininess: 10, metal:true } );
	return(material)
}

function drawSection(shapeType,shapeSize){
	if(shapeType === "I")
		return(drawI(I_d,I_bf,I_T,I_tw,I_tf,I_k1))
	if(shapeType === "L")
		return(drawL(L_d,L_b,L_xbar,L_ybar,L_t))
	if(shapeType === "Pipe Large")
		return(drawPipe(Pipe_OD,Pipe_tnom))
	if(shapeType === "Pipe Small")
		return(drawPipe(PipeS_OD,PipeS_tnom))
	if(shapeType === "HHS")
		return(drawHHS(HHS_h,HHS_b,HHS_tdes,HHS_f1))
	if(shapeType === "Large Cross Plate")
		return(drawC(LCP_d,LCP_bf,LCP_tf,LCP_tw,LCP_xbar))
	if(shapeType === "Small Cross Plate")
		return(drawC(SCP_d,SCP_bf,SCP_tf,SCP_tw,SCP_xbar))
	if(shapeType === "Nut")
		return(drawNut(1/2))
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

//Example of usage   drawPipe(8.625,0.322)
function drawPipe(OD,tnom){
	var arcShape = new THREE.Shape();
    arcShape.absarc( 0, 0, OD, 0, Math.PI*2, true );

	var holePath = new THREE.Path();
    holePath.absarc(0, 0, OD-tnom, 0, Math.PI*2, false );
    arcShape.holes.push( holePath );
return({
		shape:arcShape,
		OD:OD,
		tnom:tnom
		});
}

//Example of usage   drawL(5,3.5,0.854,1.6,0.375)
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

function drawHHS(h,b,tdes,f1){
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
	hole.moveTo(-b/2+f1+tdes,-h/2+tdes);
	hole.lineTo(b/2-f1-tdes,-h/2+tdes);
	hole.lineTo(b/2-tdes,-h/2+f1+tdes);
	hole.lineTo(b/2-tdes,h/2-f1-tdes);
	hole.lineTo(b/2-f1-tdes,h/2-tdes);
	hole.lineTo(-b/2+f1+tdes,h/2-tdes);
	hole.lineTo(-b/2+tdes,h/2-f1-tdes);
	hole.lineTo(-b/2+tdes,-h/2+f1+tdes);
	hole.lineTo(-b/2+f1+tdes,-h/2+tdes);
	shape.holes.push( hole );
	return({
		shape:shape,
		h:h,
		b:b,
		tdes:tdes,
		f1:f1
		});
}

function drawC(d,bf,tf,tw,xbar){
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
	return(shape);
}
function drawCS(d,bf,tf,tw,xbar){
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
		rightNutOffset,rightNutOffset
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

