const SmartService = require('../services/SmartService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = {error: '', result: []};

        let produtos = await SmartService.buscarTodos();

        for(let i in produtos){
            json.result.push({
                id: produtos[i].id,
                descricao: produtos[i].descricao,
                preco: produtos[i].preco,
                imagem: produtos[i].imagem,
                status_produto: produtos[i].status_produto,
                categoria_id: produtos[i].categoria_id
            });
        }
        res.json(json);
    },

    buscarUm: async (req, res) => {
        let json = {error: '', result:{}};

        let id = req.params.id;
        let produtoId = await SmartService.buscarUm(id);

        if(produtoId){
            json.result = produtoId;
        }
        res.json(json);
    },

    criarProduto: async (req, res) => {
        let json = {error: '', result:{}};

        // info do produto que vou adicionar na minha tabela
        let descricao = req.body.descricao;
        let preco = req.body.preco;
        let imagem = req.body.imagem;
        let status_produto = req.body.status_produto;
        let categoria_id = req.body.categoria_id;


        if(descricao && preco && imagem && status_produto && categoria_id){
            let produtoId = await SmartService.criarProduto(descricao,preco,imagem,status_produto,categoria_id);
            json.result = {
                id: produtoId,
                descricao,
                preco,
                imagem,
                status_produto,
                categoria_id
            };
        }else{
            json.error = 'Campo vazio, por favor preencha o campo'
        }
        res.json(json);
    },

    excluirProduto: async(req, res) => {
        let json = {error: '', result:{}};

        await SmartService.excluirProduto(req.params.id);

        res.json(json);
    }
}

