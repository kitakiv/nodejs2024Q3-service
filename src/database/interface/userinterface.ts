interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

interface UserObject {
  ids: string[];
  entries: {
    [id: string]: User;
  };
}

export { UserObject, User };
