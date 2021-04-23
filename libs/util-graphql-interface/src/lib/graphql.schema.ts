
/*
 * ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Role {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
    GUEST = "GUEST"
}

export class CreatePostInput {
    message: string;
}

export class SignupInput {
    email: string;
    password: string;
    role: Role;
}

export class SigninInput {
    email: string;
    password: string;
}

export class UpdateMeInput {
    email?: string;
    avatar?: string;
    verified?: boolean;
}

export class Post {
    id: string;
    message: string;
    author: User;
    createdAt: string;
    likes: number;
    views: number;
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;

    abstract post(id: string): Post | Promise<Post>;

    abstract me(): User | Promise<User>;
}

export abstract class IMutation {
    abstract createPost(createPostInput: CreatePostInput): Post | Promise<Post>;

    abstract signup(signupInput: SignupInput): AuthUser | Promise<AuthUser>;

    abstract signin(signinInput: SigninInput): AuthUser | Promise<AuthUser>;

    abstract updateMe(updateMeInput: UpdateMeInput): User | Promise<User>;
}

export class User {
    id: string;
    email: string;
    avatar: string;
    verified: boolean;
    createdAt: string;
    posts: Post[];
    role: Role;
}

export class AuthUser {
    token: string;
    user: User;
}
