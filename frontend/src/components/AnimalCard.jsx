import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProducedGoods from './ProducedGoods'

const  AnimalCard = () => {
  const [animal, setAnimal] = useState({})
  const [userMoney, setUserMoney] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const params = useParams()

  useEffect(() => {
    const intervalFetch = setInterval(() => {
      fetch(`http://localhost:3000/animal/${params.id}`)
      .then(response => response.json())
      .then(
        (result) => {
          setAnimal(result.animal)
          setUserMoney(result.balance)
          setIsLoading(false)
        }
      )
    }, 1000)

    return () => clearInterval(intervalFetch)
    
  }, [params.id])

  const onAnimalAction = (type) => {
    const requestParams = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: type
      })
    }

    fetch(`http://localhost:3000/animal/${params.id}`, { ...requestParams })
      .then(response => response.json())
      .then(
        (result) => {
          setAnimal(result.animal)
          setUserMoney(result.balance)
        }
      )
  }

  return (
    <div className="card">
      {!isLoading
        ? <div className="content">
            <div className="animalCard">
              <img src={animal.imageUrl} alt={animal.animal} width="300" height="200" />
              <div className="progressbar">
                <div className="progress" style={{width: `${animal.hunger}%`}}>Hunger</div>
              </div>
            </div>
            <ProducedGoods animal={animal} onAnimalAction={onAnimalAction} userMoney={userMoney} />
          </div>
        : <div id="loading"></div>
      }
      
    </div>
  )
}

export default AnimalCard