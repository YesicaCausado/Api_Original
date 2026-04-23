// Importa las librerías y componentes necesarios para el enrutamiento
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Importa cada página de la aplicación
import Informativa from './Informativa'
import Original from './Orginal'
import Usuario from './Usuario'
import Home from './Home'
import Favoritos from './Favorito'
import Personaje from './Personaje'
import './App.css'

function App() {

  return (
    <>
    <Router>
      {/* Define las rutas de la aplicación y qué componente mostrar en cada ruta */}
      <Routes>
        {/* Ruta principal: página de inicio */}
        <Route path="/" element={<Home />} />
        {/* Ruta de favoritos */}
        <Route path="favoritos" element={<Favoritos />} />
        {/* Ruta de la página original donde se crea casa y se busca personaje similar */}
        <Route path="original" element={<Original />} />
        {/* Ruta informativa con imagen y descripción */}
        <Route path="informativa" element={<Informativa />} />
        {/* Ruta de usuario */}
        <Route path="usuario" element={<Usuario />} />
        {/* Ruta de detalle del personaje con ID dinámico */}
        <Route path="personaje/:id" element={<Personaje />} />
        {/* Ruta comodín: cualquier ruta no encontrada va a Home */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Menú de navegación fijo al pie de la página */}
      <nav className="c-menu">
        <Link to="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDy9mBtyJWUPLRobv__N2OwHYdiKAWarKroQ&s" /><p>Home</p></Link>
        <Link to="/favoritos"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwirKiGL1VFlx1A456XT5nxNyWds8y4-K5zg&s" /><p>Favoritos</p></Link>
        <Link to="/original"><img src="https://media.istockphoto.com/id/1448912272/vector/soccer-ball-icon-football-game-ball-icons.jpg?s=170667a&w=0&k=20&c=BppyhfxxHRxTSk_1urxYxFTh9a-UprsyYm5vI0XC7Lg=" /><p>Original</p></Link>
        <Link to="/informativa"><img src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/more-info-icon.png" /><p>Informativa</p></Link>
        <Link to="/usuario"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNzXYh-X4wxX1jfbPywa8HWoNGDnx1Tlo0-g&s" /><p>Usuario</p></Link>   
      </nav>
    </Router>
    </>
  )
}

export default App