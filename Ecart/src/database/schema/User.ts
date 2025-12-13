import Realm from 'realm';
import { User as UserType } from '@types';
import { openRealm } from '../realm';

export default class User extends Realm.Object {
  id!: Realm.BSON.ObjectId;
  name!: string;
  email!: string;
  password!: string;
  mobile!: string;
  dob!: Date; 
  gender!: 'male' | 'female' | 'other'; 

  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      name: 'string',
      email: 'string',
      password: 'string',
      mobile: 'string',
      dob: 'date',     
      gender: 'string', 
    },
  };
}

export const createUser = async ({ name, email, password, mobile, dob, gender }: UserType) => {
  const realm = await openRealm();

  try {
    const existingUser = realm.objects(User.schema.name).filtered("email == $0 OR mobile == $1", email, mobile)

    if (existingUser.length > 0) {
      return {code: 409};
    }

    const id = new Realm.BSON.ObjectId();

    realm.write(() => {
        realm.create(User.schema.name, {
        id,
        name,
        email,
        password,
        mobile,
        dob,
        gender
      });
    });

    return {code: 201, id};

  } catch (e) {
    console.error("Error creating user:", e);
    return {status: 500};
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
      gender: user.gender,
      dob: user.dob,
    };
  } catch (e) {
    console.error('Error fetching user:', e);
    return null;
  } finally {
    realm.close();
  }
};