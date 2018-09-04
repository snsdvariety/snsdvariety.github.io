$(document).ready(function() {
    $(".info").hide();

    var header = table.getElementsByClassName("column")[0].getElementsByTagName("TH")[5];
    var arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.innerHTML = '&nbsp;&#x25B4;';
    header.append(arrow);
});

$(document).on("click", ".show", function() {
    $(this).toggleClass("expand").nextUntil(".show").slideToggle(100);
});

function filterTable(event) {
    $(".show").removeClass("expand");
    var filter = event.target.value.toUpperCase();
    var cont = document.getElementById("table");
    var rows = cont.getElementsByClassName("show");
    var desc = cont.getElementsByClassName("desc");
    var count = 0;
    for (var i = 0; i < rows.length; i++) {
        var c1 = rows[i].cells[0].textContent.toUpperCase();
        var c2 = rows[i].cells[1].textContent.toUpperCase();
        var c3 = rows[i].cells[2].textContent.toUpperCase();
        var c4 = rows[i].cells[3].textContent.toUpperCase();
        var d = desc[i].textContent.toUpperCase();

        if (d.indexOf(filter) > -1 ||
            c1.indexOf(filter) > -1 || c2.indexOf(filter) > -1 ||
            c3.indexOf(filter) > -1 || c4.indexOf(filter) > -1) {
            rows[i].style.display = "";
            $(".info").hide();
        } else {
            rows[i].style.display = "none";
            count++;
        }
    }
    if (!$("#input").val()) {
        count = 0;
        $(".noneFound").remove();
    }
    if ($("#table .show").length == count && !$("#table tr").hasClass("noneFound")) {
        $('#table tbody:last-child').append('<tr class=noneFound> <td colspan=6 align=center>None Found</td></tr>');
    }
}

function sortTable(n) {
    var i, shouldSwitch, switchcount = 0;
    var table = document.getElementById("table");
    var header = table.getElementsByClassName("column")[0].getElementsByTagName("TH")[n];
    if ($(".arrow")[0]) {
        $(".arrow").remove();
        $(".sort").removeClass("sort");
    }
    header.className += " sort";
    var asc = true;
    var switching = true;
    while (switching) {
        switching = false;
        var rows = table.getElementsByClassName("show");
        var inforows = table.getElementsByClassName("info");
        for (i = 0; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            var x = rows[i].getElementsByTagName("TD")[n];
            var y = rows[i + 1].getElementsByTagName("TD")[n];
            if (asc) {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (!asc) {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            inforows[i].parentNode.insertBefore(inforows[i + 1], rows[i].nextSibling);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && asc) {
                asc = false;
                switching = true;
            }
        }
    }
    var arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.innerHTML = asc ? '&nbsp;&#x25BE;' : '&nbsp;&#x25B4;';
    header.append(arrow);
}

document.querySelector('#input').addEventListener('keyup', filterTable, false);