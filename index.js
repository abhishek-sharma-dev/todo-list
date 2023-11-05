(function () {
  // load todolist data from local stroage
  var todoList = JSON.parse(localStorage.getItem("todoList"));
  // if not blank then get all the data from local stroage
  if (todoList != null) {
    for (let i = 0; i < todoList.length; i++) {
      var todoText = todoList[i];

      // create todoelement
      var todoElement = document.createElement("div");
      todoElement.className = "todo-element";

      // create todoDiv
      var todoDiv = document.createElement("div");
      todoDiv.className = "todo";
      // todoDiv.contentEditable = "true";
      var txt = document.createTextNode(todoText);
      todoDiv.appendChild(txt);

      // create todoEditbtn
      var todoEditbtn = document.createElement("button");
      todoEditbtn.className = "todo-edit-btn";

      var editIcon = document.createElement("i");
      editIcon.className = "far fa-edit";
      todoEditbtn.appendChild(editIcon);

      // create todoDeletebtn
      var deleteTodoBtn = document.createElement("button");
      deleteTodoBtn.className = "todo-delete-btn";

      var deleteIcon = document.createElement("i");
      deleteIcon.className = "fas fa-trash";
      deleteTodoBtn.appendChild(deleteIcon);

      deleteTodoBtn.addEventListener("click", deleteTodo);
      todoEditbtn.addEventListener("click", editTodo);

      // add todoDiv and todoDeletebtn inside todoelement
      todoElement.appendChild(todoDiv);
      todoElement.appendChild(todoEditbtn);
      todoElement.appendChild(deleteTodoBtn);

      // add todoelement inside todoResult
      var todoResult = document.getElementById("result");
      todoResult.appendChild(todoElement);
    }
  }
})();

document.getElementById("userinput").onkeypress = function (event) {
  if (event.code === "Enter") {
    addTodo();
  }
};

function addTodo() {
  var inputvalue = document.getElementById("userinput").value;

  if (inputvalue === "") {
    alert("You must write something!");
  } else {
    // create todoelement
    var todoElement = document.createElement("div");
    todoElement.className = "todo-element";

    // create todoDiv
    var todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    // todoDiv.contentEditable = "true";
    var txt = document.createTextNode(inputvalue);
    todoDiv.appendChild(txt);

    // create todoEditbtn
    var todoEditbtn = document.createElement("button");
    todoEditbtn.className = "todo-edit-btn";
    var editIcon = document.createElement("i");
    editIcon.className = "far fa-edit";
    todoEditbtn.appendChild(editIcon);

    // create todoDeletebtn
    var deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.className = "todo-delete-btn";

    var deleteIcon = document.createElement("i");
    deleteIcon.className = "fas fa-trash";
    deleteTodoBtn.appendChild(deleteIcon);

    deleteTodoBtn.addEventListener("click", deleteTodo);
    todoEditbtn.addEventListener("click", editTodo);

    // add todoDiv and todoDeletebtn inside todoelement
    todoElement.appendChild(todoDiv);
    todoElement.appendChild(todoEditbtn);
    todoElement.appendChild(deleteTodoBtn);

    // add todoelement inside todoResult
    var todoResult = document.getElementById("result");
    todoResult.appendChild(todoElement);

    var todoArr;

    // add todoelement text into localstroage
    if (localStorage.getItem("todoList")) {
      todoArr = JSON.parse(localStorage.getItem("todoList"));
      todoArr.push(inputvalue);
      localStorage.setItem("todoList", JSON.stringify(todoArr));
    } else {
      todoArr = [];
      todoArr.push(inputvalue);
      localStorage.setItem("todoList", JSON.stringify(todoArr));
    }

    // remove text from text field
    document.getElementById("userinput").value = "";
  }
}

function deleteTodo() {
  // get the todo element to delete
  var deleteElement = this.parentElement;
  deleteElement.parentNode.removeChild(deleteElement);

  // get the innertext of todo element to delete
  var deleteElementText = deleteElement.childNodes[0].innerText;

  // fetch the todoData from localStorage and remove the text and update localstorage
  var todoListArr = JSON.parse(localStorage.getItem("todoList"));

  const index = todoListArr.indexOf(deleteElementText);

  if (index > -1) {
    todoListArr.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(todoListArr));
  }
}

function deleteAllTodo() {
  var todoResult = JSON.parse(localStorage.getItem("todoList"));
  localStorage.clear(todoResult);

  var resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "";
}

var todoArrIndex = -1;

function editTodo() {
  var currentTodoElement = this.parentElement;

  // set currentTodoElement contentEditable == true;
  currentTodoElement.firstElementChild.contentEditable = "true";

  currentTodoElement.childNodes[1].removeEventListener("click", editTodo);

  var resultDivChildElemnts = currentTodoElement.parentElement.children;

  for (let i = 0; i < resultDivChildElemnts.length; i++) {
    var resultDivTodoElement = resultDivChildElemnts[i];
    if (resultDivTodoElement === currentTodoElement) {
      todoArrIndex = i;
    }
  }

  // Create new save icon and replace with edit icon
  currentTodoElement.childNodes[1].className = "todo-save-btn";
  currentTodoElement.childNodes[1].innerHTML = "";
  var saveIcon = document.createElement("i");
  saveIcon.className = "fas fa-check";
  currentTodoElement.childNodes[1].appendChild(saveIcon);

  currentTodoElement.childNodes[1].addEventListener("click", saveTodo, false);
}

function saveTodo() {
  var todoListArr = JSON.parse(localStorage.getItem("todoList"));

  var editedTodoElement = this.parentElement;
  editedTodoElement.childNodes[1].removeEventListener("click", saveTodo, false);

  var todoText = editedTodoElement.firstChild.innerText;
  todoListArr[todoArrIndex] = todoText;
  localStorage.setItem("todoList", JSON.stringify(todoListArr));

  // Create new edit icon and replace with save icon
  editedTodoElement.childNodes[1].className = "todo-edit-btn";
  editedTodoElement.childNodes[1].innerHTML = "";
  var editIcon = document.createElement("i");
  editIcon.className = "far fa-edit";
  editedTodoElement.childNodes[1].appendChild(editIcon);

  editedTodoElement.childNodes[1].addEventListener("click", editTodo, false);

  editedTodoElement.firstElementChild.contentEditable = "false";
}
