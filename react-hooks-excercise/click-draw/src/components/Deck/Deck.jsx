import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';

const Deck = () => {
    //useStates() 
    const [deckId, setDeckId] = useState(null);
    const [cardsLeft, setCardsLeft] = useState(0);
    const [cards, setCards] = useState([]);

    //Rerenders the deck if a new state-value is obtained: 
    useEffect(() => {
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            .then(response => {
                const data = response.data;
                setDeckId(data.deck_id);
                setCardsLeft(data.remaining);
            });
    }, []);

    const drawCard = () => {
        if (cardsLeft === 0) {
            alert('NO MORE CARDS ARE REMAINING');
            return;
        }

        axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
            .then(response => {
                const data = response.data;
                setCards(prevCards => [...prevCards, data.cards[0]]);
                setCardsLeft(data.remaining);
            });
    };

    return (
        <div>
            <div style={{ position: 'relative', width: '200px', height: '300px' }}>
                {cards.map((card, index) => (
                    <Card key={index} image={card.image} style={{
                        position: 'absolute',
                        top: `${index * 5}px`,  
                        left: `${index * 5}px`, 
                        transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (1 + index * 2)}deg)` 
                    }} />
                ))}
            </div>
            <button onClick={drawCard}>Draw a card!</button>
            {cardsLeft === 0 && <div>No cards remaining in the deck.</div>}
        </div>
    );
};

export default Deck;
