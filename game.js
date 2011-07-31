function Game() {
    this.currentPlayer = 0;
    this.numPlayers = 4;
};

io = {};
io.connect = function() {
    return new Game();    
};

Game.prototype.serverHandlers = {};
Game.prototype.clientHandlers = {};
Game.prototype.playerOrder = ['s', 'w', 'n', 'e'];

Game.prototype.emit = function(event, data) {
    if(this.prototype.handlers[event]) {
        this.prototype.serverHandlers[event](data);
    }
};

Game.prototype.on = function(event, handler) {
    this.clientHandlers[event] = handler;
};

Game.prototype.serverHandlers.
