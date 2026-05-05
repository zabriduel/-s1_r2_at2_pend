# 🛒 Loja do Gabs – Front-end + Back-end

Este projeto é uma aplicação completa de cadastro e gerenciamento de produtos, contendo:

* 🔹 Front-end (HTML, CSS e JavaScript)
* 🔹 Back-end (Node.js + TypeScript)
* 🔹 Integração com API REST
* 🔹 Upload de imagens

---

# 📁 Estrutura do Projeto

```
S1_R2_AT2_PEND/
│
├── Front-end/
│   ├── index.html
│   ├── cadastro.html
│   ├── /css
│   ├── /js
│
└── S1_R3/
    ├── docs/            # Script SQL
    ├── src/             # Código do back-end
    │   └── server.ts    # Arquivo principal
    ├── uploads/         # Imagens enviadas
    ├── package.json
    ├── tsconfig.json
    └── .gitignore
```

---

# 🚀 Como executar o projeto

## 🔧 1. Back-end

```bash
cd S1_R3
npm install
```

### Rodar o servidor:

```bash
npm run dev
```

ou (caso não tenha script):

```bash
npx ts-node src/server.ts
```

O servidor será iniciado em:

```
http://localhost:8000
```

---

## 🗄️ 2. Banco de dados

* Acesse a pasta:

```
S1_R3/docs
```

* Execute o script SQL no seu banco (MySQL, MariaDB, etc.)

---

## 🌐 3. Front-end

Abra o arquivo:

```
Front-end/index.html
```

Ou utilize o Live Server (recomendado).

---

# 🔗 Endpoints da API

## 📦 Produtos

### 🔍 Listar produtos

```
GET /produtos
```

---

### 🔍 Buscar produto por ID

```
GET /produtos?idProduto=1
```

---

### ➕ Criar produto

```
POST /produtos
```

Body (form-data):

```
nomeProd: string
valor: number
idCategoria: number
image: file (opcional)
```

---

### ✏️ Editar produto

```
PATCH /produtos?idProduto=1&idCategoria=1
```

Body (form-data):

```
nomeProd: string
valor: number
idCategoria: number
image: file (opcional)
```

---

### ❌ Deletar produto

```
DELETE /produtos?idProduto=1
```

---

## 📂 Categorias

### 🔍 Listar categorias

```
GET /categorias
```
---

# ⚠️ Observações

* O back-end deve estar rodando para o front-end funcionar
* As imagens são armazenadas na pasta:

```
/uploads
```

* A URL das imagens:

```
http://localhost:8000/images/NOME_DA_IMAGEM
```

---

# 🧠 Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Node.js
* TypeScript
* Express
* Multer (upload de imagens)

---

# 👨‍💻 Autor

Gabriel Pimentel