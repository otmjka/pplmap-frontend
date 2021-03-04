import { parse } from 'date-fns';

import firebaseService from '../services/FirebaseService';

const addPerson = async ({
  personData,
}: {
  personData: {
    name: string;
    birthday?: string;
  };
}) => {
  const db = firebaseService.firebaseApp.firestore();
  const uid = firebaseService.userProfile?.uid;
  const userProfileRef = db.collection('userProfiles').doc(uid);
  const personRef = userProfileRef.collection('persons').doc();
  await db.runTransaction(async (transaction) => {
    await transaction.set(personRef, {
      name: personData.name,
      birthday: personData.birthday
        ? parse(personData.birthday, 'dd.MM.yyyy', new Date())
        : null,
    });
  });
};

export default addPerson;
