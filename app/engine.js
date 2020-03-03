let objects = []
let canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let ctx = canvas.getContext('2d')
let zoom = 1

document.getElementById('clear').addEventListener('click', () => (objects = []))

canvas.addEventListener('contextmenu', e => e.preventDefault())

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

canvas.addEventListener('mousedown', e => {
   startPosition = { x: e.clientX, y: e.clientY }
   currentPosition = { x: e.clientX, y: e.clientY }
   if (e.button == 0) {
      doIDraw = true
      canvas.addEventListener('mousemove', drawLine, false)
   } else {
      canvas.addEventListener('mousemove', dragOffset, false)
   }
})
canvas.addEventListener('mouseup', e => {
   if (e.button == 0) {
      doIDraw = false
      canvas.removeEventListener('mousemove', drawLine, false)
      objects.push({
         radius: parseInt(document.getElementById('radius').value),
         mass: parseInt(document.getElementById('mass').value),
         x: (e.clientX + offset.x) / zoom,
         y: (e.clientY + offset.y) / zoom,
         xSpeed: (currentPosition.x - startPosition.x) / 20,
         ySpeed: (currentPosition.y - startPosition.y) / 20
      })
   } else {
      canvas.removeEventListener('mousemove', dragOffset, false)
   }
})
canvas.addEventListener('wheel', e => {
   let direction = e.deltaY > 0 ? 'down' : 'up'
   direction == 'down' ? (zoom *= 2) : (zoom /= 2)
   document.getElementById('zoom').value = zoom
})
setInterval(() => {
   ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

   for (const i in objects) {
      let o = objects[i]
      for (const j in objects) {
         if (i != j) {
            let o2 = objects[j]
            let distanceSquared = Math.pow(o.x - o2.x, 2) + Math.pow(o.y - o2.y, 2)
            if (Math.sqrt(distanceSquared) > o2.radius + o.radius) {
               let gravity = o.mass / distanceSquared
               o.xSpeed += gravity * ((o2.x - o.x) / (o2.y - o.y))
               o2.xSpeed += gravity * ((o.x - o2.x) / (o2.y - o.y))
               //sinA = ? (90deg == 1)

               //          c
               // -------------------
               //    -              |
               //        -          | b
               //        a    -     |
               //                 - |

               // o.ySpeed += (gravity * (o.x - o2.x)) / (o.y - o2.y)
               //  console.log(o.x - o2.x > 0 ? gravity : -gravity)
               //  let gravity2 = o2.mass / distanceSquared

               //  o2.xSpeed += o.x  - o2.x > 0 ? gravity2 : -gravity2
               //  o2.ySpeed += o.y - o2.y > 0 ? gravity2 : -gravity2
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
}, 60)
//60

// //planet
// class Planet {
//   constructor(position, headingToPosition, radius, mass) {
//     this.position = new Point(position.x, position.y)
//     this.headingToPosition = new Point(headingToPosition.x, headingToPosition.y)
//     this.direction = new Point(
//       this.headingToPosition.x - this.position.x,
//       this.headingToPosition.y - this.position.y
//     )
//     this.radius = radius
//     this.mass = mass
//   }

//   InteractWithOtherPlanet(planet) {
//     let distance = planet.position.DistanceTo(this.position)
//     let thisPlanetStrength = (this.mass * planet.mass) / Math.pow(distance, 2)
//     let otherPlanetStrength = (planet.mass * planet.mass) / Math.pow(distance, 2)
//     let direction = new app.Point(
//       this.position.x - planet.position.x,
//       this.position.y - planet.position.y
//     )

//     planet.direction.add(direction.x * thisPlanetStrength, direction.y * thisPlanetStrength)
//     this.direction.add(-direction.x * otherPlanetStrength, -direction.y * otherPlanetStrength)
//   }
//   Crash(planet) {
//     let massMultiplyer = this.mass * planet.mass

//     this.direction.x =
//       (this.direction.x * this.mass + planet.direction.x * planet.mass) / massMultiplyer
//     this.direction.y =
//       (this.direction.y * this.mass + planet.direction.y * planet.mass) / massMultiplyer

//     let totalVolume =
//       (4 / 3) * Math.PI * Math.pow(this.radius, 3) + (4 / 3) * Math.PI * Math.pow(planet.radius, 3)
//     this.mass = parseInt(this.mass) + parseInt(planet.mass)
//     this.radius = 0.62035 * Math.pow(totalVolume, 1 / 3)
//   }
// }

// ;(() => setInterval(nextFrame, 1000))()

// function nextFrame() {
//   planets.forEach(planetA => {
//     planets.forEach((planetB, i) => {
//       if (planetA != planetB) {
//         planetA.position.DistanceTo(planetB.position) > Math.max(planetA.radius, planetB.radius)
//           ? planetA.InteractWithOtherPlanet(planetB)
//           : planetA.Crash(planetB),
//           planets.splice(i, 1)
//       }
//     })
//     planetA.Update()
//   })
//   clear()
//   planets.forEach(p => p.Draw())
//   document.getElementById('objectsCount').value = planets.length

//   if (doIDrawArrow) {
//     planetPosition.LineTo(client)
//   }
// }

// let planetPosition = new Point()
// let headingToPosition = new Point()
// let client = new Point()
// let doIDrawArrow

// // canvas.addEventListener('hover', e => {
// //   console.log(e)
// // })

// document.getElementById('clear').addEventListener('click', () => (app.planets = []))
