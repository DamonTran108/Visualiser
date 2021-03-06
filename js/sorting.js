function setup() {
    //setup code here

    model = new Model(100);
    width = windowWidth - 500;
    height = windowHeight - 200;
    rectWidth = width / model.getData().length;
    rectHeight = height / model.getData().length;
    shuffle = false;
    reset = false;
    sorting = false;
    var cnv = createCanvas(width, height);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);

    sleepDur = 15;
}

async function draw() {
    //drawing code here
    colorMode(RGB);
    background(173, 216, 230);

    if (reset) {
        model.resetData();
        reset = true;
        sorting = false;
    }

    if (sorting) {
        reset = false;
        shuffle = false;
    }

    var colorInterval = 315 / model.getData().length;
    for (var i = 0; i < model.getData().length; i++) {

        thisColor = colorInterval * model.getData()[i];
        colorMode(HSB);
        fill(thisColor, 100, 85);
        noStroke();
        rect(i * rectWidth, height, rectWidth, -(rectHeight * model.getData()[i]));
    }

}

function windowResized() {
    width = windowWidth - 500;
    height = windowHeight - 200;
    rectWidth = width / model.getData().length;
    rectHeight = height / model.getData().length;
    resizeCanvas(width, height);
}

function shuffleData() {
    shuffle = !shuffle;
    reset = false;
}

async function shuffleIt(){
  sorting = false;
  shuffleData();
  await model.shuffleData();
}

function resetData() {

    shuffle = false;
    reset = true;

}

async function bubbleSort() {

    shuffle = false;
    if (!sorting) {
        sorting = true;
        for (let i = 0; i < model.getData().length; i++) {
            for (let j = 0; j < (model.getData().length - i); j++) {
                if (model.getData()[j] > model.getData()[j + 1]) {
                    model.swap(j, (j + 1));
                    await sleep(sleepDur);
                }
                if (shuffle || reset) {

                    return;
                }
            }
        }
        sorting = false;
   }
}

async function quickSort(start, end) {
  shuffle = false;

    if (start >= end) {
        return;
    }

    let index = await partition(start, end);
    if (shuffle || reset) {

        return;
    }

    await Promise.all([
        quickSort(start, index - 1),
        quickSort(index + 1, end)
    ]);

}

async function partition(start, end) {

    let pivotIndex = start;
    let pivotValue = model.getData()[end];

    for(let i = start; i < end; i++){

      if (shuffle || reset) {
          shuffle = true;
          return;
      }

        if(model.getData()[i] <  pivotValue){


          await sleep(sleepDur);


            await model.swap(i, pivotIndex);



            pivotIndex++;
        }
    }


    await sleep(sleepDur);
    await model.swap(pivotIndex, end);


    return pivotIndex;
}

async function execute() {

    quickSort(0, model.getData().length - 1);
}


async function selectionSort(){
  shuffle = false;
  if(!sorting){
    sorting = true;


  let valIndex = 0 ;
  let val =0;

  for(let oL = 0 ; oL < model.getData().length-1; oL++){

    val = model.getData()[oL];
    valIndex = oL;

    for(let iL = oL +1 ; iL < model.getData().length; iL++){

      if(val > model.getData()[iL]){
        val = model.getData()[iL];
        valIndex = iL;

      }
      if (shuffle || reset) {

          return;
      }
    }


    model.swap(valIndex,oL);
    await sleep(sleepDur);
    }
    sorting = false;
  }

}


async function beginSort() {

    var dropDownMenu = document.getElementById("dropDown");
    var i = dropDownMenu.selectedIndex;
    var userChoice = dropDownMenu.options[i].text;


    if (userChoice === "Bubble sort") {

        bubbleSort();


    } else if (userChoice === "Quick sort") {

        execute();

    } else if (userChoice === "Selection sort"){

       selectionSort();
    }


}
