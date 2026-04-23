import './style.css'
import informativaImg from '../assets/informativa2.png'

function Informativa() {
  return (
    <main className="informativa-page">
      <section className="informativa-hero">
        <h1>Informativa</h1>
        <img className="informativa-banner" src={informativaImg} alt="Informativa" />
      </section>

      <section className="informativa-copy">
        <p>
          Pagina informativa 
        </p>
      </section>
    </main>
  )
}

export default Informativa
