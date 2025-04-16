<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $to = "upass496@gmail.com";
    $subject = "Interaction utilisateur sur le site";
    $message = "Nouvelle interaction détectée :\n\n" . print_r($data, true);
    $headers = "From: noreply@tonsite.com";

    mail($to, $subject, $message, $headers);
    echo "OK";
}
?>
