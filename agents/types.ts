export interface Message {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  agentName?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface AgentConfig {
  name: string;
  role: string;
  systemPrompt: string;
  model?: string;
  temperature?: number;
}

export interface AgentAction {
  type: 'CREATE_PRODUCT' | 'CREATE_POST' | 'SEND_MESSAGE' | 'UPDATE_DATA';
  data: any;
}

export interface AgentResponse {
  agentName: string;
  shouldRespond: boolean;
  message?: string;
  actions?: AgentAction[];
  reasoning?: string;
}
