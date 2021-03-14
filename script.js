const apikey = "fa118d6a-c0e7-4021-a52e-908f929579f4"
// https://www.dictionaryapi.com/api/v3/references/learners/json/apple?key=your-api-key
 const take = document.querySelector('.show');
let input  = document.querySelector(".input")
let btn = document.querySelector('.btn');
btn.addEventListener('click', (e)=>{
     take.innerHTML='';
    let word =input.value;
    if(word === '')
    {
        alert('Word is required')
        return;
    }
    let ele = document.createElement('p');
    ele.classList.add('h2');
    ele.innerHTML='Loading...'
    take.appendChild(ele);
    getdata(word);
    input.value = '';

})

async function getdata(word) {

    let rep = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`)
    let data  = await rep.json();
    take.innerHTML='';
    if(data.length === 0)
    {
         notfound();
         return;
    }
    if(typeof(data[0]) === 'string')
    {
        let head = document.createElement('p');
        head.classList.add('h2');
        head.innerText = 'Did you mean?';
        take.appendChild(head);
        let para = document.createElement('div');
        para.classList.add('spandiv');
        take.appendChild(para);
        data.forEach(element => {
            let naya = document.createElement('div');
            naya.innerHTML=`<button id="${element}" class='suggested' onclick="handle(id)">${element}</button>`
            para.appendChild(naya);
        });
        return ;
    }
    let def = data[0].shortdef[0];
    let para = document.createElement('p');
    para.classList.add('def')
    para.innerHTML='Def :' + def;
    take.appendChild(para);
    let ad = data[0].hwi.prs[0].sound.audio;
    if(ad)
    {
        renderSound(ad);
    }
}
function notfound(){
    let ele = document.createElement('p');
    ele.classList.add('h2');
    ele.innerHTML='Not Found :/'
    take.appendChild(ele);
}

function renderSound(ad){
     //
     let sf =ad[0];
     let audiosrc = `https://media.merriam-webster.com/soundc11/${sf}/${ad}.wav?key=${apikey}`;
     let sound = document.createElement('audio');
     sound.src=audiosrc;
     sound.controls=true;
     take.appendChild(sound);

}

function handle(elet){
       take.innerHTML='';
     input.value = elet;
    let word =input.value;
    if(word === '')
    {
        alert('Word is required')
        return;
    }
    let ele = document.createElement('p');
    ele.classList.add('h2');
    ele.innerHTML='Loading...'
    take.appendChild(ele);
    getdata(word);
    // input.value = '';
}
