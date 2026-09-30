// ============================================
// CARDÁPIO — Filtros e Botão Voltar ao Topo
// ============================================

// ---------- FILTRO DE CATEGORIAS ----------
const botoesFiltro = document.querySelectorAll('.filtro-btn');
const categorias = document.querySelectorAll('.menu-categoria');
const containerCategorias = document.querySelector('.menu-categorias');

botoesFiltro.forEach(botao => {
    botao.addEventListener('click', () => {
        // Destaca o botão clicado
        botoesFiltro.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');

        const selecionada = botao.dataset.categoria;

        // Mostra ou esconde cada categoria
        categorias.forEach(categoria => {
            const mostrar = selecionada === 'todos' || categoria.dataset.categoria === selecionada;
            categoria.style.display = mostrar ? '' : 'none';
        });

        // Com apenas 1 categoria visível, centraliza em coluna única
        containerCategorias.classList.toggle('filtro-unico', selecionada !== 'todos');
    });
});

// ---------- BOTÃO VOLTAR AO TOPO ----------
const botaoTopo = document.getElementById('botao-topo');

// O botão só aparece depois de rolar 400px
window.addEventListener('scroll', () => {
    botaoTopo.classList.toggle('visivel', window.scrollY > 400);
});

botaoTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});