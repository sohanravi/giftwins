
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
			subjectGrid.appendChild(div);
		});
		subjectGrid.style.display = 'flex';
		jeeClassGrid.style.display = 'none';
	}

	class11Card.addEventListener('click', () => showSubjects('Class 11'));
	class12Card.addEventListener('click', () => showSubjects('Class 12'));
	class11Card.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { showSubjects('Class 11'); }});
	class12Card.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { showSubjects('Class 12'); }});
});
