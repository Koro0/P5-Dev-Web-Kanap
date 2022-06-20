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
  let articleImage = document.querySelector('.item__img'); // recuperer le premier élément dans le document qui contient la classe
  let articleName = document.getElementById('title');
  let articlePrice = document.getElementById('price');
  let articleDetail = document.getElementById('description');
  let articleColor = document.getElementById('colors');
  let articleQuantity = document.getElementById('quantity');
  let addCard = document.getElementById('addToCart');

  for (i = 0; i < data.length; i++) {
    if (articleId === data[i]._id) {
      articleImage.innerHTML =
        '<img src="' + data[i].imageUrl + '" alt="' + data[i].altTxt + '">';
      articleName.innerHTML = data[i].name;
      articlePrice.innerHTML = data[i].price;
      articleDetail.innerHTML = data[i].description;
      let optionColors =
        '<option value="">--SVP, choisissez une couleur --</option>';
      for (j = 0; j < data[i].colors.length; j++) {
        optionColors +=
          '<option value="' +
          data[i].colors[j] +
          '">' +
          data[i].colors[j] +
          '</option>';
        //console.log(data[i].colors[j]);
        //console.log(articleColor);
        articleColor.innerHTML = optionColors;
      }
    }
  }
}
