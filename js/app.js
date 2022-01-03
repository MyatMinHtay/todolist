// UI 

const formel = document.getElementById('form'),
      inputone = document.getElementById('input'),
      todoul = document.getElementById('todos');

const hiddenbox = document.querySelector('.hiddenbox');

const showcode = document.querySelector('.forcode');

const inputtwo = document.getElementById('password');

const formeltwo = document.querySelector('.code');

const inputthree = document.getElementById('inputthree');

const formthree = document.getElementById('formthree');

const btn = document.querySelector('.btn');

const photo = document.querySelector('.photo');

const eyeicon = document.getElementById('eyeone');

const eyeicontwo = document.getElementById('eyetwo');

const display = document.querySelector('.display');

const show = document.querySelector('.show');

inputthree.addEventListener('input',(e)=>{
    // console.log('hay');
    // console.log(e.target);
    // console.log(e.target.value);

    const input = e.target.value;
    const inlength = input.length;
    // console.log(inlength);

    const blurvalue = 20 - inlength * 4;

    photo.style.filter = `blur(${blurvalue}px)`;
});

eyeicon.addEventListener('click',()=>{
    // console.log('hay');

    
    if(eyeicon.classList.contains('fa-eye')){
        // console.log('show password');
        
        eyeicon.classList.replace('fa-eye','fa-eye-slash');
        inputthree.setAttribute('type','text');
        inputtwo.setAttribute('type','text');

    }else{
       
        eyeicon.classList.replace('fa-eye-slash','fa-eye');
        inputthree.setAttribute('type','password');
        inputtwo.setAttribute('type','password');
    }
});

eyeicontwo.addEventListener('click',()=>{
    // console.log('hay');

    
    if(eyeicontwo.classList.contains('fa-eye')){
        // console.log('show password');
        
        eyeicontwo.classList.replace('fa-eye','fa-eye-slash');
        inputthree.setAttribute('type','text');
        inputtwo.setAttribute('type','text');

    }else{
       
        eyeicontwo.classList.replace('fa-eye-slash','fa-eye');
        inputthree.setAttribute('type','password');
        inputtwo.setAttribute('type','password');
    }
});



let [miliseconds,seconds] = [0,0];

let time;

inputthree.addEventListener('focus',runtimer);

function runtimer(e){
	// console.log(`Event Type = ${e.type}`);

	// get input value 
	// console.log(inputthree.value);
	// e.preventDefault();

    // Start Timer
  

    // console.log('start timer');

    if(time !== null){
        clearInterval(time);
    }

    time = setInterval(displaytimer,10);

    // console.log(time);
    
    

}



function displaytimer(){
    // console.log('hay i working'); 

    miliseconds += 10;
    // console.log(miliseconds);

    if(miliseconds === 1000){
        miliseconds = 0;
        

        seconds++;
        

        if(seconds === 30){
            clearInterval(time);
            [miliseconds,seconds] = [0,0];
            inputthree.disabled = true;
            show.classList.add('error');
        }
    }

   
    let s = seconds < 10 ? "0"+seconds :seconds;
    let ms = miliseconds < 10 ? "00"+miliseconds :miliseconds < 100 ? "0"+miliseconds : miliseconds;

    display.innerText = `${s} : ${ms}`;

}

btn.addEventListener('click',(e)=>{
    // console.log(inputthree.value);
    removetaskfromlocalstorage(inputthree.value);
    

    
    // hiddenbox.classList.remove('abc');

    e.preventDefault();


    

});

show.addEventListener('click',()=>{
    window.location.reload();
})


const todos = JSON.parse(localStorage.getItem("todos"));

if(todos){
    todos.forEach(todo => addtodo(todo));
}


formel.addEventListener('submit',(e)=>{
        // console.log('hay');
        if(inputone.value === ''){
            window.alert('Enter Your todo');
        }else{
            showcode.classList.add('showcode');
        }
        
        // addtodo();
    
        e.preventDefault();
});

let passworderror = document.querySelector('.passworderror');

formeltwo.addEventListener('submit',(e)=>{

    if(inputtwo.value === ''){
        window.alert('Enter Your code');
    }else if(inputtwo.value.length < 5){
        window.alert('Your Code Must Be at least 5');
    }else{
        storetaskinlocalstorage(inputtwo.value);

        addtodo();
        inputtwo.value = '';
        showcode.classList.remove('showcode');
    }
    
            
    
    // console.log(passvalue);

    // storetaskinlocalstorage(inputtwo.value);
    

    e.preventDefault();
});



function storetaskinlocalstorage(task){
    // console.log(task);
    
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        // console.log(typeof tasks); 
    }

    tasks.push(task);
    // console.log(tasks);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}






function addtodo(todo){
    // console.log('i am working');

    let tdtext = inputone.value;
    // let passtext = inputtwo.value;
    
    // console.log(tdtext);

    if(todo){
        tdtext = todo.text;
    }

    

    if(tdtext){
        let li = document.createElement('li');
        let itag = document.createElement('i');
        // let p = document.createElement('p');

        itag.className = 'fas fa-trash-alt';
        // p.innerText = passtext;

        li.appendChild(document.createTextNode(tdtext));
        li.appendChild(itag);
        // li.appendChild(p);
        // console.log(li);

        todoul.appendChild(li);
        
        inputone.value = '';

        if(todo && todo.complete){
            // add class 
            li.classList.add('completed');
        }

        // add to localStorage 
        updatelocalstorage();
        
         // add line through by left click 
        li.addEventListener('contextmenu',(e)=>{
            li.classList.toggle('completed');

            updatelocalstorage();
            e.preventDefault();
        });


     

        

    }else{
        window.alert('Enter Your ToDo');
    }

    



}

  
function updatelocalstorage(){
    // console.log('storage is ready');

    todolis = document.querySelectorAll('li');
    
    
   

    // console.log(todolis);
    let todos = [];
    


    todolis.forEach(todoli=>{
        // console.log(todoli);
        // console.log(todoli.innerText);

        

        todos.push({
            text:todoli.innerText,
            complete:todoli.classList.contains('completed'),
            
            
        
        });

        

        
    });

 

    // console.log(todos);
    localStorage.setItem('todos',JSON.stringify(todos));
}



document.body.addEventListener('click',deleteitem);


function deleteitem(e){

    // console.log(e.target);
	
    

    

	if(e.target.className === "fas fa-trash-alt"){
		// console.log('hay');
            // i      a  			li
        // e.target.parentElement.remove();
        hiddenbox.classList.add('abc');
        
        
	}

    e.preventDefault();

}

// function removeli(e){

//     let todoitem = e.target.className;

//     if(todoitem === )
//      e.preventDefault();
// }



function removetaskfromlocalstorage(taskitem){
    //    console.log('hay');
    // console.log(taskitem);
        // console.log(taskitem.textContent);
        // console.log(taskitem.innerText);
        
        let todos;
        let tasks;
    

        
        if(localStorage.getItem('tasks') === null){
            task = [];
        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
            todos = JSON.parse(localStorage.getItem('todos'));
        }

         let getlength = todos.length;

       
       
            tasks.forEach((task,index)=>{
                // console.log(task);
    
                
    
             
                if(taskitem === task){
                          
                    
                           //where we want to start(index), where we want to end (how many);
                    
                    tasks.splice(index,1);
                    todos.splice(index,1);
                    window.location.reload();
                   
                    
                }else{
                    
                    
                    
                }


                
            });
         
        
        
    
        if(getlength !== todos.length){
            window.alert('Your text is already Clear');
        }else{
            window.alert('Your Code is incorrect! Try again');
        }
      
        

        

            
            
        localStorage.setItem('tasks',JSON.stringify(tasks));
        localStorage.setItem('todos',JSON.stringify(todos));

        
    
}

    
   


