document.addEventListener("DOMContentLoaded", function () {
    const categoryButtons = document.querySelectorAll(".category-menu button");
    const dateButtons = document.querySelectorAll(".date-menu button");
    const resetButton = document.getElementById("reset-filters");
    const videos = document.querySelectorAll(".video-card");
    const searchInput = document.getElementById("search-input"); // Campo de búsqueda

    let activeCategory = null;
    let activeDate = null;

    // Filtrado por categoría
    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            activeCategory = this.getAttribute("data-category");
            filterVideos(activeCategory, activeDate);
            highlightButton(this, categoryButtons);
        });
    });

    // Filtrado por fecha
    dateButtons.forEach(button => {
        button.addEventListener("click", function () {
            activeDate = this.getAttribute("data-date");
            filterVideos(activeCategory, activeDate);
            highlightButton(this, dateButtons);
        });
    });

    // Resetear filtros
    resetButton.addEventListener("click", function () {
        activeCategory = null;
        activeDate = null;
        filterVideos(null, null);
        highlightButton(null, categoryButtons);
        highlightButton(null, dateButtons);
    });

    // Buscador
    searchInput.addEventListener("input", function () {
        const searchTerm = this.value.trim().toLowerCase(); // Obtiene el término de búsqueda
        filterBySearch(searchTerm); // Filtra los videos por búsqueda
    });

    // Función para filtrar videos por búsqueda
    function filterBySearch(searchTerm) {
        videos.forEach(video => {
            const videoTitle = video.querySelector("p").textContent.toLowerCase(); // Obtiene el título del video
            if (videoTitle.includes(searchTerm)) {
                video.style.display = "block"; // Muestra el video si coincide
            } else {
                video.style.display = "none"; // Oculta el video si no coincide
            }
        });
    }

    // Función para filtrar videos por categoría y fecha
    function filterVideos(category, date) {
        videos.forEach(video => {
            const videoCategory = video.getAttribute("data-category");
            const videoDate = video.getAttribute("data-date");

            const matchCategory = !category || videoCategory === category;
            const matchDate = !date || videoDate === date;

            if (matchCategory && matchDate) {
                video.style.display = "block";
            } else {
                video.style.display = "none";
            }
        });
    }

    // Función para resaltar el botón activo
    function highlightButton(activeButton, buttons) {
        buttons.forEach(button => {
            if (button === activeButton) {
                button.classList.add("active");
            } else {
                button.classList.remove("active");
            }
        });
    }
});