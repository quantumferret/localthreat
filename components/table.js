import { Component } from 'preact';

import Row from './row';

export default class Table extends Component {
  state = {
    characters: [],
  };

  compareCharactersByDangerRatio = (a, b) => {
    if (a.dangerRatio != b.dangerRatio) {
      return a.dangerRatio > b.dangerRatio ? -1 : 1;
    }
    return a.name.localeCompare(b.name);
  };

  updateCharacter = (index, property, value) => {
    const characters = this.state.characters.slice();
    characters[index][property] = value;
    console.log(characters);
    this.setState({ characters  });
  };

  componentDidMount() {
    this.setState({
      characters: this.props.characters,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      characters: props.characters,
    });
  }

	render({}, { characters }) {
    console.log('render');

    const rows = characters.sort(this.compareCharactersByDangerRatio).map((character, index) => {
      return (
        <Row key={`${character.name}-${character.dangerRatio}`} name={character.name} onCharacterUpdate={(property, value) => this.updateCharacter(index, property, value)} />
      );
    });

		return (
      <section class="table">
  	    <table>
  	      <thead>
  	        <tr>
  	          <th>Character</th>
  	          <th>Corporation</th>
  	          <th>Alliance</th>
  	          <th>Danger</th>
  	          <th style="text-align: right"><abbr title="Wins">W</abbr></th>
  	          <th><abbr title="Losses">L</abbr></th>
  	        </tr>
  	      </thead>
  	      <tbody>
  	        {rows}
  	      </tbody>
  	    </table>
	    </section>
		);
	}
}