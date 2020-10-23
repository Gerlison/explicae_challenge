const megasena = (() => {
  const _tables = [];

  const _getUniqueRandomDozen = (arrayToVerify) => {
    const newDozen = Math.ceil(Math.random() * 60);
    if (!arrayToVerify.includes(newDozen)) return newDozen;
    return _getUniqueRandomDozen(arrayToVerify);
  };

  const _createTableFields = (tableElement) => {
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

  const _appendTableToList = (tableElement) => {
    const tableId = `table-${_tables.length}`;
    tableElement.id = tableId;
    _tables.push({
      id: tableId,
      dozenSequence: generateGameDozens(),
    });
  };

  const generateGameDozens = () => {
    return Array.from({ length: 6 })
      .reduce((acc) => {
        acc.push(_getUniqueRandomDozen(acc));
        return acc;
      }, [])
      .sort();
  };

  const createTable = () => {
    const rootElement = document.querySelector("#root");
    const newTableElement = document.createElement("table");
    _createTableFields(newTableElement);
    _appendTableToList(newTableElement);
    rootElement.appendChild(newTableElement);
  };

  const hightlightSelectedDozens = () => {
    const activateTableCells = (id) => (dozen) => {
      document.querySelector(`#${id} #cell-${dozen}`).style.backgroundColor =
        "#ff00ff";
    };

    _tables.forEach((table) => {
      table.dozenSequence.forEach(activateTableCells(table.id));
    });
  };

  return {
    createTable,
    hightlightSelectedDozens,
    generateGameDozens,
    get tables() {
      return _tables;
    },
  };
})();

window.onload = () => {
  megasena.createTable();
  megasena.createTable();
  megasena.createTable();

  megasena.hightlightSelectedDozens();
};

const addTableManually = () => {
  megasena.createTable();
  megasena.hightlightSelectedDozens();
};
