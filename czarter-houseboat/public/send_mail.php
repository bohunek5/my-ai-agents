<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

if (!$input) {
    // try to get from POST data if not JSON
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$subject = isset($input['subject']) ? trim($input['subject']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit();
}

$to = 'prezes@zeglarstwomazury.pl';
$email_subject = "Nowa wiadomość ze strony: $subject";
$email_body = "Otrzymałeś nową wiadomość z formularza kontaktowego.\n\n".
    "Imię: $name\n".
    "Email: $email\n".
    "Telefon: $phone\n\n".
    "Wiadomość:\n$message\n";

$headers = "From: Formularz Kontaktowy <noreply@zeglarstwomazury.pl>\n";
$headers .= "Reply-To: $email\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\n";

if (mail($to, $email_subject, $email_body, $headers)) {
    http_response_code(200);
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
