import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { gql } from 'apollo-boost';
import { Container, MessagesContainer, Message, Form } from './styles';
import { useParams } from 'react-router-dom';

interface IMessage {
  id: number;
  content: string;
  user: {
    email: string;
  };
}

const GET_ALL_MESSAGES = gql`
  query {
    getMessages {
      id
      content
      user {
        email
      }
    }
  }
`;

const CREATE_MESSAGE = gql`
  mutation ($content: String!, $userId: Float!){
    createMessage (data: {content: $content, userId: $userId}){
      id
    }
  }
`;

const MESSAGE_ADDED = gql`
  subscription {
    messageAdded {
      id
      content
      user {
        email
      }
    }
  }
`

interface IParams {
  id: string
}

const Board = () => {
  const [input, setInput] = useState('')
  const [allMessages, setAllMessages] = useState<IMessage[]>([])
  const { data: messages } = useQuery<{ getMessages: IMessage[] }>(
    GET_ALL_MESSAGES
  );
  const { data: subscriptionMessage, loading: loadingSubscription } = useSubscription<{ messageAdded: IMessage}>(MESSAGE_ADDED)
  const [createMessage] = useMutation(CREATE_MESSAGE)

  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const params: IParams = useParams()

  useEffect(() => {
    if(!messages?.getMessages) return

    setAllMessages(messages.getMessages)

  }, [messages])

  if(!loadingSubscription) {

      const newMessage = subscriptionMessage?.messageAdded as IMessage

      const hasMessage = allMessages.filter(message => message.id === newMessage.id)

      if(hasMessage.length === 0) {
        setAllMessages([newMessage, ...allMessages])
      }
  }
    
 
  const submitForm = async (event: FormEvent) => {
    event.preventDefault()

    const { id } = params

    await createMessage({
      variables: {
        userId: Number(id),
        content: input
      }
    })

    setInput('')
  }

  return (
    <Container>
      <MessagesContainer ref={messagesContainerRef}>
        {allMessages.map(item => (
          <Message key={item.id}>
            <p>{item.content}</p>

            <span>{item.user.email}</span>
          </Message>
        ))}
      </MessagesContainer>
      <Form onSubmit={submitForm}>
        <textarea
          name="message"
          onChange={e => setInput(e.target.value)}
          value={input}/>
        <button>Enviar</button>
      </Form>
    </Container>
  );
}

export default Board