import { useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth } from '../firebase'
import './style.css'

function Usuario() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setMessage(user ? `Conectado como ${user.email}` : 'No hay sesión iniciada')
    })
    return unsubscribe
  }, [])

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message
    return String(error)
  }

  const handleRegister = async () => {
    setMessage('')
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setMessage('Registro exitoso. Sesión iniciada.')
    } catch (error) {
      setMessage('Error al registrar: ' + getErrorMessage(error))
    }
  }

  const handleLogin = async () => {
    setMessage('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setMessage('Inicio de sesión correcto.')
    } catch (error) {
      setMessage('Error al iniciar sesión: ' + getErrorMessage(error))
    }
  }

  const handleLogout = async () => {
    setMessage('')
    try {
      await signOut(auth)
      setMessage('Sesión cerrada correctamente.')
    } catch (error) {
      setMessage('Error al cerrar sesión: ' + getErrorMessage(error))
    }
  }

  return (
    <main className="user-page">
      <section className="user-panel">
        <header className="user-header">
          <div>
            <h1>Panel de usuario</h1>
            <p className="user-subtitle">Controla tu sesión con Firebase Auth</p>
          </div>
          <span className={`status-badge ${currentUser ? 'online' : 'offline'}`}>
            {currentUser ? '✅ Iniciado' : '🔒 Cerrado'}
          </span>
        </header>

        <div className="status-card">
          <p>{currentUser ? `Bienvenido ${currentUser.email}` : 'Usa el formulario para iniciar sesión o registrar un usuario.'}</p>
        </div>

        {!currentUser ? (
          <form className="user-form" onSubmit={event => event.preventDefault()}>
            <label>
              Correo electrónico
              <input
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="tu@email.com"
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </label>
            <div className="form-actions">
              <button type="button" onClick={handleLogin} className="button primary">
                Iniciar sesión
              </button>
              <button type="button" onClick={handleRegister} className="button secondary">
                Registrar
              </button>
            </div>
          </form>
        ) : (
          <div className="user-logout">
            <p>Estás conectado. Puedes cerrar la sesión cuando quieras.</p>
            <button type="button" onClick={handleLogout} className="button logout">
              Cerrar sesión
            </button>
          </div>
        )}

        {message && <div className="user-message">{message}</div>}

        <div className="note-card">
          <p>
            Esta página usa Firebase como base de datos NoSQL para autenticación. Actualiza
            <code>src/firebase.ts</code> con tu configuración de proyecto y vuelve a compilar.
          </p>
        </div>
      </section>
    </main>
  )
}

export default Usuario
