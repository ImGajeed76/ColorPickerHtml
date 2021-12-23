const div = document.createElement("div");
div.innerHTML = '<h1>choose a color</h1> <input type="text" placeholder="some hex color...">'
document.body.append(div)

div.style.position = "absolute"
div.style.top = "50%"
div.style.left = "50%"
div.style.transform = "translate(-50%, -50%)"

div.querySelector("input").addEventListener("input", function (e) {
    const value = e.target.value;

    if (value.match(/^#[0-9a-f]{6}$/i)) {
        document.body.style.backgroundColor = value

        div.querySelector("h1").style.color = getContrastingColor(value)
    }
    else {
        document.body.style.backgroundColor = "white"

        div.querySelector("h1").style.color = "black"
    }
})

function getContrastingColor(color) {
    const rgb = hexToRgb(color);
    const isLight = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 186;
    return isLight ? "black" : "white"
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r : parseInt(result[1], 16),
        g : parseInt(result[2], 16),
        b : parseInt(result[3], 16),
    } : null
}