//Variables
// let grade_by_unit, unit, number, start, score, total_unit, total_grade_by_unit, sgpa, grade;

//Select Elements from DOM
const text1 = document.getElementById('text1');  
let button1 = document.getElementById('button1');
var text2 = document.getElementById('text2');
var text3 = document.getElementById('text3');
let button2 = document.getElementById('button2');
let numberForm = document.querySelector('#number_form');

//Add Event Listener
// I removed the event Listener from the button and added it to the form.. because of accessibility.... Someone might be using the keyboard and might not have the time to pick the mouse

// button1.addEventListener(('click'), function (){
//     let number = text1.value; 
// });

// numberForm.addEventListener('submit', (e)=>{
//     e.preventDefault() //This would prevent the default behavior of form submission
//     let numberofCourses = parseInt(document.querySelector('#text1').value)
//     document.querySelector('.form').querySelectorAll('.form-group').forEach(node=> node.remove())
//     for(let i = 0; i<numberofCourses; i++){
//         let formGroup = document.createElement('div');
//         formGroup.className = 'form-group';
//         let score = document.createElement('input');
//         score.type = 'text';
//         score.className = 'form-control mb-3 score';
//         score.placeholder = 'Enter your score....'
//         let unit = document.createElement('input');
//         unit.type = 'number';
//         unit.className = 'form-control unit';
//         unit.min = 1;
//         unit.max = 6;
//         unit.placeholder = 'Enter the course unit...'
//         let label = document.createElement('h6');
//         label.textContent = `Course ${i+1}`;
//         formGroup.appendChild(document.createElement('hr'));
//         formGroup.append(label)
//         formGroup.appendChild(score);
//         formGroup.appendChild(unit);
//         document.querySelector('.form').insertBefore(formGroup, document.querySelector('.submitBtn'));
//     }
// })
let numberofCourses;

numberForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(text1.value != ''){
        numberofCourses = parseInt(text1.value);
        questions();
    } else alert('Please enter the number of courses you took')
})

let total_grade_by_unit = 0;
let total_unit = 0;
let count = 1;
function questions(){
    console.log(count);
    document.querySelector('#course_id').textContent = 'Course'+count
    document.querySelector('#text2').value = '';
    document.querySelector('#text3').value = '';

    document.querySelector('.allCourses').addEventListener('submit', function course(e){
        e.preventDefault();
        e.currentTarget.removeEventListener('submit', course);
        count++

        score = parseInt(document.querySelector('#text2').value);
        unit = parseInt(document.querySelector('#text3').value);
        total_grade_by_unit+=score;
        total_unit+=unit;
        if(count == numberofCourses){     
            console.log(count)
            document.querySelector('#text2').value = '';
            document.querySelector('#text3').value = '';
            button2.textContent = 'Calculate';
            document.querySelector('#course_id').textContent = 'Course'+count
            document.querySelector('.allCourses').addEventListener('submit', function calculate(e){
                e.preventDefault()
                console.log(total_grade_by_unit);
                console.log(total_unit)
                // So from here.... you have what you need... you can define a function that'd calculate the GPA from the total_grade_by_unit and the total unit
                // The function is what would be used to display the GPA on the frontend
                // I hope you understand it
                // I'm sorry for commenting the rest of the code like that
                // Much love bruv
            })
        } else{
            questions()
        }
    })
}

// let allCourses = document.querySelector('.allCourses');
// allCourses.addEventListener('submit', function(e){
//     e.preventDefault();
//     let allFormGroups = document.querySelectorAll('.allCourses .form-group');
//     let total_grade_by_unit = 0;

//     allFormGroups.forEach(function (formGroup){
//         let score = Number(formGroup.querySelector('.score').value);
//         let unit = Number(formGroup.querySelector('.unit').value);
//         if(score >= 70){
//             grade_by_unit = 5 * unit;
//         }else if (score >= 60){
//             grade_by_unit = 4 * unit;
//         }else if(score >= 50){
//             grade_by_unit = 3 * unit;
//         }else if(score >= 45){
//             grade_by_unit = 2 * unit;
//         }else if(score >= 40){
//             grade_by_unit = 1 * unit;
//         }else grade_by_unit = 0;
//         total_grade_by_unit += grade_by_unit;
//         total_unit += unit;

//         formGroup.querySelector('.score').value = '';
//         formGroup.querySelector('.unit').value = '';
//     })            
    //             start += 1

    //             if(start == number){
    //                 document.getElementById('button2') = 'Calculate';
    //             } else if (button2= "Calculate"){ 
    //             sgpa = (total_grade_by_unit / total_unit);}

    
    //             if (sgpa >= 5){
    //                 grade = "A";
    //               }else if (sgpa >= 4){  
    //                 grade = "B";
    //           }else if (sgpa >= 3){
    //                 grade = "C";
    //              }else if (sgpa >= 2){
    //                 grade = "D";
    //              }else if (sgpa >= 1){
    //                 grade = "E";
    //              }else
    //                 {grade = "F";}

                
    //             document.getElementById('text4').innerHTML = Math.round(sgpa, 2);
    //            console.log(sgpa);
    //                console.log(grade); 
               
    //            document.getElementById('text5').innerHTML = grade