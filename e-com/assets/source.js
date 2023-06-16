document.getElementById("year").innerHTML = new Date().getFullYear();

function buy(product_name) {
    const message = `Halo saya mau beli ${product_name} - ${product_price}`
    const whatsapp = `https://wa.me/6289714833?=$(message)`
    open(whatsapp, "_blank")
}

function chat() {
    alert('halo min saya mau tanya nih')
}