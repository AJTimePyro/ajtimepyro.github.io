const menuCloseOpen = document.getElementById("menu-close-open");
const mainMenu = document.getElementById("main-menu");
const visibleMenuClass = "main-menu-visible";
const slideRight = "main-menu-slide-right";
const animationForHamIcon = "animate";
const revAnimationForHamIcon = "reverseAnimate";

menuCloseOpen.addEventListener("click", function(event) {
    event.preventDefault();
    if (mainMenu.classList.contains(visibleMenuClass)) {
        this.classList.remove(animationForHamIcon);

        mainMenu.classList.add(slideRight);
        this.classList.add(revAnimationForHamIcon);
        
        const onAnimationEnd = () => {
            mainMenu.classList.remove(visibleMenuClass);
            mainMenu.removeEventListener("animationend", onAnimationEnd);
        }
        mainMenu.addEventListener("animationend", onAnimationEnd);
    }
    else {
        mainMenu.classList.remove(slideRight);
        this.classList.remove(revAnimationForHamIcon);
        
        mainMenu.classList.add(visibleMenuClass);
        this.classList.add(animationForHamIcon);
    }
});
