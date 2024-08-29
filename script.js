document.addEventListener('DOMContentLoaded', () => {
    let page = 1; // Start from the first page
    const contentContainer = document.getElementById('content');
    const loader = document.getElementById('loader');

    // Function to fetch and display posts
    async function loadPosts() {
        loader.style.display = 'block'; // Show loader

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=7&_page=${page}`);
            const posts = await response.json();

            // Display posts
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `<h1>${post.id}</h1><h3>${post.title}</h3><p>${post.body}</p>`;
                contentContainer.appendChild(postElement);
            });

            page++; // Increment the page number

        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            loader.style.display = 'none'; // Hide loader
        }
    }

    // Function to detect when user has scrolled to the bottom of the page
    function handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5) { // Add a small buffer
            loadPosts();
        }
    }

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Load initial posts
    loadPosts();
});
