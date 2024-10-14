import { arch } from "node:os";
function architectureInfo() {
  console.log(arch());
}

export default architectureInfo;
