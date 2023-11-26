const VendedorService = require('../services/VendedorService');

module.exports = {
    criarConta: async (req, res) => {
        let json = { error: '', result: {} };

        let razao_social = req.body.razao_social;
        let nome_fantasia = req.body.nome_fantasia;
        let email = req.body.email;
        let senha = req.body.senha;
        let cnpj = req.body.cnpj;
        let comissao = req.body.comissao;

        if (razao_social && nome_fantasia && email && senha && cnpj && comissao) {
            try {
                let vendedorId = await VendedorService.criarConta(razao_social, nome_fantasia, email, senha, cnpj, comissao);
                json.result = {
                    id: vendedorId,
                    razao_social,
                    nome_fantasia,
                    email,
                    senha,  // Não recomendado em produção, apenas para fins educacionais
                    cnpj,
                    comissao
                };
                json.message = 'Conta de vendedor criada com sucesso.';
                res.json(json);
            } catch (error) {
                json.error = error.message || 'Erro ao criar a conta do vendedor.';
                res.status(500).json(json);
            }
        } else {
            json.error = 'Campo vazio, por favor preencha todos os campos.';
            res.status(400).json(json);
        }
    },

    fazerLogin: async (req, res) => {
        let json = { error: '', result: {} };

        let cnpj = req.body.cnpj;
        let senha = req.body.senha;

        if (cnpj && senha) {
            try {
                let vendedor = await VendedorService.fazerLogin(cnpj, senha);
                if (vendedor) {
                    json.result = {
                        id: vendedor.id,
                        razao_social: vendedor.razao_social,
                        nome_fantasia: vendedor.nome_fantasia,
                        email: vendedor.email,
                        senha,  // Não recomendado em produção, apenas para fins educacionais
                        cnpj: vendedor.cnpj,
                        comissao: vendedor.comissao
                    };
                    json.message = 'Login bem-sucedido.';
                    res.json(json);
                } else {
                    json.error = 'Credenciais inválidas.';
                    json.message = 'Login sem sucesso.';
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
