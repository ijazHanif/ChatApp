import Sidebar from '@/components/Sidebar';
import { ReactNode } from 'react';

interface ChatLayoutProps {
  children: ReactNode;
}

function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}

export default ChatLayout;
