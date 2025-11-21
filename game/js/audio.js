/* game/js/audio.js */
window.ExpandITGame = window.ExpandITGame || {};

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

window.ExpandITGame.playSound = function(type) {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'win') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, audioCtx.currentTime + 0.1);
    } else if (type === 'fail') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.2);
    } else if (type === 'click') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    } else if (type === 'type') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + 0.05);
        osc.start();
        return;
    }

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
};
