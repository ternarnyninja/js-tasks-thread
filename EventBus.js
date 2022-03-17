class Notifier {
  constructor() {
    this.callback = [];
  }

  subscribe(callback) {
    this.callback.push(callback);
  }

  unssubscribe(callback) {
    this.callback = this.callback.filter(cal => cal !== callback);
  }

  trigger(payload) {
    this.callback.forEach(call => {
        call.change(payload);
    })
  }
}








