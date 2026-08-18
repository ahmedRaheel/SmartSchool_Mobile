import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useApp } from '../app/AppProvider';
import { Screen } from '../components/Screen';
import { Header } from '../components/ui';
import { theme } from '../theme/theme';

const conversations = [
  { id: 'parent', name: 'Mrs. Yusuf', context: 'Parent • Amina Yusuf' },
  { id: 'teacher', name: 'Sadia Iqbal', context: 'Mathematics Teacher' },
  { id: 'finance', name: 'Finance Office', context: 'Fees & Accounts' },
];

export function ChatScreen() {
  const { messages, sendMessage } = useApp();
  const [activeConversationId, setActiveConversationId] = useState('parent');
  const [draftMessage, setDraftMessage] = useState('');

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId,
  );

  const conversationMessages = useMemo(
    () =>
      messages.filter(
        (message) => message.conversationId === activeConversationId,
      ),
    [activeConversationId, messages],
  );

  function handleSend() {
    if (!draftMessage.trim()) {
      return;
    }

    sendMessage(activeConversationId, draftMessage);
    setDraftMessage('');
  }

  return (
    <Screen>
      <Header
        title="Messages"
        subtitle="Parent-teacher communication with persistent mock history."
      />

      <View style={styles.conversationRow}>
        {conversations.map((conversation) => (
          <Pressable
            key={conversation.id}
            onPress={() => setActiveConversationId(conversation.id)}
            style={[
              styles.conversation,
              conversation.id === activeConversationId &&
                styles.activeConversation,
            ]}
          >
            <Text
              style={[
                styles.conversationName,
                conversation.id === activeConversationId &&
                  styles.activeConversationText,
              ]}
            >
              {conversation.name}
            </Text>
            <Text
              style={[
                styles.conversationContext,
                conversation.id === activeConversationId &&
                  styles.activeConversationContext,
              ]}
            >
              {conversation.context}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.threadTitle}>{activeConversation?.name}</Text>
      <Text style={styles.threadContext}>{activeConversation?.context}</Text>

      <View style={styles.messages}>
        {conversationMessages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageBubble,
              message.sender === 'me' && styles.myMessageBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                message.sender === 'me' && styles.myMessageText,
              ]}
            >
              {message.text}
            </Text>
            <Text
              style={[
                styles.messageTime,
                message.sender === 'me' && styles.myMessageTime,
              ]}
            >
              {message.sentAt}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.composer}>
        <TextInput
          multiline
          placeholder="Write a message..."
          style={styles.composerInput}
          value={draftMessage}
          onChangeText={setDraftMessage}
        />
        <Pressable
          disabled={!draftMessage.trim()}
          onPress={handleSend}
          style={[
            styles.sendButton,
            !draftMessage.trim() && styles.disabledButton,
          ]}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  conversationRow: {
    flexDirection: 'row',
    gap: 7,
    marginBottom: 18,
  },
  conversation: {
    backgroundColor: 'white',
    borderColor: theme.colors.line,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    padding: 9,
  },
  activeConversation: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  conversationName: {
    color: theme.colors.text,
    fontSize: 10,
    fontWeight: '800',
  },
  activeConversationText: {
    color: 'white',
  },
  conversationContext: {
    color: theme.colors.muted,
    fontSize: 8,
    marginTop: 3,
  },
  activeConversationContext: {
    color: '#E1DEFF',
  },
  threadTitle: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  threadContext: {
    color: theme.colors.muted,
    fontSize: 10,
    marginBottom: 14,
    marginTop: 3,
  },
  messages: {
    flex: 1,
    gap: 8,
  },
  messageBubble: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderColor: theme.colors.line,
    borderRadius: 14,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    maxWidth: '84%',
    padding: 11,
  },
  myMessageBubble: {
    alignSelf: 'flex-end',
    backgroundColor: theme.colors.primary,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 4,
    borderColor: theme.colors.primary,
  },
  messageText: {
    color: theme.colors.text,
    fontSize: 11,
    lineHeight: 17,
  },
  myMessageText: {
    color: 'white',
  },
  messageTime: {
    color: theme.colors.muted,
    fontSize: 8,
    marginTop: 4,
  },
  myMessageTime: {
    color: '#DDD9FF',
  },
  composer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  composerInput: {
    backgroundColor: 'white',
    borderColor: theme.colors.line,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    maxHeight: 100,
    minHeight: 46,
    padding: 10,
  },
  sendButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    height: 46,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  disabledButton: {
    opacity: 0.45,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '800',
  },
});
