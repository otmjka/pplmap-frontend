import firebaseService from '../services/FirebaseService';

const changePersonPosition = async ({
  personId,
  offsetX,
  offsetY,
}: {
  personId: string;
  offsetX: number;
  offsetY: number;
}) => {
  const db = firebaseService.firebaseApp.firestore();
  const uid = firebaseService.userProfile?.uid;
  const userProfileRef = db.collection('userProfiles').doc(uid);
  const personRef = userProfileRef.collection('persons').doc(personId);
  await db.runTransaction(async (transaction) => {
    await transaction.update(personRef, {
      offsetX,
      offsetY,
    });
  });
};

export default changePersonPosition;
