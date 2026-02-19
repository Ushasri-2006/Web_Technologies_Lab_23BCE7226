let inventory = [];

// Show message
function showMessage(msg, success = true) {
    const message = document.getElementById('msg');
    message.style.color = success ? 'green' : 'red';
    message.textContent = msg;
}

// Load inventory from JSON
function loadInventory() {
    fetch('inventory.json')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load JSON");
            return response.json();
        })
        .then(data => {
            inventory = data;
            displayInventory();
        })
        .catch(err => showMessage("Error: " + err, false));
}

// Display inventory table
function displayInventory(filtered = null) {
    const tableBody = document.querySelector("#inventoryTable tbody");
    tableBody.innerHTML = "";
    const data = filtered || inventory;
    let totalValue = 0;

    if (data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6'>No products found</td></tr>";
    } else {
        data.forEach(product => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = product.id;
            row.insertCell(1).textContent = product.name;
            row.insertCell(2).textContent = product.category;
            row.insertCell(3).textContent = product.price;
            row.insertCell(4).textContent = product.stock;
            row.insertCell(5).innerHTML = `<button onclick="prepareDelete(${product.id})">Delete</button>`;

            // Conditional formatting for low stock
            if (product.stock <= 5) {
                row.classList.add('low-stock');
            }

            totalValue += product.price * product.stock;
        });
    }

    document.getElementById('totalValue').textContent = totalValue;
}

// Add product
function addProduct() {
    const id = parseInt(document.getElementById('addId').value);
    const name = document.getElementById('addName').value;
    const category = document.getElementById('addCategory').value;
    const price = parseFloat(document.getElementById('addPrice').value);
    const stock = parseInt(document.getElementById('addStock').value);

    if (!id || !name || !category || isNaN(price) || isNaN(stock)) {
        showMessage("Please fill all fields with valid data", false);
        return;
    }

    if (inventory.some(p => p.id === id)) {
        showMessage("Product ID already exists", false);
        return;
    }

    inventory.push({ id, name, category, price, stock });
    displayInventory();
    showMessage("Product added successfully");
}

// Update product
function updateProduct() {
    const id = parseInt(document.getElementById('updateId').value);
    const price = parseFloat(document.getElementById('updatePrice').value);
    const stock = parseInt(document.getElementById('updateStock').value);

    if (!id) {
        showMessage("Enter product ID to update", false);
        return;
    }

    const product = inventory.find(p => p.id === id);
    if (!product) {
        showMessage("Product not found", false);
        return;
    }

    if (!isNaN(price)) product.price = price;
    if (!isNaN(stock)) product.stock = stock;

    displayInventory();
    showMessage("Product updated successfully");
}

// Delete product
function deleteProduct() {
    const id = parseInt(document.getElementById('deleteId').value);
    if (!id) {
        showMessage("Enter product ID to delete", false);
        return;
    }

    const index = inventory.findIndex(p => p.id === id);
    if (index === -1) {
        showMessage("Product not found", false);
        return;
    }

    inventory.splice(index, 1);
    displayInventory();
    showMessage("Product deleted successfully");
}

// Search by category
function searchCategory() {
    const category = document.getElementById('searchCategory').value.trim().toLowerCase();
    if (!category) {
        showMessage("Enter category to search", false);
        return;
    }

    const filtered = inventory.filter(p => p.category.toLowerCase() === category);
    displayInventory(filtered);
    showMessage(`Found ${filtered.length} product(s) in category "${category}"`);
}

// Delete button helper
function prepareDelete(id) {
    document.getElementById('deleteId').value = id;
}

window.onload = loadInventory;
