// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var cpf = sessionStorage.CPF_USUARIO;
    var religiao = sessionStorage.RELIGIAO_USUARIO;
    

    var b_usuario = document.getElementById("b_usuario");
    var c_usuario = document.getElementById("c_usuario");
    var d_usuario = document.getElementById("d_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
        c_usuario.innerHTML = cpf;
        d_usuario.innerHTML = religiao;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
}

