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
function mouseMoveHandler(e) {
  currentPosition = { x: e.clientX, y: e.clientY }
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  ctx.beginPath()
  ctx.moveTo(startPosition.x, startPosition.y)
  ctx.lineTo(currentPosition.x, currentPosition.y)
  ctx.stroke()
  ctx.closePath()
}
let offset = { x: 0, y: 0 }
canvas.addEventListener('mousedown', e => {
  startPosition = { x: e.clientX, y: e.clientY }
  currentPosition = { x: e.clientX, y: e.clientY }
  canvas.addEventListener('mousemove', mouseMoveHandler, false)
  if (e.button == 0) {
  }
})
canvas.addEventListener('mouseup', e => {
  canvas.removeEventListener('mousemove', mouseMoveHandler, false)
  if (e.button == 0) {
    objects.push({
      radius: document.getElementById('radius').value,
      mass: document.getElementById('mass').value,
      x: (e.clientX + offset.x) / zoom,
      y: (e.clientY + offset.y) / zoom
    })
  } else if (e.button == 2) {
    offset.x += startPosition.x - e.clientX
    offset.y += startPosition.y - e.clientY
  }
})
canvas.addEventListener('wheel', e => {
  let direction = e.deltaY > 0 ? 'down' : 'up'
  direction == 'down' ? (zoom *= 2) : (zoom /= 2)
  document.getElementById('zoom').value = zoom
})
;(() =>
  setInterval(() => {
    objects.forEach(o => {
      ctx.beginPath()
      ctx.arc(o.x * zoom - offset.x, o.y * zoom - offset.y, o.radius * zoom, 0, Math.PI * 2, true)
      ctx.fillStyle = '#fff'
      ctx.fill()
      ctx.closePath()
    })
  }, 60))()

// function clear() {
//   ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
// }
// //point
// class Point {
//   constructor(x, y) {
//     this.x = x
//     this.y = y
//   }

//   LineTo(point) {
//     ctx.beginPath()
//     ctx.moveTo(this.x, this.y)
//     ctx.lineTo(point.x, point.y)
//     ctx.stroke()
//   }
//   DistanceTo(point) {
//     return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2))
//   }
//   add(x, y) {
//     this.x += x
//     this.y += y
//   }
// }

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

//   Update() {
//     const speedReduction = 20
//     this.position.add(this.direction.x / speedReduction, this.direction.y / speedReduction)
//   }

//   Draw() {
//     ctx.beginPath()
//     ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, true)
//     ctx.fill()
//     ctx.closePath()
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
