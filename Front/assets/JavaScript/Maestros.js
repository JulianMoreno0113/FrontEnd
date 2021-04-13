var url = "https://localhost:44316/api/Docente";

    Get();

    function Get() {
        fetch(url).then(function (response) {
            return response.json();
        }).then(function (Docentes) {
            document.querySelector(".tbody").innerHTML = " ";
            console.log(Docentes)
            for (i = 0; i < Docentes.length; i++) {
                let tr = document.createElement("tr");
                let tdButton = document.createElement("td");
                let buttonEditar =document.createElement("button");
                let buttonEliminar =document.createElement("button");
                buttonEditar.innerHTML="Editar";
                buttonEliminar.innerHTML="Eliminar";
                buttonEditar.classList.add("buttonEditar");
                buttonEliminar.classList.add("buttonEliminar");
                tdButton.appendChild(buttonEditar);
                tdButton.appendChild(buttonEliminar);
                let estado = Docentes[i].estado ==1 ? "Activo" : "Inactivo";
                let campos =
                    `<td>${Docentes[i].documento}</td>
                    <td>${Docentes[i].nombres}</td>
                    <td>${Docentes[i].apellidos}</td>
                    <td>${estado}</td>
                    <td>${Docentes[i].tipoDocumento}</td>`
                tr.innerHTML = campos
                buttonEditar.addEventListener("click",OpenUpdate)
                tr.appendChild(tdButton);
                document.querySelector(".tbody").appendChild(tr);
                
            }

        })
    }
    function Update(m) {
        console.log(typeof( m.srcElement.getAttribute("data-id")))
        let documento = m.srcElement.getAttribute("data-id");
        fetch(url, {
            method: "PUT",
            body: JSON.stringify({
                id: documento,
                nombres: document.getElementById("nombre").value,
                apellidos: document.getElementById("apellido").value,
                documento: document.getElementById("documento").value,
                tipo_Documento: document.getElementById("tipoId").value
            }),
            headers: {
                'Accept': "application/json",
                "content-Type": "application/json"
            }
        }).then(function (personas) {
            if (personas.ok) {
                return personas.text();
            } else {
                alert("ERROR AL GENERAR LA SOLUCITUD")
            }
        }).then(function (personas) {
            alert('Confirmación', 'Usuario Actualizado exitosamente!', function () { CloseUpdate() });
            Get();
        })
    }
    function OpenUpdate(id,nombre,apellido,documento,tipoDocumento) {
        console.log("hola");

        let modal = document.querySelector(".modalUpdate");
        document.getElementById("nombreEditar").value = nombre;
        document.getElementById("apellidoEditar").value = apellido;
        document.getElementById("documentoEditar").value = documento;
        document.getElementById("tipoIdEditar").value = tipoDocumento;
        document.getElementById("ButtonAddEditar").setAttribute("data-id",id)
        document.getElementById("ButtonAddEditar").addEventListener("click",Update);
        modal.style.display = "block";
    }
    function CloseUpdate() {
        let modal = document.querySelector(".modalUpdate");
        modal.style.display = "none"
    }