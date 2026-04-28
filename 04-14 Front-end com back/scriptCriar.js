const btnPost = document.querySelector("#post");
const url = "http://localhost:8000/produtos";



async function fetchCategorias() {
    try {
        const res = await fetch("http://localhost:8000/categorias");
        const data = await res.json();
        console.log(data.categorias);



        const select = document.getElementById("fCategoria");

        select.innerHTML = "";

        data.categorias.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.idCategoria;
            option.textContent = cat.nomeCategoria;

            select.appendChild(option);
        });

    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    fetchCategorias();
});

function getFormData() {
    const nomeProd = document.getElementById('fNomeProd').value;
    const valor = document.getElementById('fValor').value;
    const idCategoria = document.getElementById('fCategoria').value;
    const imagem = document.getElementById('imagem').files[0];
    return { nomeProd, valor, idCategoria, imagem };
}

async function sendRequest(method) {
    const data = getFormData();

    const formData = new FormData();
    formData.append("nomeProd", data.nomeProd);
    formData.append("valor", data.valor);
    formData.append("idCategoria", data.idCategoria);
    formData.append("image", data.imagem);

    try {
        const res = await fetch("http://localhost:8000/produtos", {

            method: method,
            body: method === "GET" || method === "DELETE" ? null : formData
        });

        const result = await res.json();
        console.log(result);

    } catch (error) {
        console.log(error);
    }
}


document.getElementById("post").addEventListener("click", () => {
    sendRequest("POST");
});
