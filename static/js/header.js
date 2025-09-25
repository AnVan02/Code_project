
function toggleMenu() {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const body = iframeDoc.body;
        body.classList.toggle('show-menu');
    }
}

// Gán sự kiện cho nút toggle trong iframe
window.addEventListener('load', () => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.onload = () => {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const toggleButton = iframeDoc.querySelector('.header-toggle');
            if (toggleButton) {
                toggleButton.onclick = toggleMenu;
            }
        };
    }
});
