const API_URL = "http://localhost:8000";

const urlParams = new URLSearchParams(window.location.search);
const editId = urlParams.get("id");
const isEditing = !!editId;


async function carregarCategorias() {
    try {
        const res = await fetch(`${API_URL}/categorias`);
        const data = await res.json();

        const select = document.getElementById("fCategoria");
        select.innerHTML = "";

        data.categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.idCategoria;
            option.textContent = cat.nomeCategoria;
            select.appendChild(option);
        });

        if (isEditing) {
            carregarProduto();
        }

    } catch (error) {
        console.log("Erro ao carregar categorias:", error);
    }
}


async function carregarProduto() {
    try {
        const res = await fetch(`${API_URL}/produtos?idProduto=${editId}`);
        const data = await res.json();

        const prod = data.produto ?? data.produtos?.[0];
        if (!prod) return;

        document.getElementById("fNomeProd").value = prod.nomeProduto;
        document.getElementById("fValor").value = prod.valorProduto;
        document.getElementById("fCategoria").value = prod.idCategoria;

    } catch (error) {
        console.log("Erro ao carregar produto:", error);
    }
}


function getFormData() {
    return {
        nome: document.getElementById("fNomeProd").value,
        valor: document.getElementById("fValor").value,
        categoria: document.getElementById("fCategoria").value,
        imagem: document.getElementById("imagem").files[0]
    };
}


async function salvarProduto(e) {
    e.preventDefault(); 
    const data = getFormData();

    const formData = new FormData();
    formData.append("nomeProd", data.nome);
    formData.append("valor", data.valor);
    formData.append("idCategoria", data.categoria);

    if (data.imagem) {
        formData.append("image", data.imagem);
    }

    let endpoint = `${API_URL}/produtos`;
    let method = "POST";

    if (isEditing) {
        endpoint = `${endpoint}?idProduto=${editId}&idCategoria=${data.categoria}`;
        method = "PATCH";
    }

    try {
        const res = await fetch(endpoint, {
            method,
            body: formData
        });

        const result = await res.json();
        console.log(result);

        window.location.href = "index.html";

    } catch (error) {
        console.log("Erro ao salvar:", error);
    }
}


window.addEventListener("DOMContentLoaded", () => {
    carregarCategorias();

    const form = document.getElementById("formProduto");
    form.addEventListener("submit", salvarProduto);

    const titulo = document.getElementById("titulo");

    if (isEditing && titulo) {
        titulo.textContent = "Editar Produto";
    }
});