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
      console.log("==================",res);

      init({
        token: 'api_live_us.MaeAbLhMdLy.9Ltktp6QOTKL_UqwePmBXPge59D36uLL',
        containerId: 'onfido-mount',
        onComplete: function(data) {
          console.log("everything is complete")
          // `data` will be an object that looks something like this:
          //
          // {
          //   "document_front": {
          //     "id": "5c7b8461-0e31-4161-9b21-34b1d35dde61",
          //     "type": "passport",
          //     "side": "front"
          //   },
          //   "face": {
          //     "id": "0af77131-fd71-4221-a7c1-781f22aacd01",
          //     "variant": "standard"
          //   }
          // }
          //
          // For two-sided documents like `driving_licence` and `national_identity_card`, the object will also
          // contain a `document_back` property representing the reverse side:
          //
          // {
          //   ...
          //   "document_back": {
          //     "id": "6f63bfff-066e-4152-8024-3427c5fbf45d",
          //     "type": "driving_licence",
          //     "side": "back"
          // }
          //
          // You can now trigger your backend to start a new check
          // `data.face.variant` will return the variant used for the face step
          // this can be used to perform a facial similarity check on the applicant
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
