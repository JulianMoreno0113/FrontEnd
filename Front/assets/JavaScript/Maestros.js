var url = "https://localhost:44316/api/Docente";

Get();

function Get() {
    fetch(url).then(function (response) {
        return response.json();
    }).then(function (Docentes) {
        pintar(Docentes);
    })
}

function pintar(Docentes) {
    document.querySelector(".tbody").innerHTML = " ";
    for (i = 0; i < Docentes.length; i++) {
        let tr = document.createElement("tr");
        let tdButton = document.createElement("td");
        let buttonEditar = document.createElement("button");
        let buttonEliminar = document.createElement("button");
        buttonEditar.innerHTML = "Editar";
        buttonEliminar.innerHTML = "Eliminar";
        buttonEditar.classList.add("buttonEditar");
        buttonEliminar.classList.add("buttonEliminar");
        buttonEliminar.addEventListener('click', Delete);
        tdButton.appendChild(buttonEditar);
        tdButton.appendChild(buttonEliminar);
        let estado = Docentes[i].estado == 1 ? "Activo" : "Inactivo";
        let campos =
            `<td>${Docentes[i].documento}</td>
                    <td>${Docentes[i].nombres}</td>
                    <td>${Docentes[i].apellidos}</td>
                    <td>${Docentes[i].tipoDocumento}</td>
                    <td>${estado}</td>`
        tr.innerHTML = campos;
        tr.setAttribute("data-id", Docentes[i].id);
        tr.appendChild(tdButton);
        document.querySelector(".tbody").appendChild(tr);
    }
}

function Delete(e) {
    let id = e.srcElement.parentNode.parentNode.getAttribute("data-id");
    fetch(url, {
        method: "DELETE",
        body: JSON.stringify({
            identificacion: parseInt(id),
        }),
        headers: {
            'Accept': "application/json",
            "content-Type": "application/json"
        }
    }).then(function (personas) {
        if (personas.ok) {
            let tr = e.srcElement.parentNode.parentNode;
            document.querySelector(".tbody").removeChild(tr);
            return personas.text();
        } else {
            alert("ERROR AL GENERAR LA SOLUCITUD")
        }
    })
}