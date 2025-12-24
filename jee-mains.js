
// JEE Mains page specific JS
document.addEventListener('DOMContentLoaded', function() {
	const class11Card = document.getElementById('class11Card');
	const class12Card = document.getElementById('class12Card');
	const subjectGrid = document.getElementById('subjectGrid');
	const jeeClassGrid = document.getElementById('jeeClassGrid');

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
			'Mathematics in Physics',
			'Units and Dimensions',
			'Motion in One Dimension',
			'Motion in Two Dimensions',
			'Laws of Motion',
			'Work, Power and Energy',
			'Center of Mass, Momentum and Collisions',
			'Rotational Motion',
			'Gravitation',
			'Mechanical Properties of Solids',
			'Mechanical Properties of Fluids',
			'Thermal Properties of Matter',
			'Thermodynamics',
			'Kinetic Theory of Gases',
			'Oscillations',
			'Waves and Sound',
			'Electrostatics',
			'Capacitance',
			'Current Electricity',
			'Magnetic Effects of Current',
			'Magnetic Properties of Matter',
			'Electromagnetic Induction',
			'Alternating Current',
			'Electromagnetic Waves',
			'Ray Optics',
			'Wave Optics',
			'Dual Nature of Matter',
			'Atomic Physics',
			'Nuclear Physics',
			'Semiconductors',
			'Experimental Physics'
		];
		chapters.forEach(chapter => {
			const div = document.createElement('div');
			div.className = 'chapter-card';
			div.innerHTML = `<h3>${chapter}</h3>`;
			subjectGrid.appendChild(div);
		});
		subjectGrid.style.display = 'flex';
		subjectGrid.style.flexDirection = 'column';
		subjectGrid.style.alignItems = 'center';
	}
});
