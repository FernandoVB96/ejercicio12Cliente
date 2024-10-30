let apiUrl = '';
let endpoints = {};

document.getElementById('config-form').addEventListener('submit', function(event) {
    event.preventDefault();
    apiUrl = document.getElementById('baseUrl').value;
    endpoints = {
        getAll: `${apiUrl}${document.getElementById('getEndpoint').value}`,
        insert: `${apiUrl}${document.getElementById('insertEndpoint').value}`,
        edit: `${apiUrl}${document.getElementById('editEndpoint').value}`,
        delete: `${apiUrl}${document.getElementById('deleteEndpoint').value}`,
    };
    document.getElementById('product-section').style.display = 'block';
    fetchProducts();
});

// Función para obtener productos
async function fetchProducts() {
    fetch(endpoints.getAll)
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            
            if (data.length > 0) {
                data.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.productId}</td>
                        <td>${product.productName}</td>
                        <td>${product.productPrice} €</td>
                        <td>
                            <button onclick="deleteProduct(${product.productId})" class="btn btn-danger">Eliminar</button>
                            <button onclick="editProduct(${product.productId})" class="btn btn-warning">Editar</button>
                        </td>
                    `;
                    productList.appendChild(row);
                });
            } else {
                productList.innerHTML = '<tr><td colspan="4" class="text-center">No hay productos disponibles.</td></tr>';
            }
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Función para eliminar un producto
function deleteProduct(productId) {
    fetch(`${endpoints.delete}/${productId}`, { method: 'DELETE' })
        .then(response => {
            if (response.ok) {
                alert('Producto eliminado con éxito.');
                fetchProducts(); // Actualiza la lista después de eliminar
            } else {
                alert('Error al eliminar el producto.');
            }
        })
        .catch(error => console.error('Error al eliminar el producto:', error));
}

// Función para editar un producto (redirecciona a un formulario de edición)
function editProduct(productId) {
    window.location.href = `edit.html?id=${productId}`; // Redirigir a la página de edición
}

// Función para añadir un producto
document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newProduct = {
        productName: document.getElementById('productName').value,
        productPrice: parseFloat(document.getElementById('productPrice').value)
    };
    fetch(endpoints.insert, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
    })
    .then(response => {
        if (response.ok) {
            alert('Producto añadido con éxito.');
            document.getElementById('product-form').reset();
            fetchProducts(); // Actualiza la lista después de añadir
        } else {
            alert('Error al añadir el producto.');
        }
    })
    .catch(error => console.error('Error al añadir el producto:', error));
});
