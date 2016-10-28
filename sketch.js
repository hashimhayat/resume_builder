var screenW = window.innerWidth;    // Screen Width
var screenH = window.innerHeight;   // Screen Height

var pages;
var header, summary, experience, education, skills;
var holder;
var update, canvas;
var highlight;
var textBoxData;
var textBox, control, nextButton;

function preload() {
  // load our Template (JSON) file
  holder = loadJSON('struct.json');
}

function setup() {
  update = false;
  highlight = false
  //var canvas = createCanvas(1240,1754);
  var canvas = createCanvas(screenW,screenH);
  
  pages = new Pages();
  textBox = select("#textBox");
  control = select("#controls")
  nextButton = select("#nextButton")
  
  header = new Header();
  summary = new Summary();
  experience = new Experience();
  education = new Education();
  skills = new Skills();
  
  pages.home = true;
}

function draw() {
  
  if (pages.home){
    pages.displayHome();
  }
  
  if (pages.template){
    pages.templateScreen();
  }
  
  if (pages.login){
    pages.loginScreen();
  }
  
  if (pages.builder){
    pages.resumeBuilder();
  }

  if (pages.debug){
    background(34,94,44);
  }
}

function Parser(){
  this.contact = holder.contact;
  this.display = function(){
      
  }
}

function Header(){
  this.cls = holder.contact;
  this.elements = [
                    this.cls.title,
                    this.cls.name,
                    this.cls.address,
                    this.cls.phone,
                    this.cls.email
                  ];
          
  this.display = function(){
    for (var i = 0; i < this.elements.length; i++){
      var txt = new toText(this.elements[i]);
      txt.write();
    }
    update = false;
  }
}

function Summary(){
  this.cls = holder.summary_;
  this.elements = [
                    this.cls.summarytitle,
                    this.cls.summarycont
                  ];
          
  this.display = function(){
    for (var i = 0; i < this.elements.length; i++){
      var txt = new toText(this.elements[i]);
      txt.write();
    }
    update = false;
  }
}

function Experience(){
  this.cls = holder.experience;
  this.elements = [
                    this.cls.experiencetitle,
                    this.cls.job1title,
                    this.cls.job1company,
                    this.cls.job1summary,
                    
                    this.cls.job2title,
                    this.cls.job2company,
                    this.cls.job2summary,
                    
                    this.cls.job3title,
                    this.cls.job3company,
                    this.cls.job3summary
                  ];
          
  this.display = function(){
    for (var i = 0; i < this.elements.length; i++){
      var txt = new toText(this.elements[i]);
      txt.write();
    }
    update = false;
  }
}

function Education(){
  this.cls = holder.education;
  this.elements = [
                    this.cls.title,
                    this.cls.school,
                    this.cls.major,
                    this.cls.graduation
                  ];
          
  this.display = function(){
    for (var i = 0; i < this.elements.length; i++){
      var txt = new toText(this.elements[i]);
      txt.write();
    }
    update = false;
  }
}

function Skills(){
  this.cls = holder.skills;
  this.elements = [
                    this.cls.title,
                    this.cls.skillCont
                  ];
          
  this.display = function(){
    for (var i = 0; i < this.elements.length; i++){
      var txt = new toText(this.elements[i]);
      txt.write();
    }
    update = false;
  }
}

function toText(element){
  this.elm = element;
  
  this.write = function(){
    if (highlight) {fill(255,0,0);} else {fill(0);}
    textSize(int(this.elm.fontsize));
    textFont(this.elm.font);
    text(this.elm.content, this.elm.xP,this.elm.yP);
  }
}

function selectElement(element){
  
  var field = element;
  var xPos;
  var yPos;
  var txt;
  var padding = 10;
  
  for (var i = 0; i < field.elements.length; i++){

      xPos = field.elements[i].xP;
      yPos = field.elements[i].yP;
      txt = field.elements[i].content;

      if ((mouseX > xPos && mouseX < xPos + textWidth(txt)) && (mouseY > yPos-padding && mouseY < yPos + padding)){

        cursor(HAND);
        highlight = true;
        update = true;
        
        if (mouseIsPressed){
          field.elements[i].content = textBoxData;
          update = true;
        } 
      } else {
        highlight = false;
        update = true;
      } 
  } 
}

function toggleSettings() {
  // get the current display value of our settings window
  var currentDisplay = select("#controls").style('display');
  
  if (currentDisplay == "block") {
    select("#controls").style('display', 'none');
  }
  else {
    select("#controls").style('display', 'block');
  }
}

function Pages(){
  this.home = true;
  this.template = false;
  this.login = false;
  this.builder = false;
  this.debug = false;
  
  this.displayHome = function(){
    
    control.style('display', 'none');
    nextButton.style('display', 'inline-block');
    nextButton.position(screenW/2-42, 180);
    
    background(50);
    fill(255, 204, 0);
    textSize(50);
    var phrase = "Interactive Resume Builder";
    text(phrase,screenW/2-textWidth(phrase)/2,90);
    textSize(20);
    var phrase = "Build your resume professionally.";
    text(phrase,screenW/2-textWidth(phrase)/2,150);
  }
  
  this.templateScreen = function(){
    
    control.style('display', 'none');
    nextButton.style('display', 'inline-block');
    nextButton.position(screenW/2-42, 180);
    
    background(50);
    fill(255, 204, 0);
    textSize(50);
    var phrase = "Choose a template";
    text(phrase,screenW/2-textWidth(phrase)/2,90);
    textSize(20);
    var phrase = "Create a resume using one of out templates.";
    text(phrase,screenW/2-textWidth(phrase)/2,150);
  }
  
  this.loginScreen = function(){
    
    control.style('display', 'none');
    nextButton.style('display', 'inline-block');
    nextButton.position(screenW/2-42, 180);
    
    background(50);
    fill(255, 204, 0);
    textSize(50);
    var phrase = "What is your name?";
    text(phrase,screenW/2-textWidth(phrase)/2,90);
    textSize(20);
    var phrase = "Lets start building your resume.";
    text(phrase,screenW/2-textWidth(phrase)/2,150);
  }
  
  this.resumeBuilder = function(){
    if (pages.resumeBuilder){
        background(200);
        textBoxData = select('#textBox').value();
        textBox.style('display', 'inline-block');
        
        var buff = '';
        if (textWidth(buff) < 50){
          buff = textBoxData;
        }
        else if (textWidth(buff) == 50){
          buff += '\n';
          text(buff, 20, 20);
        }
        
        if (update = true){
          header.display();
          summary.display();
          experience.display();
          education.display();
          skills.display();
        }
        selectElement(header);
        selectElement(summary);
        selectElement(experience);
        selectElement(education);
        selectElement(skills);
    }
  }
  
}

function onClickNext(){
  //button_sound.play();
  nextButton.style('display', 'none');
  
  if (pages.home){
    pages.home = false;
    pages.template = true;
  } else if (pages.template){
    pages.template = false;
    pages.login = true;
  } else if (pages.login){
    pages.login = false;
    pages.builder = true;
  }
}


