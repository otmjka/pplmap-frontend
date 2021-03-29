import firebase from 'firebase/app';

class AuthEvent extends Event {
  payload: firebase.User | undefined;

  constructor({
    type,
    eventInitDict,
    payload,
  }: {
    type: string;
    eventInitDict?: EventInit | undefined;
    payload?: firebase.User | undefined;
  }) {
    super(type, eventInitDict);
    this.payload = payload;
  }
}

export default AuthEvent;
