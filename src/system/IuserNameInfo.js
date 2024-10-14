import { userInfo } from "node:os";
function userNameInfo() {
  console.log(userInfo().username);
}

export default userNameInfo;
