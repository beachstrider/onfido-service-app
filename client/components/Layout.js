import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Logo from './../assets/img/logo.png';

export default class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container className="main-container" fixed>
          <Card className="main-card">
            <div className="content-wrapper">
              <div className="logo-wrapper">
                <img src={Logo} />
              </div>
              <div className="main-content">
                <div style={this.props.style}>
                  {this.props.children}
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}
