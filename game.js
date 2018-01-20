var player = [50, 375];
var enemy = [800, 375];
var enemyHp = 100;

playerSpeed = 5;

rotationSpeed = 0.5;
rotationTimes = 3;

attacking = 0;
attacked = false;

coolDown = 50;

function setup() {
    createCanvas(900, 500);
}

function keys() {
    
    if (keyIsDown(65)) { // a
        player[0] -= playerSpeed;
    }
    if (keyIsDown(68)) { // d
        player[0] += playerSpeed;
    }
    if (keyIsDown(32) && coolDown >= 50) { // spacebar
        attacking += rotationSpeed;
        coolDown = 0;
    }
    
}

function checkAttack() {
    if (attacking > 0) {
        attacking += rotationSpeed;
        
        // check to see if it is attacking enemy
        if (!attacked && collideRectRect(player[0], player[1], 50, 50, enemy[0], enemy[1], 50, 50)) {
            enemyHp -= 20;
            attacked = true;
        }
        
        // finished attacking
        if (attacking > rotationTimes*2*PI) {
            attacking = 0;
            attacked = false;
        }
    }
}

function draw() {
    coolDown++;
    
    keys();
    
    checkAttack();
    
    // draw background
    strokeWeight(3);
    background(200, 200, 200);
    
    // draw the ground
    line(0, 400, 900, 400)
    
    // draw enemy
    if (enemyHp > 0) {
        push()
        translate(enemy[0], enemy[1]);
        rect(-25, -25, 50, 50);
        pop();
    }
    
    // draw player 1
    push()
    translate(player[0], player[1]);
    rotate(attacking);
    fill(color(0, 0, 250));
    rect(-25, -25, 50, 50);
    pop()
  
}
