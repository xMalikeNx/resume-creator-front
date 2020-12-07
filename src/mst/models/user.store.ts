import { types } from "mobx-state-tree";

export const UserStoreModel = types.model("UserModel").props({
  login: types.string,
  firstName: "",
  lastName: "",
  about: "",
  email: "",
  phone: "",
});