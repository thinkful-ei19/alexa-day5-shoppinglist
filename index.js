const STORE = {
  items: [
      {name: 'apples', checked: false},
      {name: 'oranges', checked: false},
      {name: 'milk', checked: true},
      {name: 'bread', checked: false}
  ],
  hideCompleted: false,
};

function generateItemElement(item, itemIndex, template) {
  //returns html element as a string
  return `
  <li class="js-item-index-element" data-item-index="${itemIndex}">
    <span class="shopping-item js-shopping-item ${item.checked ? 
      "shopping-item__checked" : ''}">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
    </div>
  </li>`;
}

function generateShoppingItemsString(shoppingList) {
    //console.log("Generating shopping list element");
    //returns a block of strings
    const items = shoppingList.map((item, index) => generateItemElement(item, index));
    return items.join('');
}
  
function renderShoppingList() {
  //rendering te string to HTML DOM elements
//For each item in STORE, generate a string representing an <li> with:
//  the item name rendered as inner text
//the item's index in the STORE set as a data attribute on the <li> (more on that in a moment)
//the item's checked state (true or false) rendered as the presence or absence of a CSS class for indicating checked items (specifically, .shopping-item__checked from index.css)
//Join together the individual item strings intoert the <li>s string inside the .js-shopping-list <ul> in one long string
// Ins the DOM.
  console.log('renderShoppingList works');
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);
    // insert that HTML into the DOM
    //parsing string to HTML DOM elements
    $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
    console.log(`Adding "${itemName}" to shopping list`);
    STORE.items.push({name: itemName, checked: false});
  }

  //callback function
function handleNewItemSubmit() {
// You should be able to add items to the list
   $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    console.log(newItemName);
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
   });
  console.log('handleNewItemSubmit works');
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  //itemIndex has to be a number
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item).closest('.js-item-index-element').attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    //item is the button
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

function deleteItem(index) {
    //remove elements from starting - index to that one element
    STORE.items.splice(index, 1);
  }

function handleDeleteItemClicked() {
    console.log('handleDeleteItemClicked works');
    //get related user info from DOM
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteItem(itemIndex);
    renderShoppingList();
  });
}

function hideCheckedItems() {
  const filteredCheckedItems = STORE.items.filter( item => !item.checked);
  const shoppingListItemsString = generateShoppingItemsString(filteredCheckedItems);
  $('.js-shopping-list').html(shoppingListItemsString);

  console.log(filteredCheckedItems);
}

function handleHideCompletedItems () {
  console.log('working!!!');
  $('#check_selection').change(function() {
    if( $('input[type=checkbox]').prop('checked')) {
      console.log('checked!');
      hideCheckedItems();
    } else {
      console.log('un-checked!');
      renderShoppingList();
    }
  });
}

function searchForItems(word) {
  const searching = STORE.items.filter( str => str.name === word);
  const newHtmlString = generateShoppingItemsString(searching);
  //gen. new HTML
  $('.js-shopping-list').html(newHtmlString);

}

function handleSearchedForItems() {
   //get related user info from DOM
  //change STORE
  //render
  console.log("searching!!!!");

  // $('#search_submit_button').click(function(event) {
  //   event.preventDefault();
  //   const searchWord = $('#search-box').val();
  //   console.log(searchWord);
  //   $('#search-box').val('');
  //   searchForItems(searchWord);
  // });

  $('#search-box').keyup(function() {
    const searchWord = $('#search-box').val();
    if(searchWord === '') {
      renderShoppingList();
    } else {
      searchForItems(searchWord);
    }
  });
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleHideCompletedItems();
  handleSearchedForItems();
}

$(handleShoppingList);

