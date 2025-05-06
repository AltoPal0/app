import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 space-y-6">
      <div className="flex space-x-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-24 h-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-24 h-24" alt="React logo" />
        </a>
      </div>

      <h1 className="text-4xl font-bold">Vite + React</h1>

      <div className="flex flex-col items-center space-y-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded shadow-md transition duration-300"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="text-sm text-gray-600">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <p className="text-gray-500 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App