<?php
$x = "не определено";
$y = "не определено";
$r = "не определено";
$inputValid = true;
$out = " ";

if (isset($_GET["x"])) {

    $x = $_GET["x"];
}
if (isset($_GET["y"])) {

    $y = $_GET["y"];
}
if (isset($_GET["r"])) {

    $r = $_GET["r"];
}

if ($x < -4 || $x > 4) {
    $inputValid = false;
}
if ($y < -5 || $y > 5) {
    $inputValid = false;
}
if ($r < 1 || $r > 3) {
    $inputValid = false;
}

if ((($x * $x + $y * $y) <= $r * $r && $x >= 0 && $y <= 0) ||
    ($y + 2 * $x <= $r && $x <= 0 && $y >= 0) ||
    ($y >= (-$x / 2 - $r / 2) && $x >= 0 && $y >= 0)){
    $out = "Входит";
}
else{
    $out = "Не входит";
}


echo "X: $x <br> Y: $y <br> R: $r <br> valid Data: ", var_export($inputValid), "<br> out: $out";
