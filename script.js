// Gift cards - click any to open external link in new tab
(function(){
  const cards = Array.from(document.querySelectorAll('.gift-card'));
  const LINK = 'https://www.effectivegatecpm.com/sbhncqac?key=bbd855d2cd16a6e3f57d4e84c43f39d5';

  function onCardClick(e){
    e.preventDefault();
    window.open(LINK, '_blank');
  }

  cards.forEach(c=> c.addEventListener('click', onCardClick));
})();
