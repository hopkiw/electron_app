const { app, BrowserWindow, ipcMain } = require('electron');

const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const dbname = './test.db';

let db = new sqlite3.Database(dbname, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log(`Opened SQLite database "${dbname}"`);
});


function tagFile(event, path, tag) {
  console.log(`adding ${tag} to ${path}`);
  db.run(`INSERT OR IGNORE INTO tags (tag) VALUES (?)`, [ tag ]);
  db.run(`INSERT OR IGNORE INTO filetags (pathId, tagId) VALUES (
    (SELECT id FROM paths WHERE path = ?), 
    (SELECT id FROM tags WHERE tag = ?))`,
  [ path, tag ]);
}

function getTags(event, path) {
  var sql = `SELECT tags.tag FROM filetags
  INNER JOIN paths ON paths.id = filetags.pathid
  INNER JOIN tags ON tags.id = filetags.tagid
  WHERE paths.path = ?`

  console.log(`getting tags for ${path}`);
  return new Promise((resolve, reject) => {
    var tags = [];
    db.each(sql, [path],
      (err, row) => {
        if (err) {
          return console.error(err.message);
        }

        console.log(`adding tag ${row.tag} to res`);
        tags.push(row.tag);
      },
      (err, count) => {
        if (err) {
          reject(console.error(err));
        }

        console.log(`finished db.each with ${count} rows`);
        resolve(tags);
      });
  });
}

function getFilePaths () {
  var sql = `SELECT id, path FROM paths`;
  return new Promise((resolve, reject) => {
    var records = [];
    db.each(sql, [],
      (err, row) => {
        if (err) {
          return console.error(err.message);
        }

        records.push(row.path);
      },
      (err, count) => {
        if (err) {
          reject(console.error(`error: ${err}`));
        }

        console.log(`finished db.each with ${count} rows`);
        resolve(records);
      });
  });
}

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.handle('getFilePaths', getFilePaths);
  ipcMain.handle('getTags', getTags);
  ipcMain.on('tagFile', tagFile);
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }

    console.log('Database connection closed.');
  });
  if (process.platform !== 'darwin') app.quit();
});


