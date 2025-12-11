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

    // Show ad in an in-page modal iframe (reliable vs popup blockers)
    const adModal = document.getElementById('adModal');
    const adFrame = document.getElementById('adFrame');
    const adClose = document.getElementById('adClose');

    // build iframe srcdoc with the ad script and a close button that notifies parent
    const adSrc = `<!doctype html><html><head><meta charset="utf-8"><title>Ad</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;height:100vh;background:#000;color:#fff;"><div id="ad-root" style="flex:1;display:flex;align-items:center;justify-content:center;padding:12px;color:#fff">Loading ad...</div><div style="padding:12px;position:sticky;bottom:0;width:100%;display:flex;justify-content:center;gap:8px;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.2));"><button id="closeBtn" style="padding:10px 16px;border-radius:8px;border:none;background:#ffd966;color:#071017;font-weight:700;">Close Ad</button></div><script src="//pl28237238.effectivegatecpm.com/95/4b/f8/954bf876bea283f4b847ee59e16b63f0.js" type="text/javascript"></script><script>document.getElementById('closeBtn').addEventListener('click',function(){window.parent.postMessage({type:'adClosed'}, '*');});</script></body></html>`;

    // show modal
    adFrame.srcdoc = adSrc;
    adModal.classList.add('visible');
    adModal.setAttribute('aria-hidden', 'false');

    // listener for message from iframe indicating ad closed
    const onMessage = (ev)=>{
      if(!ev.data || ev.data.type !== 'adClosed') return;
      window.removeEventListener('message', onMessage);
      cleanupAdAndReveal();
    };
    window.addEventListener('message', onMessage);

    // also wire the external Close button (outside iframe)
    adClose.addEventListener('click', cleanupAdAndReveal, {once:true});

    // safety timeout: auto-close ad after 20s
    const autoClose = setTimeout(()=>{
      window.removeEventListener('message', onMessage);
      cleanupAdAndReveal();
    }, 20000);

    function cleanupAdAndReveal(){
      clearTimeout(autoClose);
      adModal.classList.remove('visible');
      adModal.setAttribute('aria-hidden', 'true');
      adFrame.srcdoc = '';
      // reveal result
      const isWin = idx === winner;
      if(isWin){
        playBeep('win');
        doConfetti();
        showOverlay(true);
      } else {
        playBeep('lose');
        showOverlay(false);
      }
    }
