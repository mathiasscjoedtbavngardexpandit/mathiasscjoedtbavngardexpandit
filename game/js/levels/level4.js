/* game/js/levels/level4.js */
window.ExpandITGame = window.ExpandITGame || {};

window.ExpandITGame.renderLevel4 = function(container, onComplete) {
    const { playSound } = window.ExpandITGame;

    container.innerHTML = `
        <div class="center-stage">
            <div class="big-icon"><i class="fas fa-file-invoice-dollar"></i></div>
            <h3>Processing Invoice...</h3>
            <button id="send-btn" class="app-btn" style="display:none; background: #00ff9d;">APPROVE & SEND</button>
        </div>
    `;

    const btn = container.querySelector('#send-btn');
    const delay = Math.random() * 2000 + 1000;

    setTimeout(() => {
        btn.style.display = 'block';
        playSound('click');
        
        btn.addEventListener('click', () => {
            playSound('win');
            onComplete();
        });
    }, delay);
};
