import React, { Component } from 'react';

import './App.css';

// import components 
import Card from './components/Card';
import DrawButton from './components/DrawButton';
// Config for firebase
import { DB_CONFIG } from './config/firebase/db_config'
// firebase
import firebase from 'firebase/app';
import 'firebase/database';

class App extends Component {
  constructor(props) {
    super(props);

    // Initialize app with firebase
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('cards');

    this.state = {
      cards: [],
      currentCard: {}
    }
  }
  // Called right after constructor, before render
  componentWillMount() {
    // currentCards now equal to our array of cards
    const currentCards = this.state.cards;
    // database ref
    this.database.on('child_added' , snap => {
      currentCards.push({
        id: snap.val().id,  // or firebases 'key'
        eng: snap.val().eng,
        han: snap.val().han,
        pin: snap.val().pin,
      })
      this.setState({
        // set state of cards to our variable to currentCards
        cards: currentCards,
        // currentCard now equal to the result of a random card from the cards array
        currentCard: this.getRandomCard(currentCards)
      })
    })
  }
  // Get random card from our state cards array
  getRandomCard(currentCards) {
    var card = currentCards[Math.floor(Math.random() * currentCards.length)];
    return (card);
  }

  // update card 
  updateCard = () => {
    const currentCards = this.state.cards;
    this.setState({
      currentCard: this.getRandomCard(currentCards)
    })
  }
  render() {
    return (
      <div>
        <div className="card-row">
          <Card eng={this.state.currentCard.eng}
            han={this.state.currentCard.han}
            pin={this.state.currentCard.pin}
          />
        </div>
        <div className="buttonRown">
          <DrawButton drawCard={this.updateCard}/>
        </div>
      </div>
    );
  }
}

export default App;
