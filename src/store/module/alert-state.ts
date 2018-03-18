export type AlertType = 'success' | 'info' | 'warning' | 'error';

export default class AlertState {
  public type: AlertType = 'success';
  public active: boolean = false;
  public message: string = '';
}
