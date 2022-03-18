class Notifier {
  constructor() {
    this.observers = [];
  }

  subscribe(callback) {
    this.observers.push(callback);
  }

  unssubscribe(callback) {
    this.observers = this.observers.filter(sub => sub !== callback);
  }

  trigger(payload) {
    this.observers.forEach(subscribe => subscribe(payload));
  }}

const blocks = new Notifier();

const block = document.querySelector(".block");
const block1 = document.querySelector(".block1");
const block2 = document.querySelector(".block2");

blocks.subscribe(style => {
  console.log("trigger catched");
})

const setStyle = style => style ? "orange" : "green";

block.addEventListener("click", () => {
  blocks.trigger(block.style);
})

blocks.subscribe(style => {
  block1.style.backgroundColor = setStyle(style);
})

blocks.subscribe(style => {
  block2.style.backgroundColor = setStyle(style);
})



