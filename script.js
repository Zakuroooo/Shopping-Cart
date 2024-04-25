var productList;
var cart = [];
var cartValue = 0;
fetch("https://content.newtonschool.co/v1/pr/65f821a4f6a42e24cda7e50c/productsData")
    .then((response) => response.json())
    .then((data) => {
        productList = data;
        productDis();
    });

function productDis() {
    console.log(productList);
    productList.forEach((data) => {
        var product = document.createElement("div");
        product.className = "product";
        product.innerHTML = `
            <img width="250px" height="350px" src="${data.image}" alt="${data.title}" />
            <p class='ptitle'>${data.title}</p>
            <div class="priceandaddtocart">
                <p class="pprice">${data.price} DH</p>
                <button class="addtocart" data-productid="${data.id}"></button>
            </div>`;
        var productContainer = document.querySelector(".productscontainer");
        productContainer.append(product);
    });

    let addButtons = document.querySelectorAll('.addtocart');
    addButtons.forEach((button) => {
        button.addEventListener('click', function (event) {
            let productId = event.target.getAttribute('data-productid');
            let obj = productList.find((product) => product.id == productId);
            let ids = cart.map((r) => r.id);
            if (!ids.includes(parseInt(productId))) {
                obj.quantity = 1;
                cart.push(obj);
                cartValue++;
                displayproductsLS();
            } else {
                let index = cart.findIndex(item => item.id == productId);
                cart[index].quantity++;
                cartValue ++
                displayproductsLS();
            }
        }); 
    });
}

const header = document.querySelector("header");
header.style.position = "sticky";
header.style.top = "0px";
var carticon = document.querySelector(".carticon");
var cartui = document.querySelector(".cartui");
var closeButton = document.querySelector(".closecart");

carticon.addEventListener("click", () => {
    cartui.classList.add("cartopened");
});

closeButton.addEventListener("click", () => {
    cartui.classList.remove("cartopened");
});

function displayproductsLS() {
    document.querySelector('.pccontainer').innerHTML = '';
    cart.forEach((e) => {
        document.querySelector('.pccontainer').innerHTML += `
            <div class="cartproduct">
                <div class="pnp">
                    <div class="img">
                        <img width="90px" src="${e.image}" alt="">
                    </div>
                    <div class="nameandprice">
                        <p>${e.title}</p>
                        <p>${e.price}</p>
                        <!-- Display quantity with buttons for increasing and decreasing -->
                        <p>
                            Qty
                            <button class="addqtt">+</button>
                            <span class="qtt">${e.quantity}</span>
                            <button class="minusqtt">-</button>
                        </p>
                    </div>
                </div>
                <button class="delete" productid="${e.id}">X</button>
            </div>
        `;
    });


    carticon.setAttribute("items", cartValue);


    const addQuantityButtons = document.querySelectorAll('.addqtt');
    const minusQuantityButtons = document.querySelectorAll('.minusqtt');

    addQuantityButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            cart[index].quantity++;
            cartValue++
            displayproductsLS();
        });
    });

    minusQuantityButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                cartValue --;
                displayproductsLS();
            }
        });
    });

    const removeButtons = document.querySelectorAll(".delete");
    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            let productId = button.getAttribute('productid');
            for (let i = 0; i < cart.length; i++) {

                if (cart[i].id == productId) {
                    cartValue = cartValue - cart[i].quantity
                    cart.splice(i, 1);
                    break;
                }
            }
            displayproductsLS();
        });
    });
}
