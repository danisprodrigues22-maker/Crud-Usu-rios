const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function perguntar(texto, callback) {
    rl.question(texto, (resposta) => {
        callback(resposta);
    });
}


function acharIndicePorID(id) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === id) {
            return i;
        }
    }
    return -1;
}

let usuarios = [];
let proximoId = 1;

function mostrarMenu(){
    console.log("");
    console.log("     CRUD USUÁRIOS");
    console.log("");
    console.log("1) CADASTRAR USUÁRIO");
    console.log("2) LISTAR USUÁRIOS");
    console.log("3) VISUALIZAR USUÁRIO (POR ID)");
    console.log("4) EDITAR USUÁRIO");
    console.log("5) DELETAR USUÁRIO");
    console.log("0) SAIR");
    console.log("");
}

function cadastrarUsuario() {
    console.log("\nCadastrar Usuário");

    perguntar("Nome: ", (nome) => {

                    nome = nome.trim();

                    if (!nome) {
                        console.log("ERRO: Preencha todos os campos.");
                        return menu();
                    }

                    const usuario = {
                        id: proximoId,
                        nome: nome,
                    };

                    usuarios.push(usuario);
                    proximoId++;

                    console.log("Usuário cadastrado com sucesso! ID:", usuario.id);
                    menu();


    });
}

function listarUsuario() {
    console.log("\nLISTA DE USUÁRIOS");

    if (usuarios.length === 0) {
        console.log("Nenhum usuário cadastrado.");
        return menu();
    }

    for (let i = 0; i < usuarios.length; i++) {
        const c = usuarios[i];
        console.log(
            `ID: ${c.id} | Nome: ${c.nome}`
        );
    }
    menu();
}

function visualizarUsuario() {
    perguntar("Digite o ID do usuário: ", (idStr) => {
        const id = +idStr;

        if (Number.isNaN(id)) {
            console.log("Erro: ID inválido.");
            return menu();
        }

        const pos = acharIndicePorID(id);
        if (pos === -1) {
            console.log("Usuário não encontrado.");
            return menu();
        }

        const c = usuarios[pos];
        console.log(
            `ID: ${c.id} | Nome: ${c.nome}`
        );
        menu();
    });
}

function editarUsuario() {
    perguntar("Informe o ID do usuário: ", (idStr) => {
        const id = +idStr;

        if (Number.isNaN(id)) {
            console.log("Erro: ID inválido.");
            return menu();
        }

        const pos = acharIndicePorID(id);
        if (pos === -1) {
            console.log("Usuário não encontrado.");
            return menu();
        }

        const usuario = usuarios[pos];

        perguntar(`Nome [${usuario.nome}]: `, (novoNome) => {


                        novoNome = novoNome.trim();

                        if (novoNome) usuario.nome = novoNome;

                        console.log("Usuário editado com sucesso!");
                        menu();
                    });

    });
}

function deletarUsuario() {
    perguntar("Digite o ID do usuário: ", (idStr) => {
        const id = +idStr;

        if (Number.isNaN(id)) {
            console.log("Erro: ID inválido.");
            return menu();
        }

        const pos = acharIndicePorID(id);
        if (pos === -1) {
            console.log("Usuário não encontrado.");
            return menu();
        }

        usuarios.splice(pos, 1);
        console.log("Usuário deletado com sucesso.");
        menu();
    });
}


function menu(){
    mostrarMenu();
    perguntar("Escolha uma opção: ", (opcao) => {
        opcao = opcao.trim();

        switch (opcao){
            case "1": return cadastrarUsuario();
            case "2": return listarUsuario();
            case "3": return visualizarUsuario();
            case "4": return editarUsuario();
            case "5": return deletarUsuario();
            case "0":
                console.log("Saindo...");
                rl.close();
                return;
            default:
                console.log("Opção inválida!");
                return menu();
        }
    })
}

menu();