import React from 'react';
import './DrawButton.css';

class DrawButton extends  React.Component {x    

    drawCard = () => {
        this.props.drawCard();
    }
    render() {
        return (
            <div className="button-container">
                <button className="btn" 
                onClick={this.drawCard}>Draw Card</button>
            </div>
        )
    }
}

export default DrawButton;