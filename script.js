let arr = [
    {id: 1, name: 'ford', model: 'focus', age: 5, engineValue: 1.6, gasMileage: 10, carMileage: 5523},
    {id: 2, name: 'mitsubishi', model: 'lancer', age: 2, engineValue: 2, gasMileage: 20, carMileage: 2216},
    {id: 3, name: 'skoda', model: 'kodiaq', age: 6, engineValue: 1.4, gasMileage: 30, carMileage: 33247},
    {id: 4, name: 'chevrolet', model: 'lanos', age: 7, engineValue: 1.6, gasMileage: 40, carMileage: 6233}
];

let inputStore = {
    id: document.getElementById('id'),
    addBrand: document.getElementById('addBrand'),
    addModel: document.getElementById('addModel'),
    addAge: document.getElementById('addAge'),
    addVolume: document.getElementById('addVolume'),
    addConsumption: document.getElementById('addConsumption'),
    addMileage: document.getElementById('addMileage')
}
let tempArray = arr;
let statusMove = '';

function viewStatistic() {
    let allMileageForEveryone;
    allMileageForEveryone = arr.map(allCarsMileage => {
        return parseInt(allCarsMileage.carMileage) * parseInt(allCarsMileage.gasMileage) / 100;

    });
    let allMileage = allMileageForEveryone.reduce((prev, curr) => {
        return prev + curr;
    })
    document.getElementById('statistic').innerHTML = 'Spent ' + allMileage + ' gasoline by all cars';
}

function search() {
    let searchValueViewInHtml = '<h3>' + 'Found cars' + '</h3>';
    let count = 0;
    let searchValue = document.getElementById('search').value;
    arr.forEach((objValue => {
        let nameSearched = objValue.name.indexOf(searchValue);
        if (nameSearched !== -1) {
            searchValueViewInHtml += '<table>';
            searchValueViewInHtml += '<td>' + objValue.id + '</td>';
            searchValueViewInHtml += '<td>' + objValue.name + '</td>';
            searchValueViewInHtml += '</table>';
            count++;
        }
        if (count > 0) {
            document.getElementById('searchList').innerHTML = searchValueViewInHtml;
        } else {
            searchValueViewInHtml = '<p>' + 'Nothing found' + '</p>';
            document.getElementById('searchList').innerHTML = searchValueViewInHtml;
        }
    }))
}

function view(arrayData) {
    let html = '<table>';
    for (let i = 0; i < arrayData.length; i++) {
        html += '<tr>';
        html += '<td>' + arrayData[i].id + '</td>';
        html += '<td>' + arrayData[i].name + '</td>';
        html += '<td>' + arrayData[i].model + '</td>';
        html += '<td>' + arrayData[i].age + '</td>';
        html += '<td>' + arrayData[i].engineValue + '</td>';
        html += '<td>' + arrayData[i].gasMileage + '</td>';
        html += '<td>' + arrayData[i].carMileage + '</td>';
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
        '        <td>Brand\n' +
        '            <i class="fas fa-arrow-circle-up" onclick="sort(\'nameUp\')"></i>\n' +
        '            <i class="fas fa-arrow-circle-down" onclick="sort(\'nameDown\')"></i>\n' +
        '        </td>\n' +
        '        <td>Model\n</td>\n' +
        '        <td>Car age\n</td>\n' +
        '        <td>Engine volume\n</td>\n' +
        '        <td>Engine consumption\n</td>\n' +
        '        <td>Пробег\n</td>\n' +
        '    </tr>\n' +
        '    </thead>\n' +
        '</table>';

    document.getElementById('table').innerHTML = html;
    toHide('addDiv');
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
    view(tempArray);
}

function add() {
    statusMove = 'add';
    clearInputs();
    toHide('getDataById');
    toHide('message');
    toVisible('addDiv')
    toVisible('submitButton');
}

function edit() {
    statusMove = 'edit';
    clearInputs();
    toHide('addDiv');
    toHide('message');
    toHide('submitButton');
    toVisible('id');
    toVisible('getDataById');
}

function remove() {
    statusMove = 'remove';
    clearInputs();
    toHide('addDiv');
    toHide('message');
    toVisible('submitButton');
    toVisible('id');
    toHide('getDataById');
}

function cancel() {
    toHide('addDiv');
    toHide('getDataById');
    toHide('submitButton');
    toHide('message');
    toHide('getDataById');
}

function getDataNameById() {
    toHide('id');
    toHide('getDataById');
    toVisible('addDiv');
    toVisible('submitButton');

    tempArray.forEach((item) => {
        if (item.id === parseInt(inputStore.id.value)) {
            inputStore.addBrand.value = item.name,
                inputStore.addModel.value = item.model,
                inputStore.addAge.value = item.age,
                inputStore.addVolume.value = item.engineValue,
                inputStore.addConsumption.value = item.gasMileage,
                inputStore.addMileage.value = item.carMileage;
        }
    })
}

function clearInputs() {
    inputStore.id.value = 0;
    for (let i = 1; i < inputStore.length; i++) {
        inputStore[i].value = '';
    }
}

function submit() {
    let message = document.getElementById('message');

    switch (statusMove) {
        case 'remove':
            tempArray = tempArray.filter((value => {
                return value.id !== parseInt(inputStore.id.value);
            }))
            toHide('id');
            message.innerText = 'Successful';
            break;
        case 'add':
            let repeatCheck = 0;

            tempArray.forEach((item) => {
                if (item.id === parseInt(inputStore.id.value)) {
                    repeatCheck++;
                }
            })

            if (repeatCheck === 0) {
                tempArray.push(
                    {
                        id: parseInt(inputStore.id.value),
                        name: inputStore.addBrand.value,
                        model: inputStore.addModel.value,
                        age: inputStore.addAge.value,
                        engineValue: inputStore.addVolume.value,
                        gasMileage: inputStore.addConsumption.value,
                        carMileage: inputStore.addMileage.value
                    });
                toHide('addDiv');
                toHide('id');
                message.innerText = 'Successful';
            } else {
                message.innerHTML = 'Такой номер уже есть';
            }
            break;
        case 'edit':
            tempArray.forEach((item) => {
                if (item.id === parseInt(inputStore.id.value)) {
                    item.name = inputStore.addBrand.value;
                    item.model = inputStore.addModel.value;
                    item.age = inputStore.addAge.value;
                    item.engineValue = inputStore.addVolume.value;
                    item.gasMileage = inputStore.addConsumption.value;
                    item.carMileage = inputStore.addMileage.value;
                }
            })

            toHide('addDiv');
            message.innerText = 'Successful';
            break;
        default:
            message.innerText = 'Что то пошло не так!';
            break;
    }
    toVisible('message');
    view(tempArray);
}

function toVisible(visible) {
    document.getElementById(visible).style.visibility = 'visible';
}

function toHide(hide) {
    document.getElementById(hide).style.visibility = 'hidden';
}

view(arr);
