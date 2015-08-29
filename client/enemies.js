var enemies = [];
enemies.number = 10;
enemies.radius = 15;

for (var i = 0; i < enemies.number; i++) {
  enemies.push(new Enemy(i, null, null, enemies.radius));
}