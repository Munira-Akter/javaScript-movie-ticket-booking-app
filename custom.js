let container = document.querySelector(".container");
let seats = document.querySelectorAll(".row .seat:not(.occupied)");
let count = document.getElementById("count");
let total = document.getElementById("total");
let select = document.getElementById("movie");
let btn = document.querySelector(".btn-primary");

// Select option value get
let selectval = +select.value;

// This function will exicute for update Count Price
let updateCountPrice = () => {
    let selectseat = document.querySelectorAll(".row .seat.selected");
    // Store data in localstroage
    let slectIndex = [...selectseat].map((seat, index) => {
        return [...seats].indexOf(seat);
    });

    localStorage.setItem("seats", JSON.stringify(slectIndex));

    let seatlength = selectseat.length;
    count.innerText = seatlength;
    total.innerText = seatlength * selectval;
};

// This function will exicute for update select tag value
select.onchange = (e) => {
    selectval = +e.target.value;
    localStorage.setItem("select_option", e.target.selectedIndex);
    localStorage.setItem("select_option_price", e.target.value);
    updateCountPrice();
};

// This function will exicute for ui fix wih local storage data

let localDesignFix = (e) => {
    let getseats = JSON.parse(localStorage.getItem("seats"));

    if (getseats !== "" && getseats.length > 0) {
        seats.forEach((seat, index) => {
            if (getseats.includes(index)) {
                seat.classList.add("selected");
            }
        });
    }

    let getoption = localStorage.getItem("select_option");

    if (getoption !== "") {
        select.selectedIndex = getoption;
    }
};

// this function will exicute when click on seat
container.onclick = (e) => {
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
    ) {
        e.target.classList.toggle("selected");
        updateCountPrice();
    }
};

localDesignFix();

updateCountPrice();

btn.onclick = (e) => {
    location.reload();

    localStorage.clear();
    location.reload();
};