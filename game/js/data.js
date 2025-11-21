/* game/js/data.js */
window.ExpandITGame = window.ExpandITGame || {};

window.ExpandITGame.technicians = [
    { id: 't1', name: 'Sparky', type: 'electrical', icon: 'fa-bolt', status: 'available' },
    { id: 't2', name: 'Drip', type: 'plumbing', icon: 'fa-faucet', status: 'busy' },
    { id: 't3', name: 'Chip', type: 'it', icon: 'fa-laptop', status: 'available' },
    { id: 't4', name: 'Brick', type: 'construction', icon: 'fa-hammer', status: 'available' },
    { id: 't5', name: 'Leaf', type: 'gardening', icon: 'fa-leaf', status: 'busy' }
];

window.ExpandITGame.problems = [
    { id: 'p1', type: 'electrical', label: 'No Power', icon: 'fa-bolt' },
    { id: 'p2', type: 'plumbing', label: 'Leak', icon: 'fa-faucet' },
    { id: 'p3', type: 'construction', label: 'Wall Crack', icon: 'fa-hammer' }
];

window.ExpandITGame.addresses = [
    '123 Main St',
    '456 Elm Ave',
    '789 Oak Ln',
    '321 Pine Rd'
];
