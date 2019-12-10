const express = require("express");
const app = express();
const port = 3000;
const connection = require("./conf");
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// écoute port
app.listen(port, err => {
  if (err) {
    throw new Error("bad");
  }
  console.log(`$(port)`);
});

app.get("/api", (req, res) => {
  connection.query("SELECT * from table_quest", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des employés");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/light", (req, res) => {
  connection.query("SELECT id, date from table_quest", (err, results) => {
    if (err) {
      res.status(500).send("Erreur lors de la récupération des employés");
    } else {
      res.json(results);
    }
  });
});

app.get("/api/sorted/:order", (req, res) => {
  const order = req.params.order;
  if (order === "desc") {
    connection.query(
      "SELECT * from table_quest ORDER BY id desc",
      (err, results) => {
        if (err) {
          res.status(500).send("Erreur lors de la récupération des employés");
        } else {
          res.json(results);
        }
      }
    );
  }
  if (order === "asc") {
    connection.query(
      "SELECT * from table_quest ORDER BY id asc",
      (err, results) => {
        if (err) {
          res.status(500).send("Erreur lors de la récupération des employés");
        } else {
          res.json(results);
        }
      }
    );
  }
});

app.post("/api/new", (req, res) => {
  const formData = req.body;
  connection.query(
    "INSERT INTO table_quest SET ?",
    formData,
    (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la request put");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.put("/api/changetext/:id", (req, res) => {
  const id = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE table_quest SET ? WHERE id = ?",
    [formData, id],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un film");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.put("/api/changebool/:id", (req, res) => {
  const id = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE table_quest SET bool = !bool WHERE id = ?",
    [formData, id],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la modification d'un film");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  const idmovie = req.params.id;

  connection.query("DELETE FROM tables_quest WHERE id = ?", [idmovie], err => {
    if (err) {
      console.log(err);
      res.status(500).send("Erreur lors de la suppression d'un employé");
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const idmovie = req.params.id;

  connection.query(
    "DELETE FROM tables_quest WHERE bool = false",
    [idmovie],
    err => {
      if (err) {
        console.log(err);
        res.status(500).send("Erreur lors de la suppression d'un employé");
      } else {
        res.sendStatus(200);
      }
    }
  );
});

app.get("/api/:id", (req, res) => {
  const id = req.params.id;
  connection.query(
    "SELECT * from table_quest WHERE id = ?",
    id,
    (err, results) => {
      if (err) {
        res.status(500).send("Erreur lors de la récupération des employés");
      } else {
        res.json(results);
      }
    }
  );
});
