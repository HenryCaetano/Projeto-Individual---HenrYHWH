// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var cpf = sessionStorage.CPF_USUARIO;
    var religiao = sessionStorage.RELIGIAO_USUARIO;

    // só atualiza elementos se eles existirem na página
        var b_usuario = document.getElementById("b_usuario");
        var c_usuario = document.getElementById("c_usuario");
        var d_usuario = document.getElementById("d_usuario");

    if (email != null && nome != null) {

        //validando os dados existentes, para que quando o usuário for fazer o quiz não dê null
        if(b_usuario) b_usuario.innerHTML = nome;
        if(c_usuario) c_usuario.innerHTML = cpf;
        if(d_usuario) d_usuario.innerHTML = religiao;
        

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

