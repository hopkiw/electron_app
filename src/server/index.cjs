// The express server entrypoint

"use strict"

const { 
  getFile,
  getFiles,
  newFile,
  deleteFile,
  replaceFile,
  updateFile,
} = require("./routes/file.cjs");

const {
  deleteTag,
  getTags,
  getTag,
  newTag,
  replaceTag,
  updateTag,
} = require("./routes/tag.cjs");

const express = require("express");
const app = module.exports = express();
const cors = require("cors")
const corsOptions = {
  origin: "http://localhost:5173"
}
app.use(cors(corsOptions));
app.use(express.json())

app.route("/api/files")
  .get(getFiles)
  .post(newFile)
  .delete((req, res) => res.sendStatus(405))
  .patch((req, res) => res.sendStatus(405))
  .put((req, res) => res.sendStatus(405))

app.route("/api/files/:id")
  .delete(deleteFile)
  .get(getFile)
  .put(replaceFile)
  .patch((req, res) => res.sendStatus(405))
  .post((req, res) => res.sendStatus(409)) // TODO: conditionally 404/409

app.route("/api/tags")
  .get(getTags)
  .post(newTag)
  .delete((req, res) => res.sendStatus(405))
  .patch((req, res) => res.sendStatus(405))
  .put((req, res) => res.sendStatus(405))

app.route("/api/tags/:id")
  .delete(deleteTag)
  .get(getTag)
  .put(replaceTag)
  .patch((req, res) => res.sendStatus(405))
  .post((req, res) => res.sendStatus(409)) // TODO: conditionally 404/409

// Error handler
app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.send({ error: err.message });
});

// Unknown path handler
app.use(function(req, res){
  res.status(404);
  res.send({ error: { message: "Sorry, can't find that" } })
});

// Allow running directly
if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}

/*

POST: create me a new one, server provides some auto generated fields such as ID
PUT: I am describing an entire object, usually one which exists. idempotent.
PATCH: I am telling you changed fields of an object, please merge them in.

  Whole collection:

  *   POST   (CREATE) => 201 && redirect to it
  *   GET    (READ)   => 200 also use pagination
  *   PUT    (UPDATE) => 405
  *   PATCH  (UPDATE) => 405
  *   DELETE (DELETE) => 405

  Specific item:

  *   POST   (CREATE) => 404 or 409 if exists/conflict
  *   GET    (READ)   => 200 or 404
  *   PUT    (UPDATE) => 200, 204 or 404
  *   PATCH  (UPDATE) => 200, 204 or 404 (204 is 200 no body)
  *   DELETE (DELETE) => 200 or 404

*/
