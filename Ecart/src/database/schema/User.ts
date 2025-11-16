import Realm from 'realm';
import { User as UserType } from '@types';
import { openRealm } from '../realm';

export default class User extends Realm.Object {
  id!: Realm.BSON.ObjectId;
  name!: string;
  email!: string;
  hash!: string;
  mobile!: string;

  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      name: 'string',
      email: 'string',
      hash: 'string',
      mobile: 'string',
    },
  };
}

export const createUser = async ({ name, email, hash, mobile }: UserType) => {
  const realm = await openRealm();

  try {
    let newUser;
    realm.write(() => {
      newUser = realm.create(User.schema.name, {
        id: new Realm.BSON.ObjectId(),
        name,
        email,
        hash,
        mobile,
      });
    });

    return newUser;
  } catch (e) {
    console.error('Error creating user:', e);
  } finally {
    realm.close();
  }
};
