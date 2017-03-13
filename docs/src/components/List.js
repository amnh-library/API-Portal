import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.fetch();
  }

  fetch() {
    fetch(`http://api-dev.library.amnh.org/api/v1/${this.props.entities}`)
      .then(response => response.json())
      .then(items => this.setState({ items }));
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={`GET - /api/v1/${this.props.entities}`} />
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton
              label="Refresh"
              primary={true}
              onClick={() => this.fetch()}
            />
          </ToolbarGroup>
        </Toolbar>
        {this.state.items.map((item, index) => (
          <Card key={index}>
            <CardHeader
              title={item.name}
              subtitle={<Link to={`/${this.props.entities}/${item.id}`}>{item.id}</Link>}
            />
          </Card>
        ))}
      </div>
    );
  }
}
