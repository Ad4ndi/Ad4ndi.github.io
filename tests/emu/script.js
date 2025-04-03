let stack = [];
let outputElement = document.getElementById('output');

function executeForth() {
    let input = document.getElementById('input').value.trim();
    document.getElementById('input').value = '';
    let tokens = input.split(/\s+/);

    tokens.forEach(token => {
        if (isNumber(token)) {
            stack.push(parseInt(token));
        } else if (token === "+") {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(a + b);
        } else if (token === "-") {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(a - b);
        } else if (token === "*") {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(a * b);
        } else if (token === "/") {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(Math.floor(a / b));
        } else if (token === "dup") {
            let a = stack[stack.length - 1];
            stack.push(a);
        } else if (token === "swap") {
            let b = stack.pop();
            let a = stack.pop();
            stack.push(b);
            stack.push(a);
        } else if (token === "drop") {
            stack.pop();
        } else if (token === "clear") {
            stack = [];
        } else {
            appendOutput(`Error: Unknown word "${token}"`, true);
            return;
        }
    });

    appendOutput("Stack: " + stack.join(" "));
}

function appendOutput(text, isError = false) {
    let div = document.createElement("div");
    div.classList.add(isError ? "error" : "command");
    div.textContent = text;
    outputElement.appendChild(div);
    outputElement.scrollTop = outputElement.scrollHeight;
}

function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

function checkEnter(event) {
    if (event.key === 'Enter') {
        executeForth();
    }
}
