import { invoke } from "@tauri-apps/api/tauri";

import { getPath, setPath, getCurrentView, Views } from "../currentSettings";
import { clean } from "../utils";

// images import
import fileIconUrl from '../assets/icons/file_icon.png';
import folderIconUrl from '../assets/icons/folder_icon.png';

let selectedRow: number;
let elements: Element[] = [];

type SystemElement = {
    folder: boolean,
    name: String,
    // permissions: String,
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
    let view = getCurrentView();
    let explorer = document.getElementById("explorer");

    if (view == Views.Block) {
        explorer!.className = "entry_container";
    } else {
        explorer!.className = "container";
    }

    clean(explorer!);
    elements.splice(0, elements.length);

    selectedRow = -1;

    for (let i = 0; i < new_elements.element_list.length; i++) {
        const element = new_elements.element_list[i];
        // console.log(element.name, ":", element.permissions)
        let new_element: HTMLButtonElement = document.createElement("button");

        new_element.onclick = (_) => { onRowClicked(i) };
        new_element.addEventListener("dblclick", () => { onDoubleClick(i) })

        let icon = document.createElement("img");
        icon.className = "icon"
        if (element.folder) {
            icon.alt = "folder's icon";
            icon.src = folderIconUrl;
        } else {
            icon.alt = "file's icon";
            icon.src = fileIconUrl;
        }

        if (view == Views.Block) {
            new_element.className = "entry";
            icon.className = "entry_icon";
            icon.height = 100;
            icon.width = 100;

        } else {
            new_element.className = "row";
            icon.className = "icon";
        }

        new_element.appendChild(icon);

        let name = document.createElement("div");
        name.textContent = element.name.toString();
        name.className = "entry_term";
        new_element.appendChild(name)

        explorer?.appendChild(new_element);
        let rows = document.getElementsByClassName("row");
        if (view == Views.Block) {
            rows = document.getElementsByClassName("entry");
        }

        elements.push(rows[rows.length - 1]);
    }
}

function onRowClicked(i: number) {
    let currentViewName = getCurrentView() == Views.Block ? "entry" : "row"
    if (selectedRow != undefined && selectedRow >= 0) {
        elements[selectedRow].className = currentViewName;
    }
    selectedRow = i;
    elements[i].className = currentViewName + " selected";
}

async function onDoubleClick(i: number) {
    setPath(getPath() + elements[i].textContent + "/");
    getElements();
}