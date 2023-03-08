import { PATH_DELIMITER } from "../constants";

export function decodePath(path: string) {
  return path.split(PATH_DELIMITER).map((part) => parseInt(part));
}
