const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('greet', (name) => {
  console.log(`Hello ${name}! Welcome.`);
});

eventEmitter.on('greet', (name) => {
  console.log(`How are you, ${name}?`);
});

eventEmitter.on('bye', () => {
  console.log('Goodbye! See you later.');
});

console.log('Event execution started...\n');

eventEmitter.emit('greet', 'Usha');
eventEmitter.emit('bye');

console.log('\nEvent execution completed.');