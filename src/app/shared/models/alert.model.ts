export interface Alert {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  closable?: boolean;
  timeout?: number;
}