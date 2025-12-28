<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Primim date JSON din corpul cererii
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if ($data) {
        $name = htmlspecialchars($data["name"] ?? '');
        $phone = htmlspecialchars($data["phone"] ?? '');
        $email = htmlspecialchars($data["email"] ?? '');
        $service = htmlspecialchars($data["service"] ?? '');
        $message = htmlspecialchars($data["message"] ?? '');
        $type = htmlspecialchars($data["type"] ?? 'Cerere');
        $vacancy = htmlspecialchars($data["vacancy"] ?? '');
        $car = htmlspecialchars($data["car"] ?? '');
        $experience = htmlspecialchars($data["experience"] ?? '');

        $to = "info@zelenesvitlo.mk.ua"; // Email-ul tău
        $subject = "Cerere nouă de pe site-ul STO 'Lumina Verde'";

        $body = "Tip: $type\n";
        if ($vacancy) $body .= "Ofertă: $vacancy\n";
        if ($service) $body .= "Serviciu: $service\n";
        $body .= "Nume: $name\n";
        $body .= "Telefon: $phone\n";
        if ($email) $body .= "Email: $email\n";
        if ($car) $body .= "Mașină: $car\n";
        if ($experience) $body .= "Experiență: $experience ani\n";
        if ($message) $body .= "Mesaj: $message\n";

        $headers = "From: info@zelenesvitlo.mk.ua\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        if (mail($to, $subject, $body, $headers)) {
            echo json_encode(["status" => "Mulțumim! Mesajul dumneavoastră a fost trimis."]);
        } else {
            echo json_encode(["status" => "Ne pare rău, a apărut o eroare la trimitere."]);
        }
    } else {
        echo json_encode(["status" => "Format de date incorect."]);
    }
} else {
    echo json_encode(["status" => "Cerere incorectă."]);
}
?>
