/* quizes table 
 * questions table (each quiz will have a column dedicated for the questions)
 * choices table (for the possible answers which will be buttons)
 * answers table (contains all the answers for the quiz in a single row)
 */

quiz = [];
questions = [];
choices = [];
answers = [];

const f1_parent = document.getElementById("quiz_title");

const quizTitle_input = document.createElement("INPUT_TITLE");
quizTitle_input.setAttribute("type", "text");
quizTitle_input.setAttribute("value", "Hello_world");
document.body.appendChild(quizTitle_input);

const quizAuthor_input = document.createElement("INPUT_AUTHOR");

document.getElementById('title').addEventListener('submit', function(event) {
	event.preventDefault();

	recievedData();
});

function recievedData() {
	quizTitle = document.getElementById('title');
	quizAuthor = document.getElementById('author');

}

