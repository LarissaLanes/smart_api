const ClienteService = require('../services/ClienteService');

module.exports = {
    criarConta: async (req, res) => {
        let json = {error: '', result:{}};

        let nome = req.body.nome;
        let cpf = req.body.cpf;
        let email = req.body.email;
        let senha = req.body.senha;

        if(nome && cpf && email && senha) {
            try {
                let cliente = await ClienteService.criarConta(nome, cpf, email, senha);
                json.result = {
                    id: cliente.id,
                    nome: cliente.nome,
                    cpf: cliente.cpf,
                    email: cliente.email
                    // Não incluí a senha na resposta por motivos de segurança
                };
                res.json(json);
            } catch (error) {
                json.error = 'Erro ao criar a conta do cliente.';
                res.status(500).json(json);
            }
        } else {
            json.error = 'Campos vazios, por favor, preencha todos os campos.';
            res.status(400).json(json);
        }
    },

    fazerLogin: async (req, res) => {
        let json = {error: '', result:{}};

        let email = req.body.email;
        let senha = req.body.senha;

        if(email && senha) {
            try {
                let cliente = await ClienteService.fazerLogin(email, senha);
                if (cliente) {
                    json.result = {
                        id: cliente.id,
                        nome: cliente.nome,
                        cpf: cliente.cpf,
                        email: cliente.email
                        // Não incluí a senha na resposta por motivos de segurança
                    };
                    res.json(json);
                } else {
                    json.error = 'Credenciais inválidas.';
                    res.status(401).json(json);
                }
            } catch (error) {
                json.error = 'Erro ao realizar o login.';
                res.status(500).json(json);
            }
        } else {
            json.error = 'Campos vazios, por favor, preencha todos os campos.';
            res.status(400).json(json);
        }
    }
};
