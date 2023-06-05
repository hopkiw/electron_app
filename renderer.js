const img = document.querySelector('#the-image');

img.onclick = function () {
  console.log(decodeURI(img.src));
}

var curImage = 0;

const form = document.querySelector('#signup');
form.addEventListener('submit', async function (event) {
  // stop form submission
  event.preventDefault();

  const tag = this.querySelector('#tag')
  window.electronAPI.tagFile(filePaths[curImage], tag.value);
  tag.value = '';

  showTags(filePaths[curImage]);
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
  img.src = '/home/liamh/' + filePaths[curImage];
  showTags(filePaths[curImage]);
}

document.querySelector('#next').onclick = changeImage
document.querySelector('#prev').onclick = changeImage

window.addEventListener('keyup', async (event) => {
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
  img.src = '/home/liamh/' + filePaths[curImage];
  console.log(`You pressed ${event.key}, curImage ${curImage}/${filePaths.length}`);
  showTags(filePaths[curImage]);
}, true);

var allTags = [];

window.addEventListener('DOMContentLoaded', async (event) => {
  if (filePaths.length == 0) {
    console.log('getting paths');
    filePaths = await window.electronAPI.getFilePaths();
  } 
  if (allTags.length == 0) {
    console.log('getting tags');
    allTags = await window.electronAPI.getAllTags();
  }

  autocomplete(form.querySelector('#tag'), allTags);
  preload(...filePaths);
  img.src = '/home/liamh/' + filePaths[curImage];
  showTags(filePaths[curImage]);
}, true);

var images = [];
function preload() {
  for (var i = 0; i < arguments.length; i++) {
    images[i] = new Image();
    images[i].src = '/home/liamh/' + arguments[i];
  }
}

const tagtable = document.querySelector('#tags');
// TODO: try to pass a callback over the context bridge? vs promise

// TODO: dont make 3 different functions call showtags. merge the 'update'
// display. maybe use react?
async function showTags (filename) {
  var new_tbody = document.createElement('tbody');

  const tags = await window.electronAPI.getTags(filename);
  for (let tag in tags) {
    var row = new_tbody.insertRow(-1);
    var cell = row.insertCell(0);
    cell.innerHTML = tags[tag];
  }

  var old_tbody = document.querySelector('#the_tbody');
  old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
  new_tbody.id = 'the_tbody';
}

// from w3schools example

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}


// merge tags
// tag prefixes
// path-based tags
// display one or a gallery of images
// mass select (including select not shown, such as results of a search)
// actions - add a tag to an image. if tag doesnt exist create it.
// a menu that shows untagged
// maybe an unsafe sql pass through
