listarPessoas()
let inputNome = document.querySelector("#criNome")
let inputDNas = document.querySelector("#criDtNasc")
let inputTrel = document.querySelector("#tipoRelacionamento")
let addButton = document.querySelector("#criBtnSalvar")

// Ao clicar no botão Salvar
addButton.addEventListener('click', function () {
    criarPessoa(inputNome.value, inputDNas.value, inputTrel.value);

});

// Função para criar um registro no Firebases
function criarPessoa (inputNome, inputDNas, inputTrel) {
    let data = {
        nome:    inputNome,
        dtnasc:  inputDNas,
        tiporel: inputTrel,
        pontos:  0
    };

    // Incluir nova Pessoa na Realtime database do Firebase
    return pessoaRef.push(data);
}





//listarPessoas

function listarPessoas() {
    const userListUI = document.getElementById("listaPessoas");

    pessoaRef.on("value", snap => {

        userListUI.innerHTML = ""

        snap.forEach(childSnap => {

            let chave = childSnap.key,
                dados = childSnap.val()
            
            let $li = document.createElement("tr");

            // edit icon
            let editIconUI = document.createElement("td");
            editIconUI.innerHTML = ' <a class="link" data-bs-whatever="'+ dados.nome + '|' 
                                   + chave + '" data-bs-toggle="modal" data-bs-target="#editarPessoa"> ✏️ </a>';  

            // delete icon
            let deleteIconUI = document.createElement("td");
            deleteIconUI.innerHTML = '🗑️';
            deleteIconUI.setAttribute("pid", chave);
            deleteIconUI.addEventListener("click", deleteButtonClicked)

            let pontosLinkUI = document.createElement("span");
            pontosLinkUI.innerHTML  = 
            '<td><a class="link" data-bs-whatever="'+ dados.nome + '|' + chave +

            '" data-bs-toggle="modal" data-bs-target="#pontuarPessoa" >'+ parseInt (dados.pontos) + "</a></td>"
            pontosLinkUI.setAttribute("pid", chave);

            $li.innerHTML =       "<td>" + dados.nome    + "</td>" +
                                  "<td>" + dados.dtnasc  + "</td>" +
                                  "<td>" + dados.tiporel + "</td>" ;
            
            $li.append(pontosLinkUI);
            $li.append(editIconUI);
            $li.append(deleteIconUI);

            userListUI.append($li);

        });
    })

};






// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {
    e.stopPropagation();

    let userID = e.target.getAttribute("pid");
    const pIdRef = dbRef.child('pessoas/' + userID);
    
    pIdRef.remove();
}


//pontos

let pontosModal = document.querySelector("#pontuarPessoa")

pontosModal.addEventListener('show.bs.modal', function(event){
    let modalEv = event.relatedTarget
    let dados = modalEv.getAttribute('data-bs-whatever')
    let dadosPessoa = dados.split("|")

    pontosModal.querySelector(".modal-title").textContent = dadosPessoa[0]
    pontosModal.querySelector("#chavePessoa").value = dadosPessoa[1]
})


let btnSalvarPontos = document.querySelector("#btnSalvarPontos")

btnSalvarPontos.addEventListener('click', function(){
    let totalRange = document.querySelectorAll(".pontos")
    let totalPontos = 0

    for (let i=0, len=totalRange.length; i<len;i++){
        totalPontos += parseInt(totalRange[i].value)
    }
    alert(totalPontos)
    let userID = pontosModal.querySelector("#chavePessoa").value;  
    const pIdRef = dbRef.child('pessoas/' + userID);    
    pIdRef.update({pontos: totalPontos});

})