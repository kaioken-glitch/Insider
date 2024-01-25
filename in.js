function scrollList(direction) {
    const categoryList = document.getElementById('categoryList');
    const scrollAmount = 1000; // Adjust as needed

    if (direction === 'left') {
        categoryList.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
        categoryList.scrollLeft += scrollAmount;
    }
}

fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(products => {
        const mvb = document.getElementById('mvb');

        let lfg = document.createElement('div');
        lfg.classList.add('lfg');

        products.forEach((product, index) => {
          if (index % 3 === 0 && index !== 0) {
            mvb.appendChild(lfg);
            lfg = document.createElement('div');
            lfg.classList.add('lfg');
          }

          const pdp = document.createElement('div');
          pdp.classList.add('pdp');

          const image = document.createElement('img');
          image.src = product.image;
          image.alt = product.title;

          const overlay = document.createElement('div');
          overlay.classList.add('overlay');
          overlay.innerHTML = `<p>${product.title}</p><p>${product.price}</p>`;

          pdp.appendChild(image);
          pdp.appendChild(overlay);

          lfg.appendChild(pdp);
        });

        // Append the last lfg if the total number of products is not a multiple of 3
        if (products.length % 3 !== 0) {
          mvb.appendChild(lfg);
        }
      })
      .catch(error => console.error('Error fetching products:', error));

      function renderProducts(products) {
        const mvb = document.getElementById('mvb');
        mvb.innerHTML = '';
  
        let lfg = document.createElement('div');
        lfg.classList.add('lfg');
  
        products.forEach((product, index) => {
          if (index % 3 === 0 && index !== 0) {
            mvb.appendChild(lfg);
            lfg = document.createElement('div');
            lfg.classList.add('lfg');
          }
  
          const pdp = document.createElement('div');
          pdp.classList.add('pdp');
  
          const image = document.createElement('img');
          image.src = product.image;
          image.alt = product.title;
  
          const overlay = document.createElement('div');
          overlay.classList.add('overlay');
          overlay.innerHTML = `<p>${product.title}</p><p>${product.price}</p>`;
  
          pdp.appendChild(image);
          pdp.appendChild(overlay);
  
          lfg.appendChild(pdp);
        });
  
        // Append the last lfg if the total number of products is not a multiple of 3
        if (products.length % 3 !== 0) {
          mvb.appendChild(lfg);
        }
      }
  
      fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
          renderProducts(products);
  
          const searchInput = document.getElementById('searchInput');
          const searchButton = document.getElementById('searchButton');
  
          searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredProducts = products.filter(product =>
              product.title.toLowerCase().includes(searchTerm)
            );
            renderProducts(filteredProducts);
          });
        })
        .catch(error => console.error('Error fetching products:', error));


        async function fetchCategories() {
          try {
              const response = await fetch('https://fakestoreapi.com/products/categories');
              const categories = await response.json();
              return categories;
          } catch (error) {
              console.error('Error fetching categories:', error);
          }
      }

      // Function to update the HTML content with fetched categories
      async function updateCategoryList() {
          const categoryList = document.getElementById('categoryList');
          const categories = await fetchCategories();

          // Update the HTML content with fetched categories
          categories.forEach(category => {
              const listItem = document.createElement('li');
              const link = document.createElement('a');
              link.href = '#'; // You can update the href if needed
              link.textContent = category;
              listItem.appendChild(link);
              categoryList.appendChild(listItem);
          });
      }

      // Call the function to update the category list
      updateCategoryList();


      async function searchProducts() {
        const searchQuery = document.getElementById('mb').value.trim();

        if (searchQuery === '') {
            alert('Please enter a search term.');
            return;
        }

        try {
            const response = await fetch(`https://fakestoreapi.com/products?title=${searchQuery}`);
            const products = await response.json();

            displaySearchResults(products);
        } catch (error) {
            console.error('Error searching products:', error);
        }
    }

    // Function to display search results
    function displaySearchResults(products) {
        const searchResultsDiv = document.getElementById('searchResults');
        searchResultsDiv.innerHTML = ''; // Clear previous search results

        if (products.length === 0) {
            searchResultsDiv.textContent = 'No products found.';
            return;
        }

        const resultList = document.createElement('ul');
        resultList.classList.add('search-results-list');

        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = product.title;
            resultList.appendChild(listItem);
        });

        searchResultsDiv.appendChild(resultList);
    }