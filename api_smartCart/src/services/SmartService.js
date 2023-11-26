const db = require('../db');

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM produto', (error, result) => {
                if(error) {rejeitado(error); return;}
                aceito(result);
            });
        });
    },

    buscarUm: (id) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM produto WHERE id = ?', [id], (error, result) => {
                if(error) {rejeitado(error); return;}
                if(result.length > 0){
                    aceito(result[0]);
                }else{
                    aceito(false);
                }
            });
        });
    },

    criarProduto: (descricao,preco,imagem,status_produto,categoria_id ) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO produto (descricao,preco,imagem,status_produto,categoria_id) VALUES (?,?,?,?,?)', [descricao,preco,imagem,status_produto,categoria_id], (error, result) => {
                if(error) {rejeitado(error); return;}
                aceito(result.insertId);
             
            });
        });
    },

    excluirProduto: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM produto WHERE id = ?', [id], (error, result) => {
                if(error) {rejeitando(error); return;}
                aceito(result);
            });
        });
    }



};