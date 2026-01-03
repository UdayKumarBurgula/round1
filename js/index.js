
/********************** debounce **********************/
/// performance optimization using debounce
let counter = 0;
const getData = () => {
    console.log("Fetching data...", counter++);
    // Simulate an API call
}

const betterDebounce = (func, delay) => {
    let timer;
    return function(){
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

const debouncedGetData = betterDebounce(getData, 300);
// window.addEventListener('resize', debouncedGetData);
// Now, getData will be called only after the user has stopped resizing the window for 300 milliseconds.


/********************** throttle **********************/
/// performance optimization using throttle
const expensive = () => {
    console.log("Expensive function called", counter++);
}

const throttle = (func, limit) => {
    let notInThrottle = true;
    return function () {
        let context = this;
        let args = arguments;
        if (notInThrottle) {
            func.apply(context, args);
            notInThrottle = false;
            setTimeout(() => {
                notInThrottle = true;
            }, limit);
        }
    };
}

const betterThrottle = throttle(expensive, 1000);

window.addEventListener('resize', betterThrottle);
    // earlier version: expensive called directly on resize event


/********************** call, apply, and b **********************/
/// call, apply, and bind

/*------------ call ---------------------*/
console.log("---------- call -----------");

let name_call = {
    firstName: "Akshay",
    lastName: "Saini",
    printFullName: function () {
        console.log(this.firstName + " " + this.lastName);
    }
}

name_call.printFullName();

let name2_call = {
    firstName: "Uday",
    lastName: "Kumar"
}

// function borrowing
 name_call.printFullName.call(name2_call);
// earlier version: function borrowing => name.printFullName.call(name2);

/*------------ apply, and bind ---------------------*/
console.log("---------- apply and bind -----------");

let name_Variable = {
    firstName: "Akshay",
    lastName: "Saini"
}

// function we want to reuse.
printFullName = function (homeTown, state) {
    console.log(this.firstName + " " + this.lastName + " from " + homeTown + "," + state);
}

let name2_Variable = {
    firstName: "Uday",
    lastName: "Kumar"
}

// function borrowing
printFullName.call(name_Variable, "Dehradun","UP");

printFullName.apply(name2_Variable, ["Hyderabad", "TS"]);

// bind
let printMyName = printFullName.bind(name2_Variable, "Bowie", "Washington DC");
console.log("Using bind:");
printMyName();
// earlier version: function borrowing using call, apply, and bind

/********************** end **********************/

