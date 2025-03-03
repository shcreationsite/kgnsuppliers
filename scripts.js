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
        });
    });

    // Show the feature content when the Features nav link is clicked
    document.querySelector('a[data-target="featureContent"]').addEventListener('click', function() {
        document.getElementById('featureContent').style.display = 'block';
    });

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