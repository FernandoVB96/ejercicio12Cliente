function handleFormSubmit(event) {
    event.preventDefault();

    const baseUrl = document.getElementById("base-url").value;
    const getAllEndpoint = document.getElementById("get-all").value.trim();
    const insertEndpoint = document.getElementById("insert").value.trim();
    const editEndpoint = document.getElementById("edit").value.trim();
    const deleteEndpoint = document.getElementById("delete").value.trim();

    if (!baseUrl) {
        alert("Por favor, llena el campo de ruta que es obligatorio.");
        return;
    }

    if (insertEndpoint) {
        window.location.href = `insert.html?baseUrl=${encodeURIComponent(baseUrl)}&getAllEndpoint=${encodeURIComponent(getAllEndpoint)}`;
    } else if (editEndpoint) {
        window.location.href = `edit.html?baseUrl=${encodeURIComponent(baseUrl)}&getAllEndpoint=${encodeURIComponent(getAllEndpoint)}`;
    } else if (deleteEndpoint) {
        fetch(`${baseUrl}${deleteEndpoint}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.ok) {
                    alert("Producto eliminado con éxito.");
                    window.location.href = `index.html`;
                } else if (response.status === 404) {
                    alert("No se encontró el producto con ese ID.");
                } else {
                    throw new Error("Error al eliminar el producto.");
                }
            })
            .catch(error => console.error('Error:', error));
    } else {
        window.location.href = `list.html?baseUrl=${encodeURIComponent(baseUrl)}&getAllEndpoint=${encodeURIComponent(getAllEndpoint)}`; // Si no hay opciones, mostrar lista
    }
}
