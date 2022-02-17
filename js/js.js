// Welcome to Javascript part! Here we go to deep something!
// Next part is here https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// This functio is copied. Its tells is localStorage availabe.
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
function welcome() { // This function is tested whit IE and work property -AC
    var Well = "Welcome to Own Notes page!" 
    var notSoWell = "<br>Sorry but you cannot use this site, because your browser didn't support required features."
    if (storageAvailable('localStorage')) {
        // Yippee! We can use localStorage awesomeness
        document.getElementById("WelcomeNotes").innerHTML = Well;
        checkmemory();
        addCan();
      }
      else {
        // Too bad, no localStorage for us
        document.write(Well + notSoWell);
      }
} // Here ends localStorage test whit most of its copied!

/*Common list to storage all items
Idea how to manage list, save and get stuff out localStorage is get idea here: https://codepen.io/ragzor/pen/xGrJrg
*/
var list = document.querySelector("#list");
//This greate list aften page loading
function checkmemory() {
    var storedValues = window.localStorage.myNotes;
    if(!storedValues) { // ! means that there is no stored values = use this
      list.innerHTML = '<li class="undone">Time to make own Notes!</li>';
    }
    else {
      list.innerHTML = storedValues;
    }
  }
//This store items to localStorage and have to use all situations
function store() {
    window.localStorage.myNotes = list.innerHTML;
  }
// This function is adding items to list.
function AddItem() {
    var userInput = document.getElementById("AddItemText").value;
    var box = document.getElementById("AddItemText");
    if (userInput.length < 2) { // if input is 0 or 1 length user get alert.
      alert("Empty or too short Note!")
      box.style.borderColor = "red";
      store();
    } else {
    list.innerHTML += '<li class="undone">' + userInput + '</li>'; // class is for css style.
    store();
    addCan();
    document.getElementById("AddItemText").value = "";
    box.style.borderColor = "#1BA425";
  }
}
// This will give new class to items and make them to destroyable. This is carusel.
document.querySelector('ul').addEventListener('click', function(e){
  var checker = e.target;
  if (checker.classList.contains('undone')) {
    checker.classList.remove('undone');
    checker.classList.add('done');
  } else if (checker.classList.contains('done')) {
    checker.classList.remove('done');
    e.target.classList.add("tuhoa");
  } else if (checker.classList.contains('tuhoa')) {
    checker.classList.remove('tuhoa');
    e.target.classList.add("undone");
  } else  if (checker.classList.contains('stabil')) { //this part protek ul element, if this is not here can remove ul element
    checker.classList.remove('done');
    checker.classList.remove('tuhoa');
    checker.classList.remove('undone');
  } 
})
//This function destroy all objects that have class="tuhoa"
function destroy() { //this if for erros, because this get them all the time and interupt function.
  try {
    letsDoThisShit();
  } catch(err) {
    destroy();
  }
}
function letsDoThisShit() { // this do te math for how many items will destroy
  var del = document.getElementsByClassName("tuhoa");
  console.log(del.length);
  for (i = 0; i < del.length; i++) { // and removing doing here
  del[i].id = "ThisOneWillBeVanish";
  var r = document.getElementById("ThisOneWillBeVanish");
  r.parentNode.removeChild(r);
  console.log(i)
  }
  store();
  var del = document.getElementsByClassName("tuhoa");
  if (del.length > 0) { //and here we check that every litlle peace of "tuhoa" have vanished on air.
    destroy(); //like teletubbies "Here we go agen!"
  }
} 
// add random image to li element
function addCan() {
  var can = document.createElement("span");
  var doImg = [
  '<img src="img/done-blue_t.png" alt="Do this thing!" class="stabil" width="auto" height="28">',
  '<img src="img/done-green_t.png" alt="Do this thing!" class="stabil" width="auto" height="28">',
  '<img src="img/done-yellow_t.png" alt="Do this thing!" class="stabil" width="auto" height="28">']
  can.innerHTML = doImg[Math.floor(Math.random() * 3)];
  var Canned = document.getElementsByTagName("li");
  for (i = 0; i < Canned.length; i++) {
  Canned[i].appendChild(can);
  }
}
// Li elements counter
document.querySelector('body').addEventListener('click', function(){
  const counter = document.getElementsByTagName('li');
  document.getElementById("counterLi").innerHTML = counter.length;
})