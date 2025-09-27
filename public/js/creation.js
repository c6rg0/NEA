/* quizes table 
 * questions table (each quiz will have a column dedicated for the questions)
 * choices table (for the possible answers which will be buttons)
 * answers table (contains all the answers for the quiz in a single row)
 */

quiz = [];
questions = [];
choices = [];
answers = [];

const h1 = document.getElementsByTagName("h1");

const h2 = document.createElement("h2");
const h2_child = document.createTextNode("Quiz creation");
h2.appendChild(h2_child);
h2.id = "header";
h2.insertBefore(h2, h1);

let title = document.createElement("INPUT");
title.setAttribute("type", "text");
