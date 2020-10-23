class _File {
  #paragraphElement = document.querySelector("p");
  #content = null;

  get content() {
    return this.#content;
  }

  set content(content) {
    this.#content = content;
  }

  #show() {
    this.#paragraphElement.innerHTML = this.#content;
  }

  read(file) {
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      var text = reader.result;
      this.content = text;
      this.#show();
    };
  }
}

const listenFileChanges = (_file) => {
  const inputElement = document.querySelector("input");
  const labelElement = document.querySelector("label");

  inputElement.addEventListener("change", (event) => {
    const file = event.target.files[0];
    labelElement.innerHTML = file.name;
    _file.read(file);
  });
};

window.onload = () => {
  const _file = new _File();
  listenFileChanges(_file);
};
