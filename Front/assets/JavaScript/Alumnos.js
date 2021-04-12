var url="https://localhost:44316/api/estudiantes";
Get();
function Get(){
fetch(url).then(function(response){
    return response.json();
}).then(function(estudiantes){ 
    document.querySelector(".tbody").innerHTML="";
    console.log(estudiantes)
    for(i=0; i<estudiantes.length; i++){
        let tr = document.createElement("tr");
        let tdButton = document.createElement("td");
        let buttonEditar = document.createElement("button");
        let buttonEliminar = document.createElement("button");
        buttonEditar.innerHTML="Editar";
        buttonEliminar.innerHTML="Eliminar";
        let campos = `<td>${estudiantes[i].nombres}</td>
                      <td>${estudiantes[i].apellidos}</td>
                      <td>${estudiantes[i].documento}</td>
                      <td>${estudiantes[i].tipoDocumento}</td>`            
        tr.innerHTML = campos;
        buttonEditar.classList.add("buttonEditar");
        buttonEliminar.classList.add("buttonEliminar");
        tdButton.appendChild(buttonEditar);
        tdButton.appendChild(buttonEliminar);
        tr.appendChild(tdButton);
        document.querySelector(".tbody").appendChild(tr);
    }
})

function Post(){
    fetch(url, {
        method:"POST",
        body : JSON.stringify({
            "nombres": document.getElementById("nombre"),
            "apellidos": document.getElementById(apellido),
            "documento": "123123312",
            "tipo_Documento": "TI",
        }),
        headers:{
            'Accept':"application/json",
            "content-Type":"application/json"
        }
    }).then(function(response){
        if(response.ok){
            response.text().then(function(personas){
                alert('Confirmación', 'Usuario Agregado exitosamente!');
                Get();
                LimpiarTextBox();
            });
        }else{
            alertify.alert('ERROR AL GENERAR SOLICITUD');
        }
    })
}

function Update(){
    fetch(url, {
        method:"PUT",
        body : JSON.stringify({
            identificacion:parseInt(document.getElementById("identificacionUpdate").value),
            nombre:document.getElementById("nombreUpdate").value,
            apellido:document.getElementById("apellidoUpdate").value,
            fechaNacimiento:document.getElementById("fechaNacimientoUpdate").value,
        }),
        headers:{
            'Accept':"application/json",
            "content-Type":"application/json"
        }
    }).then(function(personas){
        if(personas.ok){
            return personas.text();
        }else{
            alert ("ERROR AL GENERAR LA SOLUCITUD")
        }
    }).then(function(personas){
        alert('Confirmación', 'Usuario Actualizado exitosamente!', function(){ CloseUpdate()});
        Get();
    })
}
function Delete(id){
    fetch(url, {
        method:"DELETE",
        body : JSON.stringify({
            identificacion:parseInt(id),
        }),
        headers:{
            'Accept':"application/json",
            "content-Type":"application/json"
        }
    }).then(function(personas){
        if(personas.ok){
            return personas.text();
        }else{
            alert ("ERROR AL GENERAR LA SOLUCITUD")
        }
    }).then(function(personas){
        Get();
        alertify.success('Eliminado correctamente')
    })
}


function OpenUpdate(id,nombre,apellido, fechaNacimiento){
    let modal = document.querySelector(".ModalUpdate");
    document.getElementById("identificacionUpdate").value = id;
    document.getElementById("nombreUpdate").value=nombre;
    document.getElementById("apellidoUpdate").value = apellido;
    document.getElementById("fechaNacimientoUpdate").value =fechaNacimiento;
    modal.style.display = "block";
}
function CloseUpdate(){
    let modal = document.querySelector(".ModalUpdate");
    document.getElementById("identificacionUpdate").value = "";
    document.getElementById("nombreUpdate").value=nombre ="";
    document.getElementById("apellidoUpdate").value = apellido="";
    document.getElementById("fechaNacimientoUpdate").value =fechaNacimiento="";
    modal.style.display = "none"
}
function LimpiarTextBox(){

    document.getElementById("identificacion").value="";
    document.getElementById("nombre").value="";
    document.getElementById("apellido").value="";
    document.getElementById("fechaNacimiento").value="";
    document.getElementById("edad").value="";
}
}