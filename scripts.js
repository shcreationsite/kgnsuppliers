document.addEventListener('DOMContentLoaded', function() {
    const headers = document.querySelectorAll('.expandable-header');
    headers.forEach(header => {
        header.addEventListener('click', function() {
            headers.forEach(h => {
                if (h !== header) {
                    h.classList.remove('expanded-header');
                    h.nextElementSibling.classList.remove('expanded');
                    h.textContent = h.textContent.replace('-', '+'); // Change '-' back to '+'
                }
            });
            header.classList.toggle('expanded-header');
            header.nextElementSibling.classList.toggle('expanded');
            if (header.classList.contains('expanded-header')) {
                header.textContent = header.textContent.replace('+', '-'); // Change '+' to '-'
            } else {
                header.textContent = header.textContent.replace('-', '+'); // Change '-' back to '+'
            }
        });
    });

    const navLinks = document.querySelectorAll('.navClassHeader nav ul li a');
    const contents = document.querySelectorAll('.content');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            // Remove 'selected' class from all links
            navLinks.forEach(navLink => navLink.classList.remove('selected'));
            
            // Add 'selected' class to the clicked link
            this.classList.add('selected');

            // Hide all content sections
            contents.forEach(content => content.style.display = 'none');

            // Show the target content section
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).style.display = 'block';

            // Show both the Google form and the contact details when the "Contact" nav header is clicked
            if (targetId === 'contactContent') {
                document.getElementById('googleForm').style.display = 'block';
                document.getElementById('contactDetails').style.display = 'block';
            }
        });
    });

    // Show the about content when the page loads
    document.getElementById('aboutContent').style.display = 'block';
    document.getElementById('featureContent').style.display = 'none';
    document.getElementById('contactContent').style.display = 'none';

    // Initialize slideshows
    initSlideshows();
});

function initSlideshows() {
    const slideshows = [
        {slides: 'mySlides1'},
        {slides: 'mySlides2'},
        {slides: 'mySlides3'}
    ];

    slideshows.forEach((slideshow, index) => {
        let slideIndex = 1;
        showSlides(slideIndex, slideshow.slides);

        const prev = document.querySelectorAll('.prev')[index];
        const next = document.querySelectorAll('.next')[index];

        prev.addEventListener('click', () => plusSlides(-1, slideshow.slides));
        next.addEventListener('click', () => plusSlides(1, slideshow.slides));

        function plusSlides(n, slidesClass) {
            showSlides(slideIndex += n, slidesClass);
        }

        function showSlides(n, slidesClass) {
            let i;
            const slides = document.getElementsByClassName(slidesClass);
            if (n > slides.length) {slideIndex = 1}    
            if (n < 1) {slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";  
            }
            slides[slideIndex-1].style.display = "block";  
        }
    });
}

function toggleTile(tile) {
    const list = tile.querySelector('ul'); // Get the UL element inside the clicked tile

    if (tile.classList.contains('active')) {
        // If tile is already active, set height to 0 before removing 'active'
        list.style.height = '0';
        setTimeout(() => { // Use setTimeout to ensure the height transition has time to complete before removing the class
           tile.classList.remove('active');
        }, 300); //Match the transistion duration i.e 0.3s
    } else {
        // If tile is inactive, set height to auto, which will automatically calculate its needed height
        tile.classList.add('active');
        list.style.height = list.scrollHeight + 'px'; //Set explict height to transtion works
    }
}
