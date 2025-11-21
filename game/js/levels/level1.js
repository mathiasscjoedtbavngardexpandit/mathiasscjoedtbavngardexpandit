/* game/js/levels/level1.js */
window.ExpandITGame = window.ExpandITGame || {};

window.ExpandITGame.renderLevel1 = function(container, onComplete) {
    const { playSound, problems, addresses } = window.ExpandITGame;
    
    let selectedProblem = null;
    let selectedDate = null;
    let selectedAddress = addresses[0];

    container.innerHTML = `
        <div class="l1-container">
            <div class="app-header">
                <i class="fas fa-arrow-left back-btn"></i>
                <span class="header-title">New Request</span>
            </div>
            
            <div class="app-input-group">
                <label class="app-label">Location</label>
                <select class="app-select" id="address-select">
                    ${addresses.map(a => `<option value="${a}">${a}</option>`).join('')}
                </select>
            </div>

            <div class="app-input-group">
                <label class="app-label">Problem Type</label>
                <div class="icon-grid">
                    ${problems.map(p => `
                        <div class="icon-card" data-id="${p.id}" data-type="${p.type}">
                            <i class="fas ${p.icon}"></i>
                            <span>${p.label}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="app-input-group">
                <label class="app-label">Date</label>
                <div class="date-scroll">
                    <div class="date-chip" data-val="Today">Today</div>
                    <div class="date-chip" data-val="Tomorrow">Tomorrow</div>
                    <div class="date-chip" data-val="Mon">Mon</div>
                    <div class="date-chip" data-val="Tue">Tue</div>
                </div>
            </div>

            <button id="submit-order" class="app-btn" disabled>Request Service</button>
        </div>
    `;

    // Address Logic
    container.querySelector('#address-select').addEventListener('change', (e) => {
        selectedAddress = e.target.value;
        playSound('click');
    });

    // Problem Logic
    const cards = container.querySelectorAll('.icon-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedProblem = problems.find(p => p.id === card.dataset.id);
            playSound('click');
            checkForm();
        });
    });

    // Date Logic
    const chips = container.querySelectorAll('.date-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            selectedDate = chip.dataset.val;
            playSound('click');
            checkForm();
        });
    });

    const btn = container.querySelector('#submit-order');
    
    function checkForm() {
        if (selectedProblem && selectedDate) {
            btn.disabled = false;
        }
    }

    btn.addEventListener('click', () => {
        playSound('win');
        btn.innerText = 'Sending...';
        setTimeout(() => {
            onComplete({
                address: selectedAddress,
                problem: selectedProblem,
                date: selectedDate
            });
        }, 1000);
    });
};
