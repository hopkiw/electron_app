const img = document.querySelector('#the-image');

img.onclick = function () {
  console.log(decodeURI(img.src));
}

var curImage = 0;

const form = document.querySelector('#signup');
form.addEventListener('submit', async function (event) {
  // stop form submission
  event.preventDefault();

  // Do something else...
});

var filePaths = [];

async function changeImage() {
  if (filePaths.length == 0) {
    console.log('getting paths')
    filePaths = await window.electronAPI.getFilePaths();
  } 
  switch (this.id) {
    case "next":
      curImage++;
      break;
    case "prev":
      curImage--;
      break;
    case undefined:
      console.log('no id');
      break;
    default:
      console.log(`i don't know ${this.id} ${typeof(this.id)}`);
  }
  img.src = filePaths[curImage];
}

document.querySelector('#next').onclick = changeImage
document.querySelector('#prev').onclick = changeImage

async function handleKeyPress (event) {
  if (filePaths.length == 0) {
    console.log('getting paths')
    filePaths = await window.electronAPI.getFilePaths();
  } 

  switch (event.key) {
    case 'ArrowRight':
      curImage++;
      break;
    case 'ArrowLeft':
      curImage--;
      break;
    default:
      return;
  }
  if (curImage >= filePaths.length - 1) {
    curImage = filePaths.length - 1;
  }
  if (curImage < 0) {
    curImage = 0;
  }
  img.src = filePaths[curImage];
  console.log(`You pressed ${event.key}, curImage ${curImage}/${filePaths.length}`);
}

async function handleLoad (event) {
  if (filePaths.length == 0) {
    console.log('getting paths')
    filePaths = await window.electronAPI.getFilePaths();
  } 
  preload(...filePaths);
  img.src = filePaths[curImage];
}

window.addEventListener('keyup', handleKeyPress, true)
window.addEventListener('load', handleLoad, true)

var images = [];
function preload() {
  for (var i = 0; i < arguments.length; i++) {
    images[i] = new Image();
    images[i].src = arguments[i];
  }
}


// merge tags
// tag prefixes
// path-based tags
// display one or a gallery of images
// mass select (including select not shown, such as results of a search)
// actions - add a tag to an image. if tag doesnt exist create it.
// a menu that shows untagged
// maybe an unsafe sql pass through
