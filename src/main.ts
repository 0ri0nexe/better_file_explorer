import { invoke } from "@tauri-apps/api/tauri";

let elements: Element[] = [];
let selected_row: number;
let currentPath = "F:/";

type SystemElement = {
  folder: boolean,
  name: String,
};

type Response = {
  element_list: SystemElement[],
};

async function getElements() {
  let new_elements: Response = await invoke("get_elements_from_path", {
    path: currentPath,
  });
  await replace_elements(new_elements);
}

async function replace_elements(new_elements: Response) {
  let explorer = document.getElementById("explorer");
  while (explorer?.hasChildNodes()) {
    explorer.firstChild?.remove();
  }
  console.log(new_elements)
  console.log(new_elements.element_list)
  elements.splice(0, elements.length)

  for (let i = 0; i < new_elements.element_list.length; i++) {
    const element = new_elements.element_list[i];
    console.log("tests sur", element.name);
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
  console.log(elements)
}

function onRowClicked(i: number) {
  console.log("clicked on", i)
  if (selected_row != undefined) {
    elements[selected_row].className = "row";
  }
  selected_row = i;
  elements[i].className = "row selected";
}

async function onDoubleClick(i: number) {
  currentPath += elements[i].textContent + "/"
  getElements()
}

window.addEventListener("DOMContentLoaded", () => {
  getElements();
});