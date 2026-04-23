// Importa React hooks y componentes necesarios
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './style.css'

// Define la estructura de cada personaje
interface Character {
  id: number
  fullName: string
  title: string
  family: string
  imageUrl: string
}

function Personaje() {
  // Obtiene el ID del personaje de la URL
  const { id } = useParams<{ id: string }>()
  // Estado para almacenar el personaje encontrado
  const [character, setCharacter] = useState<Character | null>(null)
  // Estado para manejar mensajes de error
  const [error, setError] = useState('')
  // Estado para indicar si aún se están cargando los datos
  const [loading, setLoading] = useState(true)

  // UseEffect se ejecuta cuando el ID cambia
  useEffect(() => {
    // Función para traer el personaje específico de la API
    const fetchCharacter = async () => {
      try {
        const res = await fetch('https://thronesapi.com/api/v2/Characters')
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

        const data: Character[] = await res.json()
        // Busca el personaje que coincida con el ID de la URL
        const found = data.find((char) => char.id === parseInt(id || '0'))
        if (!found) throw new Error('Personaje no encontrado')

        setCharacter(found)
      } catch (error) {
        console.error('Error cargando personaje:', error)
        setError('No se pudo cargar la información del personaje.')
      } finally {
        // Indica que terminó la carga sin importar si hubo error
        setLoading(false)
      }
    }

    fetchCharacter()
  }, [id])

  if (loading) return <p className="loading">Cargando personaje...</p>
  if (error) return <p className="error">{error}</p>
  if (!character) return <p className="error">Personaje no encontrado.</p>

  return (
    <main className="personaje-container">
      <header className="personaje-header">
        <h1>{character.fullName}</h1>
        <p>{character.title || 'Sin título'}</p>
      </header>

      <section className="personaje-details">
        <img src={character.imageUrl} alt={character.fullName} />
        <div className="personaje-info">
          <h2>Información</h2>
          <p><strong>Nombre completo:</strong> {character.fullName}</p>
          <p><strong>Título:</strong> {character.title || 'Ninguno'}</p>
          <p><strong>Familia:</strong> {character.family}</p>
          <p><strong>ID:</strong> {character.id}</p>
        </div>
      </section>
    </main>
  )
}

export default Personaje