import React, { Component } from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import axios from 'axios'
import './GamesList.scss'

const uri = 'http://localhost:3000/api'

class GamesList extends Component {
  state = {
    opponent: ''
  }

  async componentDidMount () {
    this.getOpponentName(this.props.game.whitePlayer)
  }

  getOpponentName = async (opponentId) => {
    const user = await axios.get(`${uri}/user/${opponentId}`)
    const pseudo = user.data.fetchedUsers[0].pseudo
    await this.setState({ opponent: pseudo })
  }

  deleteGame () {
    const gameId = this.props.game._id
    axios.delete(`${uri}/game/delete/${gameId}`)
      .then(() => this.props.updateVue())
  }

  render () {
    const { game } = this.props
    const { opponent } = this.state
    const { deleteGame } = this
    return (
      <>
        {
          opponent.length > 0 &&
            <ListGroup.Item className="gamesListItem" action href={`/game/${game._id}`}>
              <span>Partie en cours contre {`${opponent}`}</span>
              <Button variant="danger" onClick={deleteGame.bind(this)}>Supprimer</Button>
            </ListGroup.Item>
        }
      </>
    )
  }
}

GamesList.propTypes = {
  game: PropTypes.object,
  updateVue: PropTypes.func
}

export default GamesList
