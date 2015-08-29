var Enemy = function( id, x, y , r) {
  Dot.call(this, x, y, r);
  this.id = id;
};

Enemy.prototype = Object.create(Dot.prototype);
Enemy.prototype.constructor = Enemy;

