const params = getParams();
if (Object.keys(params).length > 0) {
    fetch(params.baseUrl + params.getAllEndpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los datos.");
            }
            return response.json();
        })
        .then(data => {
            createTable(data);
        })
        .catch(error => console.error('Error al obtener los datos:', error));
}

function createTable(data) {
    let tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = ""; 

    if (!data.length) {
        tableContainer.innerHTML = "<p>No hay productos disponibles.</p>";
        return;
    }

    let table = document.createElement("table");
    let headerRow = document.createElement("tr");
    
    Object.keys(data[0]).forEach(key => {
        let th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    });

    headerRow.innerHTML += "<th>Acciones</th>";
    table.appendChild(headerRow);

    data.forEach(product => {
        let row = document.createElement("tr");

        Object.values(product).forEach(value => {
            let td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
        });

        let actionsTd = document.createElement("td");
        let editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.onclick = () => {
            window.location.href = `edit.html?id=${product.id}`;
        };
        
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.onclick = () => {
            fetch(params.baseUrl + '/api/v1/product/delete/' + product.id, {
                method: "DELETE"
            })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error('Error al eliminar el producto.');
                }
            });
        };

        actionsTd.appendChild(editButton);
        actionsTd.appendChild(deleteButton);
        row.appendChild(actionsTd);
        table.appendChild(row);
    });

    tableContainer.appendChild(table);
}

function getParams() {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    var params = {};
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
}
document.getElementById("add-product-button").onclick = () => {
    const baseUrl = new URLSearchParams(window.location.search).get("baseUrl");
    window.location.href = `insert.html?baseUrl=${encodeURIComponent(baseUrl)}`;
};