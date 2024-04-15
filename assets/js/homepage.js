function openTab(tabName) {
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
    event.currentTarget.classList.add("active");
}
