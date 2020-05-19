import React, { Component } from 'react';
import Layout from './../components/Layout';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import api from '../utils/api';

class Review extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Layout style={{ width: '100%' }}>
        <h5 style={{ textAlign: 'center' }}>Please Check for Accuracy</h5>
        <Grid container spacing={2} style={{ paddingTop: 10 }}>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField label="First Name*" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField label="Address 1*" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField label="Middle Name" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField label="Address 2" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField label="Last Name*" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField label="Address 3" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField label="DOB*" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField label="City*" />
            </FormControl>
          </Grid>
          <Grid item md={6} xs={12}>
            <FormControl fullWidth>
              <TextField label="Document #*" />
            </FormControl>
          </Grid>
          <Grid item md={3} xs={6}>
            <FormControl fullWidth>
              <TextField label="State*" />
            </FormControl>
          </Grid>
          <Grid item md={3} xs={6}>
            <FormControl fullWidth>
              <TextField label="Zip*" />
            </FormControl>
          </Grid>
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="btn-submit"
            variant="contained"
            color="primary"
            disableElevation
            size="large"
          >
            &nbsp;&nbsp;SUBMIT >&nbsp;&nbsp;
          </Button>
        </div>
      </Layout>
    );
  }
}

export default Review;
