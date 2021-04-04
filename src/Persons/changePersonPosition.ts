import firebaseService from '../services/FirebaseService';
import { CoordsXY } from '../types/Coords';

const changePersonPosition = async ({
  personId,
  offset,
}: {
  personId: string;
  offset: CoordsXY;
}) => {
  const db = firebaseService.firebaseApp.firestore();
  const uid = firebaseService.userProfile?.uid;
  const userProfileRef = db.collection('userProfiles').doc(uid);
  const personRef = userProfileRef.collection('persons').doc(personId);
  await db.runTransaction(async (transaction) => {
    await transaction.update(personRef, {
      offsetX: offset.x,
      offsetY: offset.y,
    });
  });
};

export default changePersonPosition;
