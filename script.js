document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form submission
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if (name === "" || email === "") {
            alert("Please fill in all fields.");
        } else {
            alert("Form submitted successfully! Thank you, " + name + ".");
            form.reset(); // Clear the form after submission
        }
    });
});
