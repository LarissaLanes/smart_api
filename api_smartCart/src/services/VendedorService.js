const db = require('../db');

module.exports = {
    criarConta: (razao_social, nome_fantasia, email, senha, cnpj, comissao) => {
        return new Promise((resolve, reject) => {
            // Verificar se o CNPJ já está em uso
            db.query('SELECT * FROM vendedor WHERE cnpj = ?', [cnpj], (cnpjError, cnpjResult) => {
                if (cnpjError) {
                    reject({ message: 'Erro ao verificar CNPJ.' });
                } else {
                    if (cnpjResult.length > 0) {
                        reject({ message: 'Este CNPJ já está em uso.' });
                    } else {
                        // Se o CNPJ estiver disponível, prosseguir com a criação da conta
                        // Verificar a força da senha (pelo menos 8 caracteres)
                        if (senha.length < 8) {
                            reject({ message: 'A senha deve ter pelo menos 8 caracteres.' });
                        } else {
                            // Inserir o vendedor no banco de dados
                            db.query('INSERT INTO vendedor (razao_social, nome_fantasia, email, senha, cnpj, comissao) VALUES (?, ?, ?, ?, ?, ?)', [razao_social, nome_fantasia, email, senha, cnpj, comissao], (error, result) => {
                                if (error) {
                                    reject({ message: 'Erro ao criar a conta do vendedor.' });
                                } else {
                                    resolve(result.insertId);
                                }
                            });
                        }
                    }
                }
            });
        });
    },

    fazerLogin: (cnpj, senha) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM vendedor WHERE cnpj = ? AND senha = ?', [cnpj, senha], (error, result) => {
                if (error) {
                    reject({ message: 'Erro ao realizar o login.' });
                } else {
                    if (result.length > 0) {
                        resolve(result[0]);
                    } else {
                        resolve(null); // Credenciais inválidas
                    }
                }
            });
        });
    }
};
