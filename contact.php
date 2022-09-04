<?php
$start_time = microtime();
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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!preg_match('/^-?\d+(\.|,)?\d*$/', $r)) {
        $inputValid = false;
        $r = '';
    }
    if (!preg_match('/^-?\d+(\.|,)?\d*$/', $y)) {
        $inputValid = false;
        $y = '';
    }
    if (!preg_match('/^-?\d+(\.|,)?\d*$/', $x)) {
        $inputValid = false;
        $x = '';
    }
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
if (is_numeric($x) && is_numeric($y) && is_numeric($r)) {
    if ((($x * $x + $y * $y) <= $r * $r && $x >= 0 && $y <= 0) ||
        ($y + 2 * $x <= $r && $x <= 0 && $y >= 0) ||
        ($y >= (-$x / 2 - $r / 2) && $x >= 0 && $y >= 0)) {
        $out = "Входит";
    } else {
        $out = "Не входит";
    }
} else {
    $out = "Не входит";
}

echo "X: $x <br> Y: $y <br> R: $r <br> valid Data: ", var_export($inputValid),
"<br> out: $out ",
"<br> Время выполнения скрипта: ", microtime() - $start_time;
echo "<br> Текущее время: ", date(DATE_RFC822);
