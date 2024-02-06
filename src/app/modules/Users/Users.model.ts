import { Schema, model } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { IUser, UserModel } from './Users.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: Object.values(ENUM_USER_ROLE),
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

UserSchema.methods.isUserExist = async function (
  id: string
): Promise<Partial<IUser> | null> {
  const user = await User.findOne(
    { id },
    {
      password: 1,
      needsPasswordChange: 1,
      id: 1,
      role: 1,
    }
  );

  return user;
};

UserSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isPasswordMatched = await bcrypt.compare(givenPassword, savedPassword);
  return isPasswordMatched;
};

UserSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
