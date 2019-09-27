var triviaQuestions=[
{
    question:'The heart of a shrimp is located where?',
    options:['Stomach','Head','Tail','Legs'],
    answer:1
},
{
    question:'How many noses do slugs have?',
    options:['One','Two','Three','Four'],
    answer:3
},
{
    question:'What is the only animal that cant jump?',
    options:['Dog','Mouse','Elephant','Monkey'],
    answer:2
},
{
    question:'What animal has biggers eye than their brain size?',
    options:['Dog','Ostrich','Giraffe','Lion'],
    answer:1
},
{
    question:'Female peacocks are called what?',
    options:['Peahens','Peas','Peacocks','Puppy'],
    answer:0
},
{
    question:'Why do cats meow?',
    options:['Communicate with other cats','For fun','Get attention from human','Because theyre in pain'],
    answer:2
},
{
    question:'Flamingos are naturally what color?',
    options:['Red','White','Pink','Orange'],
    answer:1
},
{
    question:'Anteaters dont have what?',
    options:['Toes', 'Eyes','Ears','Teeth'],
    answer:3
},
{
    question:'The number of people bitten by sharks in a year is how many times less than the number of people bitten by other people in New York?',
    options:['5','10','15','20'],
    answer:1
},
{
    question:'Male platypuses have what?',
    options:['Venomus spurs','Wings','Regenerating abilities','Fire breathing abilities'],
    answer:0
}
];

var currentQuestion; 
var correct;
var incorrect;
var unanswered;
var seconds;
var time;
var answered;
var userGuess;
var alerts = {
	correct: "Nice, you got it right!",
	incorrect: "Wrong, better luck next time.",
	timeRunOut: "You ran out of time!",
}

$('#start').on('click', function(){
	$(this).hide();
	newGame();
});

$('#reset').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#scores').empty();
	$('#correct').empty();
	$('#incorrect').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	displayNextQuestion();
}

function displayNextQuestion(){
	$('#message').empty();
	$('#corrected').empty();
	answered = true;
	$('#question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].options[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('#options').append(choices);
	}
	countdown();
	$('.thisChoice').on('click',function(){
		userGuess = $(this).data('index');
		clearInterval(time);
		answer();
	});
}

function countdown(){
	seconds = 20;
	$('#remainingTime').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#remainingTime').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answer();
	}
}

function answer(){
	$('.thisChoice').empty(); 
	$('#question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].options[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	if((userGuess == rightAnswerIndex) && (answered == true)){
		correct++;
		$('#message').html(alerts.correct);
	} else if((userGuess != rightAnswerIndex) && (answered == true)){
		incorrect++;
		$('#message').html(alerts.incorrect);
		$('#corrected').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(alerts.timeRunOut);
		$('#corrected').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 2000)
	} else{
		currentQuestion++;
		setTimeout(displayNextQuestion, 2000);
	}	
}

function scoreboard(){
	$('#remainingTime').empty();
	$('#message').empty();
	$('#corrected').empty();

	$('#correct').html("Correct Answers: " + correct);
	$('#incorrect').html("Incorrect Answers: " + incorrect);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#reset').addClass('reset');
	$('#reset').show();
	$('#reset').html('Play Again');
}


