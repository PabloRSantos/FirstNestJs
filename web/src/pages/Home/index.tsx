import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa';
import { Container, Button, Content, Input } from './styles';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
 

export const CREATE_OR_LOGIN_USER = gql`
  mutation($email: String!) {
    createOrLoginUser(data: { email: $email }) {
      id
    }
  }
`;

const Home: React.FC = () => {
  const [input, setInput] = useState<string>('');


  const history = useHistory()

  const [createOrLoginUser] = useMutation(CREATE_OR_LOGIN_USER);

  async function handleRegister(e: React.MouseEvent) {
    e.preventDefault();

    if (input.length < 1) {
      alert('Insert a valid e-mail!');
      return;
    }

    const { data } = await createOrLoginUser({ variables: { email: input } });

    setInput('');

    const userId = data.createOrLoginUser.id
    history.push(`/dashboard/${userId}`);
  }

  return (
    <Container>
      <Content>
        <form>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="E-mail"
          />

          <Button onClick={handleRegister}>
            <FaCheck size={36} color="#fff" />
            <span>Login or Register</span>
          </Button>
        </form>
      </Content>
    </Container>
  );
};

export default Home;