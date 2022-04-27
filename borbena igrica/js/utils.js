function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId)
  document.querySelector('#displayText').style.display = 'flex'
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Tie'
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
  }
  setTimeout(function f1() {
    location.reload();
  }, 3000);
}



let timer2 = 60
let timer = 60
let timerId
function decreaseTimer() {
  if (timer2 > 0) {
    timerId = setTimeout(decreaseTimer, 100)
    timer2 -= 0.1
    document.querySelector('#timer').innerHTML = timer
    player.vrijeme -= 0.1;
    enemy.vrijeme -= 0.1;
    timer = Math.ceil(timer2) 
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}
