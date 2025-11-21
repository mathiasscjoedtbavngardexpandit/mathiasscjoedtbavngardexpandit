/* game/js/levels/level5.js */
window.ExpandITGame = window.ExpandITGame || {};

window.ExpandITGame.renderLevel5 = function(container, onComplete) {
    const { playSound } = window.ExpandITGame;
    let stress = 100;
    
    container.innerHTML = `
        <div class="center-stage">
            <div class="big-icon" id="coffee-cup" style="cursor: pointer"><i class="fas fa-coffee"></i></div>
            <h3>Relax!</h3>
            <p>Tap to Sip</p>
            <div style="width: 80%; height: 10px; background: #333; border-radius: 5px; margin-top: 20px; overflow: hidden;">
                <div id="stress-bar" style="width: 100%; height: 100%; background: #ff0055; transition: width 0.1s;"></div>
            </div>
        </div>
    `;

    const stage = container.querySelector('.center-stage');
    const cup = container.querySelector('#coffee-cup');
    const bar = container.querySelector('#stress-bar');

    stage.addEventListener('click', () => {
        stress -= 15;
        bar.style.width = stress + '%';
        playSound('click');
        
        cup.style.transform = 'scale(0.9)';
        stage.style.backgroundColor = '#222'; // Flash
        setTimeout(() => {
            cup.style.transform = 'scale(1)';
            stage.style.backgroundColor = 'transparent';
        }, 100);

        if (stress <= 0) {
            playSound('win');
            onComplete();
        }
    });
};
