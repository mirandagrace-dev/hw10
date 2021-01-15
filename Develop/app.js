const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { fileURLToPath } = require("url");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
getManager();

function getManager() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "name",
				message: "Name:",
			},
			{
				type: "input",
				name: "id",
				message: "ID:",
			},
			{
				type: "input",
				name: "email",
				message: "Email:",
			},
			{
				type: "input",
				name: "officeNumber",
				message: "Office Number:",
			},
		])
		.then((val) => {
			const manager = new Manager(
				val.name,
				val.id,
				val.email,
				val.officeNumber
			);
			employees.push(manager);

			addEmployee();
		});
}

function addIntern() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "name",
				message: "Name:",
			},
			{
				type: "input",
				name: "id",
				message: "ID:",
			},
			{
				type: "input",
				name: "email",
				message: "Email:",
			},
			{
				type: "input",
				name: "school",
				message: "School:",
			},
		])
		.then((val) => {
			const intern = new Intern(val.name, val.id, val.email, val.school);
			employees.push(intern);

			addEmployee();
		});
}

function addEngineer() {
	inquirer
		.prompt([
			{
				type: "input",
				name: "name",
				message: "Name: ",
			},
			{
				type: "input",
				name: "id",
				message: "ID: ",
			},
			{
				type: "input",
				name: "email",
				message: "Email: ",
			},
			{
				type: "input",
				name: "github",
				message: "GitHub: ",
			},
		])
		.then((val) => {
			const engineer = new Engineer(val.name, val.id, val.email, val.github);
			employees.push(engineer);

			addEmployee();
		});
}

function addEmployee() {
	inquirer
		.prompt([
			{
				type: "list",
				name: "choice",
				message: "Do you want to add another employee?",
				choices: ["Engineer", "Intern", "I'm done."],
			},
		])
		.then((val) => {
			if (val.choice === "Engineer") {
				addEngineer();
			} else if (val.choice === "Intern") {
				addIntern();
			} else {
				generateEmployees();
			}
		});
}

function generateEmployees() {
	fs.writeFileSync(outputPath, render(employees), (err) => {
		if (err) {
			console.log("nope.");
		} else {
			console.log("Rendered Successfully!!");
		}
	});
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// get manager function
//take response and create manager object from that response and then push that object onto a array of employees
//create another function to ask if there is another employee -- yes/no
// click yes - go to another method that will ask what kind of employee they want to create
//

//run the render funtion on the array of employees, store into a variable, then use fs to write to a new html file
// that variable is the thing
