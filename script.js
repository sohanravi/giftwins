// Gift card reveal logic (4 cards) — clicking any card opens the supplied external link immediately
(function(){
  const cards = Array.from(document.querySelectorAll('.gift-card'));
  const overlay = document.getElementById('resultOverlay');
  const overlayEmoji = document.getElementById('overlayEmoji');
  const overlayTitle = document.getElementById('overlayTitle');
  const overlayText = document.getElementById('overlayText');
  const tryAgainBtn = document.getElementById('tryAgain');
  const adModal = document.getElementById('adModal');
  const adFrame = document.getElementById('adFrame');
  const adClose = document.getElementById('adClose');

  const AD_URL = 'https://www.effectivegatecpm.com/sbhncqac?key=bbd855d2cd16a6e3f57d4e84c43f39d5';

  let locked = false;

  function playBeep(type){
    try{
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      if(type === 'win'){ o.frequency.value = 880; g.gain.value = 0.08; }
      else { o.frequency.value = 220; g.gain.value = 0.04; }
      o.connect(g); g.connect(ctx.destination);
      o.start();
      const now = ctx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      o.stop(now + 0.19);
    }catch(e){/* ignore */}
  }

  function doConfetti(){ if(window.confetti) confetti({particleCount:120,spread:110,origin:{y:0.4}}); }

  function showOverlay(isWin){
    overlay.classList.add('visible');
    overlay.setAttribute('aria-hidden','false');
    if(isWin){ overlayEmoji.textContent = '🎉'; overlayTitle.textContent = 'Congratulations! You found the bitcoin gift'; overlayText.textContent = 'You won! 🎊'; }
    else { overlayEmoji.textContent = '😞'; overlayTitle.textContent = "Sorry — you don't won bitcoin"; overlayText.textContent = 'Try again to find the bitcoin gift.'; }
  }

  function resetBoard(){
    locked = false;
    overlay.classList.remove('visible');
    overlay.setAttribute('aria-hidden','true');
    cards.forEach(c=> c.classList.remove('revealed','disabled'));
  }

  function revealAfterAd(idx){
    // Always a loss per current project requirement
    playBeep('lose');
    showOverlay(false);
  }

  function openAdThenReveal(idx, btn){
    // Try opening in new tab/window
    let newWin = null;
    try{ newWin = window.open(AD_URL, '_blank'); }catch(e){ newWin = null; }

    if(newWin){
      // Poll until user closes the tab/window
      const check = setInterval(()=>{
        try{ if(newWin.closed){ clearInterval(check); revealAfterAd(idx); } }
        catch(e){ /* ignore cross-origin */ }
      }, 500);
    } else {
      // Popup blocked — fallback to in-page modal iframe
      adFrame.src = AD_URL;
      adModal.classList.add('visible');
      adModal.setAttribute('aria-hidden','false');

      const cleanup = ()=>{
        adModal.classList.remove('visible');
        adModal.setAttribute('aria-hidden','true');
        adFrame.src = 'about:blank';
        revealAfterAd(idx);
      };

      adClose.addEventListener('click', cleanup, {once:true});
      setTimeout(()=>{ if(adModal.classList.contains('visible')) cleanup(); }, 20000);
    }
  }

  function onCardClick(e){
    if(locked) return;
    const btn = e.currentTarget;
    const idx = Number(btn.dataset.index);
    if(btn.classList.contains('revealed')) return;
    // mark visual reveal and disable others
    btn.classList.add('revealed');
    cards.forEach((c,i)=>{ if(i!==idx) c.classList.add('disabled'); });
    locked = true;
    openAdThenReveal(idx, btn);
  }

  // attach listeners
  cards.forEach(c=> c.addEventListener('click', onCardClick));
  tryAgainBtn && tryAgainBtn.addEventListener('click', resetBoard);

})();
        }catch(e){ /* ignore cross-origin access errors */ }
