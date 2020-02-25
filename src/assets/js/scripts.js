export const Accordion = (function(document) {
    function init() {
        let toggleButtons = document.querySelectorAll('.section__toggle-btn');
        if (!toggleButtons) return;

        [... toggleButtons].forEach( function(element) {
            let section = element.closest('.accordion');
            if ( !section ) return;
            let sectionBody = section.querySelector('.section__body');

            element.addEventListener('click', function() {
                section.classList.toggle('toggled');
            });
        });
    }
    return {
        init: init
    }
})(window.document);