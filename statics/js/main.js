/*Script para gerar botão de login com o google*/
function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential)   
}

window.onload = function () {
    google.accounts.id.initialize({
        client_id: "866736133339-5uasgrmkjnlnd3pqfjnne88rsi3tba72.apps.googleusercontent.com",
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById("buttonDiv"), {
            theme: "outline",
            size: "large",
            type: "standard",
            shape: "pill",
            text: "$ {button.text}",
            locale: "pt-BR",
            logo_alignment: "left"
        } 
    );
    google.accounts.id.prompt();
}


/*Script para gerar botão de login com o facebook*/


  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

/* Script para api viaCEP */

'use strict';

const preencherForm = (endereco) => {
    document.getElementById('logradouro').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('uf').value = endereco.uf;
}

const cepValido = (cep) => cep.length == 8 && eNumero(cep);
const eNumero = (numero) => /^[0-9]+$/.test(numero);

const pesquisarCep = async() => {
    const cep = document.getElementById('cep').value;
    const url = `http://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')) {
            document.getElementById('logradouro').value = 'CEP não encontrado!';
        } else {
            preencherForm(endereco);
        }
    } else {
        document.getElementById('logradouro').value = 'CEP invalido!';
    }

}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);
