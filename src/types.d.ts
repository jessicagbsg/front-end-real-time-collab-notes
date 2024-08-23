export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export type UserLoginDTO = {
  email: string;
  password: string;
};

export type CreateUserDTO = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type Note = {
  id: string;
  room: string;
  title?: string;
  content?: string;
  ownerId: string;
  members?: string[];
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
};

export type CreateNoteDTO = {
  title?: string;
  content?: string;
  ownerId: string;
};

export type UpdateNoteDTO = CreateNoteDTO & {
  members?: string[];
};
