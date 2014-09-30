<?php
/********
	***********************************
	php db functions
	***********************************
**********/
//----------------

class dbManagement{

	var $dbloc = 'local';
	
	var $dbhost;
	var $dbuser;
	var $dbpasswd;
	var $dbname;	


        var $conn;

	var $link_db;
	var $link_select_db;
	var $query = '';
	

	// var $dbshapesteel_tb = "db_shapesteel";
	var $dbshapesteel_tb = "db_steelshape";	
	
	var $dbboltsteel_tb = "db_boltsteel";
	var $dbmbrsteel_tb = "db_mbrsteel";

	var $geometry_tb = "db_mtstr_g";
	


//dropdownlist type variable
	var $mtstrid = 1;
	var $mtstrtype = 2;
	var $client = 3;
	var $engineer = 4;
	var $construction = 5;
	
	function __construct(){
	
		switch ($this->dbloc){
		case 'local':
			$this->dbhost = 'localhost';
			$this->dbuser = 'root';
			$this->dbpasswd = '97a';
			$this->dbname = 'stimx';
			break;
		case 'cloud':
			$this->dbhost = 'Alex2014.db.10983647.hostedresource.com';
			$this->dbuser = 'Alex2014';
			$this->dbpasswd = 'AlexdB29@';
			$this->dbname = 'Alex2014';		
			break;
		}
		
           $this->conn = new mysqli($this->dbhost, $this->dbuser, $this->dbpasswd, $this->dbname);
           if($this->conn->connect_errno)
           {
              echo "Could not connect to database.";
              return false;
           }
           else
           {
              return true;
           }
		   
		   
		  // from database2.php
		// $this->link_db = mysql_connect( $this->dbhost, $this->dbuser, $this->dbpasswd );
		
		// if ( !$this->link_db ) { echo "Could not connect to server."; return false; }
		
		// $this->link_select_db = mysql_select_db( $this->dbname, $this->link_db );
		// if( $this->link_select_db ){ 
			// return true;
		// }else{
			// echo "Could not connect to database.";
			// return false;
		// }		   
	}

	function table_exists ($table, $db) { 
           $res = $this->Query("SHOW TABLES LIKE $table");
           return mysql_num_rows($res) > 0;
        }

	function dbClose(){
           $this->conn->close();
	}
	
	// function dbClose(){
		// return mysql_close( $this->link_db );
	// }
	

	function getQuery( ){ return $this->query; }
	// function getQuery( ){ return $this->query; }

	// exeQuery in original files
	function exeQuery_original( $sql ){ 
		$this->query = $sql;
		return mysql_query( $sql ); 
	}
	
	function exeQuery2( $sql ){
		$this->query = $sql;
		return mysql_query( $sql ); 
	}	
	
	// modified exeQuery by John
	function exeQuery( $sql ){
                $this->query = $sql;
				
/* 		echo "Start <br/>"; 
		print_r($this->query);  echo "<br/>"; 
		echo "End <br/>"; */
		// seems following code does not work for glc_d
                return $this->conn->query( $sql );
	}
	
	// added from database2.php - not working, causing problems
	// function getNbrofRows($sql){
		// $quer4Data = $this->exeQuery2($sql);
		// $TblNbrRow = mysql_num_rows($quer4Data);
		// return $TblNbrRow; 
	// }	
	
	// added from database2.php - modified by Jiazhu Hu on 20140723
	function getNbrofRows($sql){
		// $quer4Data = $this->exeQuery2($sql);
		$this->query = $sql;
		// $TblNbrRow = mysql_num_rows($quer4Data);
		$result = $this->conn->query( $sql );
		
		$TblNbrRow= mysqli_num_rows($result);
		// $TblNbrRow = $this->conn->num_rows;
		return $TblNbrRow; 
	}	
	

	function getColumnNums( $sql ){ 
                $this->query = $sql;
                return $this->conn->field_count;
	}
	
	// function getColumnNums( $sql ){
		// $this->query = $sql;
		// return mysql_num_fields( $sql ); 
	// }		

}

?>
