import { getCommonPaths, setPath } from "../currentSettings";
import { clean } from "../utils";

export function showSidebar() {
    let sidebar = document.getElementById("sidebar")
    clean(sidebar!);
    for (let path of getCommonPaths()) {
        console.log("path", path);

        let button = document.createElement("button");
        button.className = "sidebar-directory";
        button.onclick = () => { onClick(path) };
        button.textContent = path;
        sidebar!.appendChild(button);
    }
}

function onClick(path: string) {
    setPath(path);
}