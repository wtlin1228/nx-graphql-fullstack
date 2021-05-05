import { nanoid } from 'nanoid';
import { Role } from '@nx-graphql-fullstack/util-graphql-interface';

// types
import type { Post, User } from '@nx-graphql-fullstack/util-graphql-interface';

export const generateRandomUser = ({
  id = nanoid(),
  email = `${id}@email.com`,
  avatar = `https://fakeavatar.com/${id}`,
  verified = false,
  createdAt = Date.now().toString(),
  posts = [],
  role = Role.GUEST,
}: {
  id?: string;
  email?: string;
  avatar?: string;
  verified?: boolean;
  createdAt?: string;
  posts?: Post[];
  role?: Role;
} = {}): User => {
  return {
    id,
    email,
    avatar,
    verified,
    createdAt,
    posts,
    role,
  };
};

export const generateRandomPost = ({
  id = nanoid(),
  message = `This is the fake message of Post-${id}`,
  author = generateRandomUser(),
  createdAt = Date.now().toString(),
  likes = 0,
  views = 0,
}: {
  id?: string;
  message?: string;
  author?: User;
  createdAt?: string;
  likes?: number;
  views?: number;
} = {}): Post => {
  return {
    id,
    message,
    author,
    createdAt,
    likes,
    views,
  };
};
