/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

import { ballProps, leftPaddleProps } from './data'
import './styles.css'

// addEventListener('mousemove', (e) => {
//   leftPaddleProps.y = e.clientY
// })

// addEventListener(
//   'touchmove',
//   (e) => {
//     e.preventDefault()
//     leftPaddleProps.y =
//       e.touches[0].clientY + leftPaddleProps.height >= 600
//         ? e.touches[0].clientY - leftPaddleProps.height
//         : e.touches[0].clientY
//   },
//   { passive: false }
// )
document.onkeydown = checkKey

function checkKey(e) {
  e = e || window.event

  // up arrow
  if (e.keyCode == '38' && leftPaddleProps.y >= 0)
    leftPaddleProps.y -= leftPaddleProps.speed

  // down arrow
  if (e.keyCode == '40' && leftPaddleProps.y + leftPaddleProps.height <= 600)
    leftPaddleProps.y += leftPaddleProps.speed
}

function App() {
  useEffect(() => {
    const board = document.getElementById('board')
    const ctx = board.getContext('2d')
    let animationFrameId

    const render = () => {
      drawBoard(ctx)
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [drawBoard])

  function drawBoard(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#222222'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    drawBall(ctx)
    drawLeftPaddle(ctx)
  }

  function drawBall(ctx) {
    ballProps.x += ballProps.speedX
    ballProps.y += ballProps.speedY

    const ballTouchesLeftPaddle =
      ballProps.x - ballProps.size <=
        leftPaddleProps.x + leftPaddleProps.width &&
      ballProps.y + ballProps.size <=
        leftPaddleProps.y + leftPaddleProps.height &&
      ballProps.y >= leftPaddleProps.y

    const ballTouchesLeftSide = ballProps.x - ballProps.size <= 0

    const ballTouchesRightSide =
      ballProps.x + ballProps.size >= ctx.canvas.width

    ctx.beginPath()
    ctx.arc(
      ballProps.x + ballProps.speedX,
      ballProps.y + ballProps.speedY,
      ballProps.size,
      0,
      Math.PI * 2
    )
    ctx.fillStyle = '#eeeeee'
    ctx.fill()
    ctx.closePath()

    if (ballTouchesLeftSide || ballTouchesRightSide || ballTouchesLeftPaddle)
      ballProps.speedX *= -1
    if (
      ballProps.y + ballProps.size >= ctx.canvas.height ||
      ballProps.y - ballProps.size <= 0
    )
      ballProps.speedY *= -1
  }

  function drawLeftPaddle(ctx) {
    ctx.beginPath()
    ctx.fillRect(
      leftPaddleProps.x,
      leftPaddleProps.y + leftPaddleProps.speed,
      leftPaddleProps.width,
      leftPaddleProps.height
    )
    ctx.fillStyle = '#eeeeee'
    ctx.closePath()

    // leftPaddleProps.y += leftPaddleProps.speed

    // TODO: REMOVE THIS LATER
    // if (
    //   leftPaddleProps.y + leftPaddleProps.height >= ctx.canvas.height ||
    //   leftPaddleProps.y <= 0
    // )
    //   leftPaddleProps.speed *= -1
  }

  return (
    <div id="container">
      <h2>Pong game</h2>
      <canvas id="board" width="800" height="600"></canvas>
    </div>
  )
}

export default App
