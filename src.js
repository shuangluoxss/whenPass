var tid
function showList(o) {
    hideList("dropdown-content" + o.id);
    document.getElementById("dropdown-" + o.id).classList.toggle("show");
}
function changeTo(o){
  	var parentID =  o.parentNode.id.replace(/[^0-9]/ig,"")
  	document.getElementById("type-hint").innerHTML = document.getElementById(parentID).innerHTML + " → " + o.innerHTML
  	tid = o.id
}
 
function hideList(option) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
     
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.id != option) {
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
        hideList("");
    }
}