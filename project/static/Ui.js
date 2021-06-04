console.log("wczytano plik Ui.js")
const PageTitles = {
    'about': "O nas",
    'offer': "Oferta",
    'facebook': "Facebook",
    'contact': "Kontakt"
}
class Ui {

    constructor() {
        console.log("konstruktor klasy Ui")
        this.onClicks();
    }
    pageChange(obj, pageName) {
        $(".carousel-inner").empty()
        $(".carousel-indicators").empty();
        if (pageName == "") {
            pageName = "about";
        }
        $("#text").html(obj.text)
        $('.js-nav.active').removeClass('active');
        $("#" + pageName).addClass('active')
        $("#title").html(PageTitles[pageName])
        for (var imgCount = 0; imgCount < obj.imgs.length; imgCount++) {
            var img = $("<img/>");
            img.attr('width', "520px")
            img.attr('height', "420px")
            img.attr("src", "/photos/" + pageName + "/" + obj.imgs[imgCount]);
            img.addClass("d-block");
            img.attr("alt", obj.imgs[imgCount]);
            var div = $("<div></div>").append(img)
            div.addClass("carousel-item");
            var li = $("<li></li>");
            li.attr("data-target", "#carouselIndicators");
            li.attr("data-slide-to", imgCount);
            if (imgCount == 0) {
                li.addClass("active");
                div.addClass("active");
            }
            $(".carousel-inner").append(div)
            $(".carousel-indicators").append(li);
        }
    }
    onClicks() {
        $(".js-nav").on('click', function () {
            net.changePage($(this).attr("destination"));
        })
    }

}