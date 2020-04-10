import React, { useState, useEffect } from "react";

import api from './services/api'
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    
    const response = await api.post('/repositories', {
      title: `Novo repository ${Date.now()}`,
      url: "https://github.com/erickpessoa/gostack-template-conceitos-reactjs",
      techs: ['nova tech']
    })

    setRepositories([...repositories, response.data])

  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`/repositories/${id}`)

    if (response.status === 204) {
      const n = repositories.filter(repository => repository.id !== id)
      setRepositories([...n])
    }

    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
