// Custom Header Component
function CustomHeader() {}

CustomHeader.prototype.init = function (params) {
  this.params = params;

  // Create the header element
  this.eGui = document.createElement('div');
  this.eGui.setAttribute('role', 'columnheader');
  this.eGui.setAttribute('tabindex', '0'); // Keyboard focusable
  this.eGui.setAttribute('aria-label', params.ariaLabel || `Column header: ${params.displayName}`);
  this.eGui.style.cursor = 'pointer';
  this.eGui.style.display = 'flex';
  this.eGui.style.alignItems = 'center';
  this.eGui.style.justifyContent = 'space-between';
  this.eGui.style.padding = '0 8px';

  // Header label
  this.label = document.createElement('span');
  this.label.innerText = params.displayName;
  this.eGui.appendChild(this.label);

  // Sort icon
  this.sortIcon = document.createElement('span');
  this.sortIcon.setAttribute('aria-hidden', 'true');
  this.sortIcon.style.marginLeft = '6px';
  this.updateSortIcon(); // set initial icon
  this.eGui.appendChild(this.sortIcon);

  // Event listeners
  this.eGui.addEventListener('click', () => this.sortColumn());
  this.eGui.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.sortColumn();
    }
  });

  // Listen to sort changes
  this.sortChangedListener = () => this.updateSortIcon();
  this.params.column.addEventListener('sortChanged', this.sortChangedListener);
};

CustomHeader.prototype.sortColumn = function () {
  const currentSort = this.params.column.getSort();
  const nextSort = currentSort === 'asc' ? 'desc' : currentSort === 'desc' ? null : 'asc';
  this.params.setSort(nextSort, true); // true = multi-sort
};

CustomHeader.prototype.updateSortIcon = function () {
  const sort = this.params.column.getSort();
  if (sort === 'asc') {
    this.sortIcon.innerText = '▲';
  } else if (sort === 'desc') {
    this.sortIcon.innerText = '▼';
  } else {
    this.sortIcon.innerText = '';
  }
};

CustomHeader.prototype.getGui = function () {
  return this.eGui;
};

CustomHeader.prototype.destroy = function () {
  this.params.column.removeEventListener('sortChanged', this.sortChangedListener);
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

// Init the grid on page load
document.addEventListener('DOMContentLoaded', function () {
  const gridDiv = document.querySelector('#myGrid');
  agGrid.createGrid(gridDiv, gridOptions);
});
