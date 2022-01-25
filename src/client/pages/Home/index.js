import { useState } from 'react'
import RoomCard from './components/RoomCard'
import RoomModal from './components/RoomModal'
import './styles.css'

const Home = () => {
  const [showModal, setShowModal] = useState(true)

  const onCloseModal = () => setShowModal(false)
  const onOpenModal = () => setShowModal(true)
  const onCreateRoom = (name) => {}

  return (
    <div id="home__container">
      <div id="home__screen">
        <span className="game-title">pong game</span>
        <div id="rooms__container">
          <RoomCard />
          <RoomCard />
          <RoomCard />
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
