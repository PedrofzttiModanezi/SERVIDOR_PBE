// Animações dos Cards
const cards = document.querySelectorAll('.card');
const bannerTitle = document.querySelector('.texto-banner h1');
let animated = false;

// Função para animar os cards
function animateCards() {
    if (!animated) {
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('appear');
            }, index * 250);
        });
        animated = true;
    }
}

// Animar quando o H1 do banner sai da tela
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Quando o H1 NÃO está mais visível (saiu da tela)
        if (!entry.isIntersecting && !animated) {
            animateCards();
        }
    });
}, {
    threshold: 0
});

observer.observe(bannerTitle);
