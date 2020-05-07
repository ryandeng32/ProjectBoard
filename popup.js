// input field
const input = document.getElementById("input");

// the four list elements
const now = document.getElementById("now");
const future = document.getElementById("future");
const done = document.getElementById("done");
const remove = document.getElementById("remove");

// the three buttons
const add_btn = document.getElementById("add");
const clear_btn = document.getElementById("clear");
const empty_btn = document.getElementById("empty");
const add_list_btn = document.getElementById("add-list");
const del_list_btn = document.getElementById("del-list");
const submit_btn = document.getElementById("submit");

const list_names = document.getElementById("list-names");
const brand = document.getElementById("brand");
const editor = document.getElementById("editor");
const text_edit = document.getElementById("text-edit");

/*************************************************************/

// init LIST and load from localStorage

// localStorage.clear();
// location.reload();

// LIST_project is a list of LIST
let LISTS, listId, listCount;
let list, id;
let current_list_index;

let board_data = localStorage.getItem("BOARD");
let index_data = localStorage.getItem("INDEX");

if (index_data) {
  current_list_index = JSON.parse(index_data)[0].index;
} else {
  current_list_index = 0;
  a = [];
  a.push({ index: current_list_index });
  localStorage.setItem("INDEX", JSON.stringify(a));
}

if (board_data) {
  LISTS = JSON.parse(board_data);
  listId = LISTS.length;
  list = LISTS[current_list_index].list;
  id = LISTS[current_list_index].list.length;
  loadList(list);
} else {
  list = [];
  LISTS = [];
  LISTS.push({
    name: "LIST 1",
    list: list,
    listId: 0,
  });
  listId = 1;
  listCount = 1;
  id = 0;
}
refresh();
function refresh() {
  loadLISTS(LISTS);
  loadList(LISTS[current_list_index].list);
  brand.innerHTML = LISTS[current_list_index].name;
  id = LISTS[current_list_index].list.length;
}
function loadLISTS(array) {
  list_names.innerHTML = "";
  array.forEach(function (item) {
    list_names.insertAdjacentHTML(
      "beforeend",
      `<a job="${item.listId}">${item.name}</a>`
    );
  });
}

function loadList(array) {
  now.innerHTML = "";
  future.innerHTML = "";
  done.innerHTML = "";
  remove.innerHTML = "";
  array.forEach(function (item) {
    addTask(item.text, item.id, item.tag, item.display);
  });
}

/*************************************************************/

// Use dragula.js for drag and drop
dragula([now, future, done, remove]).on("drop", function (el) {
  LISTS[current_list_index].list[el.id].tag = el.parentNode.id;
  localStorage.setItem("BOARD", JSON.stringify(LISTS));
});

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
    LISTS[current_list_index].list[el.id].display = false;
  });
  remove.innerHTML = "";
  localStorage.setItem("BOARD", JSON.stringify(LISTS));
}

function addList() {
  if (LISTS.length == 8) {
    return;
  }
  list = [];
  LISTS.push({
    name: "LIST " + (listCount + 1).toString(),
    list: list,
    listId: listId,
  });
  listId++;
  listCount++;
  localStorage.setItem("BOARD", JSON.stringify(LISTS));
  loadLISTS(LISTS);
}
// add item with enter key
document.addEventListener("keyup", function (e) {
  if (e.keyCode == 13 && e.shiftKey) {
    clearRemove();
  }
  if (e.keyCode == 13 && !e.shiftKey) {
    const task = input.value;
    if (task) {
      addTask(task, id, "future", true);
      LISTS[current_list_index].list.push({
        text: task,
        id: id,
        tag: "future",
        display: true,
      });

      id++;
      localStorage.setItem("BOARD", JSON.stringify(LISTS));
    }
    input.value = "";
  }
});
function delList() {
  if (LISTS.length == 1) {
    return;
  }
  LISTS.splice(current_list_index, 1);
  for (i = current_list_index; i < LISTS.length; i++) {
    LISTS[i].listId--;
  }
  listId--;
  current_list_index = 0;
  a = [];
  a.push({ index: current_list_index });
  localStorage.setItem("INDEX", JSON.stringify(a));
  localStorage.setItem("BOARD", JSON.stringify(LISTS));
  refresh();
}
function toggleEditor() {
  const text = brand.innerHTML;
  text_edit.val = text;
  brand.style.display = "none";
  editor.style.display = "inline";
}
function doEdit() {
  const text = text_edit.value;
  if (text) {
    brand.innerHTML = text;
    LISTS[current_list_index].name = text;
    localStorage.setItem("BOARD", JSON.stringify(LISTS));
    refresh();
  }
  brand.style.display = "inline";
  editor.style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
  clear_btn.addEventListener("click", clearRemove);
  add_btn.addEventListener("click", function () {
    const task = input.value;
    if (task) {
      addTask(task, id, "future", true);
      LISTS[current_list_index].list.push({
        text: task,
        id: id,
        tag: "future",
        display: true,
      });

      id++;
      localStorage.setItem("BOARD", JSON.stringify(LISTS));
    }
    input.value = "";
  });

  empty_btn.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
  });

  add_list_btn.addEventListener("click", addList);

  list_names.addEventListener("click", function (event) {
    console.log("hi");
    const element = event.target;
    const elementJob = element.attributes.job.value;
    current_list_index = elementJob;
    a = [];
    a.push({ index: current_list_index });
    localStorage.setItem("INDEX", JSON.stringify(a));
    refresh();
    console.log(current_list_index);
  });

  brand.addEventListener("click", toggleEditor);
  submit_btn.addEventListener("click", doEdit);
  del_list_btn.addEventListener("click", delList);
});
