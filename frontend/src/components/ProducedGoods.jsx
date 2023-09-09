import PropTypes from 'prop-types'

const  ProducedGoods = ({ animal, onAnimalAction, userMoney }) => {

  return (
    <div>
      <div className='inventoryCard'>
        {animal.produced.length
          ? animal.produced.map((item, index) => {
            return (
              <div key={index} className="materialCard" style={{backgroundImage: `url(${item.imageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
                <div>{item.material}</div>
                <div>Price: {item.price}$</div>
                <button onClick={() => onAnimalAction('sell')}>{item.action}</button>
              </div>
            )
          })
        : <div className="materialCard">Nothing produced</div>
          
        }
      </div>
        <button onClick={() => onAnimalAction('feed')}>Feed animal {animal.feedCost}$</button>
        <div>Balance: {userMoney}$</div>
    </div>
  )
}

ProducedGoods.propTypes = {
  animal: PropTypes.object,
  onAnimalAction: PropTypes.func,
  userMoney: PropTypes.number
}

export default ProducedGoods