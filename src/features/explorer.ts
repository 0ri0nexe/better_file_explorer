import { invoke } from "@tauri-apps/api/tauri";

import { getPath, setPath } from "../currentSettings";

let selectedRow: number;
let elements: Element[] = [];

type SystemElement = {
    folder: boolean,
    name: String,
};

type Response = {
    element_list: SystemElement[],
};

export async function getElements() {
    let new_elements: Response = await invoke("get_elements_from_path", {
        path: getPath(),
    });
    await replace_elements(elements, new_elements);
}

function replace_elements(elements: Element[], new_elements: Response) {
    let explorer = document.getElementById("explorer");
    while (explorer?.hasChildNodes()) {
        explorer.firstChild?.remove();
    }
    elements.splice(0, elements.length)

    selectedRow = -1

    for (let i = 0; i < new_elements.element_list.length; i++) {
        const element = new_elements.element_list[i];
        let new_element: HTMLButtonElement = document.createElement("button");
        new_element.className = "row";
        new_element.onclick = (_) => { onRowClicked(i) };
        new_element.addEventListener("dblclick", () => { onDoubleClick(i) })


        let icon = document.createElement("img");
        icon.className = "icon"
        if (element.folder) {
            icon.alt = "folder's icon";
            icon.src = "src/assets/icons/folder_icon.png";
        } else {
            icon.alt = "file's icon";
            icon.src = "src/assets/icons/file_icon.png";
        }
        new_element.appendChild(icon);

        let name = document.createElement("div");
        name.textContent = element.name.toString();
        name.className = "term";
        new_element.appendChild(name)

        explorer?.appendChild(new_element);
        let rows = document.getElementsByClassName("row")
        elements.push(rows[rows.length - 1]);
    }
}

function onRowClicked(i: number) {
    if (selectedRow != undefined && selectedRow >= 0) {
        elements[selectedRow].className = "row";
    }
    selectedRow = i;
    elements[i].className = "row selected";
}

async function onDoubleClick(i: number) {
    setPath(getPath() + elements[i].textContent + "/");
    getElements();
}