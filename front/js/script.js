fetch('http://localhost:3000/api/products')
  .then((Response) => {
    return Response.json();
  })
  .then((data) => {
    // Work with JSON data here
    console.log(data);
    shows(data);
  })
  .catch((err) => {
    // Do something for an error here
    console.log(err);
  });

// function : affichage de tous les articles
function shows(data) {
  let a = document.createElement('a');
  //Boucle pour passer sur tous les produits
  for (i = 0; i < data.length; i++) {
    //ajout attribut sur <a>
    a.href = 'product.html?id=' + data[i]._id;

    console.log(a);

    let article = document.createElement('article');
    //Variable pour code Image
    let articleImg =
      '<img src="' + data[i].imageUrl + '" alt="' + data[i].description + '">';
    //Variable pour code Nom
    let articleName = '<h3 class="productName">' + data[i].name + '</h3>';
    //Variable pour code description du produit
    let articleDescrip =
      '<p class="productDescription">' + data[i].description + '</p>'; //Descriptions des articles

    //affichage & Ordre d'affichage
    article.innerHTML = articleImg + articleName + articleDescrip;
    a.appendChild(article);
  }

  items.appendChild(a);
}
