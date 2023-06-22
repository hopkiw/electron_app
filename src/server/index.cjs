// The express server entrypoint

'use strict'

const fileController = require('./controllers/file.cjs');
const tagController = require('./controllers/tag.cjs');

const express = require('express');
const app = module.exports = express();

app.use(express.json())

app.route('/api/files')
  .get(getAllFiles)
  .post(newFile);

app.route('/api/tags')
  .get(getAllTags)
  .post(newTag);

app.route('/api/files/:id')
  .get(getFile)
  .put(replaceFile)
  .patch(updateFile)
  .delete(deleteFile);

app.route('/api/tags/:id')
  .get(getTag)
  .put(replaceTag)
  .patch(updateTag)
  .delete(deleteTag);

// do these belong in routes/
async function deleteFile(req, res) { 
  const result = await fileController.deleteFile(req.params.id);
  res.send({ message: "deleteFile", result: result });
}

async function deleteTag(req, res) { 
  const result = await tagController.deleteTag(req.params.id);
  res.send({ message: "deleteTag", result: result });
}

async function getAllFiles(req, res) { 
  const result = await fileController.getFiles();
  res.send({ message: "getAllFiles", result: result });
}

async function getAllTags(req, res) { 
  const result = await tagController.getTags();
  res.send({ message: "getAllTags", result: result });
}

async function getFile(req, res) { 
  const result = await fileController.getFileById(req.params.id);
  res.send({ message: "getFile", result: result });
}

async function getTag(req, res) { 
  const result = await tagController.getTagById(req.params.id);
  res.send({ message: "getTag", result: result });
}

async function newFile(req, res) { 
  const result = await fileController.newFile(req.body.name);
  res.send({ message: "newFile", request: result });
}

async function newTag(req, res) { 
  const result = await tagController.newTag(req.body.name);
  res.send({ message: "newTag", result: result });
}

async function replaceFile(req, res) { 
  res.send({ message: "replaceFile UNIMPLEMENTED" });
}

async function replaceTag(req, res) { 
  res.send({ message: "replaceTag UNIMPLEMENTED" });
}

// we're going to consider this as updateTagsForFile for now even though it
// should only modify the File object itself.
async function updateFile(req, res) { 
  const result = await fileController.updateFile(req.params.id, req.body);
  res.send({ message: "updateFile", result: result });
}

async function updateTag(req, res) { 
  // TODO: codes
  res.send({ message: "updateTag UNIMPLEMENTED" });
}

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

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}


/*

POST: create me a new one, server provides some auto generated fields such as ID
PUT: I am describing an entire object, usually one which exists. idempotent.
PATCH: I am telling you changed fields of an object, please merge them in. (probably where we add tags?)

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
  *   PATCH  (UPDATE) => 200, 204 or 404
  *   DELETE (DELETE) => 200 or 404

*/
