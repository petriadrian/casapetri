<?php include('/home/hdeldkaw/php/Mail.php');
header('Content-type: application/json');

$recipients = 'petriadrian@gmail.com,petri_adrian@yahoo.com';

$headers['From'] = 'webSiteCasaPetri@casapetrirosiamontana.ro';
$headers['To'] = 'petriadrian@gmail.com,petri_adrian@yahoo.com';
$headers['Subject'] = 'Casa Petri';
$headers['MIME-Version'] = '1.0';
$headers['Content-Type'] = 'text/html; charset=ISO-8859-1';

$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

// get content from website form
$body = '';
foreach ($_POST as $key => $value) {
  if (htmlspecialchars($value) != '') {
    $body .= htmlspecialchars($key) . " = " . htmlspecialchars($value) . "<br>";
    if (htmlspecialchars($key) == 'pageUrl') {
      $headers['Subject'] = 'casaPetri ' . htmlspecialchars($value);
    }
  }
}

// write the email content on a local file as backup
$logFile = fopen("../assets/log/send_mail.log", "a");
fwrite($logFile, "\n\nNew input on " . date(DATE_RFC822) . "\n");
fwrite($logFile, $body);
fclose($logFile);

// send email with reservation
$params['sendmail_path'] = '/usr/lib/sendmail';
$mail_object =& Mail::factory('sendmail', $params);
$mail_object->send($recipients, $headers, $body);

if (PEAR::isError($mail_object)) {
  $response_array['status'] = 'error';
  $response_array['message'] = $mail_object->getMessage();
} else {
  $response_array['status'] = 'success';
  $response_array['post'] = implode("", $_POST);
}
echo json_encode($response_array);
