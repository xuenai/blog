
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

function Test() {
  const { loading, errors, data } = useQuery(gql`
    {
      users{
        username
      }
    }
  `);
  if (loading) return <p>Loading...</p>;
  if (errors) return <p>Error :(</p>;
  return data.users.map(({ id, username }) => (
    <div key={id}>
      <p>
        昵称: {username}
      </p>
    </div>
  ));
}

export default Test

