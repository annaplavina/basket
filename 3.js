"use strict";

let addToCartBnts = document.querySelectorAll(".add-to-card");
addToCartBnts.forEach(function (addToCartbtn) {
  addToCartbtn.addEventListener("click", function (event) {
    let parent = addToCartbtn.parentElement;
    let name = parent.querySelector(".item-name").innerText;
    let price = parent.querySelector(".item-price").innerText;
    let id = parent.id;
    let renderedItem = new RenderItem(name, price, id);
    getData.addToCart(renderedItem);
    getData.showItem(renderedItem);
    getData.getTotal();
  });
});

function RenderItem(name, price, id) {
  (this.id = id), (this.name = name), (this.price = price);
}

let getData = {
  items: {},

  addToCart(item) {
    if (this.items.hasOwnProperty(`${item.id}`)) {
      this.items[item.id].count++;
    } else {
      this.items[item.id] = {
        name: item.name,
        price: item.price,
        count: 1,
      };
    }
  },

  showItem(item) {
    let cartbody = document.querySelector("tbody");

    let rows = cartbody.children;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].classList.contains(`check_${item.id}_id`)) {
        let quantity = document.querySelector(`.quantity_${item.id}_id`);
        quantity.textContent++;
        return;
      }
    }

    let newRow = `
            <tr class="check_${item.id}_id">
            <th class="check">${item.id}</th>
            <th>${item.name}</th>
            <th>${item.price}</th>
            <th class="quantity_${item.id}_id">1</th>
            </tr
            `;

    cartbody.insertAdjacentHTML("beforeend", newRow);
  },

  getTotal() {
    let total = document.querySelector(".total-sum");
    let sum = 0;

    for (let key in this.items) {
      let price = this.items[key].price * this.items[key].count;
      sum += price;
    }
    total.innerHTML = sum;
  },
};
