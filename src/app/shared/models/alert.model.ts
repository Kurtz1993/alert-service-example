export interface AlertConfig {
  id?: number; // Declared as optional as it will be generated dynamically.
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  closable?: boolean;
  timeout?: number;
}