import { useState } from 'react'
import './styles.css'

const RoomModal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('')

  const onCreateRoom = (e) => {
    e.preventDefault()
    if (name.length > 0) {
      onSubmit(name)
      onClose()
    }
  }

  return (
    <div id="room-modal__container">
      <div id="room-modal__header">
        <span onClick={onClose}>x</span>
      </div>
      <form onSubmit={onCreateRoom} id="room-modal__body">
        <span>Enter room name:</span>
        <input
          id="room-modal__name-input"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default RoomModal
