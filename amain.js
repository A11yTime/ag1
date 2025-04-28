// Custom Header Component
function CustomHeader() {}

CustomHeader.prototype.init = function (params) {
  this.eGui = document.createElement('div');

  // Add accessibility attributes
  this.eGui.setAttribute('role', 'columnheader');
  this.eGui.setAttribute('tabindex', '0'); // Makes header keyboard focusable

  // Add aria-label (fallback if not provided)
  const ariaLabel = params.ariaLabel || `Column header: ${params.displayName}`;
  this.eGui.setAttribute('aria-label', ariaLabel);

  // Set the visible header text
  this.eGui.innerText = params.displayName;
};

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
