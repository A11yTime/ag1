function CustomHeader() {}

CustomHeader.prototype.init = function (params) {
  this.params = params;

  // Create wrapper
  this.eGui = document.createElement('div');
  this.eGui.setAttribute('role', 'columnheader');
  this.eGui.setAttribute('tabindex', '0');
  this.eGui.setAttribute('aria-label', params.ariaLabel || `Column header: ${params.displayName}`);
  this.eGui.style.cursor = 'pointer';
  this.eGui.style.display = 'flex';
  this.eGui.style.alignItems = 'center';
  this.eGui.style.justifyContent = 'space-between';
  this.eGui.style.padding = '0 8px';

  // Label
  this.label = document.createElement('span');
  this.label.innerText = params.displayName;
  this.eGui.appendChild(this.label);

  // Sort Icon
  this.sortIcon = document.createElement('span');
  this.sortIcon.setAttribute('aria-hidden', 'true');
  this.sortIcon.style.marginLeft = '6px';
  this.eGui.appendChild(this.sortIcon);

  // Sort icon update
  this.updateSortIcon = () => {
    const sort = this.params.column.getSort();
    if (sort === 'asc') {
      this.sortIcon.innerText = '▲';
    } else if (sort === 'desc') {
      this.sortIcon.innerText = '▼';
    } else {
      this.sortIcon.innerText = '';
    }
  };

  // Always keep icon in sync
  this.params.column.addEventListener('sortChanged', this.updateSortIcon);
  this.updateSortIcon(); // initial

  // Sort toggle logic
  const sortColumn = () => {
    const currentSort = this.params.column.getSort();
    const nextSort = currentSort === 'asc' ? 'desc' : currentSort === 'desc' ? null : 'asc';
    this.params.setSort(nextSort, false); // false = replace, true = multi-sort
  };

  // Events
  this.eGui.addEventListener('click', sortColumn);
  this.eGui.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      sortColumn();
      
    }
  });
};

CustomHeader.prototype.getGui = function () {
  return this.eGui;
};

CustomHeader.prototype.destroy = function () {
  this.params.column.removeEventListener('sortChanged', this.updateSortIcon);
};

// Grid Options
const gridOptions = {
  columnDefs: [
    {
      field: 'make',
      headerName: 'Car Make',
      headerComponent: CustomHeader,
      headerComponentParams: {
        ariaLabel: 'Column header: Car Make'
      }
    },
    {
      field: 'model',
      headerComponent: CustomHeader,
      headerComponentParams: {
        ariaLabel: 'Column header: Model'
      }
    },
    {
      field: 'price',
      headerComponent: CustomHeader,
      headerComponentParams: {
        ariaLabel: 'Column header: Price in USD'
      }
    },
    {
      field: 'electric',
      headerComponent: CustomHeader,
      headerComponentParams: {
        ariaLabel: 'Column header: Is Electric'
      }
    }
  ],
  defaultColDef: {
    flex: 1,
    sortable: true
  },
  rowData: [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false }
  ]
};

// Add ARIA description element
const gridDescription = document.createElement("div");
gridDescription.id = "gridDescription";
gridDescription.className = "visually-hidden";
gridDescription.innerText = "This data grid displays a list of car makes, models, prices, and whether they are electric.";
document.body.prepend(gridDescription);

// Init grid
document.addEventListener('DOMContentLoaded', function () {
  const gridDiv = document.querySelector('#myGrid');
  gridDiv.setAttribute("role", "grid");
  agGrid.createGrid(gridDiv, gridOptions);
  gridDiv.setAttribute("aria-describedby", "gridDescription");
});

