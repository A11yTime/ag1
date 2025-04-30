function CustomHeader() {}

CustomHeader.prototype.init = function (params) {
  this.params = params;

  // Create the outer wrapper
  this.eGui = document.createElement('div');
  this.eGui.setAttribute('tabindex', '0');
  this.eGui.setAttribute('aria-label', params.ariaLabel || `Column header: ${params.displayName}`);
  this.eGui.style.display = 'flex';
  this.eGui.style.alignItems = 'center';
  this.eGui.style.justifyContent = 'space-between';
  this.eGui.style.padding = '0 8px';
  this.eGui.style.cursor = 'pointer';

  // Create the label container
  this.labelContainer = document.createElement('div');
  this.labelContainer.setAttribute('data-ref', 'eLabel');
  this.labelContainer.classList.add('ag-header-cell-label');
  this.labelContainer.style.display = 'flex';
  this.labelContainer.style.alignItems = 'center';
  this.labelContainer.style.gap = '6px';

  // Create the label text
  this.label = document.createElement('span');
  this.label.setAttribute('data-ref', 'eText');
  this.label.classList.add('ag-header-cell-text');
  this.label.innerText = params.displayName;

  // Create the sort icon
  this.sortIcon = document.createElement('span');
  this.sortIcon.setAttribute('aria-hidden', 'true');
  this.sortIcon.classList.add('custom-sort-icon');

  // Append the label and sort icon to the label container
  this.labelContainer.appendChild(this.label);
  this.labelContainer.appendChild(this.sortIcon);
  this.eGui.appendChild(this.labelContainer);

  // Update the sort icon based on the column's sort state
  this.updateSortIcon = () => {
    const sort = this.params.column.getSort();
    this.sortIcon.innerText = sort === 'asc' ? '▲' : sort === 'desc' ? '▼' : '';
  };

  // Listen for sort changes
  this.params.column.addEventListener('sortChanged', this.updateSortIcon);
  this.updateSortIcon();

  // Sorting logic
  const sortColumn = () => {
    const currentSort = this.params.column.getSort();
    const nextSort = currentSort === 'asc' ? 'desc' : currentSort === 'desc' ? null : 'asc';
    this.params.setSort(nextSort, false);
  };

  // Event listeners for sorting
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

// ARIA grid description
const gridDescription = document.createElement("div");
gridDescription.id = "gridDescription";
gridDescription.className = "visually-hidden";
gridDescription.innerText = "This data grid displays a list of car makes, models, prices, and whether they are electric.";
document.body.prepend(gridDescription);

// Initialize AG Grid
document.addEventListener('DOMContentLoaded', function () {
  const gridDiv = document.querySelector('#myGrid');
  gridDiv.setAttribute("role", "grid");
  gridDiv.setAttribute("aria-describedby", "gridDescription");
  agGrid.createGrid(gridDiv, gridOptions);
});
