import { useEffect, useState } from 'react'
import './MemoryHome.css'
import CardSingle from './CardSingle'

function MemoryHome() {

  const cardImages = [
    { "src": "/img/apple.png", matched: false },
    { "src": "/img/orange.png", matched: false },
    { "src": "/img/Pears.png", matched: false },
    { "src": "/img/pngwing.png", matched: false },
    { "src": "/img/strawberry.png", matched: false },
    { "src": "/img/Tomatoes.png", matched: false },
  ]

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [animation, setAnimation] = useState('')

  const [nextLevel, setNextLevel] = useState(false)

  const shuffleCards = () => {

    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setNextLevel(false)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setAnimation('animation')
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } 
            else {
              return card
            }
          })
        })
          
        resetTurn()
      } else {
        setAnimation('')
        setTimeout(() => resetTurn() , 1000);
      }

      const hard = cards.filter(card =>{
        return (
          card.matched === true
          )
        })
        if(hard.length >= 10) {
          setTimeout(() => setNextLevel(true), 1000)
          setAnimation('animation-finsh')
        }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(preveTurns => preveTurns + 1)
    setDisabled(false)
  }

  // Start a New Game Automagically
  useEffect(() => {
    shuffleCards()
  },[])


  const home = document.querySelector('.MemoryHome')
  if (nextLevel === true) {
    const parentHeart = document.createElement("div");
    home.append(parentHeart);

    const createRandomHeart = setInterval(() => {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "&#129505;";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${ (Math.random() + 0.5)  * 1.5}s  `
    
      parentHeart.append(heart);

    }, 70);
  
    setTimeout(() => {
      clearInterval(createRandomHeart);
    }, 2200);
  
    setTimeout(() => {
      parentHeart.remove();
    }, 5000);
  }


  return (
    <div className="MemoryHome">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <span>turns: {turns}</span>
      <p>I Win It In 15 turns Show me in how many turns you will win</p>
      <div className='card-grid'>
        {cards.map(card => (
          <CardSingle 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled} animation={animation} 
          />
        ))}
      </div>
    </div>
  );
}

export default MemoryHome