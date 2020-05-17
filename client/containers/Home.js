import React, { Component } from 'react';
import Layout from './../components/Layout';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <p>
          ClearList requires our clients to
          <br />
          register for a Trellis digital identification profile.
          <br />
          <br />
          This simple process will enable our clients to
          <br />
          streamline private-market transactions in a
          <br />
          secure manner.
        </p>
        
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
          <Link to="/process" style={{textDecoration: 'unset'}}>
            <Button variant="contained" disableElevation size="large" style={{borderRadius: 24}}>
            &nbsp;&nbsp;LET'S GET STARTED&nbsp;&nbsp;
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }
}

export default Home;
