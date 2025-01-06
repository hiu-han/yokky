const toDoForm = document.getElementById('todo-form'),
      toDoInput = toDoForm.querySelector('input'),
      toDoList = document.getElementById('todo-list');

let toDos = new Array();
const TODOS_KEY = 'todos';

function handleToDoSubmit (e) {
  e.preventDefault();

  const newTodo = toDoInput.value;
  toDoInput.value = "";

  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  }
  toDos.push(newTodoObj);
  
  paintToDo(newTodoObj);
}

toDoForm.addEventListener('submit', handleToDoSubmit);