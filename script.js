// Gift card reveal logic (4 cards)
(function(){
  const cards = Array.from(document.querySelectorAll('.gift-card'));
  const overlay = document.getElementById('resultOverlay');
  const overlayEmoji = document.getElementById('overlayEmoji');
  const overlayTitle = document.getElementById('overlayTitle');
  const overlayText = document.getElementById('overlayText');
  const tryAgainBtn = document.getElementById('tryAgain');

  let winner = null;
  let locked = false;

  function playBeep(type){
    try{
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      if(type === 'win'){
        o.frequency.value = 880;
        g.gain.value = 0.08;
      } else {
        o.frequency.value = 220;
        g.gain.value = 0.04;
      }
      o.connect(g); g.connect(ctx.destination);
      o.start();
      const now = ctx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      o.stop(now + 0.19);
    }catch(e){/* ignore */}
  }

  function doConfetti(){
    if(window.confetti){
      confetti({particleCount:120,spread:110,origin:{y:0.4}});
    }
  }

  function pickWinner(){
    // Intentionally make there be no winner so every pick is a loss
    winner = -1;
  }

  function resetBoard(){
    locked = false;
    pickWinner();
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden','true');
    cards.forEach(c=> c.classList.remove('revealed','disabled'));
  }

  function showOverlay(isWin){
    overlay.classList.add('visible');
    overlay.setAttribute('aria-hidden','false');
    if(isWin){
      overlayEmoji.textContent = '🎉';
      overlayTitle.textContent = 'Congratulations! You found the bitcoin gift';
      overlayText.textContent = 'You won! 🎊';
    } else {
      overlayEmoji.textContent = '😞';
      overlayTitle.textContent = "Sorry — you don't won bitcoin";
      overlayText.textContent = 'Try again to find the bitcoin gift.';
    }
  }

  function onCardClick(e){
    if(locked) return;
    const btn = e.currentTarget;
    const idx = Number(btn.dataset.index);
    if(btn.classList.contains('revealed')) return;
    btn.classList.add('revealed');
    // reveal logic
    const isWin = idx === winner;
    locked = true;
    // mark others disabled
    cards.forEach((c,i)=>{ if(i!==idx) c.classList.add('disabled'); });

    if(isWin){
      playBeep('win');
      doConfetti();
      showOverlay(true);
    } else {
      playBeep('lose');
      showOverlay(false);
    }
  }

  // wire events
  cards.forEach(c=> c.addEventListener('click', onCardClick));
  tryAgainBtn.addEventListener('click', ()=> resetBoard());

  // initial setup
  resetBoard();
})();
