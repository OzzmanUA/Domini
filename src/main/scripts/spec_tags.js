
    const tags = ["Чоловік на годину", "Столяр", "Електрик", "Сантехнік"];

    const tagsContainers = document.querySelectorAll('.tags-container');

    function createTag(label) {
        const tag = document.createElement('div');
        tag.className = 'tag';
        tag.textContent = label;
        return tag;
    }

    tagsContainers.forEach(tagsContainer => {
        tags.forEach(tagLabel => {
            const tagElement = createTag(tagLabel);
            tagsContainer.appendChild(tagElement);
        });
    });
