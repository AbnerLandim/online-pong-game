import { leftPaddleProps } from '../data'

export function drawLeftPaddle(ctx) {
  ctx.beginPath()
  ctx.fillRect(
    leftPaddleProps.x,
    leftPaddleProps.y,
    leftPaddleProps.width,
    leftPaddleProps.height
  )
  ctx.fillStyle = '#eeeeee'
  ctx.closePath()
}

export function checkKey(e) {
  e = e || window.event

  // up arrow
  if (e.keyCode === 38 && leftPaddleProps.y >= 0)
    leftPaddleProps.y -= leftPaddleProps.speed

  // down arrow
  if (e.keyCode === 40 && leftPaddleProps.y + leftPaddleProps.height <= 600)
    leftPaddleProps.y += leftPaddleProps.speed
}
