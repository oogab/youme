import React from 'react';
import CreateChallengeForm from '../../../components/Challenge/CreateForm';
import {Grid} from '@material-ui/core';
import Layout from '../../../layout/index';

const CreateChallenge = () => {
  return (
    <Layout>
      <Grid container item xs={12}>
        <CreateChallengeForm />
      </Grid>
    </Layout>         
  );
}

export default CreateChallenge;