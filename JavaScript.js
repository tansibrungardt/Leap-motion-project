$(document).ready(function() {
    var controller = new Leap.Controller();

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
            }
        }
    });

    controller.connect();

    function navigate(direction) {
        var activePhoto = $('.photo.active');
        var nextPhoto;

        if (direction === 'left') {
            nextPhoto = activePhoto.prev('.photo');
            if (nextPhoto.length === 0) {
                nextPhoto = $('.photo:last');
            }
        } else if (direction === 'right') {
            nextPhoto = activePhoto.next('.photo');
            if (nextPhoto.length === 0) {
                nextPhoto = $('.photo:first');
            }
        }

        activePhoto.removeClass('active');
        nextPhoto.addClass('active');
    }
});