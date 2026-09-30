import express from "express";
import dados from "../data/cardapio.js";

const router = express.Router();

function verificarItemExiste(req, res, next) {
const { id } = req.params;
const index = dados.findIndex((item) => item.id == id);

if (index == -1) {
    return res.status(404).json({ error: "Item não encontrado" });
}

req.id = id;
req.index = index;

return next ();
}

//rota GET
router.get('/', (req, res) => {
    res.json(dados);
});

//rota POST
router.post('/', (req, res) => {
    const { id, nome, descricao, preco, imagem } = req.body;

    //validação dos dados recebidos
    if (!id || !nome || !descricao || !preco || !imagem) {
        return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    //verificar se o id já existe
    const existeItem = dados.find((item) => item.id == id);
    if (existeItem) {
        return res.status(400).json({ error: "cadastro já existente" });
    }

    //adicionar o novo item
    const novoItem = {
        id: Number(id),
        nome,
        descricao,
        preco: Number(preco),
        imagem
    };

    dados.push(novoItem);

    res.status(201).json({ message: "Item adicionado com sucesso" });
});

//rota PUT
router.put('/:id', verificarItemExiste, (req, res) => {
    const { nome, descricao, preco, imagem } = req.body;
    const index = req.index;

    dados[index] = {
        ...dados[index],
        nome: nome !== undefined ? nome : dados[index].nome,
        descricao: descricao !== undefined ? descricao : dados[index].descricao,
        preco: preco !== undefined ? Number(preco) : dados[index].preco,
        imagem: imagem !== undefined ? imagem : dados[index].imagem
    };
    res.status(200).json({ message: "Item atualizado com sucesso" });
});

// rota DELETE
router.delete('/:id', verificarItemExiste, (req, res) => {
    const index = req.index;
    const id = req.id;

    dados.splice(index, 1);

    res.status(200).json({ message: `Item com id ${id} removido com sucesso!` });
});

export default router;