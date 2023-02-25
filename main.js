//---------------------------------------------------------------------

// Variables
let add_btn = document.getElementById('add');
let add_input = document.getElementById('add_input');
let container = document.querySelector('.container');
let delete_btn = document.getElementsByClassName('deleted');

//Get Data From Local Storage And Insert It In WebSite
function get_data_from_localStorage() {
    if (localStorage.length) {
        Object.keys(JSON.parse(localStorage.getItem("Data"))).forEach(element => {
            let data = JSON.parse(localStorage.getItem("Data"));
            todo(data[element], element)
        })
    };
}
if (localStorage.length >= 2) {
    var element_index = parseInt(localStorage.getItem("element_index"));
} else {
    var element_index = 0;
}
get_data_from_localStorage();

// Add Element To The Website And To Local Storage
add_btn.addEventListener('click', () => {
    if (add_input.value != "" && add_input.value != " ") {
        element_index += 1
        todo(add_input.value, element_index)
        add_input.value = "";
    }
});

function todo(element, element_index) {
    let main_div = document.createElement('div');
    main_div.classList = `todo ${element_index}`;
    let main_title = document.createElement('h1');
    main_title.innerText = `${element}`;
    let delete_button = document.createElement('button');
    delete_button.classList = `deleted`;
    delete_button.innerText = "Delete";
    main_div.appendChild(main_title);
    main_div.appendChild(delete_button);
    container.appendChild(main_div);
    if (localStorage.length == 0) {
        var storage = {};
        storage[element_index] = element;
        localStorage.setItem("Data", JSON.stringify(storage));
        localStorage.setItem("element_index", element_index);
    } else {
        let data = JSON.parse(localStorage.getItem("Data"));
        localStorage.clear();
        data[element_index] = element;
        localStorage.setItem("Data", JSON.stringify(data))
        localStorage.setItem("element_index", element_index)
    }
};

// Delete Element Form Local Storage And WebSite
function deleted_element() {
    var to_do_list = Array.from(delete_btn)
    to_do_list.forEach(function (element) {
        element.addEventListener("click", () => {
            let deleted_element = element.parentElement.classList;
            element.parentElement.remove();
            let data = JSON.parse(localStorage.getItem("Data"));
            localStorage.clear();
            delete data[deleted_element[1]];
            localStorage.setItem("Data", JSON.stringify(data))
        })
    });
}
setInterval(() => deleted_element(), 1000);

//---------------------------------------------------------------------