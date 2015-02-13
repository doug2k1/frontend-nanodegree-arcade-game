
var tileSize = {
    x: 101,
    y: 83
};

var mapLimits = {
    x: 4,
    y: 5
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawSprite(sprite, x, y) {
    ctx.drawImage(Resources.get(sprite), x * tileSize.x, y * tileSize.y - 30);
}

/**********************************************************
 * Enemy
 **********************************************************/

// Enemies our player must avoid
var Enemy = function() {
    this.reset();
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.reset = function() {
    this.x = -1;
    this.y = getRandomInt(1,3);
    this.speed = 0.5 + Math.random() * 2;
};

Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > mapLimits.x + 1) {
        this.reset();
    }
};

Enemy.prototype.render = function() {
    drawSprite(this.sprite, this.x, this.y);
};

/**********************************************************
 * Player
 **********************************************************/

var Player = function() {
    this.x = Player.initialPosition.x;
    this.y = Player.initialPosition.y;
    this.score = 0;
    this.sprite = 'images/char-boy.png';
};

Player.initialPosition = {
    x: 2, y: 5
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            this.y--;
            break;
        case 'down':
            this.y++;
            break;
        case 'left':
            this.x--;
            break;
        case 'right':
            this.x++;
            break;
    }
};

Player.prototype.win = function() {
    this.score++;
    this.x = Player.initialPosition.x;
    this.y = Player.initialPosition.y;
    console.log('WIN! - Score: ' + this.score);
};

Player.prototype.update = function(dt) {
    // limit position to map bounds
    if (this.x < 0) { this.x = 0; }
    else if (this.x > mapLimits.x) { this.x = mapLimits.x; }

    if (this.y > mapLimits.y) { this.y = mapLimits.y; }
    else if (this.y <= 0) {
        // player won
        this.win();
    }
};

Player.prototype.render = function() {
    drawSprite(this.sprite, this.x, this.y);
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(1),
    new Enemy(2),
    new Enemy(3)
];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
