import { setAndReturnPath, getPath, setPath } from "../currentSettings";

function parsePath(cut: number) {
    console.log("depart :", getPath())
    let result = getPath().split("/").slice(0, -cut - 1)
    console.log("result :", result)
    return result
}

export function getPreviousPath() {
    let newPath = parsePath(1).join("/") + "/";
    setPath(newPath);
    return newPath;
}

export function showPath() {
    var historicBar = document.getElementById("historic_title")

    var toSet = parsePath(0).join(" > ")

    historicBar!.textContent = toSet;
}