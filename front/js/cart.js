fetch('http://localhost:3000/api/products')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Work with JSON data here
    showsOrder(data);
  })
  .catch((err) => {
    // Do something for an error here
    console.log(err);
  });

function showsOrder(data) {
  let articleOrder = document.getElementById('cart__items');

  //recupere les produits dans le localStorage
  let orders = JSON.parse(localStorage['productsInCart']);
  console.log(orders);
  for (j = 0; j < orders.length; j++) {
    for (i = 0; i < data.length; i++) {
      if (orders[j].id == data[i]._id) {
        let baliseArticle = document.createElement('article');
        baliseArticle.className = 'cart__item';
        baliseArticle.setAttribute('data-id', data[i]._id);
        baliseArticle.setAttribute('data-color', data[i].color);
        //console.log(baliseArticle);
        /////////////////////////////////////////////////////
        let artcileImg =
          '<div class="cart__item__img"> <img src="' +
          data[i].imageUrl +
          '" alt="' +
          data[i].altTxt +
          '"> </div>';
        let articleContent = '<div class="cart__item__content">';
        let articleDescription =
          '<div class="cart__item__content__description"> <h2>' +
          data[i].name +
          '</h2> <p> ' +
          orders[j].option +
          '</p> <p>' +
          data[i].price +
          ' € </p>  </div>';
        let articleContentSettings =
          ' <div class="cart__item__content__settings">';
        let articleContentSettingsQuantity =
          ' <div class="cart__item__content__settings__quantity"> <p>Qté :' +
          '</p> <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="' +
          orders[j].quantity +
          '"> </div> <div class="cart__item__content__settings__delete"> <p class="deleteItem">Supprimer</p>  </div>';
        articleContentSettings = articleContentSettingsQuantity + '</div>';
        articleContent = articleDescription + articleContentSettings + '</div>';
        baliseArticle.innerHTML = artcileImg + articleContent;
        console.log(baliseArticle);
        ///////////////////////////////////////////////////////
        articleOrder.appendChild(baliseArticle);
        ////////////////////////////////////////////////////
        let articleQuantity = document.querySelector('.itemQuantity');
        //console.log(articleQuantity.value);
        let artcileDelete = document.querySelector('.deleteItem');

        articleQuantity.addEventListener('mouseup', function (event) {
          if (articleQuantity.value < 0) {
            orders.splice(j, 1);
            orders[j].push({
              id: data[i]._id,
              quantity: parseInt(event.target.value),
              option: ord,
            });
            alert('§§');
          }
          console.log("orders de l'/Event" + orders[j]);
        });
        console.log('msg : ' + orders[j].quantity);
        console.log("orders de l'/Event", orders[j]);
      }
    }
  }
}
