const url = "http://localhost:8000"
let deleteId = null

async function fetchProducts() {
    try {
        const res = await fetch(`${url}/produtos`);
        const data = await res.json();

        renderProducts(data.produtos);

    } catch (error) {
        console.log("Erro ao buscar produtos:", error);
    }
}

function renderProducts(produtos) {
    const container = document.getElementById("produtosContainer");
    container.innerHTML = "";

    produtos.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${url}/images/${prod.vinculoImagem}">
            <h3>${prod.nomeProduto}</h3>
            <p>R$ ${prod.valorProduto}</p>
            <p>${prod.nomeCategoria}</p>

            <button class="btn-edit" onclick="editar(${prod.idProduto})">Editar</button>
            <button class="btn-delete" onclick="abrirDelete(${prod.idProduto})">Excluir</button>
        `;

        container.appendChild(card);
    });
}

function abrirDelete(id) {
    deleteId = id;
    document.getElementById("modalDeleteOverlay").style.display = "flex";
}

function fecharDelete() {
    deleteId = null;
    document.getElementById("modalDeleteOverlay").style.display = "none";
}

async function confirmarDelete() {
    try {
        await fetch(`${url}/produtos?idProduto=${deleteId}`, {
            method: "DELETE"
        });

        fecharDelete();
        fetchProducts();

    } catch (error) {
        console.log("Erro ao deletar:", error);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    fetchProducts();

    document.getElementById("btnConfirmarDelete")
        .addEventListener("click", confirmarDelete);

    document.getElementById("btnCancelarDelete")
        .addEventListener("click", fecharDelete);
});