export interface SharedState {
  showLoadingSpinner: boolean;
  errorMessagge: string;
}
export const initialState: SharedState = {
  showLoadingSpinner: false,
  errorMessagge: '',
};
