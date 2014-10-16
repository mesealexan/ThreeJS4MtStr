
function update(){
	
	if(Intersected)
	{
		Intersected.matrixWorld.decompose( position, quaternion, scale )
		axis.position.copy(position);
		axis.quaternion.x = quaternion.x;
		axis.quaternion.y = quaternion.y;
		axis.quaternion.z = quaternion.z;
		axis.quaternion.w = quaternion.w;
		axis.updateMatrixWorld( true );
	}
}

function onMouseDown( event_info ) 
{

	event_info.preventDefault();  
	mouse.x = ( event_info.clientX / SCREEN_WIDTH ) * 2 - 1;
	mouse.y = - ( event_info.clientY / SCREEN_HEIGHT ) * 2 + 1; 
	mouse_vector.set( mouse.x, mouse.y, mouse.z );
	projector.unprojectVector( mouse_vector, camera );
	var direction = mouse_vector.sub( camera.position ).normalize();
	ray.set( camera.position, direction );
	intersects = ray.intersectObjects(ray_objects, false );
	if(intersects.length>0)
	{
		if(textHolder)
			scene.remove(textHolder)
		if ( intersects[ 0 ].object != Intersected )
		{
			if ( Intersected ) 
			{
				if(Intersected.material.materials)
					Intersected.material.materials[0].color.setHex( Intersected.currentHex );
				else
					Intersected.material.color.setHex( Intersected.currentHex );
			}

		Intersected = intersects[ 0 ].object;
		if(selectedTrigger === true && Intersected.name.charAt(0) === 'N')
			addSingleText(Intersected.name)

		if(Intersected.material.materials)
		{
			Intersected.currentHex = Intersected.material.materials[0].color.getHex();
			Intersected.material.materials[0].color.setHex( 0xff0000 );
		}
		else
		{
			Intersected.currentHex = Intersected.material.color.getHex();
			Intersected.material.color.setHex( 0xff0000 );
		}
		
		if(Intersected.parent.parent)
		{
			parentName = Intersected.parent.parent.name;
			var vector = new THREE.Vector3();
			axis.position.x = vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).x;
			axis.position.y = vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).y;
			axis.position.z = vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).z;
			axis.rotation.x = intersects[0].object.rotation.x;
			axis.rotation.y = intersects[0].object.rotation.y;
			axis.rotation.z = intersects[0].object.rotation.z;
			world_text = document.getElementById("text").innerHTML = 
			intersects[0].object.name + '<br>' + '<u>World</u> <BR>' +
			'X: ' + (vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).x).toFixed(accuracy) + '<br>' +  
			'Y: ' + (vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).y).toFixed(accuracy) + '<br>' + 
			'Z: ' + (vector.getPositionFromMatrix( intersects[0].object.matrixWorld ).z).toFixed(accuracy);
			local_text = '<u> To '+ parentName +' / Local</u> <BR>' +
			'X: ' +  (vector.getPositionFromMatrix( Intersected.parent.parent.matrixWorld ).x).toFixed(accuracy) + '<br>' +  
			'Y: ' + (vector.getPositionFromMatrix( Intersected.parent.parent.matrixWorld ).y).toFixed(accuracy) + '<br>' + 
			'Z: ' + (vector.getPositionFromMatrix( Intersected.parent.parent.matrixWorld ).z).toFixed(accuracy)
			document.getElementById("text").innerHTML = world_text;
			document.getElementById("local").innerHTML = local_text;
		}
		}
	}
}