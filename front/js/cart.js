let cart = JSON.parse(localStorage['productsInCart']);
console.log(cart);
const URLPage = new URL(window.location.href);
const sectionCart = document.getElementById('cart__items');
////////////////////// affichage du quantité total ////////////////////
let totalQuantity = [];
const showTotalQuantity = document.querySelector('#totalQuantity');
function calcTotalQte() {
  if (cart) {
    cart.forEach((item) => totalQuantity.push(item.quantity));
    //console.log(totalQuantity);
    showTotalQuantity.textContent = eval(totalQuantity.join('+'));
  } else {
    showTotalQuantity.textContent = 0;
  }
}
calcTotalQte();
//////////////////////////// obj total price ////////////////////////////

const totalPrice = document.getElementById('totalPrice');

let price;
let total = [];
/////////////////////////////////////////////////////////////////////////
for (i = 0; i < cart.length; i++) {
  let itemId = cart[i].id;
  //console.log(itemId);
  let itemColor = cart[i].option;
  //console.log(itemColor);
  let itemQuantity = cart[i].quantity;
  //console.log(itemQuantity);
  const temp = i;
  ////////////////requete fetch selon l'item /////////////////////////////////////////////
  let requete = 'http://localhost:3000/api/products/' + itemId;
  //console.log(requete);
  fetch(requete)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      ///////////////////////////// img ///////////////////////////////////////////////////
      const cartItemImgUnder = document.createElement('img');
      cartItemImgUnder.src = data.imageUrl;
      cartItemImgUnder.alt = data.altTxt;
      //console.log(cartItemImgUnder);

      const cartItemImg = document.createElement('div');
      cartItemImg.className = 'cart__item__img';
      //console.log(cartItemImg);

      cartItemImg.appendChild(cartItemImgUnder);

      /////////////////////////// Item Content /////////////////////////////////////////

      /////////////////////////// Item Content Decriptions ////////////////////////////

      const cartItemName = document.createElement('h2');
      cartItemName.textContent = data.name;
      //console.log(cartItemName);

      const cartItemColor = document.createElement('p');
      cartItemColor.textContent = itemColor;
      //console.log(cartItemColor);

      const cartItemPrice = document.createElement('p');
      cartItemPrice.textContent = data.price + ' €';
      //console.log(cartItemPrice);

      const cartItemContentDescription = document.createElement('div');
      cartItemContentDescription.className = 'cart__item__content__description';
      //console.log(cartItemContentDescription);

      cartItemContentDescription.appendChild(cartItemName);
      cartItemContentDescription.appendChild(cartItemColor);
      cartItemContentDescription.appendChild(cartItemPrice);
      ///////////////////////////// Item Content Settings /////////////////////////////

      //////////////////////////// Item Content Settings_Quantity ////////////////////

      const cartItemContentSettingsQuantityUnder = document.createElement('p');
      cartItemContentSettingsQuantityUnder.textContent = 'Qté : ';
      //console.log(cartItemContentSettingsQuantityUnder);

      const cartItemContentSettingsQuantityInput =
        document.createElement('input');
      cartItemContentSettingsQuantityInput.type = 'number';
      cartItemContentSettingsQuantityInput.className = 'itemQuantity';
      cartItemContentSettingsQuantityInput.name = 'itemQuantity';
      cartItemContentSettingsQuantityInput.min = 1;
      cartItemContentSettingsQuantityInput.max = 100;
      cartItemContentSettingsQuantityInput.value = itemQuantity;
      //console.log(cartItemContentSettingsQuantityInput);

      const cartItemContentSettingsQuantity = document.createElement('div');
      cartItemContentSettingsQuantity.className =
        'cart__item__content__settings__quantity';

      cartItemContentSettingsQuantity.appendChild(
        cartItemContentSettingsQuantityUnder
      );
      cartItemContentSettingsQuantity.appendChild(
        cartItemContentSettingsQuantityInput
      );

      //////////////////////////// Item Content Settings_Delete ///////////////////////

      const cartItemContentSettingsDeleteUnder = document.createElement('p');
      cartItemContentSettingsDeleteUnder.className = 'deleteItem';
      cartItemContentSettingsDeleteUnder.textContent = 'Supprimer';
      //console.log(cartItemContentSettingsDeleteUnder);

      const cartItemContentSettingsDelete = document.createElement('div');
      cartItemContentSettingsDelete.className =
        'cart__item__content__settings__delete';

      cartItemContentSettingsDelete.appendChild(
        cartItemContentSettingsDeleteUnder
      );
      ///////////////////////////////////////////////////////////////////////////////////

      const cartItemContentSettings = document.createElement('div');
      cartItemContentSettings.className = 'cart__item__content__settings';
      //console.log(cartItemContentSettings);

      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
      cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

      const cartItemContent = document.createElement('div');
      cartItemContent.className = 'cart__item__content';
      //console.log(cartItemContent);

      cartItemContent.appendChild(cartItemContentDescription);
      cartItemContent.appendChild(cartItemContentSettings);

      const cartItem = document.createElement('article');
      cartItem.className = 'cart__item';
      cartItem.dataset.id = itemId;
      cartItem.dataset.color = itemColor;
      //console.log(cartItem);

      cartItem.appendChild(cartItemImg);
      cartItem.appendChild(cartItemContent);

      sectionCart.appendChild(cartItem);
      /////////////////////////////////// End show items //////////////////////////////////
      /////////////////////////////////// function delete item ///////////////////////////

      cartItemContentSettingsDeleteUnder.addEventListener('click', deleteItem);

      function deleteItem() {
        cart.splice(temp, 1);
        updateLocalStorage();
        console.log(cart);
      }
      function updateLocalStorage() {
        localStorage.clear();
        localStorage.setItem('productsInCart', JSON.stringify(cart));
        document.location.reload(); // actualiser la page
      }
      /////////////////// function modify count for items /////////////////////
      cartItemContentSettingsQuantityInput.addEventListener(
        'change',
        updateQuantity
      );
      function updateQuantity() {
        if (cartItemContentSettingsQuantityInput.value >= 1) {
          cart.splice(temp, 1, {
            id: itemId,
            quantity: cartItemContentSettingsQuantityInput.value,
            option: itemColor,
          });
          console.log(cart);
        }
        updateLocalStorage();
      }
      ////////////////// get amount to cal /////////////////////////////////

      function calcTotalPrice() {
        price = itemQuantity * data.price;
        total.push(price);
        //console.log(total, price);
        totalPrice.textContent = eval(total.join('+'));
        //console.log(total.join('+'));
      }
      calcTotalPrice();
      //console.log(totalPrice.textContent);
    })
    /////////////////// end code /////////////////////////////////////////

    .catch((err) => {
      // Do something for an error here
      console.log(err);
    });
}
////////////////////////////////////////////// verification input information ///////////////////////////////////
let Regex = /^[A-Z-a-z-\s]{2,10}$/;
/* une ensemble de lettre majuscule et miniscule peuvent etre espacer qui a une longuer de 2 à 10 lettre
 */
let RegexAdress = /^[0-9\s]{2,5}[a-z-A-Z\s]{5,25}$/;
/*  une ensemble de chiffre espacer avec des mot et des espaces
 */
let RegexEmail = /^([a-zA-Z0-9.]+@([a-zA-Z0-9]+\.)+([a-zA-Z]{2,5}))$/;

///////////////////////////recuperer les Inputs ///////////////////////////////////////////////////////////////
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const address = document.getElementById('address');
const city = document.getElementById('city');
const email = document.getElementById('email');
const validateButton = document.getElementById('order');
//////////////////////////// Message d'erreur ////////////////////////////////////
let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
let addressErrorMsg = document.getElementById('addressErrorMsg');
let cityErrorMsg = document.getElementById('cityErrorMsg');
let emailErrorMsg = document.getElementById('emailErrorMsg');
/////////////////////////// Booléon de Verification /////////////////////////////////
let firstNameValided = false;
let lastNameValided = false;
let addressValided = false;
let cityValided = false;
let emailValided = false;
////////////////////////// function de verification des inputs saisie ///////////////////////
function ValidatefirstName() {
  if (firstName.value.match(Regex)) {
    console.log('saisie Nom correct : ' + firstName.value);
    firstNameValided = true;
    firstNameErrorMsg.textContent = ' ';
  } else {
    console.log('saisie Nom erroné : ' + firstName.value);
    firstNameErrorMsg.textContent =
      'Saisissez correctement votre Nom (seulement les lettre sont autoriser) ';
    firstNameValided = false;
  }
  console.log(firstNameValided);
}

function validateLastname() {
  if (lastName.value.match(Regex)) {
    console.log('saisie Prenom correct : ' + lastName.value);
    lastNameErrorMsg.textContent = ' ';
    lastNameValided = true;
  } else {
    console.log('saisie Prenom erroné : ' + lastName.value);
    lastNameErrorMsg.textContent =
      'Saisissez correctement votre Nom (seulement les lettre sont autoriser)';
    lastNameValided = false;
  }
  console.log(lastNameValided);
}

function valiadateAdress() {
  if (address.value.match(RegexAdress)) {
    console.log('saisie Adresse correct : ' + address.value);
    addressValided.textContent = ' ';
    addressValided = true;
  } else {
    console.log('saisie Adresse erroné ' + address.value);
    addressErrorMsg.textContent = 'Remplir une adresse correcte';
    addressValided = false;
  }
  console.log(addressValided);
}

function validationCity() {
  if (city.value.match(Regex)) {
    console.log('saisie Ville correct : ' + city.value);
    cityErrorMsg = ' ';
    cityValided = true;
  } else {
    console.log('saisie Ville erroné ' + city.value);
    cityErrorMsg = 'Remplissez vote Ville';
    cityValided = false;
  }
  console.log(cityValided);
}
function valiadateEmail() {
  if (email.value.match(RegexEmail)) {
    console.log('saisie email correct : ' + email.value);
    emailErrorMsg = ' ';
    emailValided = true;
  } else {
    console.log('saisie email erroné ' + email.value);
    emailErrorMsg = 'un email valide est exiger !';
    emailValided = false;
  }
  console.log(emailValided);
}
firstName.addEventListener('change', ValidatefirstName);
lastName.addEventListener('change', validateLastname);
address.addEventListener('change', valiadateAdress);
city.addEventListener('change', validationCity);
email.addEventListener('change', valiadateEmail);

validateButton.type = '';
validateButton.addEventListener('click', validateForm);

////////////////////////////////// validation Form ////////////////////////////
let contact = [];
let products = [];

function validateForm() {
  if (
    firstNameValided == true &&
    lastNameValided == true &&
    addressValided == true &&
    cityValided == true &&
    emailValided == true
  ) {
    for (i = 0; i < cart.length; i++) {
      products.push(cart[i].id);
    }
    contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };
  } else {
    console.log('error form');
  }
  send();
  console.log(contact, products);
  products = [];
}
//console.log(Object.keys(cart));
///////////////////////////// envoie Post /////////////////////////////////////

function send() {
  //e.preventDefault();
  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ products, contact }),
  })
    .then(function (res) {
      console.log(res);
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(value.orderId);
      window.location.href =
        window.location.origin +
        '/front/html/confirmation.html?orderId=' +
        value.orderId;
      return value;
    });
  return;
}
