console.log("Hello via Bun!");

const SERVER_PATH = import.meta.env.SERVER_PATH || "http://localhost:3000";

const buttonTest = document.querySelector("#button-test") as HTMLButtonElement;

buttonTest.addEventListener("click", () => {
    console.log("Button clicked!");
    console.log(SERVER_PATH);
    fetch(SERVER_PATH)
        .then(response => response.text())
        .then(data => {
            console.log(data);
        });
});