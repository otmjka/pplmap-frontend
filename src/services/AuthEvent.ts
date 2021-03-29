import firebase from 'firebase/app';

class AuthEvent extends Event {
  userData: firebase.User | undefined;

  constructor({
    type,
    eventInitDict,
    userData,
  }: {
    type: string;
    eventInitDict?: EventInit | undefined;
    userData?: firebase.User | undefined;
  }) {
    super(type, eventInitDict);
    this.userData = userData;
  }
}

export default AuthEvent;
