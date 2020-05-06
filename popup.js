const input = document.getElementById("input");

const now = document.getElementById("now");
const future = document.getElementById("future");
const done = document.getElementById("done");
const remove = document.getElementById("remove");

const add_btn = document.getElementById("add");
const clear_btn = document.getElementById("clear");
const empty_btn = document.getElementById("empty");
/* Custom Dragula JS */

// -----------------------------
let LIST;
let data = localStorage.getItem("BOARD");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

dragula([now, future, done, remove]).on("drop", function (el) {
  LIST[el.id].tag = el.parentNode.id;
  localStorage.setItem("BOARD", JSON.stringify(LIST));
});

function loadList(array) {
  array.forEach(function (item) {
    addTask(item.text, item.id, item.tag, item.display);
  });
}

function addTask(task, id, tag, display) {
  if (!display) {
    return;
  }
  const item = `<li class="task" id=${id}>
        <p>${task}</p>
      </li>`;
  if (tag == "now") {
    now.insertAdjacentHTML("beforeend", item);
  } else if (tag == "future") {
    future.insertAdjacentHTML("beforeend", item);
  } else if (tag == "done") {
    done.insertAdjacentHTML("beforeend", item);
  } else if (tag == "remove") {
    remove.insertAdjacentHTML("beforeend", item);
  }

  input.value = "";
}

function clearRemove() {
  const listItems = remove.children;
  const listArray = Array.from(listItems);
  listArray.forEach(function (el) {
    LIST[el.id].display = false;
  });
  remove.innerHTML = "";
  localStorage.setItem("BOARD", JSON.stringify(LIST));
}

// add item with enter key
document.addEventListener("keyup", function (e) {
  if (e.keyCode == 13 && e.shiftKey) {
    emptyRemove();
  }
  if (e.keyCode == 13 && !e.shiftKey) {
    const task = input.value;
    if (task) {
      addTask(task, id, "future", true);
      LIST.push({
        text: task,
        id: id,
        tag: "future",
        display: true,
      });
      id++;
      localStorage.setItem("BOARD", JSON.stringify(LIST));
    }
    input.value = "";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  clear_btn.addEventListener("click", clearRemove);
  add_btn.addEventListener("click", function () {
    const task = input.value;
    if (task) {
      addTask(task, id, "future", true);
      LIST.push({
        text: task,
        id: this.id,
        tag: "future",
        display: true,
      });
      id++;
      localStorage.setItem("BOARD", JSON.stringify(LIST));
    }
    input.value = "";
  });
  empty_btn.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
  });
});
