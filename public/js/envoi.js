console.log('haha');
document.getElementById('submit').addEventListener('click', (function () {
    $.post("/request",
        {
            name: "viSion",
            designation: "Professional gamer"
        },
        function (data, status) {
            console.log(data);
        });
}));