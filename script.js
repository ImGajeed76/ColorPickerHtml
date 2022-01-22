const div = document.createElement("div");
div.innerHTML = '<h1>CHOOSE A COLOR</h1> <input type="text" placeholder="some hex color...">'
document.body.append(div)

const gray = "#555555"

div.style.position = "absolute"
div.style.top = "50%"
div.style.left = "50%"
div.style.transform = "translate(-50%, -50%)"
div.style.fontFamily = "sans-serif"
div.style.textAlign = "center"

div.querySelector("input").style.borderStyle = "solid"
div.querySelector("input").style.borderWidth = "1px"
div.querySelector("input").style.borderColor = gray
div.querySelector("input").style.borderRadius = "5px"
div.querySelector("input").style.outline = "none"
div.querySelector("input").style.fontSize = "large"

div.querySelector("input").style.width = "60%"
div.querySelector("input").style.height = "40%"

div.querySelector("input").addEventListener("input", function (e) {
    const value = e.target.value;

    if (value.match(/^#[0-9a-f]{6}$/i)) {
        document.body.style.backgroundColor = value

        div.querySelector("h1").style.color = getContrastingColor(value)
        div.querySelector("input").style.borderColor = getContrastingColor(value)
    }
    else {
        document.body.style.backgroundColor = "white"

        div.querySelector("h1").style.color = gray
        div.querySelector("input").style.borderColor = gray
    }

    const style_background = document.body.style
    const prop_background = (k, v) => style_background.setProperty(k, v)

    prop_background("-webkit-transition", "background-color 200ms linear")
    prop_background("-ms-transition", "background-color 200ms linear")
    prop_background("transition", "background-color 200ms linear")

    const style_text = div.querySelector("h1").style
    const prop_text = (k, v) => style_text.setProperty(k, v)

    prop_text("-webkit-transition", "color 200ms linear")
    prop_text("-ms-transition", "color 200ms linear")
    prop_text("transition", "color 200ms linear")
})

function getContrastingColor(color) {
    const rgb = hexToRgb(color);
    const isLight = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114 > 186;
    return isLight ? gray : "white"
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r : parseInt(result[1], 16),
        g : parseInt(result[2], 16),
        b : parseInt(result[3], 16),
    } : null
}