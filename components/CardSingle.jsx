import React from 'react'
import './cardSingle.css'

const CardSingle = ({ card , handleChoice, flipped , disabled, animation }) => {

  const handleClick = () => {
    if(!disabled)
      handleChoice(card)
  }

  return (

    <div className={`card  ${card.matched ? animation : ''}`}>
      <div className={flipped ? "flipped" : ''}>
        <img className='front' src= {card.src} alt='card' />
        <img className='back'
          src='/img/card.jpg' alt='card' onClick={handleClick}/>
      </div>
    </div>

  )
}

export default CardSingle