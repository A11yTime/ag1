// Custom Header Component
function CustomHeader() {}

CustomHeader.prototype.init = function (params) {
  this.params = params;

  // Create the header div
  this.eGui = document.createElement('div');
  this.eGui.setAttribute('role', 'columnheader');
  this.eGui.setAttribute('tabindex', '0'); // Make it focusable via keyboard

  // Set aria-label for accessibility
  const ariaLabel = params.ariaLabel || `Column header: ${params.displayName}`;
  this.eGui.setAttribute('aria-label', ariaLabel);
  this.eGui.innerText = params.displayName;

  // Add pointer cursor for clicks
  this.eGui.style.cursor = 'pointer';

  // Add a click event listener
  this.eGui.addEventListener('click', () => {
    this.sortColumn();
  });

  // Add keydown event listener for Enter/Space
  this.eGui.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.sortColumn();
      e.preventDefault(); // Prevent page scroll on Space key
    }
  });

  // We use a timeout to ensure the grid is fully initialized
  setTimeout(() => {
    this.setupClickListener();
  }, 0);
};

// Function to set up click behavior after grid has been initialized
CustomHeader.prototype.setupClickListener = function () {
  this.eGui.addEventListener('click', (event) => {
    // Ensure we're not preventing default click behavior on the grid
    event.stopPropagation();
    this.sortColumn();
  });
};

// Function to toggle the sorting order
CustomHeader.prototype.sortColumn = function () {
  const sort = this.params.column.getSort();
  const nextSort = sort === 'asc' ? 'desc' : sort === 'desc' ? null : 'asc';
  this.params.setSort(nextSort, true); // true = multi-sort enabled
};

// Function to get the HTML structure for the custom header
CustomHeader.prototype.getGui = function () {
  return this.eGui;
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
    flex: 1
  },
  rowData: [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ]
};

// Initialize the grid
document.addEventListener('DOMContentLoaded', function () {
  const gridDiv = document.querySelector('#myGrid');
  agGrid.createGrid(gridDiv, gridOptions);
});
