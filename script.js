let arr = [
  {id: 2, name: 'ford'},
  {id: 1, name: 'mitsubishi'},
  {id: 3, name: 'skoda'},
  {id: 4, name: 'chevrolet'}
];
let tempArray = arr;
let statusMove = '';

function viewTable(arrayData) {
  let html = '<table>';
  for (let i = 0; i < arrayData.length; i++) {
    html += '<tr>';
    html += '<td>' + arrayData[i].id + '</td>';
    html += '<td>' + arrayData[i].name + '</td>';
    html += '</tr>';
  }
  html += '</table>';

  html += '<table>\n' +
    '    <thead>\n' +
    '    <tr>\n' +
    '        <td>ИД\n' +
    '            <i class="fas fa-arrow-circle-up" onclick="sort(\'idUp\')"></i>\n' +
    '            <i class="fas fa-arrow-circle-down" onclick="sort(\'idDown\')"></i>\n' +
    '        </td>\n' +
    '        <td>Название\n' +
    '            <i class="fas fa-arrow-circle-up" onclick="sort(\'nameUp\')"></i>\n' +
    '            <i class="fas fa-arrow-circle-down" onclick="sort(\'nameDown\')"></i>\n' +
    '        </td>\n' +
    '    </tr>\n' +
    '    </thead>\n' +
    '</table>';

  document.getElementById('table').innerHTML = html;

  toHide('inputId');
  toHide('addInputString');
  toHide('getDataById');
  toHide('submitButton');
}

function sort(sortData) {
  if (sortData === 'idUp') {
    tempArray.sort((a, b) => a.id > b.id ? -1 : 0);
  } else if (sortData === 'idDown') {
    tempArray.sort((a, b) => a.id < b.id ? -1 : 0);
  } else if (sortData === 'nameUp') {
    tempArray.sort((a, b) => a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase() ? -1 : 0);
  } else if (sortData === 'nameDown') {
    tempArray.sort((a, b) => a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? -1 : 0);
  }
  viewTable(tempArray);
}

function add() {
  statusMove = 'add';
  clearInputs();
  toHide('getDataById');
  toHide('message');
  toVisible('inputId');
  toVisible('addInputString');
  toVisible('submitButton');
}

function edit() {
  statusMove = 'edit';
  clearInputs();
  toHide('getDataById');
  toHide('submitButton');
  toHide('message');
  toVisible('inputId');
  toVisible('getDataById');
}

function remove() {
  statusMove = 'remove';
  clearInputs();
  toHide('getDataById');
  toHide('message');
  toHide('addInputString');
  toVisible('submitButton');
  toVisible('inputId');
}

function cancel() {
  toHide('getDataById');
  toHide('inputId');
  toHide('addInputString');
  toHide('submitButton');
  toHide('message');
}

function getDataNameById() {
  let editId = parseInt(getInputDataId().value);
  let editName = getInputDataInput();

  tempArray.forEach((item) => {
    if (item.id === editId) {
      editName.value = item.name;
    }
  })
  toHide('inputId');
  toHide('getDataById');
  toVisible('addInputString');
  toVisible('submitButton');
}

function getInputDataId() {
  return document.getElementById('inputId');
}

function getInputDataInput() {
  return document.getElementById('addInputString');
}

function clearInputs() {
  let getId = getInputDataId();
  let getName = getInputDataInput();

  getId.value = 0;
  getName.value = '';
}

function submit() {
  let getId = parseInt(getInputDataId().value);
  let getName = getInputDataInput();
  let message = document.getElementById('message');

  if (!!getId || !!getName.value) {
    switch (statusMove) {
      case 'remove':

        tempArray = tempArray.filter((value => {
          return value.id !== getId;
        }))
        message.innerText = 'Успешно';
        break;
      case 'add':
        let repeatCheck = 0;

        tempArray.forEach((item) => {
          if (item.id === getId) {
            repeatCheck++;
          }
        })
        if (repeatCheck === 0) {
          tempArray.push({id: getId, name: getName.value});
          message.innerText = 'Успешно';
        } else {
          message.innerHTML = 'Такой номер уже есть';
        }
        break;
      case 'edit':
        tempArray.forEach((item) => {
          if (item.id === getId) {
            item.name = getName.value;
          }
        })
        message.innerText = 'Успешно';
        break;
      default:
        message.innerText = 'Что то пошло не так!';
        break;
    }
    toVisible('message');
    viewTable(tempArray);
  } else {
    message.innerText = 'Заполните все поля!';
  }
}

function toVisible(visible) {
  document.getElementById(visible).style.visibility = 'visible';
}

function toHide(hide) {
  document.getElementById(hide).style.visibility = 'hidden';
}

viewTable(arr);
