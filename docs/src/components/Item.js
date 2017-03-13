import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

const singular = (entities) => {
  switch (entities) {
    case 'people': return 'person';
    case 'departments': return 'department';
    case 'expeditions': return 'expedition';
    case 'exhibitions': return 'exhibtions';
    default: return entities;
  }
};

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {}
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    fetch(`http://api-dev.library.amnh.org/api/v1/${this.props.entities}/${this.props.id}`)
      .then(response => response.json())
      .then(response => response[singular(this.props.entities)])
      .then(item => this.setState({ item }));
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={`GET - /api/v1/${this.props.entities}/${this.props.id}`} />
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton
              label="Refresh"
              primary={true}
              onClick={() => this.fetch()}
            />
          </ToolbarGroup>
        </Toolbar>
        <Paper style={{ padding: '1em' }}>

        </Paper>
      </div>
    );
  }
}

/*
{this.state.item.}
{Object.keys(this.state.item).map(function recursion(key, index) {
  console.log(this.state.item);
  console.log(this.state.item[key]);
  const value = typeof this.state.item[key] === 'object' ? _.map(this.state.item[key])`"${key}": "${this.state.item[key]}"` : '';
  return (
    <div key={index}>
      {value}
    </div>
  );
}.bind(this))}
*/
