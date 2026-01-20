const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

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

