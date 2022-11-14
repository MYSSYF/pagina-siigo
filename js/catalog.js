//Get HTML elements
newCatalog = document.getElementById("newCatalog");
noCatalog = document.getElementById("noCatalog");

//Switch to add product to catalog page
newCatalog.addEventListener("click", e => {
    e.preventDefault();
    
    noCatalog.classList.add("nocatalog--none");
});
