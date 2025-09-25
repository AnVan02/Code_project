// Dữ liệu sản phẩm (được lưu trữ tạm thời, có thể thay bằng API)
const productsData = [
    { id: 1, name: "SSD 512GB NVMe Gen4", category: "SSD", brand: "Kingston", capacity: "512GB", price: 950000, minQty: 10, specs: ["Chuẩn PCIe 4.0", "Tốc độ đọc 3.500MB/s", "Bảo hành 5 năm"] },
    { id: 2, name: "SSD 1TB NVMe Gen3", category: "SSD", brand: "Samsung", capacity: "1TB", price: 1450000, minQty: 5, specs: ["Chuẩn PCIe 3.0", "Tốc độ đọc 2.100MB/s", "Bảo hành 5 năm"] },
    { id: 3, name: "SSD 256GB SATA III", category: "SSD", brand: "SanDisk", capacity: "256GB", price: 450000, minQty: 20, specs: ["Chuẩn SATA 3.0", "Tốc độ đọc 550MB/s", "Bảo hành 2 năm"] },
    { id: 4, name: "SSD 2TB M.2 NVMe", category: "SSD", brand: "Samsung", capacity: "2TB", price: 1990000, minQty: 3, specs: ["Chuẩn M.2 2280", "Tốc độ đọc 3.500MB/s", "Bảo hành 5 năm"] },
    { id: 5, name: "SSD 128GB mSATA", category: "SSD", brand: "Kingston", capacity: "128GB", price: 280000, minQty: 50, specs: ["Chuẩn mSATA", "Tốc độ đọc 500MB/s", "Bảo hành 1 năm"] },
    { id: 6, name: "SSD 4TB Enterprise", category: "SSD", brand: "Intel", capacity: "4TB", price: 2990000, minQty: 1, specs: ["Chuẩn PCIe NVMe", "Tốc độ đọc 6.000MB/s", "Bảo hành 5 năm"] },
    { id: 7, name: "SSD 1TB SATA III", category: "SSD", brand: "SanDisk", capacity: "1TB", price: 990000, minQty: 15, specs: ["Chuẩn SATA 3.0", "Tốc độ đọc 550MB/s", "Bảo hành 3 năm"] },
    { id: 8, name: "SSD 2TB NVMe Gen4", category: "SSD", brand: "Samsung", capacity: "2TB", price: 2500000, minQty: 2, specs: ["Chuẩn PCIe 4.0", "Tốc độ đọc 7.000MB/s", "Bảo hành 5 năm"] },
    { id: 9, name: "RAM 8GB DDR4", category: "RAM", brand: "Kingston", capacity: "8GB", price: 650000, minQty: 20, specs: ["Chuẩn DDR4", "Tốc độ 3200Mhz", "Bảo hành 3 năm"] },
    { id: 10, name: "CPU Intel Core i7", category: "CPU", brand: "Intel", capacity: "N/A", price: 5500000, minQty: 5, specs: ["Socket LGA 1700", "12 nhân 20 luồng", "Tốc độ 3.6GHz"] }
];

let currentPage = 1;
const productsPerPage = 6;

const productGrid = document.querySelector('.product-grid');
const paginationContainer = document.querySelector('.pagination');
const categoryFilter = document.getElementById('category-filter');
const brandFilter = document.getElementById('brand-filter');
const capacityFilter = document.getElementById('capacity-filter');
const priceFilter = document.getElementById('price-filter');
const sortBy = document.getElementById('sort-by');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

function renderProducts(products, page) {
    productGrid.innerHTML = '';
    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    if (paginatedProducts.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; width: 100%;">Không tìm thấy sản phẩm nào.</p>';
        return;
    }

    paginatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const specsHtml = product.specs.map(spec => `<li>${spec}</li>`).join('');

        productCard.innerHTML = `
                    <div class="product-image-placeholder"></div>
                    <h4 class="product-name">${product.name}</h4>
                    <p class="product-price">Từ ${product.price.toLocaleString('vi-VN')}đ</p>
                    <ul class="product-specs">
                        <li>Số lượng tối thiểu: ${product.minQty}</li>
                        ${specsHtml}
                    </ul>
                    <div class="product-actions">
                        <button class="request-quote-btn">Yêu cầu báo giá</button>
                        <button class="add-to-cart-btn" data-id="${product.id}">Thêm vào giỏ hàng</button>
                    </div>
                `;
        productGrid.appendChild(productCard);
    });
}

function renderPagination(products) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(products.length / productsPerPage);

    if (totalPages > 1) {
        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.classList.add('nav-arrow');
        prevLink.innerHTML = '&lsaquo;';
        prevLink.onclick = () => {
            if (currentPage > 1) {
                currentPage--;
                filterAndSortProducts();
            }
        };
        paginationContainer.appendChild(prevLink);

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.classList.add('page-number');
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            pageLink.textContent = i;
            pageLink.onclick = () => {
                currentPage = i;
                filterAndSortProducts();
            };
            paginationContainer.appendChild(pageLink);
        }

        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.classList.add('nav-arrow');
        nextLink.innerHTML = '&rsaquo;';
        nextLink.onclick = () => {
            if (currentPage < totalPages) {
                currentPage++;
                filterAndSortProducts();
            }
        };
        paginationContainer.appendChild(nextLink);
    }
}

function filterAndSortProducts() {
    let filteredProducts = productsData.filter(p => p.category === "SSD");

    // Lọc theo từ khóa tìm kiếm
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm) || p.brand.toLowerCase().includes(searchTerm));
    }

    // Lọc theo danh mục
    const categoryValue = categoryFilter.value;
    if (categoryValue) {
        filteredProducts = filteredProducts.filter(p => p.category === categoryValue);
    }

    // Lọc theo thương hiệu
    const brandValue = brandFilter.value;
    if (brandValue) {
        filteredProducts = filteredProducts.filter(p => p.brand === brandValue);
    }

    // Lọc theo dung lượng
    const capacityValue = capacityFilter.value;
    if (capacityValue) {
        filteredProducts = filteredProducts.filter(p => p.capacity === capacityValue);
    }

    // Lọc theo khoảng giá
    const priceRange = priceFilter.value;
    if (priceRange) {
        const [min, max] = priceRange.split('-').map(Number);
        filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
    }

    // Sắp xếp
    const sortOrder = sortBy.value;
    if (sortOrder === 'oldest') {
        filteredProducts.sort((a, b) => a.id - b.id);
    } else if (sortOrder === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else {
        filteredProducts.sort((a, b) => b.id - a.id); // 'newest'
    }

    renderProducts(filteredProducts, currentPage);
    renderPagination(filteredProducts);
}

document.addEventListener('DOMContentLoaded', () => {
    filterAndSortProducts();

    categoryFilter.addEventListener('change', () => {
        currentPage = 1;
        filterAndSortProducts();
    });
    brandFilter.addEventListener('change', () => {
        currentPage = 1;
        filterAndSortProducts();
    });
    capacityFilter.addEventListener('change', () => {
        currentPage = 1;
        filterAndSortProducts();
    });
    priceFilter.addEventListener('change', () => {
        currentPage = 1;
        filterAndSortProducts();
    });
    sortBy.addEventListener('change', () => {
        currentPage = 1;
        filterAndSortProducts();
    });
    searchButton.addEventListener('click', () => {
        currentPage = 1;
        filterAndSortProducts();
    });
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentPage = 1;
            filterAndSortProducts();
        }
    });
});