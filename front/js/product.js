/* Api sur un item*/
// recupere le Id du produit
let articleUrl = new URL(window.location.href);
let articleId = articleUrl.searchParams.get('id');
console.log(articleUrl, articleId);
let requete = 'http://localhost:3000/api/products/' + articleId;

/*recuperer les balises qui a :  
     - la classe item__img pour la balise d'image produit;
     - Les id pour chaques balises
    */
const articleImage = document.querySelector('.item__img'); // recuperer le premier élément dans le document qui contient la classe
const articleName = document.getElementById('title');
const articlePrice = document.getElementById('price');
const articleDetail = document.getElementById('description');
let articleColor = document.getElementById('colors');
let articleQuantity = document.getElementById('quantity');
let addCard = document.getElementById('addToCart');

///////////////////requete pour recuperer le produit ////////////////////////////////
fetch(requete)
  .then((Response) => {
    return Response.json();
  })
  .then((data) => {
    // Work with JSON data here
    console.log(data);
    showItem(data);
  })
  .catch((err) => {
    // Do something for an error here
    console.log('message erreur ', err);
  });
///////Afficher le produit ///////////////////////
function showItem(data) {
  //////////// img item /////////////////////////////
  let item__img = document.createElement('img');
  item__img.src = data.imageUrl;
  item__img.alt = data.altTxt;
  articleImage.appendChild(item__img);
  articleDetail.innerHTML = data.description;
  /////////// Name + price /////////////////////////////////
  articleName.innerHTML = data.name;
  articlePrice.innerHTML = data.price;
  let optionColors =
    '<option value="null">--SVP, choisissez une couleur --</option>';
  for (j = 0; j < data.colors.length; j++) {
    optionColors +=
      '<option value="' + data.colors[j] + '">' + data.colors[j] + '</option>';
    articleColor.innerHTML = optionColors;
  }
}
let cart; //variable Panier
//////////////// Ajout item dans le panier //////////////////////////
function addItemInCart() {
  let sameArticle = false; //booleant pour produit existant dans le localStorage
  let articleQuantitySelected = articleQuantity.value; //quantité dans l'input
  let articleColorSeleted =
    articleColor.options[articleColor.selectedIndex].value; //la couleur choisie
  console.log(articleColorSeleted, articleQuantitySelected);

  if (articleQuantitySelected <= 0 || articleColorSeleted == 'null') {
    console.log("l'option ou la quantité non choisie");
    alert('Choisissez la couleur et la quantité');
  } else {
    //si le localStorage posséde deja du contenus
    if (localStorage['productsInCart']) {
      cart = JSON.parse(localStorage['productsInCart']);
      //sinon creer un tableau
    } else {
      cart = [];
      console.log(cart);
    }
    //passer en boucle dans le tableau panier('cart')
    for (i = 0; i < cart.length; i++) {
      // si cet article est deja present dans le panier et qui a les meme option
      if (cart[i].id == articleId && cart[i].option == articleColorSeleted) {
        cart[i].quantity += parseInt(articleQuantitySelected);
        console.log(parseInt(articleQuantitySelected), cart[i].quantity);
        sameArticle = true;
      }
    }
    /*  Dans le condition où le boolean est "false"(produit non existent dans panier), 
        on push le produit */
    if (sameArticle == false) {
      cart.push({
        id: articleUrl.searchParams.get('id'),
        quantity: parseInt(articleQuantitySelected),
        option: articleColorSeleted,
      });
    }
    localStorage.setItem('productsInCart', JSON.stringify(cart));
    alert('Produit ajouté dans le panier');
    resetOption();
  }
}

function resetOption() {
  articleColor.value = '';
  articleQuantity.value = 0;
}

//////// event clique addItemInCart sur le button 'addToCart' ////////////
addCard.addEventListener('click', addItemInCart);
