var screenW = window.innerWidth;    // Screen Width
var screenH = window.innerHeight;   // Screen Height

var pages, canvas, rc;      // rc: resumeCanvas
var header, summary, experience, education, skills, margins;
var holder, editMode, doneEdit;
var update, canvas;
var highlight, linebuff;
var superBuff;
var textBox, nextButton, template, textEdit, footer, add;
var firstName, lastName, fullname, address;
var curr_element;

function preload() {
  holder = loadJSON('template_1.json');
}

function setup() {
  update = false;
  highlight = false;
  doneEdit = false;
  editMode = false;
  
  superBuff = '';
  
  canvas = createCanvas(screenW,screenH);
  original_canvas = canvas;
  
  // Manages the pages on the website
  pages = new Pages();
  
  // Init the Html elements for display.
  htmlObjectsInit();
  
  // Init resume elements
  header = new Header();
  summary = new Summary();
  experience = new Experience();
  education = new Education();
  skills = new Skills();
  margins = new Margins();
}

function draw() {
  
  if (pages.home){
    pages.displayHome();
  }
  
  else if (pages.template){
    pages.templateScreen();
  }
  
  else if (pages.login){
    pages.loginScreen();
  }
  
  else if (pages.builder){
    pages.resumeBuilder();
  }

  else {
    background(34,94,44);
  }
  
  // When editMode == true edit the current element
  if (editMode){
    curr_element.content = textEdit.value();
    lineBreak();
  } 
}

function Margins(){
  this.cls = holder.margins;
  this.li = [
              this.cls.topMargin,
              this.cls.bottomMargin,
              this.cls.rightMargin,
              this.cls.leftMargin
            ];
          
  this.display = function(){
    
    for (var i = 0; i < this.li.length; i++){
      stroke(255, 204, 0);
      strokeWeight(1);
      line(this.li[i].x1,this.li[i].y1,this.li[i].x2,this.li[i].y2);
      noStroke();
    }
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
    
    if (fullname){
      this.cls.name.content = fullname;
    }
    if (address){
      this.cls.address.content = address;
    }
    
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
    
    if (this.elm.bold)
      textStyle(BOLD);
    else
      textStyle(NORMAL);
      
    if (this.elm.italics){
      textStyle(ITALIC);
    }  
      
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
        
        /*  
            Select an element when the mouse is pressed on the elementand editMode is off
            Store the current element into a variable
        */
        
        if (mouseIsPressed){
          document.getElementById("text_edit").value = field.elements[i].content;
          openNav(); 
          editMode = true;
          curr_element = field.elements[i];
          break;
        } 
      } else { highlight = false; update = false; } 
      
  } // LOOP ENDS
}


function Pages(){
  this.home = true;
  this.template = false;
  this.login = false;
  this.builder = false;
  this.debug = false;
  
  this.displayHome = function(){
    
    hideElements();
    nextButton.style('display', 'inline-block');
    nextButton.position(screenW/2-55, 380);
    
    background("#262228");
    fill("#FFCE00");
    textSize(50);
    textFont("Helvetica");
    var phrase = "Interactive Resume Builder";
    text(phrase,screenW/2-textWidth(phrase)/2,90);
    fill("white");
    textSize(20);
    var phrase = "Build your resume professionally.";
    text(phrase,screenW/2-textWidth(phrase)/2,130);
    
    //canvas.position(0,70);
  }
  
  this.templateScreen = function(){
    
    //canvas.position(0,70);
    
    nextButton.style('display', 'none');
    template.style('display', 'inline-block');
    template.position(screenW/2-400, 280);
    
    background("#262228");
    fill(255, 204, 0);
    textSize(50);
    var phrase = "Choose a template";
    text(phrase,screenW/2-textWidth(phrase)/2,90);
    textSize(20);
    var phrase = "Create a resume using one of out templates.";
    text(phrase,screenW/2-textWidth(phrase)/2,130);
  }
  
  this.loginScreen = function(){
    
    //canvas.position(0,70);
    
    template.style('display', 'none');
    firstName.style('display', 'inline-block');
    lastName.style('display', 'inline-block');
    add.style('display', 'inline-block');
    firstName.position(screenW/2-400+155, 230);
    lastName.position(screenW/2-140+155, 230);
    add.position(screenW/2-245, 300);
    
    fname = select('#fname').value();
    lname = select('#lname').value();
    address = select('#address').value();
     
    fullname = fname + " " + lname;
    
    if (fullname != ' '){
      nextButton.style('display', 'inline-block');
      nextButton.position(screenW/2-55, 380);
    }
    
    background("#262228");
    fill(255, 204, 0);
    textSize(50);
    var phrase = "What is your name?";
    text(phrase,screenW/2-textWidth(phrase)/2,90);
    textSize(20);
    var phrase = "Let's start building your resume.";
    text(phrase,screenW/2-textWidth(phrase)/2,130);
  }
  
  this.resumeBuilder = function(){
    
    firstName.style('display', 'none');
    lastName.style('display', 'none');
    template.style('display', 'none');
    footer.style('display', 'none');
    
    background("white");
    canvas.position(300,60);
    
    if (update = true){
      header.display();
      summary.display();
      experience.display();
      education.display();
      skills.display();
      margins.display();
    }
    
    if(!editMode) {
      selectElement(header);
      selectElement(summary);
      selectElement(experience);
      selectElement(education);
      selectElement(skills);
    }
  }
}

/* Editing Functions */

function reset_EditText(){
  document.getElementById("text_edit").value = '';
}

function lineBreak(){
  
    if (textWidth(linebuff) < 390){
      linebuff = textEdit.value();
    }
    else  {
      superBuff += linebuff + '\n';
      linebuff = '';
      reset_EditText();
    } 
    
    var count = 0
    if (keyIsPressed && keyCode == ENTER){
      if (count == 0)
        superBuff += linebuff + '\n';
        linebuff = '';
        reset_EditText();
        count += 1;
    }
      curr_element.content = superBuff + linebuff;
}

function getFont(){
  fontdiv.value = curr_element.fontsize;
  console.log(curr_element.fontsize);
}

function updateRange(clickedRange) {
  var newfontSize = int(clickedRange.value);
  curr_element.fontsize = newfontSize;
}

function onClickbold(){
  if (curr_element.bold)
    curr_element.bold = false;
  else 
    curr_element.bold = true;
}

function onClickitalics(){
  if (curr_element.italics)
    curr_element.italics = false;
  else 
    curr_element.italics = true;
}

function onClickNext(){

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

function gotoPage(pg){
  
  // Set all pages to false
  pages.home = false; pages.template = false; 
  pages.login = false; pages.builder = false;
  
  // Set the page to display to true
  if (pg == 1)
    pages.home = true;
  else if (pg == 2)
    pages.template = true;
  else if (pg == 3)
    pages.login = true;
  else if (pg == 4)
    pages.builder = true;
}

function onClickDone(){
  editMode = false;
  closeNav();
}

function keyPressed() {
  if (keyCode == LEFT_ARROW)
    save('test.png');
}

function hideElements(){
  template.style('display', 'none');
  add.style('display', 'none');
  firstName.style('display', 'none');
  lastName.style('display', 'none');
}

function htmlObjectsInit(){
  
  
  doneButton = select("#editDone");
  doneButton.position(160,300);
  boldButton = select("#bold");
  boldButton.position(10,250);
  italButton = select("#italic");
  italButton.position(40,250);
  
  fontdiv = select("#fontsize");
  footer = select("#footer")
  textEdit = select("#text_edit");
  textBox = select("#textBox");
  firstName = select("#fname");
  lastName = select("#lname");
  add = select("#address")
  nextButton = select("#nextButton");
  template = select("#template1");
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

function windowResized() {
  screenW = window.innerWidth;    // Screen Width
  screenH = window.innerHeight;   // Screen Height
  canvas.size(window.innerWidth, window.innerHeight);
}