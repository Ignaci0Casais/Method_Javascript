var peticionHttp;
var Post;

function inicializar_XHR() {

    if (window.XMLHttpRequest) {
        peticionHttp = new XMLHttpRequest();
    }
    else {
        peticionHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
}

function realizarPeticion(url, metodo, funcionA) {
    peticionHttp.onreadystatechange = funcionA;
    peticionHttp.open(metodo, url, false);
    peticionHttp.send(null)
}


function login() {

    inicializar_XHR();
    realizarPeticion('https://jsonplaceholder.typicode.com/users', 'GET', funcionPrueba)

}

function funcionPrueba() {

    var usuario = document.getElementById("mail");
    var password = document.getElementById("psw");

    const datos = JSON.parse(peticionHttp.response);

    for (let i = 0; i < datos.length; i++) {

        if (usuario.value == datos[i]['email'] && password.value == datos[i]['address']['zipcode']) {
            window.location.href = "Punto2.html?" + datos[i]['id'];
            var encontrado = 'si';
            break;
        }
        else {
            var encontrado = 'no';
        }
    }

    if (encontrado != 'si') {
        alert('Usuario o contraseña incorrectos.');
    }
}

function datosDelPost() {
    Post = window.location['search'].split("?");

    inicializar_XHR();
    realizarPeticion('https://jsonplaceholder.typicode.com/posts', 'GET', funcionPost)

}

function funcionPost() {
    const datos = JSON.parse(peticionHttp.response);

    var contenedorDataTable = document.getElementById("datatable");

    for (let i = 0; i < datos.length; i++) {
        if (datos[i]['userId'] == Post[1]) {
            var userId = datos[i]['userId'];
            var idpost = datos[i]['id'];
            var title = datos[i]['title'];
            var body = datos[i]['body'];

            var tr = document.createElement('tr');
            // ----------------------------------------
            var tdidpost = document.createElement('td');
            var tdidpostTexto = document.createTextNode(idpost);
            tdidpost.appendChild(tdidpostTexto);
            tr.appendChild(tdidpost);
            // ----------------------------------------
            var tdusderID = document.createElement('td');
            var tduserIdTexto = document.createTextNode(userId);
            tdusderID.appendChild(tduserIdTexto);
            tr.appendChild(tdusderID);
            // ----------------------------------------
            var tdbody = document.createElement('td');
            var tdbodyTexto = document.createTextNode(body);
            tdbody.appendChild(tdbodyTexto);
            tr.appendChild(tdbody);
            // ----------------------------------------
            var tdtitle = document.createElement('td');
            var tdtitleTexto = document.createTextNode(title);
            tdtitle.appendChild(tdtitleTexto);
            tr.appendChild(tdtitle);
            // ----------------------------------------
            contenedorDataTable.appendChild(tr);
        }
    }
    
}