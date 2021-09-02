
// Home Button
document.getElementById('box1').addEventListener('click',
    function (evt) {
        document.location.href = 'index.html';
    }
)

// About Button
document.getElementById('box2').addEventListener('click',
    function (evt) {
        document.location.href = 'about.html';
    }
)

// Contact Us Button
let count = 0;
document.getElementById('contact').addEventListener('click',
    function (evt) {

        if (!count) {

            // Creating Contact Menu
            let contactElement = document.createElement('section');
            contactElement.id = "contactMenu";
            contactElement.innerHTML = '';

            ['github', 'telegram', 'email', 'instagram', 'facebook'].forEach(function (icon) {

                let iconElement = document.createElement('div');
                iconElement.id = icon;
                iconElement.className = 'icon';
                iconElement.innerHTML = `<img src="css\\img\\${icon}.png" alt="${icon}">`

                contactElement.appendChild(iconElement);
            });

            document.querySelector('body').appendChild(contactElement)
            count++;

            // Event Listeners for contact menu


            // Github
            document.getElementById('github').addEventListener('click',
                function (evt) {
                    open('https://github.com/AJTimePyro');
                }
            )
            // Github
            document.getElementById('telegram').addEventListener('click',
                function (evt) {
                    open('https://t.me/AJTimePyro');
                }
            )
            // Telegram
            document.getElementById('email').addEventListener('click',
                function (evt) {
                    // open('https://github.com/AJTimePyro');
                    location.href = "mailto:ajtimepyro@gmail.com";
                }
            )
            // Github
            document.getElementById('instagram').addEventListener('click',
                function (evt) {
                    open('https://www.instagram.com/ajtimepyro/');
                }
            )
            // Github
            document.getElementById('facebook').addEventListener('click',
                function (evt) {
                    open('https://www.facebook.com/abhijeet.gupta.94043626');
                }
            )


        };
    }
);
