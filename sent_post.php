<?

		require_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/php_interface/PHPMailer/class.phpmailer.php');


		function custom_mail($to, $subject, $message, $additionalHeaders = '', $additional_parameters = '')
		{
			/**
			* Start Settings
			*/
			//file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/debugger.txt', print_r(func_get_args(), true), FILE_APPEND);
			//file_put_contents($_SERVER['DOCUMENT_ROOT'] . '/debugger.txt', print_r($additional_parameters, true), FILE_APPEND);
			$mail             = new PHPMailer();
			$mail->CharSet    = "koi8-r";
			$mail->IsSMTP(); 										// telling the class to use SMTP
			$mail->SMTPDebug  = 2;                     				// enables SMTP debug information (for testing)
			                                           				// 1 = errors and messages
																	// 2 = messages only

			$GMAIL = FALSE;

if($GMAIL)
{
			//SETTINGS FOR GMAIL
			$mail->SMTPAuth   = true;                                  // enable SMTP authentication
            $mail->SMTPSecure = "ssl";                                 // sets the prefix to the servier
            //$mail->SMTPSecure = "tls";                                 // sets the prefix to the servier
            $mail->Host = 'smtp.gmail.com';
            $mail->Port       = 465;                                   // set the SMTP port for the GMAIL server
            //$mail->Port       = 587;                                   // set the SMTP port for the GMAIL server
            $mail->SMTPAuth = true;
            $mail->Username   = "craftmannbot@gmail.com";                       // GMAIL username
            $mail->Password   = "ustasadm";                                           // GMAIL password
            $mail->XMailer    = "Microsoft Office Outlook 12.0";    
            $mail->Helo       = "Craftmann";
            $mail->Hostname   = "mail.google.com";
            $mail->SetFrom('craftmannbot@gmail.com', 'Craftmann');
            $mail->AddReplyTo("craftmannbot@gmail.com", "Craftmann");
			$mail->AddAddress("craftmannbot@gmail.com");
			//End SETTINGS FOR GMAIL
}
else
{
			$mail->SMTPSecure = "ssl";                                 // sets the prefix to the servier
	//$mail->Host       = "mail.craftmann.ru";   			// sets GMAIL as the SMTP server
            $mail->Host       = "185.83.0.28";               // Only for test server
            $mail->Port       = 465;                                   // set the SMTP port for the GMAIL server
            $mail->Username   = "shop@craftmann.ru";               // GMAIL username
            $mail->Password   = "nKbqJDoN";                         // GMAIL password
            $mail->XMailer    = "Microsoft Office Outlook 12.0";    
            $mail->Helo       = "Craftmann";
            $mail->Hostname   = "mail.craftmann.ru";
            $mail->SetFrom('shop@craftmann.ru', 'Craftmann');
            $mail->AddReplyTo("shop@craftmann.ru", "Craftmann");
			$mail->AddAddress($to);
            ///End SETTINGS FOR CRAFTMANN
 
}


			//$mail->addBCC($bcc);
			$mail->Subject    = iconv("windows-1251", "koi8-r", $subject);

			$IS_HTML = false;
			if (strpos($additionalHeaders, 'Content-Type: text/html') !== false && strpos($additionalHeaders, 'Content-Type: text/plain') === false) {
				$IS_HTML = true;
			}
			$mail->isHTML($IS_HTML);
			//$message = $additionalHeaders." ".$message; 
			$mail->Body = iconv("windows-1251", "koi8-r//TRANSLIT", $message);
			//$mail->AddAttachment("images/phpmailer.gif");      // attachment
			//$mail->AddAttachment("images/phpmailer_mini.gif"); // attachment

			if(!$mail->Send()) {
			  echo "Mailer Error: " . $mail->ErrorInfo;
			} else {
			  echo "Message sent!";
			}
		}
?>