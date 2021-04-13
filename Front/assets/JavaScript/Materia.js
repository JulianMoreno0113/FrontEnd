let url = "https://localhost:44316/api/materias";
const tbody = document.querySelector(".tbody");
Get();

function Get(){
fetch(url).then(function (response){
    return response.json();
}).then(function (materias){
    document.querySelector(".tbody").innerHTML =" ";
    console.log(materias)
    for (let i = 0; i < materias.length; i++) {
        let tr = document.createElement("tr");
        let buttonEditar = document.createElement("button");
        let buttonEliminar = document.createElement("button");
        let tdButton = document.createElement("td");
        buttonEditar.innerHTML ="Editar";
        buttonEliminar.innerHTML ="Eliminar";
        buttonEditar.nombre = materias[i].nombreMateria;
        buttonEditar.addEventListener('click', function(mybutton){
            OpenUpdate(mybutton.target.nombre);
        });
        tdButton.appendChild(buttonEditar);
        tdButton.appendChild(buttonEliminar);
        let cadena = `<td>${materias[i].nombreMateria}</td><td>${materias[i].nombreDocente} ${materias[i].apellidoDocente}</td>` 
        tr.innerHTML = cadena;
        buttonEditar.classList.add("buttonEditar");
        buttonEliminar.classList.add("buttonEliminar");
        tr.appendChild(tdButton);
        document.querySelector(".tbody").appendChild(tr)
    }
})
}

function Post(){
    fetch(url, {
        method:"POST",
        body : JSON.stringify({
            identificacion: parseInt(document.getElementById("identificacion").value),
            nombre:document.getElementById("nombre").value,
            apellido:document.getElementById("apellido").value,
            fechaNacimiento:document.getElementById("fechaNacimiento").value,
        }),
        headers:{
            'Accept':"application/json",
            "content-Type":"application/json"
        }
    }).then(function(response){
        if(response.ok){
            response.text().then(function(personas){
                alertify.alert('Confirmación', 'Usuario Agregado exitosamente!');
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
        alertify.alert('Confirmación', 'Usuario Actualizado exitosamente!', function(){ CloseUpdate()});
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


function OpenUpdate(nombre){
    let modal = document.querySelector(".modalUpdate");
    document.getElementById("nombreEditar").value=nombre;
    modal.style.display = "block";
}
function CloseUpdate(){
    let modal = document.querySelector(".modalUpdate");
    modal.style.display = "none"
}
function LimpiarTextBox(){

    document.getElementById("identificacion").value="";
    document.getElementById("nombre").value="";
    document.getElementById("apellido").value="";
    document.getElementById("fechaNacimiento").value="";
    document.getElementById("edad").value="";
}

