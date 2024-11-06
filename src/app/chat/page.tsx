import ChatHeader from '@/components/ChatHeader';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';

export default function ChatPage() {
  return (
    <>
      <ChatHeader />
      <MessageList />
      <ChatInput />
    </>
  );
}
