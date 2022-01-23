import { ballProps, leftPaddleProps } from '../data'

export function drawBall(ctx, onTouchLeftSide) {
  ballProps.x += ballProps.speedX
  ballProps.y += ballProps.speedY

  const ballTouchesLeftPaddle =
    ballProps.x - ballProps.size <= leftPaddleProps.x + leftPaddleProps.width &&
    ballProps.y + ballProps.size <=
      leftPaddleProps.y + leftPaddleProps.height &&
    ballProps.y >= leftPaddleProps.y

  const ballTouchesLeftSide = ballProps.x - ballProps.size <= 0

  const ballTouchesRightSide = ballProps.x + ballProps.size >= ctx.canvas.width

  ctx.beginPath()
  ctx.arc(ballProps.x, ballProps.y, ballProps.size, 0, Math.PI * 2)
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

  if (ballTouchesLeftSide) onTouchLeftSide()
}
