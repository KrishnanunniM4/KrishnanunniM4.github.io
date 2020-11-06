var fruitnameEdit = null;
var quantityEdit = null;
var idEdit = null;

// Fruit Class : Represents a Fruit
class Fruit
{
    constructor(fruitname,quantity,id)
    {
        this.fruitname = fruitname;
        this.quantity = quantity;
        this.id = id;
    }
}

// UI Class : Handles UI Tasks
class UI
{
    static displayFruits()
    {
        const fruits = Store.getFruits();
        fruits.forEach((fruit) => UI.addFruitToList(fruit));
    }
    static addFruitToList(fruit)
    {
        const list = document.querySelector('#fruit-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fruit.fruitname}</td>
            <td>${fruit.quantity}</td>
            <td>${fruit.id}</td>
            <td><a href="#" class="btn btn-success btn-sm edit"><i class="far fa-edit" style="pointer-events: none;"></i></a></td>
            <td><a href="#" class="btn btn-danger btn-sm delete"><i class="far fa-trash-alt" style="pointer-events: none;"></i></a></td>
        `;
        list.appendChild(row);
    }
    static editFruitToList(fruit)
    {
        const list = document.getElementsByTagName('tr');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${fruit.fruitname}</td>
            <td>${fruit.quantity}</td>
            <td>${fruit.id}</td>
            <td><a href="#" class="btn btn-success btn-sm edit"><i class="far fa-edit" style="pointer-events: none;"></i></a></td>
            <td><a href="#" class="btn btn-danger btn-sm delete"><i class="far fa-trash-alt" style="pointer-events: none;"></i></a></td>
        `;
        list.parentNode.replaceChild(newRow, list);
    }
    static deleteFruit(el)
    {
        if(el.classList.contains('delete'))
        {
            el.parentElement.parentElement.remove();
        }
    }
    static editFruit(el)
{
    if(el.classList.contains('edit'))
    {
        const fruitnameEdit = el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
        document.querySelector('#fruit').value = fruitnameEdit;
        const quantityEdit = el.parentElement.previousElementSibling.previousElementSibling.textContent;
        document.querySelector('#quantity').value = quantityEdit;
        const idEdit = el.parentElement.previousElementSibling.textContent;
        document.querySelector('#id').value = idEdit;
    }
}
    static showAlert(message, className)
    {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#fruit-form');
        container.insertBefore(div, form);
        // Vanish in 3 secs
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static clearFields()
    {
        document.querySelector('#fruit').value = '';
        document.querySelector('#quantity').value = '';
        document.querySelector('#id').value = '';
    }
}

// Storage Class : Handles Storage
class Store
{
    static getFruits()
    {
        let fruits;
        if(localStorage.getItem('fruits') === null)
        {
            fruits = [];
        }
        else
        {
            fruits = JSON.parse(localStorage.getItem('fruits'));
        }
        return fruits;
    }
    static addFruit(fruit)
    {
        const fruits = Store.getFruits();
        fruits.push(fruit);
        localStorage.setItem('fruits', JSON.stringify(fruits));
    }
    static removeFruit(id)
    {
        const fruits = Store.getFruits();
        fruits.forEach((fruit, index) => {
            if(fruit.id === id)
            {
                fruits.splice(index, 1);
            }
        });
        localStorage.setItem('fruits', JSON.stringify(fruits));
    }
}

// Event : Display Fruits
document.addEventListener('DOMContentLoaded', UI.displayFruits);

// Event : Add a Fruit
document.querySelector('#fruit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Get form values
    const fruitname = document.querySelector('#fruit').value;
    const quantity = document.querySelector('#quantity').value;
    const id = document.querySelector('#id').value;
    // Validate
    if(fruitname === '' || quantity === '' || id === '')
    {
        UI.showAlert('Please fill in all fields', 'info');
    }
    else
    {
        if(fruitnameEdit == null && quantityEdit == null && idEdit == null)
        {

            // Instatiate fruit
            const fruit = new Fruit(fruitname, quantity, id);
            // Add fruit to UI
            UI.addFruitToList(fruit);
            // Add Fruit to Store
            Store.addFruit(fruit);
            //Show Success Message
            //UI.showAlert('Fruit Added', 'success');
            // Clear fields
            UI.clearFields();
        }
        else
        {
            // Instatiate fruit
            const fruit = new Fruit(fruitname, quantity, id);
            // Add fruit to UI
            UI.editFruitToList(fruit);
        }

    }
});

// Event : Delete a Fruit
document.querySelector('#fruit-list').addEventListener('click', (e) => {
    // Removes Fruit from UI
    UI.deleteFruit(e.target);
    // Removes Fruit from Store
    Store.removeFruit(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    //Show Deleted Message
    //UI.showAlert('Fruit Deleted', 'danger');
});

//Event : Edit a Fruit
document.querySelector('#fruit-list').addEventListener('click', (e) => {
    // Edits Fruit from UI
    UI.editFruit(e.target);
});