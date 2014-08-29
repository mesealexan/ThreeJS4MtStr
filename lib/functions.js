
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

function drawSection(shapeType,shapeSize){
	if(shapeType === "I")
		return(drawI(I_d,I_bf,I_T,I_tw,I_tf,I_k1))
	if(shapeType === "L")
		return(drawL(L_d,L_b,L_xbar,L_ybar,L_t))
	if(shapeType === "Pipe8")
		return(drawPipe(Pipe8_OD,Pipe8_tnom))
	if(shapeType === "HHS")
		return(drawHHS(HHS_h,HHS_b,HHS_tdes,HHS_f1))
	if(shapeType === "C")
		return(drawC(C_d,C_bf,C_tf,C_tw,C_xbar))
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
	return(shape);
}

//Example of usage   drawPipe(8.625,0.322)
function drawPipe(OD,tnom){
	var arcShape = new THREE.Shape();
    arcShape.absarc( 0, 0, OD, 0, Math.PI*2, true );

	var holePath = new THREE.Path();
    holePath.absarc(0, 0, OD-tnom, 0, Math.PI*2, false );
    arcShape.holes.push( holePath );
return(arcShape);
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
	return(shape);
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
	return(shape);
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

function drawUBolt(){
	var spline = new THREE.Spline( points );
}

function drawNut(radius){
	var shape = new THREE.Shape();
	shape.moveTo(-(radius*Math.sqrt(3))/2,-radius/2);
	shape.lineTo(0,-radius);	
	shape.lineTo((radius*Math.sqrt(3))/2,-radius/2);
	shape.lineTo((radius*Math.sqrt(3))/2,radius/2);
	shape.lineTo(0,radius);
	shape.lineTo(-(radius*Math.sqrt(3))/2,radius/2);
	shape.lineTo(-(radius*Math.sqrt(3))/2,-radius/2);

	var holePath = new THREE.Path();
    holePath.absarc(0, 0, radius - radius/2.254, 0, Math.PI*2, false );
    shape.holes.push( holePath );

	return(shape);
}