import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100vh;
  max-height: 100vh;
  padding: 30px 20px 0;
`;

export const MessagesContainer = styled.div`
  width: 100%;

  max-height: 80vh;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  &::-webkit-scrollbar {
    width: 6px;
  }


  &::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 5px;
}
`

export const Message = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 4px;
  color: #fff;
  & + div {
    margin-top: 20px;
  }
  span {
    padding-top: 20px;
    font-weight: bold;
    font-size: 10px;
    opacity: 0.45;
  }
`;

export const Form = styled.form`
  width: 100%;
  padding: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  textarea {
    background: transparent;
    resize: none;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 5px 10px;
    color: #fff;
    margin-bottom: 16px;
    width: 80%;
    height: 100px;
   &::placeholder {
    color: #fff;
    opacity: 0.3;
    }
   }

   button {
    margin-bottom: 20px;
    border: none;
    width: 80%;
    padding: 10px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: rgba(17, 17, 17, 0.8);
  }
   }
`