import { useEffect, useState } from 'react';
import { format } from 'date-fns';

import firebaseService from '../../services/FirebaseService';

import { PersonUIData } from '../../types/Person';
import { useAuth } from '../../Auth/useAuth';

const PERSONS_COLLECTION = 'persons';

const usePersons = (): [Array<PersonUIData>] => {
  const [persons, setPersons] = useState<Array<PersonUIData>>([]);
  const auth = useAuth();

  useEffect(() => {
    if (!auth.user) return undefined;
    const db = firebaseService.firebaseApp.firestore();
    const personsRef = db
      .collection('userProfiles')
      .doc(auth.user.uid)
      .collection(PERSONS_COLLECTION);

    const personsObserver = personsRef.onSnapshot((personsSnapshot) => {
      const personsData = personsSnapshot.docs.map((p) => {
        const personData = p.data();

        return {
          person_name: personData.name,
          birthday: format(personData.birthday.toDate(), 'dd.MM.yyyy'),
          id: p.ref.id,
          offsetX: personData.offsetX,
          offsetY: personData.offsetY,
        };
      });
      setPersons(personsData as Array<PersonUIData>);
    });
    return () => {
      personsObserver();
    };
  }, [auth.user]);

  return [persons];
};

export default usePersons;
