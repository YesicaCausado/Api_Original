// Importa React hooks y componentes necesarios
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'

// Define la estructura de cada personaje que traemos de la API
interface Character {
  id: number
  fullName: string
  title: string
  family: string
  imageUrl: string
}

// Define los tipos de filtros disponibles para buscar personajes por casa
type FamilyFilter = 'Todos ' | 'Lobos del Norte' | 'Fuego y Sangre' | 'Oro y Poder' | 'Tormentas' | 'Los Olvidados'

function Home() {
  // Estado para almacenar todos los personajes traídos de la API
  const [characters, setCharacters] = useState<Character[]>([])
  // Estado para el filtro actual de casas
  const [filter, setFilter] = useState<FamilyFilter>('Todos ')
  // Estado para el término de búsqueda
  const [query, setQuery] = useState('')
  // Estado para almacenar los nombres de personajes marcados como favoritos
  const [favorites, setFavorites] = useState<string[]>([])
  // Estado para manejar mensajes de error
  const [error, setError] = useState('')
  // Estado para indicar si aún se están cargando los datos
  const [loading, setLoading] = useState(true)

  // Array con las opciones de filtro por casa
  const filtros: FamilyFilter[] = ['Todos ', 'Lobos del Norte', 'Fuego y Sangre', 'Oro y Poder', 'Tormentas', 'Los Olvidados']

  // UseEffect se ejecuta una sola vez al cargar el componente
  useEffect(() => {
    // Carga los favoritos guardados en localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(Array.isArray(storedFavorites) ? storedFavorites : [])

    // Función para traer personajes de la API de Game of Thrones
    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://thronesapi.com/api/v2/Characters')
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

        const data: Character[] = await res.json()
        setCharacters(data)
      } catch (error) {
        console.error('Error cargando personajes:', error)
        setError('No se pudieron cargar los personajes ')
      } finally {
        // Indica que terminó la carga sin importar si hubo error
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  // Función para guardar los favoritos en localStorage
  const updateFavorites = (nextFavorites: string[]) => {
    setFavorites(nextFavorites)
    localStorage.setItem('favorites', JSON.stringify(nextFavorites))
  }

  // Función para agregar o quitar un personaje de favoritos
  const toggleFavorite = (fullName: string) => {
    const nextFavorites = favorites.includes(fullName)
      ? favorites.filter((name) => name !== fullName)
      : [...favorites, fullName]

    updateFavorites(nextFavorites)
  }

  // Filtra y busca personajes según el filtro de casa y el término de búsqueda
  const filteredCharacters = useMemo(() => {
    const search = query.trim().toLowerCase()
    return characters.filter((character) => {
      // Verifica si el personaje coincide con el filtro de casa seleccionado
      const matchesFilter =
        filter === 'Todos '
          ? true
          : filter === 'Los Olvidados'
          ? !['House Stark', 'House Targaryen', 'House Lannister', 'House Baratheon'].includes(character.family)
          : filter === 'Lobos del Norte'
          ? character.family === 'House Stark'
          : filter === 'Fuego y Sangre'
          ? character.family === 'House Targaryen'
          : filter === 'Oro y Poder'
          ? character.family === 'House Lannister'
          : filter === 'Tormentas'
          ? character.family === 'House Baratheon'
          : false

      if (!matchesFilter) return false

      // Si la búsqueda tiene menos de 2 caracteres, muestra todos los de ese filtro
      if (search.length < 2) return true

      // Busca en nombre completo, título o familia del personaje
      return (
        character.fullName.toLowerCase().includes(search) ||
        character.title.toLowerCase().includes(search) ||
        character.family.toLowerCase().includes(search)
      )
    })
  }, [characters, filter, query])

  return (
    <main className="home-container">
      <header className="home-header">
        <h1>Juego de Tronos</h1>
      </header>

      <div className="home-controls">
        <div className="filter-buttons">
          {filtros.map((option) => (
            <button
              key={option}
              type="button"
              className={filter === option ? 'activo' : ''}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Buscar personaje, casa o título..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <section className="character-grid">
        {loading ? (
          <p className="info-message">Cargando personajes...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredCharacters.length === 0 ? (
          <p className="info-message">No se encontró ningún personaje.</p>
        ) : (
          filteredCharacters.map((character) => {
            const favorito = favorites.includes(character.fullName)

            return (
              <Link key={character.id} to={`/personaje/${character.id}`} className="character-card-link">
                <article className="character-card">
                  <img src={character.imageUrl} alt={character.fullName} />
                  <div className="character-details">
                    <div className="character-header">
                      <h2>{character.fullName}</h2>
                      <button
                        type="button"
                        className={`favorite-toggle ${favorito ? 'favorito' : ''}`}
                        onClick={(e) => {
                          e.preventDefault()
                          toggleFavorite(character.fullName)
                        }}
                        aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                      >
                        {favorito ? '★' : '☆'}
                      </button>
                    </div>
                    <p>{character.title || 'Sin título'}</p>
                    <span>{character.family}</span>
                  </div>
                </article>
              </Link>
            )
          })
        )}
      </section>
    </main>
  )
}

export default Home