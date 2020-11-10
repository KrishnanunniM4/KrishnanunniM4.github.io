var selectedRow = null
function onFormSubmit()
{
    var formData = readFormData();
    if(selectedRow == null)
    {
        insertNewRecord(formData);
    }
    else
    {
        updateRecord(formData);
    }
    resetForm();
}
function readFormData()
{
    var formData = {};
    formData['fruitName'] = document.getElementById('fruitName').value;
    formData['quantity'] = document.getElementById('quantity').value;
    formData['id'] = document.getElementById('id').value;
    return formData;
}
function insertNewRecord(data)
{
    var table = document.getElementById('fruit-list').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fruitName;
    cell1.className = 'table-row';
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.quantity;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.id;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onEdit(this)" class="btn btn-success btn-sm edit"><i class="far fa-edit" style="pointer-events: none;"></i></a>`;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick="onDelete(this)" class="btn btn-danger btn-sm delete"><i class="far fa-trash-alt" style="pointer-events: none;"></i></a>`;
    showAlert('Fruit Added', 'success');
}
function resetForm()
{
    document.getElementById('fruitName').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('id').value = '';
    selectedRow = null;
}
function onEdit(td)
{
    selectedRow = td.parentElement.parentElement;
    document.getElementById('fruitName').value = selectedRow.cells[0].innerHTML;
    document.getElementById('quantity').value = selectedRow.cells[1].innerHTML;
    document.getElementById('id').value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData)
{
    selectedRow.cells[0].innerHTML = formData.fruitName;
    selectedRow.cells[1].innerHTML = formData.quantity;
    selectedRow.cells[2].innerHTML = formData.id;
    showAlert('Fruit Updated', 'info');
}
function onDelete(td)
{
    row = td.parentElement.parentElement;
    document.getElementById('fruit-list').deleteRow(row.rowIndex);
    showAlert('Fruit Deleted', 'danger');
    resetForm();
}
function showAlert(message, className)
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
function filterItems()
{
    let filterValue = document.getElementById('filterInput').value.toLowerCase();
    let tbody = document.getElementById('fruit-list');
    let trow = tbody.getElementsByTagName('tr');
    for(let i = 0;i < trow.length;i++)
    {
        let td = trow[i].getElementsByTagName('td')[0];
        if(td)
        {
            let txtvalue = td.textContent || td.innerText;
            if(txtvalue.toLowerCase().indexOf(filterValue) > -1)
            {
                trow[i].style.display = '';
            }
            else
            {
                trow[i].style.display = 'none';
            }
        }
    }
}
