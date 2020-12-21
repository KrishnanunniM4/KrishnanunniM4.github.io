<?php

    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=event_manage_sys', 'root', 'root');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $id = $_GET['id'] ?? null;

    if (!$id) {
        header('Location: event.php');
        exit;
    }

    $statement = $pdo->prepare('SELECT * FROM events WHERE id = :id');
    $statement->bindValue(':id', $id);
    $statement->execute();
    $event = $statement->fetch(PDO::FETCH_ASSOC);
    $errors = [];

    $event_id = $event['event_id'];
    $event_name = $event['event_name'];
    $description = $event['description'];
    $event_location = $event['event_location'];
    $event_start = $event['event_start'];
    $event_end = $event['event_end'];
    $reg_start = $event['reg_start'];
    $reg_end = $event['reg_end'];
    $reg_fees = $event['reg_fees'];

    if($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $event_id = $_POST['event_id'];
        $event_name = $_POST['event_name'];
        $description = $_POST['description'];
        $event_location = $_POST['event_location'];
        $event_start = $_POST['event_start'];
        $event_end = $_POST['event_end'];
        $reg_start = $_POST['reg_start'];
        $reg_end = $_POST['reg_end'];
        $reg_fees = $_POST['reg_fees'];

        if(!$event_id){
            $errors[] = 'Event ID is Required';
        }
        if(!$event_name){
            $errors[] = 'Event Name is Required';
        }
        if(!$description){
            $errors[] = 'Event Description is Required';
        }
        if(!$event_location){
            $errors[] = 'Event Location is Required';
        }
        if(!$event_start){
            $errors[] = 'Event Start Date is Required';
        }
        if(!$event_end){
            $errors[] = 'Event End Date is Required';
        }
        if(!$reg_start){
            $errors[] = 'Registration Start Date is Required';
        }
        if(!$reg_end){
            $errors[] = 'Registration End Date is Required';
        }
        if(!$reg_fees){
            $errors[] = 'Registration Fees is Required';
        }

        if (!is_dir('images')) {
            mkdir('images');
        }
        if (empty($errors))
        {
            $thumbnail_img = $_FILES['thumbnail_img'] ?? null;
            $imagePath = $event['thumbnail_img'];
            if ($thumbnail_img && $thumbnail_img['tmp_name']) {
                if ($event['thumbnail_img']) {
                    unlink($event['thumbnail_img']);
                }
                $imagePath = 'images/'.randomString(8).'/'.$thumbnail_img['name'];
                mkdir(dirname($imagePath));
                move_uploaded_file($thumbnail_img['tmp_name'], $imagePath);
            }

            $statement = $pdo->prepare("UPDATE events SET event_id = :event_id, event_name = :event_name, description = :description, event_location = :event_location, thumbnail_img = :thumbnail_img, event_start = :event_start, event_end = :event_end, reg_start = :reg_start, reg_end = :reg_end, reg_fees = :reg_fees WHERE id = :id");  
            $statement->bindValue(':event_id', $event_id);                           
            $statement->bindValue(':event_name', $event_name);
            $statement->bindValue(':description', $description);
            $statement->bindValue(':event_location', $event_location);
            $statement->bindValue(':thumbnail_img', $imagePath);
            $statement->bindValue(':event_start', $event_start);
            $statement->bindValue(':event_end', $event_end);
            $statement->bindValue(':reg_start', $reg_start);
            $statement->bindValue(':reg_end', $reg_end);
            $statement->bindValue(':reg_fees', $reg_fees);
            $statement->bindValue(':id', $id);
            $statement->execute();
            header('Location: event.php');
        }
    }

    function randomString($n)
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $str = '';
        for ($i = 0; $i < $n; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $str .= $characters[$index];
        }
        return $str;
    }

?>

<!doctype html>
<html lang="en">

  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <title>Update Event</title>
  </head>
    
  <body>
    <p>
        <a href="event.php" class="btn btn-secondary">Go Back To Manage Events</a>
    </p>
    <h1>Update Event <b><?php echo $event['event_name']?></b></h1>

    <?php if (!empty($errors)) : ?>
        <div class="alert alert-danger">
            <?php foreach ($errors as $error) : ?>
                <div> <?php echo $error ?> </div>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>

    <form action="" method="post" enctype="multipart/form-data">
    <?php if ($event['thumbnail_img']) : ?>
        <img src="<?php echo $event['thumbnail_img'] ?>" class="thumbnail-update">
    <?php endif; ?>
        <div class="mb-3">
            <label class="form-label">Event Thumbnail</label>
            <input type="file" name="thumbnail_img" class="form-control">
        </div>
        <div class="mb-3">
            <label class="form-label">Event ID</label>
            <input type="text" name="event_id" class="form-control" value="<?php echo $event_id ?>">
        </div>
        <div class="mb-3">
            <label class="form-label">Event Name</label>
            <input type="text" name="event_name" class="form-control" value="<?php echo $event_name ?>">
        </div>
        <div class="mb-3">
            <label class="form-label">Event Description</label>
            <textarea name="description" class="form-control"><?php echo $description ?></textarea>
        </div>
        <div class="mb-3">
            <label class="form-label">Event Location</label>
            <input type="text" name="event_location" class="form-control" value="<?php echo $event_location ?>">
        </div>
        <div class="mb-3">
            <label class="form-label">Event Start Date</label>
            <input type="date" name="event_start" class="form-control" value="<?php echo $event_start ?>">
        </div>
        <div class="mb-3">
            <label class="form-label">Event End Date</label>
            <input type="date" name="event_end" class="form-control" value="<?php echo $event_end ?>">
        </div>
        <div class="mb-3">
            <label class="form-label">Registration Start Date</label>
            <input type="date" name="reg_start" class="form-control" value="<?php echo $reg_start ?>">
        </div>
        <div class="mb-3">
            <label class="form-label">Registration End Date</label>
            <input type="date" name="reg_end" class="form-control" value="<?php echo $reg_end ?>">
        </div>
        <div class="mb-3">
            <label class="form-label">Registration Fees</label>
            <input type="number" name="reg_fees" step=".01" class="form-control" value="<?php echo $reg_fees ?>">
        </div>
        <button type="submit" class="btn btn-primary">Update Event</button>
    </form>

  </body>
</html>