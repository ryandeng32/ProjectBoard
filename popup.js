const input = document.getElementById("input");
const now = document.getElementById("now");
const future = document.getElementById("future");
const done = document.getElementById("done");
const remove = document.getElementById("remove");

/* Custom Dragula JS */
dragula([now, future, done, remove]);

function addTask(task) {
  const item = `<li class="task">
        <p>${task}</p>
      </li>`;

  now.insertAdjacentHTML("beforeend", item);
  input.value = "";
}

function emptyRemove() {
  remove.innerHTML = "";
}

// add item with enter key
document.addEventListener("keyup", function (e) {
  if (e.keyCode == 13 && e.shiftKey) {
    emptyRemove();
  }
  if (e.keyCode == 13 && !e.shiftKey) {
    const task = input.value;

    if (task) {
      addTask(task);
    }
    input.value = "";
  }
});
