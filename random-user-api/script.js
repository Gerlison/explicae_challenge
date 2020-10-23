class Table {
  #users;
  constructor(users) {
    this.#users = users;
  }

  #createTablesRecursively(value, table) {
    Object.keys(value).forEach((key) => {
      const TRElement = document.createElement("tr");
      const THElement = document.createElement("th");
      const TDElement = document.createElement("td");

      THElement.append(key);
      TRElement.appendChild(THElement);

      if (value[key] && typeof value[key] === "object") {
        const tableElement = document.createElement("table");
        this.#createTablesRecursively(value[key], tableElement);
        TDElement.appendChild(tableElement);
        TRElement.appendChild(TDElement);
      } else {
        TDElement.append(value[key] || "s/n");
        TRElement.appendChild(TDElement);
      }

      return table.append(TRElement);
    });
  }

  #createChildTables(user) {
    const tableElement = document.createElement("table");
    this.#createTablesRecursively(user, tableElement);
    return tableElement;
  }

  create() {
    const rootElement = document.querySelector("#root");

    this.#users.forEach((user) => {
      const tableElement = document.createElement("table");
      const THElement = document.createElement("th");
      const TDElement = document.createElement("td");
      const THRowElement = document.createElement("tr");
      const TDRowElement = document.createElement("tr");

      THElement.append(`${user.name.first} ${user.name.last}`);
      THRowElement.appendChild(THElement);

      TDElement.appendChild(this.#createChildTables(user));
      TDRowElement.appendChild(TDElement);

      tableElement.append(THRowElement, TDRowElement);
      rootElement.appendChild(tableElement);
    });
  }
}

window.onload = () => {
  fetch("https://randomuser.me/api/?results=5")
    .then((res) => res.json())
    .then(({ results }) => {
      console.log(results);
      const table = new Table(results);
      table.create();
    });
};
