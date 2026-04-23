import { useMemo, useState } from 'react'
import './style.css'

// Datos de estandartes que puede elegir el usuario
const banners = [
  { name: 'Luz del Norte', tone: 'guardia de sombras', line: 'Cuando la bruma cae, nuestra llama permanece en guardia.' },
  { name: 'Tormenta de Bronce', tone: 'golpe de guerra', line: 'Que el viento anuncie nuestros pasos y la tierra tiemble bajo ellos.' },
  { name: 'Llama Carmesí', tone: 'corazón ardiente', line: 'El fuego no perdona; el fuego purifica.' },
  { name: 'Sombra del Bosque', tone: 'sigilo antiguo', line: 'Nuestros pasos apenas despiertan hojas ni memorias.' },
]

// Datos de virtudes que puede elegir el usuario
const virtues = [
  { label: 'Honor', phrase: 'forjamos promesas con acero y palabra.' },
  { label: 'Astucia', phrase: 'movemos piezas mientras otros miran al frente.' },
  { label: 'Lealtad', phrase: 'jamás nos volvemos la espalda entre los nuestros.' },
  { label: 'Valor', phrase: 'cargamos primero y no retrocedemos nunca.' },
]

// Firmas de casas disponibles
const signs = ['Sable', 'Alas', 'Corona', 'Hielo']

const characters = [
  {
    id: 1,
    fullName: 'Jon Snow',
    title: 'Rey en el Norte',
    family: 'Casa Stark',
    description: 'Honorable, firme y leal, siempre busca proteger a su gente.',
    banners: ['Luz del Norte', 'Tormenta de Bronce'],
    virtues: ['Honor', 'Valor'],
    signs: ['Sable', 'Hielo'],
    image: 'https://thronesapi.com/assets/images/jon-snow.jpg',
  },
  {
    id: 2,
    fullName: 'Daenerys Targaryen',
    title: 'Madre de Dragones',
    family: 'Casa Targaryen',
    description: 'Apasionada y ambiciosa, con un destino marcado por el fuego.',
    banners: ['Llama Carmesí'],
    virtues: ['Valor', 'Lealtad'],
    signs: ['Corona', 'Alas'],
    image: 'https://thronesapi.com/assets/images/daenerys-targaryen.jpg',
  },
  {
    id: 3,
    fullName: 'Tyrion Lannister',
    title: 'Dwarf of Casterly Rock',
    family: 'Casa Lannister',
    description: 'Astuto y analítico, sabe aprovechar su ingenio en cada decisión.',
    banners: ['Sombra del Bosque', 'Tormenta de Bronce'],
    virtues: ['Astucia', 'Honor'],
    signs: ['Corona', 'Alas'],
    image: 'https://thronesapi.com/assets/images/tyrion-lannister.jpg',
  },
  {
    id: 4,
    fullName: 'Arya Stark',
    title: 'No One',
    family: 'Casa Stark',
    description: 'Silenciosa, implacable y adaptable, siempre lista para cambiar de estrategia.',
    banners: ['Sombra del Bosque'],
    virtues: ['Astucia', 'Valor'],
    signs: ['Alas', 'Hielo'],
    image: 'https://thronesapi.com/assets/images/arya-stark.jpg',
  },
  {
    id: 5,
    fullName: 'Cersei Lannister',
    title: 'Reina de los Siete Reinos',
    family: 'Casa Lannister',
    description: 'Implacable y ambiciosa, siempre busca el poder por encima de todo.',
    banners: ['Tormenta de Bronce', 'Llama Carmesí'],
    virtues: ['Astucia', 'Lealtad'],
    signs: ['Corona', 'Sable'],
    image: 'https://thronesapi.com/assets/images/cersei-lannister.jpg',
  },
]

// Función que calcula qué tan parecido es un personaje a las elecciones del usuario
function getMatchScore(character, banner, virtue, sign) {
  let score = 0
  // Si el personaje coincide con el estandarte elegido, suma 2 puntos
  if (character.banners.includes(banner.name)) score += 2
  // Si el personaje coincide con la virtud elegida, suma 2 puntos
  if (character.virtues.includes(virtue.label)) score += 2
  // Si el personaje coincide con la firma elegida, suma 1 punto
  if (character.signs.includes(sign)) score += 1
  return score
}

function Original() {
  const [banner, setBanner] = useState(banners[0])
  const [virtue, setVirtue] = useState(virtues[0])
  const [sign, setSign] = useState(signs[0])

  const house = useMemo(() => {
    const name = `${banner.name} de ${sign}`
    const motto = `${virtue.label} antes que la duda.`
    const description = `${banner.line} Con ${virtue.label.toLowerCase()} como estandarte, ${virtue.phrase} Nuestra casa ${name.toLowerCase()} escribe su nombre en la piedra del camino.`
    return { name, motto, description }
  }, [banner, sign, virtue])

  // Encuentra el personaje con la puntuación más alta según las elecciones del usuario
  const bestCharacter = useMemo(() => {
    return characters
      .map((character) => ({ character, score: getMatchScore(character, banner, virtue, sign) }))
      .sort((a, b) => b.score - a.score)[0].character
  }, [banner, virtue, sign])

  return (
    <main className="original-page">
      <header className="original-header">
        <h1>Haz el blasón de tu casa</h1>
      </header>

      <section className="forge-panel">
        <div className="forge-column">
          <h2>1. Elige tu estandarte</h2>
          <div className="option-grid">
            {banners.map((item) => (
              <button
                key={item.name}
                type="button"
                className={banner.name === item.name ? 'option activo' : 'option'}
                onClick={() => setBanner(item)}
              >
                <strong>{item.name}</strong>
                <small>{item.tone}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="forge-column">
          <h2>2. Escoge tu virtud</h2>
          <div className="option-grid">
            {virtues.map((item) => (
              <button
                key={item.label}
                type="button"
                className={virtue.label === item.label ? 'option activo' : 'option'}
                onClick={() => setVirtue(item)}
              >
                <strong>{item.label}</strong>
                <small>{item.phrase}</small>
              </button>
            ))}
          </div>

          <h2>3. Agrega la firma de tu casa</h2>
          <div className="signature-row">
            {signs.map((item) => (
              <button
                key={item}
                type="button"
                className={sign === item ? 'option corto activo' : 'option corto'}
                onClick={() => setSign(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="final-banner">
        <div className="banner-card">
          <h2>{house.name}</h2>
          <p className="banner-motto">{house.motto}</p>
          <p>{house.description}</p>
        </div>
      </section>

      <section className="match-section">
        <h2>Personaje más parecido</h2>
        <div className="match-card">
          <img
            className="match-avatar"
            src={bestCharacter.image}
            alt={bestCharacter.fullName}
          />
          <div className="match-info">
            <h3>{bestCharacter.fullName}</h3>
            <p className="match-title">{bestCharacter.title}</p>
            <p className="match-family">{bestCharacter.family}</p>
            <p>{bestCharacter.description}</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Original
