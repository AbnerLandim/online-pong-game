/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

import { drawBall } from './components/Ball'
import { drawLeftPaddle, checkKey } from './components/LeftPaddle'
import './styles.css'

document.onkeydown = checkKey

function App() {
  const [score, setScore] = useState(0)

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
    drawBall(ctx, updateScore)
    drawLeftPaddle(ctx)
  }

  function updateScore() {
    setScore((score) => score + 1)
  }

  return (
    <div id="container">
      {/* <h2>Pong game</h2> */}

      <div className="scoreBoard">
        <span className="score">{score}</span>
      </div>
      <canvas id="board" width="800" height="600"></canvas>
    </div>
  )
}

export default App
