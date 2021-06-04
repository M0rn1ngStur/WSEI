console.log("wczytano plik Net.js")

class Net {
    constructor() {
        this.a = 100 // użycie zmiennych
        this.b = 200
        console.log("konstruktor klasy Net")
        this.changePage("")
    }
    dosmth() {
        console.log(this.a + this.b + "")
    }
    changePage(dest) {
        $.ajax({
            url: "/" + dest,
            type: "POST",
            success: function (data) {
                var obj = JSON.parse(data)
                ui.pageChange(obj, dest)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },
        });
    }

}