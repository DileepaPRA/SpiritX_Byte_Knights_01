// Page Transition Animation
document.querySelectorAll('.toggle-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('href');
        document.body.style.opacity = '0';
        setTimeout(() => {
            window.location.href = targetPage;
        }, 500); // Match the transition duration in CSS
    });
});