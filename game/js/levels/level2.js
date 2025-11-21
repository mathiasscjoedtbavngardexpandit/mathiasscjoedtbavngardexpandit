/* game/js/levels/level2.js */
window.ExpandITGame = window.ExpandITGame || {};

window.ExpandITGame.renderLevel2 = function(container, orderData, onComplete) {
    const { playSound, technicians } = window.ExpandITGame;

    container.innerHTML = `
        <div class="l2-container">
            <div class="level-intro" style="padding: 10px; background: #222;">
                <img src="https://www.expandit.com/catalog/images/Resource%20Planning%20Board%20and%20Map.png" class="level-img" alt="Dispatcher" style="height: 60px; object-fit: cover;">
                <p style="font-size: 0.8rem;"><strong>You are the Dispatcher.</strong><br>A new order arrived! Drag it to the right technician. <a href="https://www.expandit.com/en/solutions/resource-planning" target="_blank" style="color: #00f3ff;">See Real Solution</a></p>
            </div>

            <div class="map-view" id="map-dropzone">
                <div class="map-pin"><i class="fas fa-map-marker-alt"></i></div>
                <div class="order-overlay" draggable="true" id="order-card">
                    <i class="fas ${orderData.problem.icon}" style="color: #00f3ff"></i>
                    <div>
                        <div style="font-size: 0.8rem; font-weight: bold">${orderData.problem.label}</div>
                        <div style="font-size: 0.6rem; color: #aaa">${orderData.address}</div>
                    </div>
                </div>
            </div>
            
            <div class="tech-roster">
                ${technicians.map(t => `
                    <div class="tech-card" data-id="${t.id}" data-type="${t.type}" data-status="${t.status}">
                        <div class="tech-status ${t.status}"></div>
                        <i class="fas ${t.icon} tech-icon"></i>
                        <span class="tech-name">${t.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const orderCard = container.querySelector('#order-card');
    const techCards = container.querySelectorAll('.tech-card');

    orderCard.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', 'order');
        playSound('click');
    });

    techCards.forEach(card => {
        card.addEventListener('dragover', (e) => {
            e.preventDefault();
            card.classList.add('drag-over');
        });

        card.addEventListener('dragleave', () => {
            card.classList.remove('drag-over');
        });

        card.addEventListener('drop', (e) => {
            e.preventDefault();
            card.classList.remove('drag-over');
            
            const isCorrectType = card.dataset.type === orderData.problem.type;
            const isAvailable = card.dataset.status === 'available';

            if (isCorrectType && isAvailable) {
                playSound('win');
                card.style.background = '#00ff9d';
                card.style.color = '#000';
                setTimeout(() => onComplete(), 1000);
            } else {
                playSound('fail');
                card.style.background = '#ff0055';
                setTimeout(() => {
                    card.style.background = '#2a2a2a';
                }, 500);
            }
        });
        
        // Click fallback for mobile
        card.addEventListener('click', () => {
             const isCorrectType = card.dataset.type === orderData.problem.type;
            const isAvailable = card.dataset.status === 'available';

            if (isCorrectType && isAvailable) {
                playSound('win');
                card.style.background = '#00ff9d';
                card.style.color = '#000';
                setTimeout(() => onComplete(), 1000);
            } else {
                playSound('fail');
                card.style.background = '#ff0055';
                setTimeout(() => {
                    card.style.background = '#2a2a2a';
                }, 500);
            }
        });
    });
};
