//Get HTML elements
//First section elements
newCatalog = document.getElementById("newCatalog");
catalog = document.getElementById("products");

//Add product elements
createProducts = document.getElementById("createProducts");
imageUploadBtn = document.getElementById("imageUploadBtn");
imageInput = document.getElementById('imageInput');

//Form elements
addProductForm = document.getElementById("addProductForm");

//Preview elements
previewContainer = document.getElementById("previewContainer");
previewImage = document.getElementById("previewImage");
defaultText = document.getElementById("previewText");
returnBtn = document.getElementById("returnBtn");

previewName = document.getElementById("previewName");
previewPrice = document.getElementById("previewPrice");
previewCategory = document.getElementById("previewCategory");

//Price formatter
const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP', 
    minimumFractionDigits: 0
});

//Other variables
let imgURL;
let products = [];

//Switch to add product to catalog page
newCatalog.addEventListener("click", e => {
    e.preventDefault();
    
    catalog.classList.add("products--none");
    createProducts.classList.add("make--show");
});

//Make button work when uploading image
imageUploadBtn.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('imageInput').click();
});

//Show preview of the image
imageInput.addEventListener("change", function() {
    let file = this.files[0];

    if (file) {
        let reader = new FileReader();

        defaultText.style.display = "none";
        previewImage.style.display = "block";

        reader.addEventListener("load", function() {
            previewImage.setAttribute("src", this.result);
            imgURL = this.result;
        });

        reader.readAsDataURL(file);
    } else {
        defaultText.style.display = null;
        previewImage.style.display = null;
        previewImage.setAttribute("src", "#");
    }
});

//Show preview of the rest of the product information
addProductForm.addEventListener("change", e => {
    previewName.innerText = addProductForm.name.value;
    previewPrice.innerText = formatterPeso.format(addProductForm.price.value);
    previewCategory.innerText = addProductForm.category.value;
});

//Add product to catalog list
addProductForm.addEventListener("submit", e => {
    e.preventDefault();

    //All the product info
    const name  = addProductForm.name.value;
    const category = addProductForm.category.value;
    const price = addProductForm.price.value;
    const img = imgURL;

    const newProduct = {
        name, 
        price,
        category, 
        img
    }

    //Add product to list, then local storage
    products = JSON.parse(localStorage.getItem('catalogProducts')) || [];
    products.push(newProduct);
    localStorage.setItem('catalogProducts', JSON.stringify(products));

    //Change html of catalog area
});

returnBtn.addEventListener("click", e => {
    e.preventDefault();

    catalog.style.display = "block";
    createProducts.style.display = "none";
});

function loadProducts() {
    products = JSON.parse(localStorage.getItem('catalogProducts'));

    //Render products
    if (products.length > 0) {
        catalog.innerHTML = `
        <div class="products__top">
            <h2 class="products__title">Tu catálogo</h2>
            <button class="products__add" id="addMore">+</button>
        </div>
        <div class="products__linkinfo">
            <p class="products__linktext">Copie el siguiente link para compartir tu catálogo!</p>
            <p class="products__link">www.semiigo.com/mi-catalogo-3005556666</p>
        </div>
        <div class="all__products" id="allProducts"></div>`;

        products.forEach(product => {
            renderProducts(product)
        });
    }
}

function renderProducts(product) {
    const catalogProduct = document.createElement("div");
    catalogProduct.className = "product__container";

    catalog.classList.add("products--new");

    catalogProduct.innerHTML = `
        <img src="${product.img}" alt="Imagen previa" class="product__image">
        <div class="product__info">
            <h3 class="product__title">${product.name}</h3>
            <p class="product__price">${formatterPeso.format(product.price)}</p>
        </div>
        <p class="product__category">${product.category}</p>`;

    const container = document.getElementById("allProducts");
    container.appendChild(catalogProduct);

    //Make add button functional
    const addMore = document.getElementById("addMore");
    addMore.addEventListener("click", e => {
        e.preventDefault();

        catalog.classList.add("products--none");
        createProducts.classList.add("make--show");
    });

}

loadProducts();
