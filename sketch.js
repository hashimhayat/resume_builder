var parser;
var header, summary, experience, education;
var holder;
var update;
var highlight;
var textBoxData;

function preload() {
  // load our Template (JSON) file
  holder = loadJSON('struct.json');
}

function setup() {
  update = false;
  highlight = false
  var canvas = createCanvas(1240,1754);
  // parser = new Parser();
  header = new Header();
  summary = new Summary();
  experience = new Experience();
  education = new Education();

  header.display();
  summary.display();
  experience.display();
  education.display();
}

function draw() {
  background(200);
  textBoxData = select('#textBox').value();
  text(textBoxData, 20, 20);
  //text(update, 20,40);
  if (update = true){
    header.display();
    summary.display();
    experience.display();
    education.display();
  }
  selectElement(header);
  selectElement(summary);
  selectElement(experience);
  selectElement(education);
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
                    this.cls.fname,
                    this.cls.lname,
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


