function handleAddProduct(event) {
    event.preventDefault();

    const baseUrl = new URLSearchParams(window.location.search).get("baseUrl");
    const productName = document.getElementById("name").value;
    const productPrice = parseFloat(document.getElementById("price").value);

    const productData = {
        name: productName,
        price: productPrice
    };
    
    fetch(baseUrl + "/api/v1/product/insert", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al agregar el producto.");
        }
        return response.text(); 
    })
    .then(message => {
        alert(message); 
        window.location.href = "list.html?baseUrl=" + encodeURIComponent(baseUrl) + "&getAllEndpoint=" + encodeURIComponent("/api/v1/product");
    })
    .catch(error => {
        console.error('Error al agregar el producto:', error);
    });
}


// Seteamos base URL en el formulario
const params = new URLSearchParams(window.location.search);
document.getElementById("base-url").value = params.get("baseUrl");
document.getElementById("get-all-endpoint").value = "/api/v1/product";
