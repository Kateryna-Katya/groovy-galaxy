document.querySelectorAll('.faq-acc-el-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
        const parentElement = trigger.closest('.faq-acc-el');
        const panel = parentElement.querySelector('.faq-acc-el-descr-frame');
        const svg = trigger.querySelector('svg');
        const isOpen = parentElement.classList.contains('open');

        if (!isOpen) {
            parentElement.classList.add('open');
            panel.style.maxHeight = panel.scrollHeight + 'px';
            svg.innerHTML = '<path d="M9 18H27" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />';
        } else {
            parentElement.classList.remove('open');
            panel.style.maxHeight = '0';
            svg.innerHTML = '<path d="M9 18H27M18 27V9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />';
        }
    });
});