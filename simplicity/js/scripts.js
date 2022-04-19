console.log("scripts de contato!");

/* JS INICIAL PARA CEP/ENDEREÇO */
const formulario = document.querySelector("form");
const inputCep = formulario.querySelector("#cep");
const inputTelefone = formulario.querySelector("#telefone");
const inputEndereco = formulario.querySelector("#endereco");
const inputBairro = formulario.querySelector("#bairro");
const inputCidade = formulario.querySelector("#cidade");
const inputEstado = formulario.querySelector("#estado");
const bStatus = formulario.querySelector("#status");
const botaoLocalizar = formulario.querySelector("#localizar-cep");

botaoLocalizar.addEventListener("click", function (event) {
    event.preventDefault();
    
    // pegar o cep diitado
    let cep = inputCep.value;

    //CEP no padrão API
    let url = `https://viacep.com.br/ws/${cep}/json/`;

    /* Ajax: comunicação assincrona com ViaCEP usando a função chamada fetch. */

    //1) fazer conexão com a API (ou acessar)
    fetch(url)

        //2) E então, recupere a respota no formato JSON 
        .then(resposta => resposta.json())

        //3) E então, mostre os dados
        .then(dados => {
            if ("erro" in dados) {
                bStatus.innerHTML = "CEP não encontrado!";
                inputCep.focus();
            } else {
                bStatus.innerHTML = "CEP encontrado!";
                inputEndereco.value = dados.logradouro;
                inputBairro.value = dados.bairro;
                inputCidade.value = dados.localidade;
                inputEstado.value = dados.uf;
            }

        })
});

VMasker(inputCep).maskPattern("99999-999");
VMasker(inputTelefone).maskPattern("(99) 9999-9999");

/* contador de caracteres - mensagem */

const spanMaximo = formulario.querySelector("#maximo");
const bCaracteres = formulario.querySelector("#caracteres");
const textMensagem = formulario.querySelector("#mensagem");

//Detereminar a quantidade máxima de caracteres
let quantidade = 100;

//Evento para detectar a digitação (entrada) no campo
textMensagem.addEventListener("input", function(){
    //Capturando o que foi digitado
    let conteudo = textMensagem.value;

    //Criando uma contagem regressiva
    let contagem = quantidade- conteudo.length;

    //Adicionando a contagem ao elemento
    bCaracteres.textContent = contagem;

    if (contagem == 0) {
        bCaracteres.style.color = "red";
        textMensagem.style.boxShadow = "red 0 0 10px"
    } else {
       bCaracteres.style.color = "black";
       textMensagem.style.boxShadow = "black 0 0 10px"
    }
});

//Programação do Formspree
var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Obrigado pelo retorno!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! teve um erro ao enviar, tente novamente mais tarde"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)