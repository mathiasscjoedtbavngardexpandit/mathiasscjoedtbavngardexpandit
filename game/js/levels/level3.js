/* game/js/levels/level3.js */
window.ExpandITGame = window.ExpandITGame || {};

window.ExpandITGame.renderLevel3 = function(container, onComplete) {
    const { playSound } = window.ExpandITGame;

    container.innerHTML = `
        <div class="l3-container">
            <div class="app-header">
                <span class="header-title">Fix Issue</span>
            </div>
            <p style="text-align:center; margin-bottom: 20px;">Connect the wires!</p>
            
            <div class="wiring-board">
                <div class="wire-start">
                    <div class="wire-socket red" data-color="red" draggable="true"></div>
                    <div class="wire-socket blue" data-color="blue" draggable="true"></div>
                    <div class="wire-socket green" data-color="green" draggable="true"></div>
                </div>
                <div class="wire-end">
                    <div class="wire-socket red" data-target="red"></div>
                    <div class="wire-socket blue" data-target="blue"></div>
                    <div class="wire-socket green" data-target="green"></div>
                </div>
            </div>

            <button id="photo-btn" class="app-btn" style="display:none; width: 100%; margin-top: 20px;">
                <i class="fas fa-camera"></i> Document Work
            </button>
        </div>
    `;

    let connections = 0;
    const starts = container.querySelectorAll('.wire-start .wire-socket');
    const ends = container.querySelectorAll('.wire-end .wire-socket');
    let draggedColor = null;

    starts.forEach(s => {
        s.addEventListener('dragstart', () => draggedColor = s.dataset.color);
        s.addEventListener('click', () => {
            draggedColor = s.dataset.color;
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
            connections++;
            draggedColor = null;
            if (connections === 3) {
                const btn = container.querySelector('#photo-btn');
                btn.style.display = 'block';
                playSound('win');
            }
        } else {
            playSound('fail');
        }
    }

    container.querySelector('#photo-btn').addEventListener('click', () => {
        playSound('win');
        onComplete();
    });
};
