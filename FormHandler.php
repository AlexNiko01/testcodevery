<?php


class FormHandler
{
    public $firstname, $lastname, $email, $phone, $message, $file, $path, $statment, $result, $date, $id;

    public function __construct($firstname, $lastname, $email, $phone, $message, $file, $statment)
    {
        $this->firstname = $firstname;
        $this->lastname = $lastname;
        $this->email = $email;
        $this->phone = $phone;
        $this->message = $message;
        $this->file = $file;
        $this->statment = $statment;
    }

    public function saveFile()
    {
        if (!empty($this->file)) {
            if (!is_dir(__DIR__ . '/uploads')) {
                mkdir(__DIR__ . '/uploads');
            }
            $uploaddir = __DIR__ . '/uploads/';
            $copy = copy($_FILES['file']['tmp_name'], __DIR__ . "/uploads/" . basename($_FILES['file']['name']));
            if ($copy) {
                $this->path = $uploaddir . basename($_FILES['file']['name']);
            }
        }
    }

    public function insertInToDB($pdo)
    {
        if (isset($_POST) && !empty($_POST)) {
            try {
                $statement = $pdo->prepare("INSERT INTO user(firstname, lastname, email, phone, message, path)
                      VALUES('" . $this->firstname . "','" . $this->lastname . "','" . $this->email . "','" . $this->phone . "',\"" . $this->message . "\",'" . $this->path . "')");
                $statement->execute();
                $this->id = $pdo->lastInsertId();
            } catch (Exception $e) {
                echo $e->getMessage();
            }

        }
        return $this->id;
    }

    public function selectFromDB($pdo, $id)
    {
        $getdate = $pdo->prepare("SELECT date FROM user where id=?");
        $this->date = '';
        if ($getdate->execute(array($id))) {
            while ($row = $getdate->fetch()) {
                $this->date = $row['date'];

            }
        }
    }

    public function sendEmail()
    {
        if ($this->statement = true) {
            $to = $this->email;
            $subject = "Reply to comment";
            $adminSubject = "You'v got a comment";
            $adminMessage = $this->firstname . ' ' . $this->lastname . ' left a comment';
            $message = 'Dear ' . $this->firstname . ' ' . $this->lastname . '!<br><p>Thank you for your comment</p>';
            $headers = "Content-type: text/html; charset=utf-8 \r\n";
            $headers .= "From: <ADMIN_EMAIL>\r\n";
            $headers .= "Reply-To: reply-to@example.com\r\n";
            $adminHeaders = "Content-type: text/html; charset=utf-8 \r\n";
            mail($to, $subject, $message, $headers);
            mail(ADMIN_EMAIL, $adminSubject, $adminMessage, $adminHeaders);

        }
    }

    public function returnResult()
    {
        $this->result = array(
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'email' => $this->email,
            'message' => $this->message,
            'date' => $this->date
        );
        echo json_encode($this->result);
    }
}