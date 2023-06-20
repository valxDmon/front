const url = 'http://localhost:8282/api/hurto'
const listarHurto = async () => {
    let body = document.getElementById('contenido');
    if (body) {
        let mensaje = '';

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const hurtos = data.hurto;
                hurtos.map((hurto) => {
                    console.log(hurto);
                    const fecha = new Date(hurto.fecha).toLocaleDateString();

                    mensaje += `<tr><td>${hurto.direccion}</td>` +
                        `<td>${hurto.latitud}</td>` +
                        `<td>${hurto.longitud}</td>` +
                        `<td>${hurto.descripcion}</td>` +
                        `<td>${fecha}</td>` +
                        `<td>
                    <a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(hurto)})'>Editar</a>
                    <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${hurto._id}")'>Eliminar</a>
                 </td></tr>`;
                    body.innerHTML = mensaje;
                });

            })
    }
};
listarHurto();



const registrarHurto = async () => {
    let direccion = document.getElementById('direccion').value
    let latitud = document.getElementById('latitud').value
    let longitud = document.getElementById('longitud').value
    let descripcion = document.getElementById('descripcion').value


    let hurto = {
        direccion: direccion,
        latitud: latitud,
        longitud: longitud,
        descripcion: descripcion
    };

    if (latitud >= 6.13 && latitud <= 6.217 || longitud >= -75.34 && longitud <= -75.567) {
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(hurto),
            headers: { "Content-type": "application/json; charset=UTF-8" },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                alert(data.hurto + ' Se registro exitosamente');
                window.location.href = "listarHurtos.html";
            });
    } else {
        alert('No se puede registrar');
    }
};


    const editar = (hurto) => {
        let _id = document.getElementById('_id').value = '';
        let direccion = document.getElementById('direccion').value = '';
        let latitud = document.getElementById('latitud').value = '';
        let longitud = document.getElementById('longitud').value = '';
        let descripcion = document.getElementById('descripcion').value = '';

        document.getElementById('_id').value = hurto._id;
        document.getElementById('direccion').value = hurto.direccion;
        document.getElementById('latitud').value = hurto.latitud;
        document.getElementById('longitud').value = hurto.longitud;
        document.getElementById('descripcion').value = hurto.descripcion;
    }
    const actualizarHurto = async () => {
        let direccion = document.getElementById('direccion').value;
        let latitud = document.getElementById('latitud').value;
        let longitud = document.getElementById('longitud').value;
        let descripcion = document.getElementById('descripcion').value;

        let hurto = {
            _id: document.getElementById('_id').value,
            direccion: direccion,
            latitud: latitud,
            longitud: longitud,
            descripcion: descripcion

    };
    if (latitud >= 6.13 && latitud <= 6.217 || longitud >= -75.34 && longitud <= -75.567) {
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(hurto),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                alert(json.mensaje);
                alert("Se editó correctamente");
                window.location.href = "listarHurtos.html";
            })

    } else {
        alert('No se pudo realizar la modificación');
    }
};

const eliminar = (_id) => {
    if (confirm('¿Está seguro de realizar la eliminación?')) {
        const hurto = { _id: _id };

        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(hurto),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => response.json())
            .then(data => {
                alert(data.hurto);
                window.location.href = "listarHurtos.html";
            })
    }
};



    if (document.querySelector('#btnRegistrar')) {
        document.querySelector('#btnRegistrar')
            .addEventListener('click', registrarHurto)

    }

    if (document.querySelector('#editar')) {
        document.querySelector('#editar')
            .addEventListener('click', editar)
        console.log(_id)

    }

    const editarButton = document.querySelector('#btnEditar');
    if (editarButton) {
        editarButton.addEventListener('click', actualizarHurto);
    }