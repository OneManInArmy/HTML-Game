const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './img/background.png'
})

const shop = new Sprite({
  position: {
    x: 600,
    y: 128
  },
  imageSrc: './img/shop.png',
  scale: 2.75,
  framesMax: 6
})

const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 0
  },
  offset: {
    x: 0,
    y: 0
  },
  imageSrc: './img/samuraiMack/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img/samuraiMack/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/samuraiMack/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/samuraiMack/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/samuraiMack/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/samuraiMack/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/samuraiMack/Death.png',
      framesMax: 6
    },
    defend:{
      imageSrc: './img/samuraiMack/Defend.png',
      framesMax: 1
    }
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }
})

const enemy = new Fighter({
  position: {
    x: 900,
    y: 100
  },
  velocity: {
    x: 0,
    y: 0
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  },
  imageSrc: './img/kenji/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/kenji/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/kenji/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/kenji/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/kenji/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/kenji/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/kenji/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/kenji/Death.png',
      framesMax: 7
    },
    defend:{
      imageSrc: './img/kenji/Defend.png',
      framesMax: 1
    }
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})

//console.log(player)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  s: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowDown:{
    pressed: false
  }
}

decreaseTimer()



function animate() {
  let oldstate 
  let oldstate2
  
  window.requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
 
  player.update()
  enemy.update()
  enemy.staminaf()
  player.staminaf()
  
  //console.log(player.starovrijeme2)
 
  
  

  player.velocity.x = 0
  enemy.velocity.x = 0
  

  

  // player movement

  if (keys.a.pressed && player.lastKey === 'a' && !player.isDefending) {
    if (player.exosted){
      player.velocity.x = -2
    }
    else
    player.velocity.x = -5

    player.switchSprite('run')
    
   
  } else if (keys.d.pressed && player.lastKey === 'd' && !player.isDefending) {
    if (player.exosted){
      player.velocity.x = 2
    }
    else
    player.velocity.x = 5

    player.switchSprite('run')
    
   
  } else if (!player.isDefending) {
    player.switchSprite('idle')
    
    
    
      if (player.starovrijeme2 - player.vrijeme >= 1.2&& !player.isDefending){
        player.sstate = true
       
        player.starovrijeme2 = player.vrijeme;
  
      }
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite('jump')
    player.sstate = false
   player.starovrijeme2 = player.vrijeme
  } else if (player.velocity.y > 0) {
    player.switchSprite('fall')
    player.sstate = false
   player.starovrijeme2 = player.vrijeme
  }

  


  if (player.sstate != oldstate){
    oldstate = player.sstate;
    gsap.to('#playerStamina', {
      width: player.stamina + '%'
    })
  }

  // Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft' && !enemy.isDefending) {
    if (enemy.exosted)
    enemy.velocity.x = -2
    else
    enemy.velocity.x = -5

    enemy.switchSprite('run')

   
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight' && !enemy.isDefending) {
    if (enemy.exosted)
    enemy.velocity.x = 2
    else
    enemy.velocity.x = 5

    enemy.switchSprite('run')
   
  } else if (!enemy.isDefending) {
    enemy.switchSprite('idle')
    //console.log(start2-old2)
    
  
    if (enemy.starovrijeme2 - enemy.vrijeme >= 1.5 && !enemy.isDefending){
      enemy.sstate = true
     
      enemy.starovrijeme2 = enemy.vrijeme;

    }
  }

  // Enemy jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite('jump')
   enemy.starovrijeme2 = enemy.vrijeme
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite('fall')
   enemy.starovrijeme2 = enemy.vrijeme
  }

  if (enemy.sstate != oldstate2){
    oldstate2 = enemy.sstate;
    gsap.to('#enemyStamina', {
      width: enemy.stamina + '%'
    })
  }




  // detect for collision & enemy gets hit
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking &&
    player.framesCurrent === 2 &&
    !(enemy.isDefending)
  ) {
    enemy.takeHit()
    player.isAttacking = false
    

    gsap.to('#enemyHealth', {
      width: enemy.health + '%'
    })
  }

  // if player misses
  if (player.isAttacking && player.framesCurrent === 2) {
    player.isAttacking = false
  }

  // this is where our player gets hit
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2 &&
    !(player.isDefending)
  ) {
    player.takeHit()
    enemy.isAttacking = false	

    gsap.to('#playerHealth', {
      width: player.health + '%'
    })
  }

  // if player misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false
  }

  // end game based on health
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId })
  }
  
}

animate()

window.addEventListener('keydown', (event) => {
 
  if (event.key == 'r') {
    location.reload();
  }
  if (!player.dead) {
    switch (event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break 
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
        if (player.exosted)
        player.velocity.y = -10
        else
        player.velocity.y = -20
        
        break
      case 'g':
          keys.s.pressed = true
          if (!player.exosted && !player.isDefending)
          player.defend();
        break
      case 'h':
        if (!player.exosted && !player.isDefending)
        player.attack()
       player.starovrijeme2 = player.vrijeme
        break
    }
  }
 

  if (!enemy.dead) {
    switch (event.key) {
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
        if(enemy.exosted)
        enemy.velocity.y = -10
        else
        enemy.velocity.y = -20
        break
      case '*':
        keys.ArrowDown.pressed = true
        if (!enemy.exosted && !enemy.isDefending)
        enemy.defend();
        break
      case '-':
        if (!enemy.exosted && !enemy.isDefending)
        enemy.attack()
       enemy.starovrijeme2 = enemy.vrijeme
        break
    }
  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'd':
      keys.d.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'g':
      keys.s.pressed = false
  }

  // enemy keys
  switch (event.key) {
    case 'ArrowRight':
      keys.ArrowRight.pressed = false
      break
    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false
      break
    case 'ArrowDown':
      keys.ArrowDown.pressed = false
  }
})
