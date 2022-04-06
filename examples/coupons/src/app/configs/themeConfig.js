import logoImg from '@src/assets/images/logo/logo.svg';

//Template config options
const themeConfig = {
    app: {
        appName: 'Sui Coupons',
        appLogoImage: logoImg.src,
    },
    layout: {
        isRTL: false,
        skin: 'light', // light, dark, bordered, semi-dark
        routerTransition: 'fadeIn', // fadeIn, fadeInLeft, zoomIn, none or check this for more transition https://animate.style/
        type: 'vertical', // vertical, horizontal
        contentWidth: 'boxed', // full, boxed
        menu: {
            isHidden: false,
            isCollapsed: false,
        },
        navbar: {
            // ? For horizontal menu, navbar type will work for navMenu type
            type: 'floating', // static , sticky , floating, hidden
            backgroundColor: 'white', // BS color options [primary, success, etc]
        },
        footer: {
            type: 'static', // static, sticky, hidden
        },
        customizer: false,
        scrollTop: true, // Enable scroll to top button,
        toastPosition: 'top-right', // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
    },
};

export default themeConfig;
