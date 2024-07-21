interface Message {
  message: string;
  room: string;
}

interface ServerToClientEvents {
  serverMsg: (data: Message) => void;
}

interface ClientToServerEvents {
  clientMsg: (data: Message) => void;
}

export type { ClientToServerEvents, ServerToClientEvents };
