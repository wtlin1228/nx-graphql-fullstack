export enum Role {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST',
}

export class SignupInput {
  email: string;
  password: string;
  role: Role;
}
