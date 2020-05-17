import React, { Component } from 'react';
import Layout from '../components/Layout';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {init} from 'onfido-sdk-ui';
import api from '../utils/api';

class Process extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    api.get('/onfido_init').then(res => {
      init({
        token: res.sdk_token,
        containerId: 'onfido-mount',
        onComplete: function(data) {
          console.log("everything is complete");
        }
      });
    });
  }

  render() {
    return (
      <div id="onfido-mount"></div>
    );
  }
}

export default Process;
