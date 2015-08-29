var highScore = 0;
var currentScore = 0;

var width = d3.select('body').style('width');
width = +(width.slice( 0, width.length - 2 ));
var height = d3.select('body').style('height');
height = +(height.slice( 0, height.length - 2 ));

var enemySvg = d3.select('body')
                .append('svg')
                .attr('class', 'enemies')
                .attr('width', width)
                .attr('height', height);

var player = new Player( width / 2, height / 2, 30 );

var playerSvg = d3.select('body')
                .append('svg')
                .attr('class', 'players')
                .attr('width', width)
                .attr('height', height);

var playerCircle = playerSvg.append('circle')
                            .attr('cx', player.x)
                            .attr('cy', player.y)
                            .attr('r', player.radius)
                            .style({fill: 'hotpink', stroke: "black", "stroke-width": "2px"});

var playerDrag = d3.behavior.drag();
playerDrag.on('dragstart', function() {
  playerCircle.transition()
              .duration(1000)
              .style({fill: 'steelblue'});
})
playerDrag.on('dragend', function() {
  playerCircle.transition()
              .duration(1000)
              .style({fill: 'hotpink'});
})
playerDrag.on('drag', function() {
  player.x = event.x;
  player.y = event.y;
  playerCircle.attr('cx', event.x)
              .attr('cy', event.y);
});

playerCircle.call(playerDrag);

var update = function() {
  // choose new positions for enemies
  enemies.forEach(function(enemy) {
    enemy.setPosition(Math.random()*(width - enemies.radius), Math.random()*(height - enemies.radius));
  });
  // changes position attributes of circle elements
  var enemyCircles = enemySvg.selectAll('image')
        .data(enemies, function(d) {return d.id;});

  enemyCircles.enter()
         .append('image')
         .attr('xlink:href', 'shuriken.png')
         .attr('x', function(d) {return d.x;})
         .attr('y', function(d) {return d.y;})
         .attr('height', function(d) {return 2.5*d.radius;})
         .attr('width', function(d) {return 2.5*d.radius;})
         .attr('id', function(d) { return d.id; })
         .style('transform-origin', '50% 50% 0');

  enemyCircles.transition()
         .duration(1000)
         .ease( 'sin' )
         .attr('x', function(d) {return d.x;})
         .attr('y', function(d) {return d.y;});

  enemyCircles.exit().remove();
};

var updateScore = function( ) {
  if( player.collisions.amount > 0 ) {
    player.collisions.amount = 0;
    if( currentScore > highScore ) {
      highScore = currentScore;
      d3.select('.high').select('span').text(highScore.toString());
    }
    currentScore = 0;
  } else {
    currentScore++;
  }
  d3.select('.current').select('span').text(currentScore.toString());
};

var rotateByDeg = function() {
  enemySvg.selectAll('image').style('transform', 'rotate(' + rotateByDeg.deg + 'deg)' );
  rotateByDeg.deg++;
};

rotateByDeg.deg = 0;

setInterval( rotateByDeg, 1000/360 );

setInterval( update, 1000 );

setInterval( updateScore, 100 );