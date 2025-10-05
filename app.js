const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsing de dados do formulário
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota Index (Página inicial)
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Início',
        page: 'index'
    });
});

// Rota Produtos
app.get('/produtos', (req, res) => {
    const produtos = [
        { id: 1, nome: 'Produto 1', preco: 'R$ 29,90', descricao: 'Descrição do produto 1' },
        { id: 2, nome: 'Produto 2', preco: 'R$ 49,90', descricao: 'Descrição do produto 2' },
        { id: 3, nome: 'Produto 3', preco: 'R$ 19,90', descricao: 'Descrição do produto 3' },
    ];
    
    res.render('produtos', { 
        title: 'Produtos',
        page: 'produtos',
        produtos: produtos
    });
});

// Rota Blog
app.get('/blog', (req, res) => {
    const posts = [
        { 
            id: 1, 
            titulo: 'Primeiro Post do Blog', 
            data: '01/10/2025',
            resumo: 'Este é o resumo do primeiro post do nosso blog.',
            autor: 'Admin'
        },
        { 
            id: 2, 
            titulo: 'Segundo Post do Blog', 
            data: '03/10/2025',
            resumo: 'Este é o resumo do segundo post com mais informações.',
            autor: 'Editor'
        },
        { 
            id: 3, 
            titulo: 'Terceiro Post do Blog', 
            data: '05/10/2025',
            resumo: 'Mais um post interessante para nossos leitores.',
            autor: 'Redator'
        }
    ];
    
    res.render('blog', { 
        title: 'Blog',
        page: 'blog',
        posts: posts
    });
});

// Rota Contato (GET)
app.get('/contato', (req, res) => {
    res.render('contato', { 
        title: 'Contato',
        page: 'contato',
        message: null
    });
});

// Rota Contato (POST) - para processar o formulário
app.post('/contato', (req, res) => {
    const { nome, email, mensagem } = req.body;
    
    // Aqui você pode processar os dados (salvar no banco, enviar email, etc.)
    console.log('Formulário de contato recebido:', { nome, email, mensagem });
    
    res.render('contato', { 
        title: 'Contato',
        page: 'contato',
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
    });
});

// Middleware para página 404
app.use((req, res) => {
    res.status(404).render('404', { 
        title: 'Página não encontrada',
        page: '404'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📝 Rotas disponíveis:`);
    console.log(`   - GET  /           (Página inicial)`);
    console.log(`   - GET  /produtos   (Lista de produtos)`);
    console.log(`   - GET  /blog       (Posts do blog)`);
    console.log(`   - GET  /contato    (Formulário de contato)`);
    console.log(`   - POST /contato    (Enviar mensagem)`);
});