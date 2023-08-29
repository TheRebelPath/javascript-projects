const todoList = JSON.parse(localStorage.getItem('todolist')) || [{
  name: null,
  dueDate: null
}];
renderTodoList();
function renderTodoList(){
  let todoListHTML = '';
  todoList.forEach((todoObject, index)=>{
     const {name, dueDate} = todoObject;
 
     const html = `<div>${name}</div>
     <div>${dueDate}</div>
     <button class="delete-todo-button js-delete-todo-button">Delete</button>
     `
     ;
     
     todoListHTML += html; 
  });
  
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  document.querySelectorAll('.js-delete-todo-button')
  .forEach((deleteButton, index)=>{
   deleteButton.addEventListener('click', ()=>{
    todoList.splice(index, 1);
     renderTodoList();
     saveTodo();
   });
  });
}

document.querySelector('.js-add-todo-button')
.addEventListener('click', ()=>{
  addTodo();
});
function addTodo() {
 const inputElement = document.querySelector('.js-name-input'); 
 const name = inputElement.value
 const dateInputElement = document.querySelector('.js-due-date-input');
 const dueDate = dateInputElement.value;
todoList.push({
 // name: name, 
  //dueDate: dueDate
  name,
  dueDate
});
//console.log(todoList);
inputElement.value = '';
renderTodoList();
saveTodo();
};

function saveTodo(){
  localStorage.setItem('todolist', JSON.stringify(todoList));
}