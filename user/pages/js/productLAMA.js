// Fetch data from the API and populate the product details
fetch('https://asia-southeast2-testlogin-366704.cloudfunctions.net/getallproduct')
.then(response => response.json())
.then(data => {
    const productList = document.getElementById('productList');
    const searchInput = document.getElementById('searchInput');

    const displayProducts = (products) => {
        productList.innerHTML = '';
        products.filter(item => item.status).forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'bg-white rounded-lg shadow-md product-card p-2';

            productCard.innerHTML = `
                <img src="${product.image}" alt="Product Image" class="product-image">
                <div class="p-2">
                    <h2 class="text-base font-bold mb-1">${product.name}</h2>
                    <p class="text-sm text-gray-600 mb-1">${product.description}</p>
                    <p class="text-sm text-gray-800 font-bold mb-1">Price: $${product.price}</p>
                    <p class="text-sm text-gray-800 font-bold mb-1">Size: ${product.size}</p>
                    <p class="text-sm text-gray-800 font-bold mb-1">Stock: ${product.stock}</p>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                        Add to Cart
                    </button>
                </div>
            `;

            productList.appendChild(productCard);
        });
    };

    displayProducts(data.data);

    // Filter products based on search input
    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.trim().toLowerCase();
        const filteredProducts = data.data.filter(product => product.name.toLowerCase().includes(searchValue));
        displayProducts(filteredProducts);
    });
})
.catch(error => console.error('Error fetching data:', error));