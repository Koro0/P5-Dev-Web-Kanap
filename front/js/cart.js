let cart = JSON.parse(localStorage['productsInCart']);
let itemInCart = false;
const sectionCart = document.getElementById('cart__items');
////////////////////// affichage du quantité total ////////////////////
let totalQuantity = [];
const showTotalQuantity = document.querySelector('#totalQuantity');
function calcTotalQte() {
  if (cart) {
    cart.forEach((item) => totalQuantity.push(item.quantity));
    showTotalQuantity.textContent = eval(totalQuantity.join('+'));
  } else {
    showTotalQuantity.textContent = 0;
  }
}
calcTotalQte();
//////////////////////////// obj total price ////////////////////////////

const totalPrice = document.getElementById('totalPrice');
let total;

/////////////////////////////////////////////////////////////////////////
for (i = 0; i < cart.length; i++) {
  let itemId = cart[i].id;
  let itemColor = cart[i].option;
  let itemQuantity = cart[i].quantity;
  if (cart.length >= 1) {
    itemInCart = true;
  }
  console.log(itemInCart);
  ////// constante i pour recuperer l'item pour la function deleteItem ////////////////
  const temp = i;
  ////////////////requete fetch selon l'item /////////////////////////////////////////////
  let requete = 'http://localhost:3000/api/products/' + itemId;
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

      const cartItemImg = document.createElement('div');
      cartItemImg.className = 'cart__item__img';

      cartItemImg.appendChild(cartItemImgUnder);

      /////////////////////////// Item Content /////////////////////////////////////////

      /////////////////////////// Item Content Decriptions ////////////////////////////

      const cartItemName = document.createElement('h2');
      cartItemName.textContent = data.name;

      const cartItemColor = document.createElement('p');
      cartItemColor.textContent = itemColor;

      const cartItemPrice = document.createElement('p');
      cartItemPrice.textContent = data.price + ' €';

      const cartItemContentDescription = document.createElement('div');
      cartItemContentDescription.className = 'cart__item__content__description';

      cartItemContentDescription.appendChild(cartItemName);
      cartItemContentDescription.appendChild(cartItemColor);
      cartItemContentDescription.appendChild(cartItemPrice);
      ///////////////////////////// Item Content Settings /////////////////////////////

      //////////////////////////// Item Content Settings_Quantity ////////////////////

      const cartItemContentSettingsQuantityUnder = document.createElement('p');
      cartItemContentSettingsQuantityUnder.textContent = 'Qté : ';

      const cartItemContentSettingsQuantityInput =
        document.createElement('input');
      cartItemContentSettingsQuantityInput.type = 'number';
      cartItemContentSettingsQuantityInput.className = 'itemQuantity';
      cartItemContentSettingsQuantityInput.name = 'itemQuantity';
      cartItemContentSettingsQuantityInput.min = 1;
      cartItemContentSettingsQuantityInput.max = 100;
      cartItemContentSettingsQuantityInput.value = itemQuantity;

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

      const cartItemContentSettingsDelete = document.createElement('div');
      cartItemContentSettingsDelete.className =
        'cart__item__content__settings__delete';

      cartItemContentSettingsDelete.appendChild(
        cartItemContentSettingsDeleteUnder
      );
      ///////////////////////////////////////////////////////////////////////////////////

      const cartItemContentSettings = document.createElement('div');
      cartItemContentSettings.className = 'cart__item__content__settings';

      cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
      cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

      const cartItemContent = document.createElement('div');
      cartItemContent.className = 'cart__item__content';

      cartItemContent.appendChild(cartItemContentDescription);
      cartItemContent.appendChild(cartItemContentSettings);

      const cartItem = document.createElement('article');
      cartItem.className = 'cart__item';
      cartItem.dataset.id = itemId;
      cartItem.dataset.color = itemColor;

      cartItem.appendChild(cartItemImg);
      cartItem.appendChild(cartItemContent);

      sectionCart.appendChild(cartItem);
      /////////////////////////////////// End show items //////////////////////////////////
      let price; //Qte * price item
      let totalItem = [];

      /////////////////////////////////// function delete item ///////////////////////////

      cartItemContentSettingsDeleteUnder.addEventListener('click', deleteItem);

      function deleteItem() {
        itemToDelete = document.querySelector(
          `[data-id="${cart[temp].id}"][data-color="${cart[temp].option}"]`
        );
        cart.splice(temp, 1);
        updateLocalStorage();

        itemToDelete.remove();
        totalQuantity = [];
        totalItem = [];
        calcTotalQte();
        updateLocalStorage();
        calcTotalPrice();
      }
      function updateLocalStorage() {
        localStorage.clear();
        localStorage.setItem('productsInCart', JSON.stringify(cart));
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
        } else if (cartItemContentSettingsQuantityInput.value <= 0) {
          cart.splice(temp, 1, {
            id: itemId,
            quantity: 1,
            option: itemColor,
          });
          cartItemContentSettingsQuantityInput.value = 1;
        }
        totalQuantity = [];
        totalItem = [];
        calcTotalQte();
        updateLocalStorage();
        calcTotalPrice();
      }
      ////////////////// get amount to cal /////////////////////////////////

      function calcTotalPrice() {
        price = itemQuantity * data.price;
        cart.forEach((item) => totalItem.push(item.quantity * data.price));
        total = totalItem.reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        );
        totalPrice.textContent = total;
      }
      calcTotalPrice();
    })

    /////////////////// end code /////////////////////////////////////////

    .catch((err) => {
      // Do something for an error here
      console.error(err);
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
const valideCommande = document.getElementById('order');

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
    firstNameValided = true;
    firstNameErrorMsg.textContent = ' ';
  } else {
    firstNameErrorMsg.textContent =
      'Saisissez correctement votre Nom (seulement les lettre sont autoriser) ';
    firstNameValided = false;
  }
}

function validateLastname() {
  if (lastName.value.match(Regex)) {
    lastNameErrorMsg.textContent = ' ';
    lastNameValided = true;
  } else {
    lastNameErrorMsg.textContent =
      'Saisissez correctement votre Nom (seulement les lettre sont autoriser)';
    lastNameValided = false;
  }
}

function valiadateAdress() {
  if (address.value.match(RegexAdress)) {
    addressErrorMsg.textContent = ' ';
    addressValided = true;
  } else {
    addressErrorMsg.textContent = 'Remplir une adresse correcte';
    addressValided = false;
  }
}

function validationCity() {
  if (city.value.match(Regex)) {
    cityErrorMsg.textContent = ' ';
    cityValided = true;
  } else {
    cityErrorMsg.textContent = 'Remplissez vote Ville';
    cityValided = false;
  }
}
function valiadateEmail() {
  if (email.value.match(RegexEmail)) {
    emailErrorMsg.textContent = ' ';
    emailValided = true;
  } else {
    emailErrorMsg.textContent = 'un email valide est exiger !';
    emailValided = false;
  }
}
firstName.addEventListener('change', ValidatefirstName);
lastName.addEventListener('change', validateLastname);
address.addEventListener('change', valiadateAdress);
city.addEventListener('change', validationCity);
email.addEventListener('change', valiadateEmail);

valideCommande.addEventListener('click', valideCde);

////////////////////////////////// validation Form ////////////////////////////
let contact = [];
let products = [];
console.log(showTotalQuantity.textContent);
function valideCde(e) {
  if (
    showTotalQuantity.textContent == 0 ||
    showTotalQuantity.textContent == undefined ||
    showTotalQuantity.textContent == null
  ) {
    alert('Ancun produit ajouté dans le panier');
    e.preventDefault();
  } else {
    validateForm();
  }
}
function validateForm(event) {
  if (
    firstNameValided == true &&
    lastNameValided == true &&
    addressValided == true &&
    cityValided == true &&
    emailValided == true
  ) {
    products = cart.map((prod) => prod.id);

    contact = {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    };

    alert('Commande validé avec succès !');
  } else {
    event.preventDefault();
    alert('Remplisser le formulaire et verifier vos produits');
  }
  send();
  localStorage.clear();
}

///////////////////////////// envoie Post /////////////////////////////////////

function send() {
  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ products, contact }),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      window.location.href =
        window.location.origin +
        '/front/html/confirmation.html?orderId=' +
        value.orderId;
      /* lien URL + /front/html/confirmation.html?orderId= + orderId */
      return value;
    });
  return;
}
