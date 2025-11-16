import Realm from 'realm';
import User from './schema/User';

export const openRealm = () => {
  return Realm.open({
    path: 'db.realm',
    schema: [User],
  });
};
