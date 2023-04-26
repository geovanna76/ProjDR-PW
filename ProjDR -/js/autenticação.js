// pegando os buttons
var authEmailPassButton = document.getElementById('entrarEmail/senha');
var createUserButton = document.getElementById('novoUsuario');
var logOutButton = document.getElementById('logout');



// pegando os inputs do email e da senha
var email = document.getElementById('email');
var senha = document.getElementById('senha');

// Displays
var displayName = document.getElementById('displayName');


// Criar novo usuário
createUserButton.addEventListener('click', function () { //button criar novo usuario
    firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, senha.value) 
        .then(function () {
            alert('Bem vindo ' + email.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao cadastrar, verifique o erro no console.')
        });
});

// Autenticar com E-mail e Senha
authEmailPassButton.addEventListener('click', function () {
    firebase
        .auth()
        .signInWithEmailAndPassword(email.value, senha.value)
        .then(function (result) {
            console.log(result);
            displayName.innerText = 'Bem vindo, ' + email.value;
            alert('Autenticado ' + email.value);
        })
        .catch(function (error) {
            console.error(error.code);
            console.error(error.message);
            alert('Falha ao autenticar, verifique o erro no console.')
        });
});

// Logout
logOutButton.addEventListener('click', function () {
    firebase
        .auth()
        .signOut()
        .then(function () {
            displayName.innerText = 'Você não está autenticado';
            alert('Você se deslogou');
        }, function (error) {
            console.error(error);
        });
});



function signIn(provider) {
    firebase.auth()
        .signInWithPopup(provider)
        .then(function (result) {
            console.log(result);
            var token = result.credential.accessToken;
            displayName.innerText = 'Bem vindo, ' + result.user.displayName;
        }).catch(function (error) {
            console.log(error);
            alert('Falha na autenticação');
        });
}






///
