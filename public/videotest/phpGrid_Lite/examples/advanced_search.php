<?php
use phpCtrl\C_DataGrid;

require_once("../conf.php");      
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>PHP Datagrid - Advanced Search</title>
</head>
<body> 

<?php
//$dg = new C_DataGrid("SELECT * FROM orders", "orderNumber", "orders");
$dg = new C_DataGrid("SELECT * FROM user", "id", "user");
$dg->enable_advanced_search(true);
$dg->enable_export('EXCEL');
$dg -> display();  
?>

</body>
</html>
