//Creer un requete pour recuperer les produits par rapport aux clés
fetch('http://localhost:3000/api/products')
  .then((Response) => {
    return Response.json();
  })
  .then((data) => {
    // Work with JSON data here
    console.log(data);
    showArticle(data);
  })
  .catch((err) => {
    // Do something for an error here
    console.log(err);
  });

// recupere le Id du produit
let articleUrl = new URL(window.location.href);
let articleId = articleUrl.searchParams.get('id');
console.log(articleUrl, articleId);

//fonction apparaitre l'article cliqué
function showArticle(data) {
  /*recuperer les balises qui a :  
     - la classe item__img pour la balise d'image produit;
     - Les id pour chaques balises
    */
  const articleImage = document.querySelector('.item__img'); // recuperer le premier élément dans le document qui contient la classe
  const articleName = document.getElementById('title');
  const articlePrice = document.getElementById('price');
  const articleDetail = document.getElementById('description');
  const articleColor = document.getElementById('colors');
  const articleQuantity = document.getElementById('quantity');
  const addCard = document.getElementById('addToCart');

  for (i = 0; i < data.length; i++) {
    if (articleId === data[i]._id) {
      articleImage.innerHTML =
        '<img src="' + data[i].imageUrl + '" alt="' + data[i].altTxt + '">';
      articleName.innerHTML = data[i].name;
      articlePrice.innerHTML = data[i].price;
      articleDetail.innerHTML = data[i].description;
      let optionColors =
        '<option value="null">--SVP, choisissez une couleur --</option>';
      for (j = 0; j < data[i].colors.length; j++) {
        optionColors +=
          '<option value="' +
          data[i].colors[j] +
          '">' +
          data[i].colors[j] +
          '</option>';
        articleColor.innerHTML = optionColors;
      }
      let cart; //variable Panier
      // event sur le button 'addToCart'
      addCard.addEventListener(
        'click',
        function () {
          let sameArticle = false; //booleant pour produit existant dans le localStorage
          let articleQuantitySelected = articleQuantity.value; //quantité dans l'input
          let articleColorSeleted =
            articleColor.options[articleColor.selectedIndex].value; //la couleur choisie
          //console.log(articleColorSeleted, articleQuantitySelected);

          if (articleQuantitySelected <= 0 || articleColorSeleted == 'null') {
            console.log("l'option ou la quantité non choisie");
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
            for (k = 0; k < cart.length; k++) {
              // si cet article est deja present dans le panier et qui a les meme option
              if (
                cart[k].id == articleUrl.searchParams.get('id') &&
                cart[k].option == articleColorSeleted
              ) {
                cart[k].quantity += parseInt(articleQuantitySelected);
                console.log(
                  parseInt(articleQuantitySelected),
                  cart[k].quantity
                );
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
          }
        },
        false
      );
    }
  }
}
