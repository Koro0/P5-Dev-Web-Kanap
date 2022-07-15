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
    console.log('erreur du server ', err);
  });

// function : affichage de tous les articles
function shows(data) {
  //let a = document.createElement('a');
  //Boucle pour passer sur tous les produits
  for (i = 0; i < data.length; i++) {
    let a = document.createElement('a');
    //ajout attribut sur <a>
    a.href = 'product.html?id=' + data[i]._id;

    console.log(a);

    let article = document.createElement('article');
    //Variable pour code Image
    let articleImg = document.createElement('img');
    articleImg.src = data[i].imageUrl;
    console.log(articleImg);
    article.appendChild(articleImg);

    //Variable pour code Nom
    let articleName = document.createElement('h3');
    articleName.className = 'productName';
    articleName.textContent = data[i].name;
    article.appendChild(articleName);

    //Variable pour code description du produit
    let articleDescrip = document.createElement('p');
    articleDescrip.className = 'productDescription';
    articleDescrip.textContent = data[i].description;
    article.appendChild(articleDescrip);

    //affichage & Ordre d'affichage

    a.appendChild(article);
    items.appendChild(a);
  }
}
