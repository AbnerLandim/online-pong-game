import api from './api'

export async function getAllRooms() {
  try {
    const { data } = await api.get('/rooms')
    return data || []
  } catch {
    console.error('Error: could not get the rooms')
  }
}

export async function createRoom(name) {
  try {
    const { data } = await api.post(`/room?name=${name}`)
    return data || false
  } catch {
    console.error('Error: could not add room')
  }
}
