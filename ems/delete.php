<?php

    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=event_manage_sys', 'root', 'root');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id = $_POST['id'] ?? null;

    if (!$id) {
        header('Location: event.php');
        exit;
    }

    $statement = $pdo->prepare('DELETE FROM events WHERE id = :id');
    $statement->bindValue(':id', $id);
    $statement->execute();
    header('Location: event.php');

?>