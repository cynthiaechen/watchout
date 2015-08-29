var Player = function( x, y , r) {
  Dot.call(this, x, y, r);
  this.collisions = { 
    amount: 0,
    collided: {}
  };
  setInterval(this.checkCollided.bind(this), 1);
  setInterval(this.checkCollisions.bind(this), 10);
};

Player.prototype = Object.create(Dot.prototype);
Player.prototype.constructor = Player;

Player.prototype.checkCollisions = function() {
  var enemyCircles = d3.select('body').select('.enemies').selectAll('image')[0];
  for (var i = 0; i < enemyCircles.length; i++) {
    var currentX = enemyCircles[i].x.animVal.value;
    var currentY = enemyCircles[i].y.animVal.value;
    var currentID = enemyCircles[i].id;
    var distance = Math.pow(Math.pow(currentX - this.x, 2) + Math.pow(currentY - this.y, 2), 0.5);
    if (distance < (this.radius + enemies.radius)) {
      if (this.collisions.collided[currentID] === undefined) {
        this.collisions.amount++;
        this.collisions.collided[currentID] = 0;
      }
    }
  }
};

Player.prototype.checkCollided = function() {
  for (var key in this.collisions.collided) {
    if (this.collisions.collided[key] > 100) {
      delete this.collisions.collided[key];
    } else {
      this.collisions.collided[key]++;
    }
  }
};