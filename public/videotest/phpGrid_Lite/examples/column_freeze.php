<?php
use phpCtrl\C_DataGrid;

require_once("../conf.php");
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Test</title>
</head>
<body>
<style type="text/css">
    .ui-jqgrid tr.jqgrow td {
        white-space:nowrap;
    }
</style>
<?php
$dg = new C_DataGrid("SELECT * FROM orders", "orderNumber", "orders");
$dg->set_dimension(700, 400, false);
$dg->set_col_frozen('orderNumber');
$dg->enable_search(true);
$dg -> display();
?>

</body>
</html>