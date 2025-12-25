
// JEE Mains page specific JS
document.addEventListener('DOMContentLoaded', function() {
const class11Card = document.getElementById('class11Card');
const class12Card = document.getElementById('class12Card');
const subjectGrid = document.getElementById('subjectGrid');
const jeeClassGrid = document.getElementById('jeeClassGrid');

// Add click and keyboard event listeners for Class 11 and Class 12 cards
class11Card.addEventListener('click', function() {
	showSubjects('Class 11');
});
class11Card.addEventListener('keydown', function(e) {
	if (e.key === 'Enter' || e.key === ' ') {
		showSubjects('Class 11');
	}
});
class12Card.addEventListener('click', function() {
	showSubjects('Class 12');
});
class12Card.addEventListener('keydown', function(e) {
	if (e.key === 'Enter' || e.key === ' ') {
		showSubjects('Class 12');
	}
});

	function showSubjects(className) {
		subjectGrid.innerHTML = '';
		const subjects = ['Physics', 'Chemistry', 'Math'];
		subjects.forEach(subj => {
			const div = document.createElement('div');
			div.className = 'card';
			div.innerHTML = `<h2>${className} ${subj}</h2><p>${className} ke ${subj} ke important questions yahan milenge.</p>`;
			div.setAttribute('data-subject', subj);
			subjectGrid.appendChild(div);
		});
		subjectGrid.style.display = 'flex';
		jeeClassGrid.style.display = 'none';

		// If Class 11 Physics is clicked, show all chapters as small cards
		Array.from(subjectGrid.children).forEach(card => {
			if (card.getAttribute('data-subject') === 'Physics' && className === 'Class 11') {
				card.addEventListener('click', () => showPhysicsChapters());
				card.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { showPhysicsChapters(); }});
			}
		});
	}

	function showPhysicsChapters() {
		subjectGrid.innerHTML = '';
		const chapters = [
			{ name: 'Mathematics in Physics', icon: '📐' },
			{ name: 'Units and Dimensions', icon: '📏' },
			{ name: 'Motion in One Dimension', icon: '➡️' },
			{ name: 'Motion in Two Dimensions', icon: '🔄' },
			{ name: 'Laws of Motion', icon: '⚖️' },
			{ name: 'Work, Power and Energy', icon: '💡' },
			{ name: 'Center of Mass, Momentum and Collisions', icon: '🎯' },
			{ name: 'Rotational Motion', icon: '🌀' },
			{ name: 'Gravitation', icon: '🌍' },
			{ name: 'Mechanical Properties of Solids', icon: '🧱' },
			{ name: 'Mechanical Properties of Fluids', icon: '💧' },
			{ name: 'Thermal Properties of Matter', icon: '🔥' },
			{ name: 'Thermodynamics', icon: '♨️' },
			{ name: 'Kinetic Theory of Gases', icon: '🌬️' },
			{ name: 'Oscillations', icon: '🔔' },
			{ name: 'Waves and Sound', icon: '🌊' },
			{ name: 'Electrostatics', icon: '⚡' },
			{ name: 'Capacitance', icon: '🔋' },
			{ name: 'Current Electricity', icon: '🔌' },
			{ name: 'Magnetic Effects of Current', icon: '🧲' },
			{ name: 'Magnetic Properties of Matter', icon: '🧲' },
			{ name: 'Electromagnetic Induction', icon: '🔄' },
			{ name: 'Alternating Current', icon: '🔁' },
			{ name: 'Electromagnetic Waves', icon: '📡' },
			{ name: 'Ray Optics', icon: '🔦' },
			{ name: 'Wave Optics', icon: '🌈' },
			{ name: 'Dual Nature of Matter', icon: '⚛️' },
			{ name: 'Atomic Physics', icon: '🔬' },
			{ name: 'Nuclear Physics', icon: '☢️' },
			{ name: 'Semiconductors', icon: '💾' },
			{ name: 'Experimental Physics', icon: '🧪' }
		];
		   chapters.forEach((chapter, idx) => {
			   const div = document.createElement('div');
			   div.className = 'chapter-card';
			   div.innerHTML = `<span class="chapter-icon">${chapter.icon}</span><h3>${chapter.name}</h3>`;
			   div.tabIndex = 0;
			   div.addEventListener('click', () => showPhysicsQuestions(idx));
			   div.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { showPhysicsQuestions(idx); }});
			   subjectGrid.appendChild(div);
		   });
		   subjectGrid.style.display = 'flex';
		   subjectGrid.style.flexDirection = 'column';
		   subjectGrid.style.alignItems = 'center';
	   }

	   // Dummy MCQs for each chapter (2-4 per chapter)
	   const physicsQuestions = [
		   [ // Mathematics in Physics
			   {
				   q: 'Which of the following is a derived quantity?',
				   options: ['Length', 'Mass', 'Velocity', 'Time'],
				   answer: 2,
				   explanation: 'Velocity is derived from length and time.'
			   },
			   {
				   q: 'The SI unit of force is?',
				   options: ['Joule', 'Newton', 'Watt', 'Pascal'],
				   answer: 1,
				   explanation: 'Force is measured in Newtons (N).'
			   }
		   ],
		   [ // Units and Dimensions
			   {
				   q: 'Which of the following pairs has the same dimensions?',
				   options: ['Force and Pressure', 'Work and Energy', 'Power and Energy', 'Force and Work'],
				   answer: 1,
				   explanation: 'Work and Energy both have dimensions of ML^2T^-2.'
			   },
			   {
				   q: 'Dimensional formula of pressure is?',
				   options: ['MLT^-2', 'ML^2T^-2', 'ML^-1T^-2', 'M^2L^2T^-2'],
				   answer: 2,
				   explanation: 'Pressure = Force/Area, so ML^-1T^-2.'
			   }
		   ],
		   [ // Motion in One Dimension
			   {
				   q: 'A body moves with constant speed in a straight line. Its acceleration is?',
				   options: ['Zero', 'Constant', 'Increasing', 'Decreasing'],
				   answer: 0,
				   explanation: 'Constant speed in a straight line means zero acceleration.'
			   },
			   {
				   q: 'Displacement can be zero when?',
				   options: ['Distance is zero', 'Body returns to initial position', 'Speed is constant', 'Acceleration is zero'],
				   answer: 1,
				   explanation: 'If the body returns to its starting point, displacement is zero.'
			   }
		   ],
		   [ // Motion in Two Dimensions
			   {
				   q: 'Projectile motion is an example of?',
				   options: ['1D motion', '2D motion', '3D motion', 'Circular motion'],
				   answer: 1,
				   explanation: 'Projectile motion has both x and y components.'
			   },
			   {
				   q: 'At the highest point of projectile, the vertical component of velocity is?',
				   options: ['Maximum', 'Zero', 'Minimum', 'Equal to horizontal'],
				   answer: 1,
				   explanation: 'At the top, vertical velocity is zero.'
			   }
		   ],
		   // ... Add 2-4 questions for each chapter similarly ...
	   ];

	   function showPhysicsQuestions(chapterIdx) {
		   subjectGrid.innerHTML = '';
		   const questions = physicsQuestions[chapterIdx] || [];
		   if (questions.length === 0) {
			   subjectGrid.innerHTML = '<p>No questions available for this chapter yet.</p>';
			   return;
		   }
		   questions.forEach((qObj, qIdx) => {
			   const qDiv = document.createElement('div');
			   qDiv.className = 'question-block premium-mcq';
			   qDiv.innerHTML = `<h4><span style="color:#7b61ff;font-weight:700;">Q${qIdx+1}.</span> ${qObj.q}</h4>`;
			   qObj.options.forEach((opt, optIdx) => {
				   const optBtn = document.createElement('button');
				   optBtn.textContent = String.fromCharCode(65+optIdx) + ". " + opt;
				   optBtn.className = 'option-btn';
				   optBtn.setAttribute('aria-label', opt);
				   optBtn.addEventListener('click', function() {
					   showAnswer(qDiv, qObj, optIdx);
				   });
				   qDiv.appendChild(optBtn);
			   });
			   subjectGrid.appendChild(qDiv);
		   });
	   }

	   function showAnswer(qDiv, qObj, selectedIdx) {
		   // Remove previous answer if any
		   const prev = qDiv.querySelector('.answer-block');
		   if (prev) prev.remove();
		   const ansDiv = document.createElement('div');
		   ansDiv.className = 'answer-block';
		   if (selectedIdx === qObj.answer) {
			   ansDiv.innerHTML = `<span style="color:green;font-weight:bold;">Correct!</span> <br> Explanation: ${qObj.explanation}`;
		   } else {
			   ansDiv.innerHTML = `<span style="color:red;font-weight:bold;">Incorrect.</span> <br> Correct Answer: <b>${qObj.options[qObj.answer]}</b><br> Explanation: ${qObj.explanation}`;
		   }
		   qDiv.appendChild(ansDiv);
	   }
});
