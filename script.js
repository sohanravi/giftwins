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

    // Open ad in a user-initiated popup and wait for it to close before showing result
    const adHTML = `<!doctype html><html><head><meta charset="utf-8"><title>Ad</title><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#000;color:#fff;"><div id="ad-root"></div><div style="position:fixed;bottom:18px;left:50%;transform:translateX(-50%);"><button id="closeBtn" style="padding:10px 16px;border-radius:8px;border:none;background:#ffd966;color:#071017;font-weight:700;">Close Ad</button></div><script src="//pl28237238.effectivegatecpm.com/95/4b/f8/954bf876bea283f4b847ee59e16b63f0.js" type="text/javascript"></script><script>document.getElementById('closeBtn').addEventListener('click',function(){window.close();});</script></body></html>`;

    let adWin = null;
    try{
      adWin = window.open('', '_blank', 'toolbar=0,location=0,status=0,menubar=0,scrollbars=1,resizable=1,width=520,height=700');
      if(adWin){
        adWin.document.open();
        adWin.document.write(adHTML);
        adWin.document.close();
      }
    }catch(err){ adWin = null; }

    const continueReveal = ()=>{
      const isWin = idx === winner;
      if(isWin){
        playBeep('win');
        doConfetti();
        showOverlay(true);
      } else {
        playBeep('lose');
        showOverlay(false);
      }
    };

    if(adWin){
      // poll for popup close
      const poll = setInterval(()=>{
        if(adWin.closed){
          clearInterval(poll);
          continueReveal();
        }
      }, 500);
    } else {
      // popup blocked or failed — fall back to immediate reveal
      continueReveal();
    }
