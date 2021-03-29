/* eslint-disable import/no-duplicates */
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import config from '../config';
import AuthEvent from './AuthEvent';

/* eslint-disable @typescript-eslint/indent */
type FirebaseServiceInitType = {};

type FirebaseServiceEventType = 'log';

export const CHANNEL_NAME_ONMESSAGE = 'onMessage';

type ChannelNameOnMessage = typeof CHANNEL_NAME_ONMESSAGE;

type FirebaseChannels = ChannelNameOnMessage;
type ListenerCallback = (event: FirebaseServiceEvent) => void;

interface FirebaseServiceEvent {
  type: FirebaseServiceEventType;
  message?: string;
  event: Record<string, Object | null>;
}

type UserProfile = {
  uid: string;
} | null;

export type User = firebase.User | null;

class FirebaseService {
  channelNames: Record<
    FirebaseChannels,
    { callbacks: Array<ListenerCallback> }
  > = {
    onMessage: { callbacks: [] },
  };

  onMessageTarget: EventTarget;

  firebaseApp: firebase.app.App;

  db: firebase.firestore.Firestore;

  isAppLoading: boolean = true;

  currentUser: User = null;

  userProfile: UserProfile = null;

  constructor({}: FirebaseServiceInitType) {
    console.log('init Firebase Service', config.firebase);

    this.onMessageTarget = new EventTarget();
    this.firebaseApp = firebase.initializeApp(config.firebase);
    this.db = this.firebaseApp.firestore();

    this.init();
  }

  init() {
    firebase.auth().onAuthStateChanged(async (userData) => {
      console.log({ userData });
      this.isAppLoading = false;
      this.currentUser = userData;
      if (!userData) {
        // eslint-disable-next-line no-console
        return console.error('no user data');
      }
      this.userProfile = await this.getUserProfile(userData.uid);

      this.onMessageTarget.dispatchEvent(
        new AuthEvent({ type: CHANNEL_NAME_ONMESSAGE, userData }),
      );
      return undefined;
    });
  }

  async getUserProfile(uid: string): Promise<UserProfile> {
    const userProfileRef = await this.db.collection('userProfiles').doc(uid);
    const userProfileSnapshot = await userProfileRef.get();
    if (!userProfileSnapshot.exists) {
      await this.db.runTransaction(async (transaction) => {
        await transaction.set(userProfileRef, { uid });
      });
    }
    const userProfileData = userProfileSnapshot.data();
    return userProfileData as UserProfile;
  }

  setListener(
    channelName: FirebaseChannels,
    callback: (event: FirebaseServiceEvent) => void,
  ): () => void {
    try {
      if (!this.channelNames[channelName])
        throw new Error(`no channel: ${channelName}`);
      const localCallBack = (event: Event) => {
        // eslint-disable-next-line
        debugger;
        callback({
          type: 'log',
          message: 'to_do',
          event: { user: this.currentUser },
        });
      };

      this.onMessageTarget.addEventListener(channelName, localCallBack);

      return () => {
        this.onMessageTarget.removeEventListener(channelName, localCallBack);
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return () => {};
    }
  }

  get isAuthicated(): boolean {
    const authicatedStatus = !this.currentUser
      ? false
      : !this.currentUser.isAnonymous;
    console.log('isAuthicated', authicatedStatus);
    return authicatedStatus;
  }

  async signin() {
    await firebase.auth();
    return this.currentUser;
  }

  // eslint-disable-next-line class-methods-use-this
  async logout(): Promise<null> {
    await firebase.auth().signOut();
    return null;
  }
}

const firebaseService = new FirebaseService({});

export default firebaseService;
