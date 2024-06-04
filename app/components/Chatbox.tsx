'use client'
import React, { useState } from 'react';
import styled from 'styled-components';
import { generateText } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { Message, continueConversation } from './action';
import Typewriter from "./typewriter";
// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: #1c1c1c;
  border-radius: 8px;
  width: auto;
  padding: 10px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* Allow vertical scrolling */
  flex-grow: 1; /* Expand to fill remaining space */
`;

const Messages = styled.div`
  background-color: #444;
  color: white;
  border-radius: 8px;
  padding: 8px 12px;
  margin-bottom: 8px;
  align-self: flex-start; /* Align responses on the left */
`;

const UserMessage = styled(Messages)`
  align-self: flex-end; /* Align user messages on the right */
`;

const InputContainer = styled.div`
  display: flex;
  width: auto;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  background: none;
  border: none;
  color: #ccc;
  font-size: 16px;
  padding: 5px;
  text-align: left;
  outline: none;
  border-radius: 8px;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* Align buttons to the right */
  margin-top: 10px; /* Adjusted margin for spacing */
  padding: 2px;
`;


const Generate = styled.button`
  align-self: flex-start; /* Align button on the left */
  margin-right: 10px; /* Adjusted margin for spacing */
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &.generate {
    background-color: #007bff;
    color: white;
  }

  &.cancel {
    background-color: #444;
    color: #ccc;
  }

  &.share {
    background-color: #444;
    color: #ccc;
  }
  `

  const OtherSide = styled.button`
  margin-right: 10px; /* Adjusted margin for spacing */
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &.generate {
    background-color: #007bff;
    color: white;
  }

  &.cancel {
    background-color: #444;
    color: #ccc;
  }

  &.share {
    background-color: #444;
    color: #ccc;
  }
`;

// Component
const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);

  const handleUserInput = async (input: string) => {
    setMessages([...messages, { role: 'user', content: input }]);
  };

  const handleAIResponse = async (input: string) => {
    console.log('Waiting for AI Response')
    try {
      const { messages: newMessages, newMessage } = await continueConversation([
        ...messages,
        { role: 'user', content: input },
      ]);

      let textContent = '';

      for await (const delta of readStreamableValue(newMessage)) {
        textContent = `${textContent}${delta}`;

        setMessages([
          ...newMessages,
          { role: 'assistant', content: textContent },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerate = async () => {
    console.log('Generate clicked');
    if (input.trim() !== '') {
      await handleUserInput(input);
      await handleAIResponse(input);
      setInput('');
    }
  };

  const handleCancel = () => {
    setInput('');
  };

  const handleShare = () => {
    console.log('Share clicked');
    const newMessage = `Shared: ${input}`;

    // Add your share logic here
  };

  return (
    <div>
      <Container>
        <MessageContainer>
          {messages.map((message, index) =>
            message.role === 'user' ? (
              <UserMessage key={index}>{message.content}</UserMessage>
            ) : (
              <Messages key={index}>{<Typewriter texts={message.content} delay={100}/>}</Messages>
            )
          )}
        </MessageContainer>
        <InputContainer>
          <Input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleGenerate();
              }
            }}
          />
        </InputContainer>
      </Container>

      <ButtonContainer>
        <OtherSide className="cancel" onClick={handleCancel}>
          Cancel
        </OtherSide>
        <OtherSide className="share" onClick={handleShare}>
          Share
        </OtherSide>
        <Generate className="generate" onClick={handleGenerate}>
          Generate
        </Generate>
      </ButtonContainer>
    </div>
  );
};

export default ChatInput;