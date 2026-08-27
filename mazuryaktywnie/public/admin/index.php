<?php
declare(strict_types=1);

require dirname(__DIR__) . '/payments/bootstrap.php';
p24_security_headers();
p24_admin_session();

if (isset($_GET['logout'])) {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], '', true, true);
    }
    session_destroy();
    header('Location: /admin/');
    exit;
}

$error = '';
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    $authPath = P24_PRIVATE_DIR . '/admin.php';
    $auth = is_file($authPath) ? require $authPath : [];
    $user = trim((string) ($_POST['username'] ?? ''));
    $password = (string) ($_POST['password'] ?? '');
    if (
        is_array($auth) &&
        hash_equals((string) ($auth['username'] ?? ''), $user) &&
        password_verify($password, (string) ($auth['password_hash'] ?? ''))
    ) {
        session_regenerate_id(true);
        $_SESSION['mazury_admin'] = true;
        $_SESSION['csrf'] = bin2hex(random_bytes(24));
        header('Location: /admin/');
        exit;
    }
    usleep(600000);
    $error = 'Nieprawidłowy login lub hasło.';
}

if (($_SESSION['mazury_admin'] ?? false) !== true) {
?><!doctype html>
<html lang="pl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Logowanie administratora | Mazury Aktywnie</title>
<style>:root{font-family:Inter,system-ui,sans-serif;color:#172033}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;background:linear-gradient(145deg,#eaf7ff,#f4f8ff 50%,#e9f5ee)}main{width:min(430px,100%);padding:34px;background:#fffffff2;border-radius:28px;box-shadow:0 24px 70px #1f436f29}h1{margin:0 0 8px;font-size:28px}p{margin:0 0 24px;color:#667085;line-height:1.5}.error{padding:11px 13px;border-radius:12px;background:#fff0f0;color:#b42318;font-size:13px;margin-bottom:16px}label{display:block;margin:14px 0 7px;font-size:12px;font-weight:800;text-transform:uppercase;color:#687386}input{width:100%;padding:14px 15px;border:2px solid #e6eaf0;border-radius:14px;font-size:15px;outline:none}input:focus{border-color:#2477cc;box-shadow:0 0 0 4px #2477cc1f}button{width:100%;margin-top:20px;padding:14px;border:0;border-radius:14px;background:#1769cc;color:#fff;font-size:16px;font-weight:800;cursor:pointer}</style></head>
<body><main><h1>Panel administratora</h1><p>Logowanie jest weryfikowane na serwerze.</p><?php if ($error !== ''): ?><div class="error"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div><?php endif; ?><form method="post" autocomplete="on"><label for="username">Login</label><input id="username" name="username" autocomplete="username" required><label for="password">Hasło</label><input id="password" name="password" type="password" autocomplete="current-password" required><button type="submit">Zaloguj się</button></form></main></body></html><?php
    exit;
}

$htmlPath = __DIR__ . '/index.html';
$html = file_get_contents($htmlPath);
if (!is_string($html)) {
    http_response_code(500);
    exit('Panel jest chwilowo niedostępny.');
}
$injection = '<meta name="p24-admin-csrf" content="' . htmlspecialchars((string) $_SESSION['csrf'], ENT_QUOTES, 'UTF-8') . '">'
    . '<script>try{sessionStorage.setItem("admin_auth_token","true")}catch(_){}</script>';
echo str_replace('</head>', $injection . '</head>', $html);
