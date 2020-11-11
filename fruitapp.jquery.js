
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
        formData['fruitName'] = $('#fruitName').val();
        formData['quantity'] = $('#quantity').val();
        formData['id'] = $('#id').val();
        return formData;
    }
    function insertNewRecord(data)
    {
        var table = document.getElementById('fruit-list').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.fruitName;
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
        $('#fruitName').val('');
        $('#quantity').val('');
        $('#id').val('');
        selectedRow = null;
    }
    function onEdit(td)
    {
        selectedRow = td.parentElement.parentElement;
        $('#fruitName').val(selectedRow.cells[0].innerHTML);
        $('#quantity').val(selectedRow.cells[1].innerHTML);
        $('#id').val(selectedRow.cells[2].innerHTML);
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
        $('br').after(`<div class="alert alert-${className}">${message}</div>`);
        // Vanish in 3 secs
        setTimeout(() => $('.alert').remove(), 3000);
    }
    function filterItems()
    {
        let filterValue = $('#filterInput').val().toLowerCase();
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
