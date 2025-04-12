import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isSameSender, isSameUser, isLastMessage } from '../utils/helpers';
import { useUserContext } from '../context/userContext';
import { Avatar, Flex, Text, Tooltip } from '@chakra-ui/react';

function ScrollableChat({ messages }) {
  const { currentUser } = useUserContext();

  if (!messages || !Array.isArray(messages)) {
    console.log('No messages to display');
    return null;
  }

  return (
    <ScrollableFeed>
      {messages.map((message, index) => {
        if (!message || !message.sender || !message.content) {
          console.log('Invalid message:', message);
          return null;
        }

        const isSenderCurrentUser = message.sender._id === currentUser._id;

        return (
          <Flex
            key={message._id || index}
            alignItems="flex-end"
            paddingY={1}
            paddingX={2}
          >
            {(isSameSender(messages, message, index, currentUser._id) ||
              isLastMessage(messages, index, currentUser._id)) && (
              <Tooltip label={message.sender?.name || "User"} placement="bottom-start">
                <Avatar
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender?.name || "User"}
                  src={message.sender?.avatar?.url}
                />
              </Tooltip>
            )}
            <Flex
              flexDirection="column"
              marginLeft={
                isSameSender(messages, message, index, currentUser._id) ||
                isLastMessage(messages, index, currentUser._id)
                  ? 1
                  : 9
              }
              alignSelf={isSenderCurrentUser ? "flex-end" : "flex-start"}
              bg={isSenderCurrentUser ? "#d9fdd3" : "white"}
              borderRadius="lg"
              padding={2}
              maxWidth="75%"
            >
              <Text>{message.content}</Text>
              <Text fontSize="xs" color="gray.500" alignSelf="flex-end">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </ScrollableFeed>
  );
}

export default ScrollableChat;
