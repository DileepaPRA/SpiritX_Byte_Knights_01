<?php
session_start();
session_destroy();
header('Location: /SpiritX_Byte_Knights_01/frontend/login.html');
exit;
?>