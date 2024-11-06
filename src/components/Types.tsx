export interface User {
    id: number;
    name: string;
    lastMessage: string;
    lastSeen: string;
  }
  
export interface Message {
    sender: string;
    content: string;
    time: string;
  }
  
export type SidebarProps = {
    users: User[];
    activeUser: User | null;
    setActiveUser: (user: User) => void;
  };
  