const db = require('../db');

module.exports = {
    criarConta: (nome, cpf, email, senha) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO cliente (nome, cpf, email, senha) VALUES (?, ?, ?, ?)', [nome, cpf, email, senha], (error, result) => {
                if(error) {
                    reject(error);
                } else {
                    resolve({ id: result.insertId, nome, cpf, email });
                }
            });
        });
    },

    fazerLogin: (email, senha) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM cliente WHERE email = ? AND senha = ?', [email, senha], (error, result) => {
                if(error) {
                    reject(error);
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
