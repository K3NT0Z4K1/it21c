class Person{

    //Private Fields
    #name;
    #age;
    #occupation;

    constructor(name, age, occupation){
        this.#name = name;
        this.#age = age;
        this.#occupation = occupation;
    }

    //Getters
    get name(){
        return this.#name;
    }

    get age(){
        return this.#age;
    }

    get occupation(){
        return this.#occupation;
    }

    // Method to display person information in the console
    displayInfo() {
        console.log("Name: " + this.name);
        console.log("Age: " + this.age);
        console.log("Occupation: " + this.occupation);
    }

    // Method to display person information in the HTML
    displayInfoHTML() {
        const personElement = document.getElementById('personOne');
        personElement.innerHTML = `
            <strong>Name:</strong> ${this.name}<br>
            <strong>Age:</strong> ${this.age}<br>
            <strong>Occupation:</strong> ${this.occupation}
        `;
    }
}


// Creating an object (instance) of the Person class
const personOne = new Person('Kent', 20, 'Student');

// Calling methods
personOne.displayInfo();  