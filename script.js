const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
// de-string the items saved to local storage or the new items added to the array by input
const items = JSON.parse(localStorage.getItem('items')) || [];
const clear = document.querySelector('.clear');
const select = document.querySelector('.select');

function addItem (e) {
    e.preventDefault();
    // store the input text
    const text = (this.querySelector('[name=item')).value;
    // create an object of the input
    const item = {
        text,
        done: false
    }
    // add the item to the items array
    items.push(item);
    // run the populate list function
    populateList(items, itemsList);
    // set items array to local storage and store them as a string
    localStorage.setItem('items', JSON.stringify(items))
        // resets the form 
   this.reset();
}
// function to create the list
function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
        </li>
        `;
    }).join('')
}

// event delegation - look for the body thats already on the page before the function loads
// function to turn checked checkbox done status into true and store on local storage
function toggleDone(e) {
    // if what we click is an input then use it
    if(!e.target.matches('input')) return; 
    // store the event target
    const el = e.target;
    // store event targets dataset index
    const index = el.dataset.index;
    // 
    items[index].done = !items[index].done;
    // stringify the items and store them in local storage
    localStorage.setItem('items', JSON.stringify(items));
    // populate list again
    populateList(items, itemsList);
}

// function to turn all items done status to false
function clearAll () {
    items.forEach(
        function(item){
            if(item.done === true){
                item.done = false;
            }
        }
    )
    // stringify the items and store them in local storage
    localStorage.setItem('items', JSON.stringify(items));
    // populate list again
    populateList(items, itemsList);
}

function SelectAll () {
    items.forEach(
        function(item){
            if(!item.done === true){
                item.done = true;
            }
        }
    )
    // stringify the items and store them in local storage
    localStorage.setItem('items', JSON.stringify(items));
    // populate list again
    populateList(items, itemsList);
}

// event listener for adding an item
addItems.addEventListener('submit', addItem);
// event listener for changing status of each list items done status
itemsList.addEventListener('click', toggleDone);
//  when the page loads populate the list with the items and itemList
clear.addEventListener('click', clearAll);
select.addEventListener('click', SelectAll)
populateList(items, itemsList);