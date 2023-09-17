document.addEventListener('DOMContentLoaded',function(){
    
    // 1. Select the section with an id of container without using querySelector.
    const containerWithoutQuerySelector = document.getElementById('container');

    // 2. Select the section with an id of container using querySelector.
    const containerWithQuerySelector = document.querySelector('#container');

    // 3. Select all of the list items with a class of “second”.
    const secondListItems = document.getElementsByClassName('second');

    // 4. Select a list item with a class of "third," but only inside the ol tag.
    const thirdListItemInOl = document.querySelector('ol .third');

    // 5. Give the section with an id of container the text “Hello!”.
    containerWithQuerySelector.textContent = 'Hello!';

    // 6. Add the class "main" to the div with a class of "footer".
    const footerDiv = document.querySelector('.footer');
    footerDiv.classList.add('main');

    // 7. Remove the class "main" on the div with a class of "footer".
    footerDiv.classList.remove('main');

    // 8. Create a new li element.
    const newLiElement = document.createElement('li');

    // 9. Give the li the text “four”.
    newLiElement.textContent='four';
    

    // 10. Append the li to the ul element if it exists.
    const listElement = document.querySelector('ul');
    listElement.appendChild(newLiElement);

    


    // 11. Loop over all of the lis inside the ol tag and give them a background color of “green”.
    const olListItems = document.querySelectorAll('ol li');
    olListItems.forEach(function (li) {
        li.style.backgroundColor = 'green';
    });

    // 12. Remove the div with a class of "footer".
    const footerToRemove = document.querySelector('.footer');
    footerToRemove.parentNode.removeChild(footerToRemove);


});

 