var qs = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

qs["untuk"] = qs["untuk"] || "Semua";

document.querySelector("#mail-content").innerText = document.querySelector("#mail-content").innerText.replace("{{nama}}", qs["untuk"]);
document.querySelector("#mail-subject").innerText = document.querySelector("#mail-subject").innerText.replace("{{nama}}", qs["untuk"]);


document.querySelector("#send-mail-ct").onchange = function() {
    document.querySelector("#send-mail").setAttribute("href", "mailto:fachrin.nasution@gmail.com?subject=Balasan dari " + qs["untuk"] + "&body=" + this.value);
};