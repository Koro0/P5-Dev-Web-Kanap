///////// recuperer le numeros de commande depuis le lien  ///////////////
let orderURL = new URL(window.location.href);
let orderId = orderURL.searchParams.get('orderId');
console.log(orderId);
//////////// afficher le N° de commande sur la page confirmation /////////
document.getElementById('orderId').textContent = orderId;
