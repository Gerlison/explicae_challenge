const tables = [];

const getUniqueRandomDozen = (arrayToVerify) => {
  const newDozen = Math.ceil(Math.random() * 60);
  if (!arrayToVerify.includes(newDozen)) return newDozen;
  return getUniqueRandomDozen(arrayToVerify);
};

const getGameDozens = () => {
  return Array.from({ length: 6 })
    .reduce((acc) => {
      acc.push(getUniqueRandomDozen(acc));
      return acc;
    }, [])
    .sort();
};

const createTableFields = (tableElement) => {
  let fieldNumber = 1;
  const rows = Array.from({ length: 6 }, () => {
    const newTRElement = document.createElement("tr");

    const cells = Array.from({ length: 10 }, (_, index) => {
      const newTDElement = document.createElement("td");
      newTDElement.id = `cell-${fieldNumber + index}`;
      newTDElement.append(fieldNumber + index);
      return newTDElement;
    });

    fieldNumber += 10;
    newTRElement.append(...cells);
    return newTRElement;
  });

  tableElement.append(...rows);
};

const appendTableToList = (tableElement) => {
  const tableId = `table-${tables.length}`;
  tableElement.id = tableId;
  tables.push({
    id: tableId,
    dozenSequence: getGameDozens(),
  });
};

const createTable = () => {
  const rootElement = document.querySelector("#root");
  const newTableElement = document.createElement("table");
  createTableFields(newTableElement);
  appendTableToList(newTableElement);
  rootElement.appendChild(newTableElement);
};

const checkDozens = (tableId) => {
  const activateTableCells = (id) => (dozen) => {
    document.querySelector(`#${id} #cell-${dozen}`).style.backgroundColor =
      "#ff00ff";
  };

  if (tableId) {
    return tables
      .find(({ id }) => id === tableId)
      .dozenSequence.forEach(activateTableCells(tableId));
  }

  tables.forEach((table) => {
    table.dozenSequence.forEach(activateTableCells(table.id));
  });
};

window.onload = () => {
  createTable();
  createTable();
  createTable();

  checkDozens();
};

const addTableManually = () => {
  createTable();
  checkDozens(tables[tables.length - 1].id);
};
