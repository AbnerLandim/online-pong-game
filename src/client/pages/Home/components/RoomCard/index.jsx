import { useNavigate } from 'react-router-dom'
import './styles.css'

const RoomCard = ({ room }) => {
  const navigate = useNavigate()

  function joinRoom() {
    navigate(`/play/${room}`)
  }

  return (
    <div id="room-card__container">
      <span>{room}</span>
      <span>1/2</span>
      <button onClick={joinRoom}>Join</button>
    </div>
  )
}

export default RoomCard
