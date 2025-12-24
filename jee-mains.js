
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
		chapters.forEach(chapter => {
			const div = document.createElement('div');
			div.className = 'chapter-card';
			div.innerHTML = `<span class="chapter-icon">${chapter.icon}</span><h3>${chapter.name}</h3>`;
			subjectGrid.appendChild(div);
		});
		subjectGrid.style.display = 'flex';
		subjectGrid.style.flexDirection = 'column';
		subjectGrid.style.alignItems = 'center';
		}
});
