const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require("./helper")
const dbb = require("./helpers")
const cors = require('cors')
// socket
const server = require("http").createServer(app);

app.use(cors())
app.use(express.json())


app.set(express.urlencoded({ extended: false }));
app.set(express.json());

// landing
app.get("/", (req, res) => {
  res.json("hello word");
});

app.get("/any-users", db.getNotes);
app.get("/note/:id", db.getNoteById);
app.get("/agri-auth/:name/:password", db.getNoteByIds);
app.put("/note-updated/:id", db.updateNoteById);
app.post("/note-created", db.createNote);
app.delete("/note-removed/:id", db.deleteNote);

// news
// app.get("/any-news", dbb.getNews);
// app.get("/news/:id", dbb.getNewsById);
// app.put("/news-updated/:id", dbb.updateNewsById);
// app.post("/news-created", dbb.createNews);
// app.delete("/news-removed/:id", dbb.deleteNews);


server.listen(8080, () => {
  console.log("server is running on port :*8080");
});
