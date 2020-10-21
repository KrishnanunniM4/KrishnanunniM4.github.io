// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event)
{
    event.preventDefault();
    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Item List
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    // Mark Button
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);
    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
    // Append to Main List
    todoList.appendChild(todoDiv);
    // Clear Todo Input 
    todoInput.value = "";
}
function deleteCheck(e)
{
    // Trash Button Function
    const item = e.target;
    if(item.classList[0] === 'trash-btn')
    {
        const parent = item.parentElement;
        parent.classList.add('fall');
        parent.addEventListener('transitionend', function(){
            parent.remove();
        });
    }
    // Check Button Function
    if(item.classList[0] === 'complete-btn')
    {
        const parent = item.parentElement;
        parent.classList.toggle('completed');
    }
}
function filterTodo(e)
{
    const todos = todoList.childNodes;
    todos.forEach(function(todo)
    {
        switch(e.target.value)
        {
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed'))
                {
                    todo.style.display = 'flex';
                }
                else
                {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed'))
                {
                    todo.style.display = 'flex';
                }
                else
                {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}
