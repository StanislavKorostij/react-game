import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const  Home = () => {
  const [data, setData] = useState([])

  useEffect(() => {
      fetch('http://localhost:3000')
        .then(response => response.json())
        .then(
          (result) => {
            setData(result)
          }
        )
  }, [])

  return (
    <>
      <h1>Pick an animal to care for</h1>
      <div className="card">
        {data.map((item) => (
          <Link to={`/animal/${item.id}`} key={item.id}>
            <img src={item.imageUrl} alt={item.animal} width="300" height="200" />
          </Link>
        ))}
      </div>
    </>
  )
}

export default Home