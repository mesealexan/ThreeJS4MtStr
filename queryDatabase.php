<?php

error_reporting(E_ERROR | E_PARSE);

// include 'database2.php';
include 'db/database.php';
$db = new dbManagement();

$Data2Query = $_REQUEST['Data2Query'];
$Fields 	= $_REQUEST['Fields'];

$sql = '';

switch ($Data2Query){
case 'MtStr_Src':
	switch ($Fields){
	case 'All':
		if( $_REQUEST["type_G"] && $_REQUEST["mftr_G"] && $_REQUEST["model_G"]){
			$type_G = $_REQUEST['type_G'];
			$mftr_G = $_REQUEST['mftr_G'];
			$model_G = $_REQUEST['model_G'];
			$sql = 'SELECT * FROM db_mtstr_src WHERE Type_G = "'.$type_G.'" AND Mftr_G = "'.$mftr_G.'" AND Model_G = "'.$model_G.'"';
		}
		break;
	default:
		break;
	};
	
	break;
	
case 'MtStr_G':
	switch ($Fields){
	case 'All':
		if( $_REQUEST["type_G"] && $_REQUEST["mftr_G"] && $_REQUEST["model_G"]){
			$type_G = $_REQUEST['type_G'];
			$mftr_G = $_REQUEST['mftr_G'];
			$model_G = $_REQUEST['model_G'];
			$sql = 'SELECT * FROM db_mtstr_g WHERE Type_G = "'.$type_G.'" AND Mftr_G = "'.$mftr_G.'" AND Model_G = "'.$model_G.'"';
		}
		break;
		
	case 'Shape':

		if( $_REQUEST["Mbr_Shape"] && $_REQUEST["Mbr_Shape_Model"]){	
			$CrtMbr_Shape = $_REQUEST['Mbr_Shape'];
			$CrtMbr_Shape_Model = $_REQUEST['Mbr_Shape_Model'];
			
			// $sql = 'SELECT * FROM db_steelshape where Name2="'.$CrtMbr_Shape_Model.'"';}
			$sql = 'SELECT * FROM db_steelshape where Name1="'.$CrtMbr_Shape_Model.'"';}
			
		break;
	case 'Model':
		if( $_REQUEST["type_G"] && $_REQUEST["mftr_G"]){
			$type_G = $_REQUEST['type_G'];
			$mftr_G = $_REQUEST['mftr_G'];	
			$sql = 'SELECT DISTINCT `Model_G` FROM `db_mtstr_g` WHERE Type_G = "'.$type_G.'" AND Mftr_G = "'.$mftr_G.'"'; }		
		break;
	default:
		break;
	}
	break;


	
case 'Unit' :
	if( $_REQUEST["dbtb_Field"]){
		$dbtb_Field = $_REQUEST['dbtb_Field'];			
		$sql = 'SELECT `wbtb_ColUnit` FROM `db_ts` WHERE dbtb_Field = "'.$dbtb_Field.'";';}
	break;
	
default:
	break;
}

$link = new mysqli($db->dbhost, $db->dbuser, $db->dbpasswd, $db->dbname);
$result = $link->query($sql);
$rows = $result->fetch_all(MYSQLI_ASSOC);
$link->close();

$db->dbClose();

echo json_encode($rows);

?>