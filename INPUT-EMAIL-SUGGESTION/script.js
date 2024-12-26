const domains = ['gmail.com', 'hotmail.com', 'icloud.com', 'outlook.com', 'protonmail.com', 'duck.com', 'yahoo.com'];

let allInput = document.querySelectorAll('input, textarea');

allInput.forEach((e, i) => {

    if (e.hasAttribute('sdev-email-suggestion')) {

        const suggestionsDiv = document.createElement('div');

        suggestionsDiv.id = 'suggestions';
        suggestionsDiv.className = 'suggestions dn';

        e.autocomplete = 'off';
        e.autocorrect = 'off';
        e.autocapitalize = 'none';
        e.spellcheck = false;

        e.parentNode.insertBefore(suggestionsDiv, e.nextSibling);

        const resizeObserver = new ResizeObserver(() => {
            suggestionsDiv.style.width = `${e.offsetWidth}px`;
        });

        resizeObserver.observe(e);

        e.addEventListener('input', () => {

            const [localPart, domainPart = ''] = e.value.split('@');

            suggestionsDiv.innerHTML = '';

            if (localPart) {

                domains.forEach(domain => {

                    if (domain.startsWith(domainPart)) {

                        const suggestion = `${localPart}@${domain}`;
                        const suggestionItem = document.createElement('div');

                        suggestionItem.textContent = suggestion;
                        suggestionItem.className = 'suggestion-item';

                        suggestionItem.addEventListener('click', () => {
                            e.value = suggestion;
                            suggestionsDiv.innerHTML = '';
                        });

                        suggestionsDiv.appendChild(suggestionItem);

                    };

                });

                if (suggestionsDiv.innerHTML.trim() !== '') {

                    suggestionsDiv.classList.remove('dn');

                } else {

                    suggestionsDiv.classList.add('dn');

                };

            } else {

                suggestionsDiv.classList.add('dn');

            };

        });

        document.addEventListener('click', (event) => {

            if (!e.contains(event.target) && !suggestionsDiv.contains(event.target)) {
                suggestionsDiv.classList.add('dn');
            };

        });

    };

});