const newAccountButtonEl = document.querySelector('#new-account-button-link');
const tableEl = document.querySelector('#coa_accounts_table');
const editButtonEl = document.querySelector('#toolbar-edit-button');
const deleteButtonEl = document.querySelector('#toolbar-delete-button');

const viewButtonEl = document.querySelector('#toolbar-view-button');

let CURRENT_SELECTED_ROW;

const getRowFromIndex = (rowIndex) => {
    return tableEl.rows[rowIndex];
};

const getDataFromRow = (rowIndex) => {
    const rowEl = getRowFromIndex(rowIndex);
    const rowCellsList = rowEl.querySelectorAll('.coa_row_value_holder');
    const rowDataObj = {};
    rowCellsList.forEach((inputNode) => {
        rowDataObj[inputNode.name] = inputNode.value;
    });
    return rowDataObj;
};

const openSetupPage = (rowIndex) => {
    const rowObj = getDataFromRow(rowIndex);
    localStorage.setItem('rowDataJSON', JSON.stringify(rowObj));
    const setupPopup = window.open('coasetup.aspx');
};

const rowHasMandatoryFields = (rowElIndex) => {
    const rowData = getDataFromRow(rowElIndex);
    if (
        rowData.ac_code_cell_input.length < 1 ||
        rowData.type_cell_input == '--' ||
        rowData.group_cell_input == '--'
    ) {
        return false;
    }
    return true;
};

const enableGroupOptions = (rowEl) => {
    const rowCellsList = rowEl.querySelectorAll('.coa_row_value_holder');
    rowCellsList.forEach((rowNode) => {
        if (rowNode.name.includes('range')) {
            rowNode.removeAttribute('readonly');
        }
    });
};

const disableGroupOptions = (rowEl) => {
    const rowCellsList = rowEl.querySelectorAll('.coa_row_value_holder');
    rowCellsList.forEach((rowNode) => {
        if (rowNode.name.includes('range')) {
            rowNode.value = '';
            rowNode.setAttribute('readonly', 'true');
        }
    });
};

const rowThatWasClickedIndex = (target) => {
    let thisRowIndex = null;
    if (target.classList.contains('coa_standard_row')) {
        thisRowIndex = target.rowIndex;
    } else if (target.parentElement.classList.contains('coa_standard_row')) {
        thisRowIndex = target.parentElement.rowIndex;
    } else if (
        target.parentElement.parentElement.classList.contains('coa_standard_row')
    ) {
        thisRowIndex = target.parentElement.parentElement.rowIndex;
    }
    return thisRowIndex;
};

const removeAllRowEffects = () => {
    const oldSelectedRow = document.querySelector('.coa_row_hover_edit');
    if (oldSelectedRow) {
        oldSelectedRow.classList.remove('coa_row_hover_edit');
    }
};

const selectedRowGlow = (index) => {
    const selectedRow = tableEl.rows[index];
    selectedRow.classList.add('coa_row_hover_edit');
};

newAccountButtonEl.addEventListener('click', () => {

    var _createperm = MainObject.do_IsActionMenuPermission('', ChartofacctObject.coadata.pageid, 'create');
    if (!_createperm) { alert('You have no permission to add data.'); return; }
    else dosavechartofacct();

});

editButtonEl.addEventListener('click', (e) => {
    //alert(document.querySelector('.coa_row_hover_edit').id);
    if (document.querySelector('.coa_row_hover_edit') != null) {
        var _id = (document.querySelector('.coa_row_hover_edit').id).replace('tr_', '');
        if (_id != '0') window.location = "coasetup.aspx?id=" + _id;
    }
    else {
        alert('select a record');
    }
});

deleteButtonEl.addEventListener('click', (e) => {

    if (document.querySelector('.coa_row_hover_edit')!=null) {
        var _createperm = MainObject.do_IsActionMenuPermission('', ChartofacctObject.coadata.pageid, 'delete');
        if (!_createperm) { alert('You have no permission to delete the record.'); return; }
        else {
            var _id = (document.querySelector('.coa_row_hover_edit').id).replace('tr_', '');
            if (_id != '0') {
                //alert(_id);
                dodeletefacct(_id, $('#txt_accode_' + _id).val());
            }
            else {
                $('#txt_accode_0').val('');
                $('#txt_desc_0').val('');
                $('#dd_actype_0').val('');
                $('#dd_group_0').val('');
                $('#dd_grouprangefrom_0').val('');
                $('#txt_grouprangeto_0').val('');
                $('#txt_balance_0').val('');
            }
        }
    }
    else {
        alert('select a record');
    }

});

viewButtonEl.addEventListener('click', (e) => {
    //alert(document.querySelector('.coa_row_hover_edit').id);
    if (document.querySelector('.coa_row_hover_edit') != null) {
        var _id = (document.querySelector('.coa_row_hover_edit').id).replace('tr_', '');
        if (_id != '0') window.location = "coasetup.aspx?id=" + _id;
    }
    else {
        alert('select a record');
    }
});

tableEl.addEventListener('click', (e) => {
    // check if row was clicked
    let rowIndexOrNull = rowThatWasClickedIndex(e.target);
    // row glow effects

    CURRENT_SELECTED_ROW = rowIndexOrNull;
    //selectedRowGlow(rowIndexOrNull);
    
    if (rowIndexOrNull) {
        // row WAS clicked
        CURRENT_SELECTED_ROW = rowIndexOrNull;
        selectedRowGlow(rowIndexOrNull);
    } else {
        removeAllRowEffects;
    }
    
});

window.addEventListener('click', (e) => {
    if (rowThatWasClickedIndex(e.target) == null) {
        // no standard row was clicked
        CURRENT_SELECTED_ROW = null;
        removeAllRowEffects();
    }
});
