import React, { Component } from 'react';
import Layout from './../components/Layout';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      token: ''
    });
  }

  componentDidMount(){
    api.get('/create-token').then(res => {
      this.setState({
        token: res.data.token
      });
      
      axios.get('https://api.us.onfido.com/v2/checks/65ba3cba-fb26-4efc-910c-b8963ebf3891/reports/d366aa7d-1a54-4932-8098-7b75041ff9a0', {
        headers: {
          'Authorization': `Token token=api_live_us.MaeAbLhMdLy.9Ltktp6QOTKL_UqwePmBXPge59D36uLL`,
          'Access-Control-Allow-Origin': '*'
        }
      }).then(res => {
        console.log('success cros origin? =============>', res);
      });
    });
  }

  render() {
    return (
      <Layout>
        <p>
          Your invited verification link is below.
          <br />
          It's live only one time, so please click the link to get started.
          <br />
        </p>
        
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
          <Link to={`/process/${this.state.token}`}>
            {/* <Button variant="contained" disableElevation size="large" style={{borderRadius: 24}}> */}
            Verify
            {/* </Button> */}
          </Link>
        </div>
      </Layout>
    );
  }
}

export default Home;
