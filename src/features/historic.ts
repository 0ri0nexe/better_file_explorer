import { getPath, setPath } from "../currentSettings";
import { clean } from "../utils";

function parsePath(cut: number) {
    console.log("depart :", getPath());
    let result = getPath().split("/").slice(0, -cut - 1);
    console.log("result :", result);
    return result;
}

export function getPreviousPath() {
    let newPath = parsePath(1).join("/") + "/";
    setPath(newPath);
    return newPath;
}

function setPathLenght(wanted_lenght: number) {
    wanted_lenght += 1 // because it starts at 0
    let actual_lenght = parsePath(0).length
    let toRemove = actual_lenght - wanted_lenght
    for (let i = 0; i < toRemove; i++) {
        getPreviousPath();
    }
}

export function showPath() {
    let historicBar = document.getElementById("historic_title");
    clean(historicBar!);
    let toSet = parsePath(0);
    for (let i = 0; i < toSet.length; i++) {
        let directory = toSet[i];
        let button = document.createElement("button");
        button.className = "historic_directory";
        button.onclick = () => { onClick(i) };
        button.textContent = directory;
        historicBar!.appendChild(button);

        let separator = document.createElement("p");
        separator.textContent = ">";
        historicBar!.appendChild(separator);
    }


}

function onClick(x: number) {
    setPathLenght(x);
}