const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    alert("No se ha proporcionado un ID de producto.");
    window.location.href = "index.html"; 
}

fetch(`http://localhost:8080/api/v1/product/${id}`) 
    .then(response => {
        if (!response.ok) {
            throw new Error("Error al obtener el producto.");
        }
        return response.json();
    })
    .then(product => {
        document.getElementById("id").value = product.id;
        document.getElementById("name").value = product.name;  
        document.getElementById("price").value = product.price;  
    })
    .catch(error => console.error('Error:', error));

function handleEditFormSubmit(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);

    fetch(`http://localhost:8080/api/v1/product/edit/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, price })

    })
    .then(response => {
        if (response.ok) {
            alert("Producto actualizado con éxito.");
            window.location.href = "index.html"; 
        } else {
            throw new Error("Error al actualizar el producto.");
        }
    })
    .catch(error => console.error('Error:', error));
}
