class Cart {
  constructor(element) {
    const thisCart = this;

    thisCart.products = [];
    //console.log(thisCart.products);

    thisCart.getElements(element);
    thisCart.initActions();
    //console.log('new Cart', thisCart);
    thisCart.deliveryFee = settings.cart.defaultDeliveryFee;
  }

  getElements(element) {
    const thisCart = this;

    thisCart.dom = {};
    thisCart.dom.wrapper = element;
    thisCart.dom.toggleTrigger = thisCart.dom.wrapper.querySelector(select.cart.toggleTrigger);
    thisCart.dom.productList = thisCart.dom.wrapper.querySelector(select.cart.productList);
    thisCart.dom.totalPrice = thisCart.dom.wrapper.querySelectorAll(select.cart.totalPrice);
    thisCart.dom.form = thisCart.dom.wrapper.querySelector(select.cart.form);
    thisCart.dom.phone = thisCart.dom.wrapper.querySelector(select.cart.phone);
    thisCart.dom.address = thisCart.dom.wrapper.querySelector(select.cart.address);

    thisCart.renderTotalsKeys = ['totalNumber', 'subtotalPrice', 'deliveryFee'];
    for (let key of thisCart.renderTotalsKeys) {
      thisCart.dom[key] = thisCart.dom.wrapper.querySelector(select.cart[key]);
    }

  }

  initActions() {
    const thisCart = this;
    thisCart.dom.toggleTrigger.addEventListener('click', function () {
      thisCart.dom.wrapper.classList.toggle(classNames.cart.wrapperActive);
    });
    thisCart.dom.productList.addEventListener('updated', function () {
      thisCart.update();
    });
    thisCart.dom.productList.addEventListener('remove', function (e) {
      thisCart.remove(e.detail.cartProduct);
    });
    thisCart.dom.form.addEventListener('submit', function () {
      event.preventDefault();
      thisCart.sendOrder();
    });
  }

  remove(product) {
    const thisCart = this;
    product.dom.wrapper.remove();
    const index = thisCart.products.indexOf(product); //console.log(index);
    thisCart.products.splice(index, 1);
    thisCart.update();
  }

  add(menuProduct) {
    const thisCart = this;
    const generatedHTML = templates.cartProduct(menuProduct);
    const generatedDOM = utils.createDOMFromHTML(generatedHTML);

    thisCart.dom.productList.appendChild(generatedDOM);
    thisCart.products.push(new CartProduct(menuProduct, generatedDOM));
    //console.log('thisCart.products', thisCart.products);

    //console.log('adding product', menuProduct);
    thisCart.update();
  }

  update() {

    const thisCart = this;
    let subtotalPrice = 0;
    let totalNumber = 0;

    for (const prod of thisCart.products) {
      subtotalPrice += prod.price;
      totalNumber += prod.amount;
    }
    const totalPrice = (thisCart.products.length) ? subtotalPrice + thisCart.deliveryFee : 0;

    thisCart.dom.totalNumber.innerHTML = totalNumber;
    thisCart.dom.subtotalPrice.innerHTML = subtotalPrice;
    thisCart.dom.totalPrice.innerHTML = totalPrice;

    thisCart.dom.deliveryFee.innerHTML = (thisCart.products.length) ? thisCart.deliveryFee : 0;
    for (const priceTag of thisCart.dom.totalPrice) {
      priceTag.innerHTML = totalPrice;
    }
  }

  sendOrder() {
    const thisCart = this;

    const url = settings.db.url + '/' + settings.db.order;

    const payload = {
      address: thisCart.dom.address,
      totalPrice: thisCart.dom.totalPrice.innerHTML,
      phone: thisCart.dom.phone,
      totalNumber: thisCart.dom.totalNumber.innerHTML,
      subtotalPrice: thisCart.dom.subtotalPrice.innerHTML,
      deliveryFee: thisCart.deliveryFee,
      products: [],
    };

    for (const product of thisCart.products) {
      payload.products.push(product.getData());
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function (response) {
        return response.json();
      }).then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);
      });
  }
}

export default Cart;