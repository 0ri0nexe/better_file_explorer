// TODO : setting a json file with these infos ???
let currentPath = "F:/";
let commonPaths = ["C:/", "D:/", "F:/", "F:/programmation/"]

import { showPath } from "./features/historic";
import { getElements } from "./features/explorer";

export function getPath(): string {
    return currentPath;
}

export function setPath(newPath: string) {
    if (newPath.length < 3) {
        newPath = "C:/";
    }
    currentPath = newPath;
    getElements();
    showPath();
}

export function setAndReturnPath(newPath: string) {
    setPath(newPath);
    return newPath;
}

export function getCommonPaths() {
    return commonPaths;
}