/*--- Seleciona o botão de envio e adiciona um callback chamando a função treePositionForward assim que o botão é clicado ---*/
let submit = document.querySelector("#submit");
submit.addEventListener('click', () => treePositionForward(document.querySelector('#entrada').value));

/*--- Função  que codifica a mensagem de entrada adicionando 3 ao código ASCII de cada caractere imprimível ---*/
function treePositionForward(msgInput) {
  let newStr = "";

  for (let i = 0; i < msgInput.length; i++) {
    let order;
    if (msgInput[i] != " " && ((msgInput.charCodeAt(i) >= 65 && msgInput.charCodeAt(i) <= 90) || (msgInput.charCodeAt(i) >= 97 && msgInput.charCodeAt(i) <= 122))) {
      //verificando se é espaço em branco
      order = msgInput.charCodeAt(i) + 3 >= 32 && msgInput.charCodeAt(i) + 3 <= 126 ? msgInput.charCodeAt(i) + 3 : 32;
    }else{
      order = msgInput.charCodeAt(i);
    }
    newStr += String.fromCharCode(order);
  }
  /*--- Inverte a linha codificada e chama a função shiftLeft com a string invertida como argumento ---*/
  resultado = invertLine(newStr);
  shiftLeft(resultado);

};


/*---Função que inverte uma string ---*/
function invertLine(msg) {
  return msg.split("").reverse().join("");
}


/*--- Função que desloca os caracteres a partir da metade para a esquerda ---*/
function shiftLeft(texto) {
  let halfText = Math.floor(texto.length / 2);
  let shiftedStr = "";
  for (let i = 0; i < texto.length; i++) {
    let cod = texto.charCodeAt(i);
    if (i >= halfText) {
      cod -= 1;
    }
    if (cod >= 32 && cod <= 126) {
      shiftedStr += String.fromCharCode(cod);
    } else {
      shiftedStr += String.fromCharCode(32);
    }
  }

  /*--- Exibe o resultado em uma animação de digitação e oculta o loader após 1,5 segundos ---*/
  loader(shiftedStr);
}

/*--- Função que escreve o resultado da decodificação no campo de resultado, com animação de digitação ---*/
function writeResult(resultado) {
  new TypeIt("#resultado", {
    strings: `<span class="result">${resultado}</span>`,
    speed: 85
  }).go();
}

/*--- Função para exibir o loader, onde remove o resultado anterior (se houver) e chama a função writeResult após 1,5 segundos ---*/
function loader(resultado) {
  removeAnteriorMsg();
  document.querySelector(".custom-loader").style = "display: block";
  setTimeout(() => { document.querySelector(".custom-loader").style = "display: none" }, 1500);
  setTimeout(() => writeResult(resultado), 1500);
}

/*--- Função que remove o resultado anterior (se houver) ---*/
function removeAnteriorMsg() {
  if (document.querySelector(".result")) {
    document.querySelector(".result").remove();
  }
}
