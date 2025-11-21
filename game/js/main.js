/* game/js/main.js */
window.ExpandITGame = window.ExpandITGame || {};

(function() {
    const { 
        renderLevel1, renderLevel2, renderLevel3, renderLevel4, renderLevel5, playSound 
    } = window.ExpandITGame;

    const screen = document.getElementById('game-screen');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    let orderData = {};

    function updateScore(points) {
        score += points;
        scoreDisplay.innerText = score;
    }

    function startGame() {
        score = 0;
        updateScore(0);
        playSound('click');
        loadLevel1();
    }

    function loadLevel1() {
        renderLevel1(screen, (data) => {
            orderData = data;
            updateScore(100);
            loadLevel2();
        });
    }

    function loadLevel2() {
        renderLevel2(screen, orderData, () => {
            updateScore(200);
            loadLevel3();
        });
    }

    function loadLevel3() {
        renderLevel3(screen, () => {
            updateScore(300);
            loadLevel4();
        });
    }

    function loadLevel4() {
        renderLevel4(screen, () => {
            updateScore(400);
            loadLevel5();
        });
    }

    function loadLevel5() {
        renderLevel5(screen, () => {
            updateScore(500);
            showEndScreen();
        });
    }

    function showEndScreen() {
        screen.innerHTML = `
            <div class="center-stage">
                <div class="big-icon" style="color: #ffe600"><i class="fas fa-trophy"></i></div>
                <h3>JOB DONE!</h3>
                <p>Score: ${score}</p>
                <button id="restart-btn" class="app-btn">PLAY AGAIN</button>
            </div>
        `;
        
        screen.querySelector('#restart-btn').addEventListener('click', startGame);
    }

    // Initial Start Screen
    screen.innerHTML = `
        <div class="center-stage">
            <h3>Field Master</h3>
            <p>ExpandIT Workflow Sim</p>
            <button id="start-btn" class="app-btn">START SYSTEM</button>
        </div>
    `;

    document.getElementById('start-btn').addEventListener('click', startGame);
})();
