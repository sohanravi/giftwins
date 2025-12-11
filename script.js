// Gift card reveal logic (6 cards)
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
// Spin & Win logic
(function(){
  const wheel = document.getElementById('wheel');
  const spinNowBtn = document.getElementById('spinNowBtn');
  const resultCard = document.getElementById('resultCard');
  const messageEl = document.getElementById('message');
  const subMessageEl = document.getElementById('subMessage');
  const spinsLeftEl = document.getElementById('spinsLeft');
  const resultEmoji = document.getElementById('resultEmoji');

  const segmentAngles = [315,45,135,225]; // centers for segments 0..3
  const easing = 'cubic-bezier(0.16,0.84,0.41,1)';
  const spinDuration = 4000; // ms

  let spinsLeft = parseInt(localStorage.getItem('spinsLeft') || '10', 10);
  let firstSpinDone = localStorage.getItem('firstSpinDone') === '1';
  let currentRotation = 0;
  let spinning = false;

  function updateUI(){
    spinsLeftEl.textContent = spinsLeft;
    if(spinsLeft <= 0){
      if(spinNowBtn) spinNowBtn.disabled = true;
      messageEl.textContent = 'No spins left';
      subMessageEl.textContent = 'Come back later!';
    }
    else {
      if(spinNowBtn) spinNowBtn.disabled = false;
    }
  }

  function computeRotationFor(segmentIndex){
    const baseRot = 360 * (5 + Math.random() * 2); // 5-7 full rotations
    const targetAngle = segmentAngles[segmentIndex % segmentAngles.length];
    const jitter = (Math.random() - 0.5) * 12; // +/-6° jitter
    const final = baseRot + (360 - targetAngle) + jitter;
    return final;
  }

  function playBeep(type){
    try{
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      if(type === 'win'){
        o.frequency.value = 880;
        g.gain.value = 0.06;
      } else {
        o.frequency.value = 220;
        g.gain.value = 0.04;
      }
      o.connect(g); g.connect(ctx.destination);
      o.start();
      const now = ctx.currentTime;
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
      o.stop(now + 0.19);
    }catch(e){/* ignore audio errors */}
  }

  function doConfetti(){
    if(window.confetti){
      confetti({particleCount:80,spread:100,origin:{y:0.4}});
    }
  }

  function showResult(isWin){
    resultCard.classList.add('visible');
    if(isWin){
      resultEmoji.textContent = '🎉';
      messageEl.textContent = 'Congratulations! You win 1 dollar 🎉';
      subMessageEl.textContent = '';
    } else {
      resultEmoji.textContent = '🍀';
      messageEl.textContent = 'Sorry — Best of luck next time 🍀';
      subMessageEl.textContent = 'Better luck next spin!';
    }
  }

  function startSpin(){
    if(spinning) return;
    if(spinsLeft <= 0) return;

    spinning = true;
    if(spinNowBtn) spinNowBtn.disabled = true;
    resultCard.classList.remove('visible');
    wheel.classList.add('spinning');

    // Determine target segment per rules
    let targetIndex;
    if(!firstSpinDone){
      targetIndex = 1; // segment #2 (BTC up to $1000)
    } else {
      targetIndex = 3; // segment #4 (Best of next time)
    }

    const rot = computeRotationFor(targetIndex);
    currentRotation = (currentRotation + rot) % 360000; // keep number manageable
    wheel.style.transition = `transform ${spinDuration}ms ${easing}`;
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // end of spin
    setTimeout(()=>{
      spinning = false;
      wheel.classList.remove('spinning');
      // play sound + confetti according to first spin
      if(!firstSpinDone){
        playBeep('win');
        doConfetti();
        showResult(true);
        localStorage.setItem('firstSpinDone','1');
        firstSpinDone = true;
      } else {
        playBeep('lose');
        showResult(false);
      }

      spinsLeft = Math.max(0, spinsLeft - 1);
      localStorage.setItem('spinsLeft', String(spinsLeft));
      updateUI();

      // update Spin Now button text/disabled state
      if(spinNowBtn){
        spinNowBtn.textContent = spinsLeft > 0 ? 'Spin Again' : 'No Spins Left';
        spinNowBtn.disabled = spinsLeft <= 0;
      }
    }, spinDuration + 40);
  }

  // events
  if(spinNowBtn) spinNowBtn.addEventListener('click', startSpin);

  // init
  updateUI();
  // ensure localStorage initial value exists
  if(!localStorage.getItem('spinsLeft')) localStorage.setItem('spinsLeft', String(spinsLeft));
})();
