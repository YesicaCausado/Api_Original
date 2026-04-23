// Importa React hooks y componentes necesarios
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

// Define la estructura de cada personaje
interface Character {
  id: number
  fullName: string
  title: string
  family: string
  imageUrl: string
}

function Favoritos() {
  // Estado para almacenar nombres de personajes favoritos
  const [favorites, setFavorites] = useState<string[]>([]);
  // Estado para almacenar todos los personajes cargados de la API
  const [characters, setCharacters] = useState<Character[]>([]);
  // Estado para manejar mensajes de error
  const [error, setError] = useState('')
  // Estado para indicar si aún se están cargando los datos
  const [loading, setLoading] = useState(true)

  // UseEffect se ejecuta una sola vez al cargar el componente
  useEffect(() => {
    // Carga los favoritos guardados en localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    setFavorites(Array.isArray(storedFavorites) ? storedFavorites : [])

    // Función para traer todos los personajes de la API
    const fetchCharacters = async () => {
      try {
        const res = await fetch('https://thronesapi.com/api/v2/Characters')
        if (!res.ok) throw new Error(`Error HTTP ${res.status}`)

        const data: Character[] = await res.json()
        setCharacters(data)
      } catch (error) {
        console.error('Error cargando personajes:', error)
        setError('No se pudieron cargar los personajes.')
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

  // Filtra solo los personajes que están marcados como favoritos
  const favoriteCharacters = characters.filter((character) =>
    favorites.includes(character.fullName)
  )

  return (
    <main className="favoritos-container">
      <header className="favoritos-header">
        <h1>Favoritos</h1>
        <p>Tus personajes favoritos de Juego de Tronos.</p>
      </header>

      {loading ? (
        <p className="info-message">Cargando personajes...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : favoriteCharacters.length === 0 ? (
        <p className="info-message">No tienes personajes favoritos aún.</p>
      ) : (
        <section className="character-grid">
          {favoriteCharacters.map((character) => {
            const favorito = favorites.includes(character.fullName)

            return (
              <article key={character.id} className="character-card">
                <Link to={`/personaje/${character.id}`} className="character-card-link">
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
                </Link>
              </article>
            )
          })}
        </section>
      )}
    </main>
  );
}

export default Favoritos;