import Realm from 'realm';
import { User as UserType } from '@types';
import { openRealm } from '../realm';

export default class User extends Realm.Object {
  id!: Realm.BSON.ObjectId;
  name!: string;
  email!: string;
  password!: string;
  mobile!: string;

  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      name: 'string',
      email: 'string',
      password: 'string',
      mobile: 'string',
    },
  };
}

export const createUser = async ({ name, email, password, mobile }: UserType) => {
  const realm = await openRealm();

  try {
    const existingUser = realm.objects(User.schema.name).filtered("email == $0 OR mobile == $1", email, mobile)

    if (existingUser.length > 0) {
      return 409;
    }

    realm.write(() => {
        realm.create(User.schema.name, {
        id: new Realm.BSON.ObjectId(),
        name,
        email,
        password,
        mobile,
      });
    });

    return 201;

  } catch (e) {
    console.error("Error creating user:", e);
    return '';
  } finally {
    realm.close();
  }
};

export const getUserByCredentials = async (
  email: string,
  password: string,
) => {
  const realm = await openRealm();

  try {
    const users = realm
      .objects<User>(User.schema.name)
      .filtered('email == $0 AND password == $1', email, password);

    if (users.length === 0) {
      return null;
    }

    const user = users[0];

    return {
      id: user.id.toHexString(),
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    };
  } catch (e) {
    console.error('Error fetching user:', e);
    return null;
  } finally {
    realm.close();
  }
};