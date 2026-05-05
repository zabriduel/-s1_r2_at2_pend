const API_URL = "http://localhost:8000";
let currentId = null;
let categoriasCarregadas = [];

async function editar(id) {
    currentId = id;

    await carregarCategorias();

    try {
        const res = await fetch(`${API_URL}/produtos`);
        const data = await res.json();

        const prod = data.produtos.find(p => p.idProduto == id);

        document.getElementById("eNomeProd").value = prod.nomeProduto;
        document.getElementById("eValor").value = prod.valorProduto;

        const categoriaCorreta = categoriasCarregadas.find(
            cat => cat.nomeCategoria === prod.nomeCategoria
        );
        if (categoriaCorreta) {
            document.getElementById("eCategoria").value = categoriaCorreta.idCategoria;
        }

        document.getElementById("modalOverlay").style.display = "flex";

    } catch (error) {
        console.log("Erro ao abrir modal:", error);
    }
}

async function carregarCategorias() {
    const res = await fetch(`${API_URL}/categorias`);
    const data = await res.json();

    categoriasCarregadas = data.categorias; 

    const select = document.getElementById("eCategoria");
    select.innerHTML = "";

    data.categorias.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat.idCategoria;
        option.textContent = cat.nomeCategoria;
        select.appendChild(option);
    });
}

async function salvarEdicao() {
    const nome = document.getElementById("eNomeProd").value;
    const valor = document.getElementById("eValor").value;
    const categoria = document.getElementById("eCategoria").value;
    const imagem = document.getElementById("eImagem").files[0];

    const formData = new FormData();
    formData.append("nomeProd", nome);
    formData.append("valor", valor);
    formData.append("idCategoria", categoria);
    if (imagem) formData.append("image", imagem);

    try {
        await fetch(
            `${API_URL}/produtos?idProduto=${currentId}&idCategoria=${categoria}`,
            { method: "PATCH", body: formData }
        );

        fecharModal();
        fetchProducts();

    } catch (error) {
        console.log("Erro ao editar:", error);
    }
}

function fecharModal() {
    document.getElementById("modalOverlay").style.display = "none";
    currentId = null;
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnSalvarEdicao").addEventListener("click", salvarEdicao);
    document.getElementById("btnCancelarEdicao").addEventListener("click", fecharModal);
});