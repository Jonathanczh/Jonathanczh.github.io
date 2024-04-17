function openTab(tabName, event) {
    var i, tabcontent, tabs;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].style.transform = "scaleY(0)";
        tabcontent[i].style.opacity = "0";
    }
    tabs = document.getElementsByClassName("tab");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    var activeContent = document.getElementById(tabName);
    activeContent.style.display = "block";
    setTimeout(function() {
        activeContent.style.transform = "scaleY(1)";
        activeContent.style.opacity = "1";
    }, 10); // Short delay added to allow for display: block to apply

    if (event) {
        event.currentTarget.classList.add("active");
    } else {
        var initialActiveTab = document.querySelector(`.tab[onclick*="${tabName}"]`);
        if (initialActiveTab) {
            initialActiveTab.classList.add("active");
        }
    }
}

function adjustTabContentPosition() {
    var nameBarHeight = document.querySelector('.name-bar').offsetHeight;
    var tabBarHeight = document.querySelector('.tab-bar').offsetHeight;
    var tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(function(content) {
        content.style.top = (nameBarHeight + tabBarHeight) + 'px';
    });
}

window.onload = function() {
    adjustTabContentPosition();
    openTab('about'); // Set the default tab to be 'about'
};

window.onresize = adjustTabContentPosition;
