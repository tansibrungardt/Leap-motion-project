$(document).ready(function() {
    var controller = new Leap.Controller();
    var selectionTimeout;

    controller.on('frame', function(frame) {
        if (frame.hands.length > 0) {
            var hand = frame.hands[0];
            var gesture = frame.gestures[0];

            // Swipe gestures
            if (gesture && gesture.type === 'swipe') {
                var direction = gesture.direction;

                if (Math.abs(direction[0]) > Math.abs(direction[1])) {
                    if (direction[0] > 0) {
                        navigate('left');
                    } else {
                        navigate('right');
                    }
                } else {
                    if (direction[1] > 0) {
                        navigate('up');
                    } else {
                        navigate('down');
                    }
                }
            } else if (gesture && gesture.type === 'keyTap') {
                // Key tap gesture (selection)
                selectPhotos();
            } else {
                // Clear selection timeout if hand is not hovering
                clearTimeout(selectionTimeout);
            }
        }
    });

    controller.connect();

    function navigate(direction) {
        // Implement navigation logic based on direction (up/down) here
        if (direction === 'up') {
            // Navigate up logic
            console.log('Navigate up');
        } else if (direction === 'down') {
            // Navigate down logic
            console.log('Navigate down');
        }
    }

    function selectPhotos() {
        // Implement logic for selecting photos here
        console.log('Photos selected');

        // For example, you can trigger navigation to the photo gallery page
        window.location.href = 'photo_gallery.html'; // Replace with your photo gallery page URL
    }
});

// Create an intersection observer instance
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Apply lazy loading attribute
            entry.target.setAttribute('loading', 'lazy');

            // Stop observing once loaded
            observer.unobserve(entry.target);
        }
    });
});

// Get all images with the class "photo"
const images = document.querySelectorAll('.photo');

// Observe each image
images.forEach(image => {
    observer.observe(image);
});
