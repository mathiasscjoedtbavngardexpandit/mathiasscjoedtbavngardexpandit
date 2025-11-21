/* game/js/levels/level3.js */
window.ExpandITGame = window.ExpandITGame || {};

window.ExpandITGame.renderLevel3 = function(container, onComplete) {
    const { playSound } = window.ExpandITGame;

    // Randomize wire order
    const colors = ['red', 'blue', 'green'];
    const shuffledStarts = [...colors].sort(() => Math.random() - 0.5);
    const shuffledEnds = [...colors].sort(() => Math.random() - 0.5);

    container.innerHTML = `
        <div class="l3-container">
            <div class="app-header">
                <span class="header-title">Technician App</span>
            </div>
            
            <div class="level-intro">
                <img src="https://www.expandit.com/catalog/images/start-page/story-start-page-01.jpg" class="level-img" alt="Technician">
                <p><strong>You are the Technician.</strong><br>You've arrived at the site. Fix the wiring to restore power and document the job.</p>
            </div>

            <div class="wiring-board" style="position: relative;">
                <svg class="wire-svg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"></svg>
                
                <div class="wire-column start-col">
                    ${shuffledStarts.map(c => `<div class="wire-socket ${c}" data-color="${c}" draggable="true"></div>`).join('')}
                </div>
                <div class="wire-column end-col">
                    ${shuffledEnds.map(c => `<div class="wire-socket ${c}" data-target="${c}"></div>`).join('')}
                </div>
            </div>

            <button id="photo-btn" class="app-btn" style="display:none; width: 100%; margin-top: 20px;">
                <i class="fas fa-camera"></i> Document Work
            </button>
        </div>
    `;

    let connections = 0;
    const starts = container.querySelectorAll('.start-col .wire-socket');
    const ends = container.querySelectorAll('.end-col .wire-socket');
    const svg = container.querySelector('.wire-svg');
    let draggedColor = null;
    let draggedElement = null;

    starts.forEach(s => {
        s.addEventListener('dragstart', (e) => {
            draggedColor = s.dataset.color;
            draggedElement = s;
        });
        s.addEventListener('click', () => {
            draggedColor = s.dataset.color;
            draggedElement = s;
            s.style.opacity = 0.5;
            playSound('click');
        });
    });

    ends.forEach(e => {
        e.addEventListener('dragover', (ev) => ev.preventDefault());
        e.addEventListener('drop', () => checkConnection(e));
        e.addEventListener('click', () => checkConnection(e));
    });

    function checkConnection(target) {
        if (draggedColor === target.dataset.target) {
            playSound('click');
            target.classList.add('connected');
            draggedElement.classList.add('connected');
            
            // Draw Line
            drawLine(draggedElement, target, draggedColor);

            connections++;
            draggedColor = null;
            draggedElement = null;

            if (connections === 3) {
                const btn = container.querySelector('#photo-btn');
                btn.style.display = 'block';
                playSound('win');
            }
        } else {
            playSound('fail');
        }
    }

    function drawLine(start, end, color) {
        const startRect = start.getBoundingClientRect();
        const endRect = end.getBoundingClientRect();
        const boardRect = container.querySelector('.wiring-board').getBoundingClientRect();

        const x1 = startRect.left + startRect.width / 2 - boardRect.left;
        const y1 = startRect.top + startRect.height / 2 - boardRect.top;
        const x2 = endRect.left + endRect.width / 2 - boardRect.left;
        const y2 = endRect.top + endRect.height / 2 - boardRect.top;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', color === 'blue' ? '#4444ff' : (color === 'red' ? '#ff4444' : '#44ff44'));
        line.setAttribute('stroke-width', '4');
        svg.appendChild(line);
    }

    container.querySelector('#photo-btn').addEventListener('click', () => {
        playSound('win');
        onComplete();
    });
};
