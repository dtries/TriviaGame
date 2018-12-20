// TRIVIA GAME JAVASCRIPT PAGE

var allTrivia = [{
    //Question and Answer 1
    Q: "In what decade does the show occur?",
    A_List: ["1960s", "1970s", "1980s", "1990s"],
    Correct_A: 2 
}, {

    //Question and Answer 2
    Q: "With which of Barry's friends does Erica eventually fall in love?",
    A_List: ["Matt", "Jeff", "Rob", "Andy"],
    Correct_A: 1
}, {

    //Question and Answer 3
    Q: "What word does Murray often use to refer to his kids?",
    A_List: ["Angels", "Idiots", "Schmoopies", "Morons"],
    Correct_A: 3
}, {

    //Question and Answer 4
    Q: "Which of the following is Adam's favorite past time?",
    A_List: ["Watching Movies", "Playing the Guitar", "Baking", "Working on his Car"],
    Correct_A: 0
}, {

    //Question and Answer 5
    Q: "Who eventually becomes Barry's girlfriend?",
    A_List: ["Lainey", "Dana", "Beverly", "Angie"],
    Correct_A: 0
}, {

    //Question and Answer 6
    Q: "What is name of Erica's band?",
    A_List: ["Goldberg Trio", "Sound Machine", "The Dropouts", "Beatniks"],
    Correct_A: 2
}, {

    //Question and Answer 7
    Q: "What is Beverly's signature dish?",
    A_List: ["Motzo Ball Soup", "Shrimp Parm", "Big Tasty Pork", "Hungry Man Dinners"],
    Correct_A: 1
}, {

    //Question and Answer 8
    Q: "What type of buisness does Murray own?",
    A_List: ["Tile Flooring", "Accounting Firm", "Restaurant", "Funiture Store"],
    Correct_A: 3
}, {

    //Question and Answer 9
    Q: "What is the name of Barry and his crew?",
    A_List: ["Philadelphia Four", "Jenkintown Posse", "The Outcasts", "Fabulous Five"],
    Correct_A: 1
}, {

    //Question and Answer 10
    Q: "What term do Adam, Barry, and Erica use to describe Beverly?",
    A_List: ["Smother", "Mommy Dearest", "Yenta", "Old Dear"],
    Correct_A: 0

}];

var TimeLeft;
var MaxDuration;
var QuestionUp;
var SelectedAns;
var CorrectAns;
var WrongAns;
var Q_Answered;

var Answer_Text;
var List_Index = 0;
var NumCorrect = 0;
var NumWrong = 0;
var Qs_Not_Answered = 0;
// var AnswersUp=allTrivia.A_List;

var Game_Instructions = " Show based trivia questions will presented one at a time. You have 9 seconds to answer each question. Can you get a perfect score? Let's see how well you know The Goldbergs!"


var ResultsMessage = {
    Correct: "Yep!",
    Incorrect: "Ummmm......No.",
    AllDone: "Game Complete. Your Final Tallies Are: ",
    TimedOut: "Yikes, You Took Waaay Too Long. "
}

var gifs = ["https://media.giphy.com/media/xUNd9FuqEuJm077I4w/giphy.gif", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"];



$("#Begin_Btn").on("click", function () {
    StartGame();
    $(this).hide();
    $("#Game_Instructions").hide();
});

$("#Play_Again_Btn").on("click", function () {
    StartGame();
    $(this).hide();

});

$("#Game_Instructions").text(Game_Instructions);
// console.log(Game_Instructions);

function StartGame() {
    QuestionUp = 0;
    CorrectAns = 0;
    WrongAns = 0;
    Q_Not_Answered = 0;

    $("#Score_Message").empty();
    $("#Number_Correct").empty();
    $("#Number_Wrong").empty();
    $("#Number_Timed_Out").empty();
    $("#Play_Again_Btn").empty();

    GetNewQuestion();

}

function GetNewQuestion() {
    $(".Answer_Selections").empty();
    Q_Answered = true; //Set for comparision purposes later, will go to false if question is not answered before timer runs out

    // Clear Answer Outcomes Page Text
    $("#Right_Wrong_Message").empty();
    $("#WhatIsCorrect").empty();
    $("#Video_Display").empty();

    // Load New Question and Answer Selections
    $("#Question_Number").html("Question " + (QuestionUp + 1) + ": "); //Text to display for the question number

    //Pulls Question from array and places text in Question div
    $("#Question").html('<h3 id="The_Question">' + allTrivia[QuestionUp].Q + "<h3>");
    // console.log("Question Up = "+allTrivia[QuestionUp].Q);


    //Creates seperate div for each possible answer,assigns index value(will use later for comparison to right answer), adds a class to each div
    var List_Index=0;
    allTrivia[QuestionUp].A_List.forEach(function (value) {
        var AnswersUp = $("<div>");
        AnswersUp.text(value);
        $(".Answer_Selections").append(AnswersUp);
        AnswersUp.attr({
            "data-index": List_Index
        });
        AnswersUp.addClass("Answer_Option");
        List_Index++;


    });

    Timer();



    // Register Player Response, stop countdown timer, go to Response Evaluator function to check whether correct

    $(".Answer_Option").on("click", function () {
        SelectedAns = $(this).data("index");
        console.log(this);
        clearInterval(TimeLeft); //Stop countdown timer
        PlayerResponse();
        Q_Answered=true;
        
    });
}

//Countdown timer
function Timer() {
    MaxDuration = 9;
    $("#Timer").html("<h2 id='The_Time'> Time Remaining: " + MaxDuration + "</h2>");
     TimeLeft = setInterval(TimerDisplay, 1000);

}

function TimerDisplay() {
    MaxDuration--;
    $("#Timer").html("<h2 id='The_Time'> Time Remaining: " + MaxDuration + "</h2>");
    if (MaxDuration <= 0) {
        clearInterval(TimeLeft);
        Q_Answered = false;

        console.log(Q_Answered);
        PlayerResponse();
    }
}

function PlayerResponse() {

    $("#Question_Number").empty();
    $(".Answer_Option").empty();
    $(".Question").empty();
    $("#The_Question").empty();

    //Variables tp get correct answer Text and Index Position
    var ArrayIndex4CorrectAnswer = allTrivia[QuestionUp].Correct_A;
    var Text4CorrectAnswer = allTrivia[QuestionUp].A_List[allTrivia[QuestionUp].Correct_A];

    console.log(gifs[QuestionUp]);

    //Plays gif
    switch (QuestionUp) {
        case 0:
            $("#Video_Display").html('<img src="https://media.giphy.com/media/26FeUs0dYHJK2TL3y/giphy.gif" width = "400px">');

            break;

        case 1:
            $("#Video_Display").html('<img src="https://media.giphy.com/media/26wkzXfvoTAXPnu80/giphy.gif" width = "400px">');

            break;

        case 2:
            $("#Video_Display").html('<img src="https://media.giphy.com/media/3o7aDeEmP8GoocHqBW/giphy.gif" width = "400px">');

            break;

        case 3:
            $("#Video_Display").html('<img src="https://media.giphy.com/media/3o6nUV6fgDCTGMmb8k/giphy.gif" width = "400px">');

            break;

        case 4:
            $("#Video_Display").html('<img src="https://media.giphy.com/media/xT1R9Q86D3xvgOOmMU/giphy.gif" width = "400px">');

            break;


        case 5:
            $("#Video_Display").html('<img src="https://media.giphy.com/media/3o7aD5YZKaaeGNkiNG/giphy.gif" width = "400px">');

            break;


        case 6:
            $("#Video_Display").html('<img src="https://media.giphy.com/media/xT9Igtxge6KzFaFvDq/giphy.gif" width = "400px">');

            break;


        case 7:
            $("#Video_Display").html('<img src="https://media.giphy.com/media/xT1R9OfXEokCV53PQ4/giphy.gif" width = "400px">');

            break;


        case 8:
            $("#Video_Display").html('<img src="https://media.giphy.com/media/3ohjUORuBBLvtO31Cw/giphy.gif" width = "400px">');

            break;


        case 9:
            $("#Video_Display").html('<img src="https://media.giphy.com/media/l1J9NQ6mXwcKmP4Zy/giphy.gif" width = "400px">');

        break;
        
    
    }

    //Right or Wrong Answer Evaluator, upates answer counts, displays appropriate message based on response type

    if ((SelectedAns == ArrayIndex4CorrectAnswer) && (Q_Answered == true)) {
        NumCorrect++;
        $("#Right_Wrong_Message").html(ResultsMessage.Correct);
        // console.log("Num Correct = "+NumCorrect);
    } else if ((SelectedAns != ArrayIndex4CorrectAnswer) && (Q_Answered == true)) {
        NumWrong++;
        $("#Right_Wrong_Message").html(ResultsMessage.Incorrect);

        $("#WhatIsCorrect").html("The correct answer is: " + Text4CorrectAnswer);
        // console.log("Num Wrong = "+NumWrong);

    } else {
        Qs_Not_Answered++;
        Q_Answered = true;
        $("#Right_Wrong_Message").html(ResultsMessage.TimedOut);

        $("#WhatIsCorrect").html("The correct answer is: " + Text4CorrectAnswer);
    }


    if (QuestionUp == (allTrivia.length-1)) {
        setTimeout(Score_Display, 3000);
    } else {
        QuestionUp++;
        setTimeout(GetNewQuestion, 5000);
    }
}






// Clears Out Game Play Divs & Shows End Message, Final Stats, & Displays Play Again Button 
function Score_Display() {

    $("#Timer").empty();
    $(".Question").empty();
    $("#WhatIsCorrect").empty();
    $("#Right_Wrong_Message").empty();
    $("Video_Display").empty();

    //Final Stats
    $("#Score_Message").html(ResultsMessage.AllDone);
    $("#Number_Correct").html("Right Answers: " + NumCorrect);
    $("#Number_Wrong").html("Wrong Answers: " + NumWrong);
    $("#Number_Timed_Out").html("Not Answered: " + Qs_Not_Answered);

    //Play Again Button
    $("#Play_Again_Btn").addClass("btn btn-primary reset");
    $("#Play_Again_Btn").html("Play Again?");
    $("#Play_Again_Btn").show();



}