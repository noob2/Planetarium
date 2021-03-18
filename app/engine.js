let objects = []
let canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')
let zoom = 1

document.getElementById('clear').addEventListener('click', () => (objects = []))

canvas.addEventListener('contextmenu', (e) => e.preventDefault())

let startPosition = { x: 0, y: 0 }
let currentPosition = { x: 0, y: 0 }
let offset = { x: -window.innerWidth / 2, y: -window.innerHeight / 2 }

let doIDraw = false
function drawLine(e) {
  currentPosition = { x: e.clientX, y: e.clientY }
}

function dragOffset(e) {
  offset.x += currentPosition.x - e.clientX
  offset.y += currentPosition.y - e.clientY
  currentPosition.x = e.clientX
  currentPosition.y = e.clientY
}

canvas.addEventListener('mousedown', (e) => {
  startPosition = { x: e.clientX, y: e.clientY }
  currentPosition = { x: e.clientX, y: e.clientY }
  if (e.button == 0) {
    doIDraw = true
    canvas.addEventListener('mousemove', drawLine, false)
  } else {
    canvas.addEventListener('mousemove', dragOffset, false)
  }
})
canvas.addEventListener('mouseup', (e) => {
  if (e.button == 0) {
    doIDraw = false
    canvas.removeEventListener('mousemove', drawLine, false)
    objects.push({
      radius: parseInt(document.getElementById('radius').value),
      mass: parseInt(document.getElementById('mass').value),
      x: (e.clientX + offset.x) / zoom,
      y: (e.clientY + offset.y) / zoom,
      xSpeed: (currentPosition.x - startPosition.x) / 20,
      ySpeed: (currentPosition.y - startPosition.y) / 20,
    })
  } else {
    canvas.removeEventListener('mousemove', dragOffset, false)
  }
})
canvas.addEventListener('wheel', (e) => {
  let direction = e.deltaY > 0 ? 'down' : 'up'
  direction == 'down' ? (zoom *= 2) : (zoom /= 2)
  document.getElementById('zoom').value = zoom
})

setInterval(() => {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

  for (let i = 0; i < objects.length; i++) {
    let o = objects[i]
    for (let j = 0; j < objects.length; j++) {
      if (i != j) {
        let o2 = objects[j]
        const distanceSquared = Math.pow(o.x - o2.x, 2) + Math.pow(o.y - o2.y, 2)
        if (Math.sqrt(distanceSquared) > o2.radius + o.radius) {
          const object1Gravity = o.mass / distanceSquared
          const object2Gravity = o2.mass / distanceSquared

          o.xSpeed += (object2Gravity / 100) * (o2.x - o.x)
          o2.xSpeed += (object1Gravity / 100) * (o.x - o2.x)

          o.ySpeed += (object2Gravity / 100) * (o2.y - o.y)
          o2.ySpeed += (object1Gravity / 100) * (o.y - o2.y)
        } else {
          //crash
          objects[i] = {
            radius: (o.radius + o2.radius) / 2,
            mass: o.mass + o2.mass,
            x: (o.x + o2.x) / 2,
            y: (o.y + o2.y) / 2,
            xSpeed: 0,
            ySpeed: 0,
          }
          objects.splice(j, 1)
        }
      }
    }
    o.x += o.xSpeed
    o.y += o.ySpeed
    ctx.beginPath()
    ctx.arc(o.x * zoom - offset.x, o.y * zoom - offset.y, o.radius * zoom, 0, Math.PI * 2, true)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.closePath()
  }

  if (doIDraw) {
    ctx.beginPath()
    ctx.moveTo(startPosition.x, startPosition.y)
    ctx.lineTo(currentPosition.x, currentPosition.y)
    ctx.stroke()
    ctx.closePath()
  }
  document.getElementById('objectsCount').value = objects.length
}, 60)
