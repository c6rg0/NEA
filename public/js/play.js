var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var quizMeta = /** @class */ (function () {
    function quizMeta() {
        this.name = "Python quiz";
        this.author = "Gabriel";
        this.button_text = "Play";
    }
    return quizMeta;
}());
var qm = new quizMeta();
var gameTitle = document.getElementById("game_title");
var gameTitleChild = document.createTextNode(qm.name);
gameTitle.appendChild(gameTitleChild);
var gameCreator = document.getElementById("game_creator");
var gameCreatorChild = document.createTextNode(qm.author);
gameCreator.appendChild(gameCreatorChild);
var startButton = document.getElementById("start_button");
var startButtonChild = document.createTextNode(qm.button_text);
startButton.appendChild(startButtonChild);
var quizContent = /** @class */ (function () {
    function quizContent() {
        // q = questions, o = options, a = answers
        this.q = ["Click 1", "Click 2", "Click 3!"];
        this.o = ["One", "Two", "Three", "Four"];
        this.a = ["One", "Two", "Three", "Four"];
    }
    return quizContent;
}());
var qz = new quizContent();
// Pre-quiz screen 
function start_quiz() {
    document.getElementById("game_title").remove();
    // The exclamation mark removes the error stating that -
    // ('game_title' is 'possibly null').
    document.getElementById("game_creator").remove();
    document.getElementById("start_button").remove();
    var round = 0;
    var score = 0;
    verification(round, score);
}
// Field verification:
// To check if there is any more questions left, 
// if not, the end screen will be triggered.
function verification(round, score) {
    round++;
    // Used for testing:
    // console.log(round);
    if ((qz.q[round - 1]) == null) {
        console.log("The game has finished");
        end_screen(round, score);
    }
    else {
        object_creation(round, score);
    }
}
// Quiz 
function object_creation(round, score) {
    var buttonContainer = document.getElementById("button_container");
    /* Display quiz_q[x]*/
    var newH2 = document.createElement("h3");
    var q = document.createTextNode(qz.q[round - 1]);
    newH2.appendChild(q);
    newH2.id = "question";
    document.body.insertBefore(newH2, buttonContainer);
    /* Display quiz_a[x]*/
    /* Need to add the onclick element/property to the buttons */
    var a = document.createElement("BUTTON");
    var a_test = (qz.o[0]);
    var a_node = document.createTextNode(a_test);
    a.appendChild(a_node);
    a.id = 'choice_a';
    buttonContainer.appendChild(a);
    var b = document.createElement("BUTTON");
    var b_test = (qz.o[1]);
    var b_node = document.createTextNode(b_test);
    b.appendChild(b_node);
    b.id = 'choice_b';
    buttonContainer.appendChild(b);
    var c = document.createElement("BUTTON");
    var c_test = (qz.o[2]);
    var c_node = document.createTextNode(c_test);
    c.appendChild(c_node);
    c.id = 'choice_c';
    buttonContainer.appendChild(c);
    var d = document.createElement("BUTTON");
    var d_test = (qz.o[3]);
    var d_node = document.createTextNode(d_test);
    d.appendChild(d_node);
    d.id = 'choice_d';
    buttonContainer.appendChild(d);
    waiting_for_ans(a, b, c, d, a_test, b_test, c_test, d_test, round, score);
}
/* Testing for the answer*/
function waiting_for_ans(a, b, c, d, a_test, b_test, c_test, d_test, round, score) {
    function listen() {
        function handleClick(choice, round, score) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    evaluate(choice, round, score);
                    return [2 /*return*/];
                });
            });
        }
        a.addEventListener('click', function () { return handleClick(a_test, round, score); });
        b.addEventListener('click', function () { return handleClick(b_test, round, score); });
        c.addEventListener('click', function () { return handleClick(c_test, round, score); });
        d.addEventListener('click', function () { return handleClick(d_test, round, score); });
    }
    listen();
}
// Test the answer
function evaluate(choice, round, score) {
    var answer = (qz.a[round - 1]);
    if (choice == answer) {
        score++;
        console.log('Correct');
        console.log(score + '/' + round);
        purge_screen(round, score);
    }
    else {
        console.log("Wrong");
        console.log(score + '/' + round);
        purge_screen(round, score);
    }
}
function purge_screen(round, score) {
    document.getElementById("question").remove();
    document.getElementById("choice_a").remove();
    document.getElementById("choice_b").remove();
    document.getElementById("choice_c").remove();
    document.getElementById("choice_d").remove();
    // Restarting the loop of functions
    verification(round, score);
}
function end_screen(round, score) {
    var endScreenContainer = document.getElementById('end_screen_container');
    var end_banner = document.createElement('h3');
    var end_banner_node = document.createTextNode("Congratulations!");
    end_banner.appendChild(end_banner_node);
    end_banner.id = "endBanner";
    endScreenContainer.appendChild(end_banner);
    // I haven't made a score tracker yet
    var end_score = document.createElement('h4');
    var end_score_node = document.createTextNode("Your score is " + score + "/" + (round - 1) + "!");
    end_score.appendChild(end_score_node);
    end_score.id = "endScore";
    endScreenContainer.appendChild(end_score);
}
/* Structure:
 *	Displaying a "Play" screen (before the quiz),
 *	Removing the existing objects,
 *	Adding the buttons,
 * 	Adding text for the quiz,
 * 	Waiting for the answer,
 * 	Checking for incorrect/correct answer,
 * 	Keeping track of the score
 * 	Displaying so,
 * 	Next question (looping),
 * 	When the quiz is done:
 * 		Removing all the existing objects
 * 		Adding a quiz screen (with scores)
 */
