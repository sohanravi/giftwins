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
    // mark card as revealed visually (will show after ad)
    btn.classList.add('revealed');
    // mark others disabled while ad plays
    cards.forEach((c,i)=>{ if(i!==idx) c.classList.add('disabled'); });
    locked = true;

    // Try to open the ad URL in a new tab (user-initiated). If popup is blocked, fall back to modal iframe.
    const adUrl = 'https://www.effectivegatecpm.com/sbhncqac?key=bbd855d2cd16a6e3f57d4e84c43f39d5';
    let newWin = null;
    try{
      newWin = window.open(adUrl, '_blank');
    }catch(e){ newWin = null; }

    const revealAfterAd = ()=>{
      const isWin = idx === winner;
      if(isWin){ playBeep('win'); doConfetti(); showOverlay(true); }
      else { playBeep('lose'); showOverlay(false); }
    };

    if(newWin){
      // Poll for the window to be closed
      const check = setInterval(()=>{
        try{
          if(newWin.closed){ clearInterval(check); revealAfterAd(); }
        }catch(e){ /* ignore cross-origin access errors */ }
      }, 500);
    } else {
      // Popup likely blocked — fall back to modal iframe
      const adModal = document.getElementById('adModal');
      const adFrame = document.getElementById('adFrame');
      const adClose = document.getElementById('adClose');

      // load URL into iframe (may be blocked by X-Frame-Options on remote site)
      adFrame.src = adUrl;
      adModal.classList.add('visible');
      adModal.setAttribute('aria-hidden', 'false');

      const cleanup = ()=>{
        adModal.classList.remove('visible');
        adModal.setAttribute('aria-hidden', 'true');
        adFrame.src = 'about:blank';
        revealAfterAd();
      };

      adClose.addEventListener('click', cleanup, {once:true});
      // safety fallback auto-close after 20s
      setTimeout(()=>{ if(adModal.classList.contains('visible')) cleanup(); }, 20000);
    }
