let cart = JSON.parse(localStorage['productsInCart']);
console.log(cart);
let sectionCart = document.getElementById('cart__items');

for (i = 0; i < cart.length; i++) {
  let itemId = cart[i].id;
  //console.log(itemId);
  let itemColor = cart[i].option;
  //console.log(itemColor);
  let itemQuantity = cart[i].quantity;
  //console.log(itemQuantity);

  ////////////////reque fetch selon l'item/////////////
  let requete = 'http://localhost:3000/api/products/' + itemId;
  //console.log(requete);
  fetch(requete)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      ///////////////////////////// img ///////////////////////////////////////////////////
      let cartItemImgUnder = document.createElement('img');
      cartItemImgUnder.src = data.imageUrl;
      cartItemImgUnder.alt = data.altTxt;
      //console.log(cartItemImgUnder);

      let cartItemImg = document.createElement('div');
      cartItemImg.className = 'cart__item__img';
      //console.log(cartItemImg);

      cartItemImg.appendChild(cartItemImgUnder);

      /////////////////////////// Item Content /////////////////////////////////////////

      /////////////////////////// Item Content Decriptions ////////////////////////////

      let cartItemName = document.createElement('h2');
      cartItemName.textContent = data.name;
      //console.log(cartItemName);

      let cartItemColor = document.createElement('p');
      cartItemColor.textContent = itemColor;
      //console.log(cartItemColor);

      let cartItemPrice = document.createElement('p');
      cartItemPrice.textContent = data.price + ' €';
      //console.log(cartItemPrice);

      let cartItemContentDescription = document.createElement('div');
      cartItemContentDescription.className = 'cart__item__content__description';
      //console.log(cartItemContentDescription);

      cartItemContentDescription.appendChild(cartItemName);
      cartItemContentDescription.appendChild(cartItemColor);
      cartItemContentDescription.appendChild(cartItemPrice);
      ///////////////////////////// Item Content Settings /////////////////////////////

      //////////////////////////// Item Content Settings_Quantity ////////////////////

      let cartItemContentSettingsQuantityUnder = document.createElement('p');
      cartItemContentSettingsQuantityUnder.textContent = 'Qté : ';
      //console.log(cartItemContentSettingsQuantityUnder);

      let cartItemContentSettingsQuantityInput =
        document.createElement('input');
      cartItemContentSettingsQuantityInput.type = 'number';
      cartItemContentSettingsQuantityInput.className = 'itemQuantity';
      cartItemContentSettingsQuantityInput.name = 'itemQuantity';
      cartItemContentSettingsQuantityInput.min = 1;
      cartItemContentSettingsQuantityInput.max = 100;
      cartItemContentSettingsQuantityInput.value = itemQuantity;
      //console.log(cartItemContentSettingsQuantityInput);

      let cartItemContentSettingsQuantity = document.createElement('div');
      cartItemContentSettingsQuantity.className =
        'cart__item__content__settings__quantity';

      cartItemContentSettingsQuantity.appendChild(
        cartItemContentSettingsQuantityUnder
      );
      cartItemContentSettingsQuantity.appendChild(
        cartItemContentSettingsQuantityInput
      );

      //////////////////////////// Item Content Settings_Delete ///////////////////////

      let cartItemContentSettingsDeleteUnder = document.createElement('p');
      cartItemContentSettingsDeleteUnder.className = 'deleteItem';
      cartItemContentSettingsDeleteUnder.textContent = 'Supprimer';
      //console.log(cartItemContentSettingsDeleteUnder);

      let cartItemContentSettingsDelete = document.createElement('div');
      cartItemContentSettingsDelete.className =
        'cart__item__content__settings__delete';

      cartItemContentSettingsDelete.appendChild(
        cartItemContentSettingsDeleteUnder
      );
      ///////////////////////////////////////////////////////////////////////////////////

      let cartItemContentSettings = document.createElement('div');
      cartItemContentSettings.className = 'cart__item__content__settings';
      //console.log(cartItemContentSettings);

      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
      cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

      let cartItemContent = document.createElement('div');
      cartItemContent.className = 'cart__item__content';
      //console.log(cartItemContent);

      cartItemContent.appendChild(cartItemContentDescription);
      cartItemContent.appendChild(cartItemContentSettings);

      let cartItem = document.createElement('article');
      cartItem.className = 'cart__item';
      cartItem.dataset.id = itemId;
      cartItem.dataset.color = itemColor;
      //console.log(cartItem);

      cartItem.appendChild(cartItemImg);
      cartItem.appendChild(cartItemContent);

      sectionCart.appendChild(cartItem);
    })
    .catch((err) => {
      // Do something for an error here
      console.log(err);
    });
}
