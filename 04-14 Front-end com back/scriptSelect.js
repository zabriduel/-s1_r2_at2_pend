const url = "http://localhost:8000/produtos";


async function fetchProducts() {
    try {
        const res = await fetch("http://localhost:8000/produtos");
        const data = await res.json();

        renderProducts(data.produtos);

    } catch (error) {
        console.log(error);
    }
}

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

function renderProducts(produtos) {
    const container = document.getElementById("produtosContainer");

    container.innerHTML = "";

    produtos.forEach(prod => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="http://localhost:8000/images/${prod.vinculoImagem}">
            <h3>${prod.nomeProduto}</h3>
            <p>R$ ${prod.valorProduto}</p>
            <p>Categoria: ${prod.nomeCategoria}</p>

            <div class="card-actions">
                <button class="btn-edit" data-id="${prod.idProduto}">Editar</button>
                <button class="btn-delete" data-id="${prod.idProduto}">Excluir</button>
            </div>
        `;

        container.appendChild(card);
    });

    addCardEvents();
}

window.addEventListener("DOMContentLoaded", fetchProducts);

async function updateProduct() {
    try {
        const res = await fetch(`${url}?idProduto=4&idCategoria=1`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({ idnomeProd: "Notebook Gamer RTX 4060", valor: 5999.99, image: "arquivo" })


        });
        const data = await res.json();
        console.log(data);


    } catch (error) {
        console.log(error);

    }
}

async function deleteProduct() {
    try {
        const res = fetch(`${url}?idProduto=4`, {
            method: "DELETE",

        });
        const data = (await res).json();
        console.log(data);


    } catch (error) {
        console.log(error);

    }
}

function addCardEvents() {
    document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            deleteProduct(id);
        });
    });

    document.querySelectorAll(".btn-edit").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            goToEditPage(id);
        });
    });
}

btnGet.addEventListener("click", (event) => {
    event.preventDefault();
    fetchProducts();
})

document.getElementById("post").addEventListener("click", () => {
    sendRequest("POST");
});

btnPut.addEventListener("click", (event) => {
    event.preventDefault();
    updateProduct();

})

btnDelete.addEventListener("click", (event) => {
    event.preventDefault();
    deleteProduct();

})

fetchProducts();