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
                tr.appendChild(tdButton);
                document.querySelector(".tbody").appendChild(tr);
                
            }

        })
    }