// Row Data Interface

// Grid API: Access to Grid API methods
let gridApi;

// Grid Options: Contains all of the grid configurations
const gridOptions = {
  // Data to be displayed
  rowData: [
    { make: "Tesla", model: "Model Y", price: 64950, electric: true },
    { make: "Ford", model: "F-Series", price: 33850, electric: false },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    { make: "Mercedes", model: "EQA", price: 48890, electric: true },
    { make: "Fiat", model: "500", price: 15774, electric: false },
    { make: "Nissan", model: "Juke", price: 20675, electric: false },
  ],
  // Columns to be displayed (Should match rowData properties)
  columnDefs: [
    { field: "make" },
    { field: "model" },
    { field: "price" },
    { field: "electric" },
  ],
  defaultColDef: {
    flex: 1,
  },
};

// Add ARIA description element
const gridDescription = document.createElement("div");
gridDescription.id = "gridDescription";
gridDescription.className = "visually-hidden";
gridDescription.innerText = "This data grid displays a list of car makes, models, prices, and whether they are electric.";
document.body.prepend(gridDescription);

// Set ARIA attribute on the grid container
const gridDiv = document.querySelector("#myGrid");
gridDiv.setAttribute("role", "grid");
gridDiv.setAttribute("aria-describedby", "gridDescription");

// Create Grid
gridApi = agGrid.createGrid(gridDiv, gridOptions);
