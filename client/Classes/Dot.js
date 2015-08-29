var Dot = function( x, y, r ) {
  this.x = x;
  this.y = y;
  this.radius = r;
};

Dot.prototype.setPosition = function( x, y ) {
  this.x = x;
  this.y = y;
};