<?php

    $pdo = new PDO('mysql:host=localhost;port=3306;dbname=event_manage_sys', 'root', 'root');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $search = $_GET['search'] ?? '';
    if ($search)
    {
        $statement = $pdo->prepare('SELECT * FROM events WHERE event_name LIKE :search ORDER BY event_id ASC');
        $statement->bindValue(":search", "%$search%");
    }
    else
    {
        $statement = $pdo->prepare('SELECT * FROM events ORDER BY event_id ASC');
    }
    $statement->execute();
    $events = $statement->fetchAll(PDO::FETCH_ASSOC);

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
    <title>Manage Events</title>
  </head>
  <body>
    <h1>Manage Events</h1>
    <p>
        <a href="create.php" class="btn btn-success">Add New Event</a>
    </p>
    <form action="" method="get">
        <div class="input-group mb-3">
            <input type="text" name="search" class="form-control" placeholder="Search for Event Name" value="<?php echo $search ?>">
            <div class="input-group-append">
                <button class="btn btn-outline-primary" type="submit">Search</button>
            </div>
        </div>
    </form>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Thumbnail</th>
            <th scope="col">Event ID</th>
            <th scope="col">Event Name</th>
            <th scope="col">Event Location</th>
            <th scope="col">Event Start Date</th>
            <th scope="col">Event End Date</th>
            <th scope="col">Registration Start</th>
            <th scope="col">Registration End</th>
            <th scope="col">Registration Fees</th>
            <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($events as $i => $event) : ?>
                <tr>
                    <th scope="row"><?php echo $i + 1 ?></th>
                    <td>
                        <img src="<?php echo $event['thumbnail_img'] ?>" class="thumbnail">
                    </td>
                    <td><?php echo $event['event_id'] ?></td>
                    <td><?php echo $event['event_name'] ?></td>
                    <td><?php echo $event['event_location'] ?></td>
                    <td><?php echo $event['event_start'] ?></td>
                    <td><?php echo $event['event_end'] ?></td>
                    <td><?php echo $event['reg_start'] ?></td>
                    <td><?php echo $event['reg_end'] ?></td>
                    <td><?php echo $event['reg_fees'] ?></td>
                    <td>
                        <a href="index.php?id=<?php echo $event['id'] ?>" class="btn btn-sm btn-outline-warning">Publish</a>
                        <a href="update.php?id=<?php echo $event['id'] ?>" class="btn btn-sm btn-outline-success">Update</a>
                        <form style="display: inline-block" method="post" action="delete.php">
                            <input type="hidden" name="id" value="<?php echo $event['id'] ?>">
                            <button type="submit" class="btn btn-sm btn-outline-danger">Delete</button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
  </body>
</html>