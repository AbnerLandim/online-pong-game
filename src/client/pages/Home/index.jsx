import { useState, useEffect } from 'react'

import { getAllRooms, createRoom } from '../../services/roomService'
import RoomCard from './components/RoomCard'
import RoomModal from './components/RoomModal'
import './styles.css'

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [rooms, setRooms] = useState([])

  const onCloseModal = () => setShowModal(false)
  const onOpenModal = () => setShowModal(true)

  async function onCreateRoom(name) {
    const response = await createRoom(name)
    if (response) setRooms([...rooms, response.name])
  }

  async function fetchRooms() {
    const response = await getAllRooms()
    setRooms(response)
  }

  console.log(rooms)

  useEffect(() => {
    fetchRooms()
  }, [])

  return (
    <div id="home__container">
      <div id="home__screen">
        <span className="game-title">pong game</span>
        <div id="rooms__container">
          {rooms.map((room) => (
            <RoomCard key={`room_${room}`} room={room} />
          ))}
          <button onClick={onOpenModal}>Create room +</button>
        </div>
      </div>
      {showModal && (
        <RoomModal onClose={onCloseModal} onSubmit={onCreateRoom} />
      )}
    </div>
  )
}

export default Home
