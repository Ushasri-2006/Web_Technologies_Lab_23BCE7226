const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const loading = document.getElementById("loading");

let debounceTimer;

// Debounce Function
function debounce(callback, delay) {
    return function () {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(callback, delay);
    };
}

searchInput.addEventListener("keyup", debounce(function () {

    const query = searchInput.value.toLowerCase().trim();

    if (query === "") {
        resultsDiv.innerHTML = "";
        return;
    }

    loading.style.display = "block";
    resultsDiv.innerHTML = "";

    fetch("products.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {

            loading.style.display = "none";

            const filteredProducts = data.products.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );

            if (filteredProducts.length === 0) {
                resultsDiv.innerHTML = "<p class='no-result'>No results found</p>";
                return;
            }

            filteredProducts.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                productDiv.innerHTML = `
                    <strong>${product.name}</strong><br>
                    Price: ₹${product.price}<br>
                    Category: ${product.category}
                `;

                resultsDiv.appendChild(productDiv);
            });
        })
        .catch(error => {
            loading.style.display = "none";
            resultsDiv.innerHTML = "<p class='error'>Error fetching products</p>";
            console.error("Error:", error);
        });

}, 500)); // 500ms debounce delay
