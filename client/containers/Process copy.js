import React, { Component } from 'react';
import Layout from '../components/Layout';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import { init } from 'onfido-sdk-ui';
import api from '../utils/api';

class Process extends Component {
  constructor(props) {
    super(props);

    this.state = {
      is_expired: false,
      is_waiting: false,
    };
  }

  componentDidMount() {
    api.get(`/onfido-init/${this.props.match.params.token}`).then((res) => {
      if (res.data.error) {
        this.setState({ is_expired: true });
        return;
      }
      console.log('=======', res.data);

      init({
        token: res.data.sdk_token,
        containerId: 'onfido-mount',
        steps: [
          {
            type: 'welcome',
            options: {
              title: 'Clear List',
              descriptions: [
                'ClearList requires our clients to register for a Trellis digital identification profile.',
                'This simple process will enable our clients to streamline private-market transactions in a secure manner.',
              ],
              nextButton: "LETS'S GET STARTED",
            },
          },
          'document',
          'face',
        ],
        onComplete: function (data) {
          api.get(`/onfido-check/${res.data.applicant_id}`).then((res) => {
            console.log('Checked==========', res);
            return setWaiting();
          });
        },
      });
    });
  }

  render() {
    if (this.state.is_expired) {
      return (
        <Layout>
          <p>
            Your verification token was expired.
            <br />
            Please try again.
            <br />
          </p>
        </Layout>
      );
    }
    if(this.state.is_waiting){
      return (
        <Layout>
          <CircularProgress className="loader-circle" color="inherit" />
        </Layout>
      );
    }else{
      return <div id="onfido-mount"></div>
    }
  }
}

export default Process;
