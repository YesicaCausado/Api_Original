import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Configuración de Firebase para tu proyecto
const firebaseConfig = {
  apiKey: 'AIzaSyAhdfIIfUaTfF0o9o2N7_z_vppdTP1qPH0',
  authDomain: 'juegodetronos-21522.firebaseapp.com',
  projectId: 'juegodetronos-21522',
  storageBucket: 'juegodetronos-21522.firebasestorage.app',
  messagingSenderId: '384212297732',
  appId: '1:384212297732:web:a572a03a060860570aed51',
  measurementId: 'G-JQ5CB1LKVH',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
