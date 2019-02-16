ajax({
    url: "/api/list",
    success: function(rs) {
        console.log(rs)
    }
})

var myswiper = new Swiper(".swiper-container")