let input = document.querySelector('#input');
let serachBtn = document.querySelector('#search');
let API_KEY = '557c7714-2f50-4f15-8ef3-1f349e9738b5';
let notFound = document.querySelector('.not__found');
let defBox = document.querySelector('.df');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');

serachBtn.addEventListener('click', function(e) {
    e.preventDefault();

    //clear data
     
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';
    

    // Get input data
     let word = input.value;

    // call API get data

    if (word === '') {
        alert('Word is required')
           return; 
    } 

    getData(word)
})

async function getData(word) {
    loading.style.display = 'block';
    // Ajax call 
    const response =  await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${API_KEY}`);

    const data = await response.json();


    // if empty result

    if (!data.length) {
        loading.style.display = 'none';
        notFound.innerText = 'No result found'
        return;
    } 

    //  if result is suggetions

    if (typeof data[0] === 'string') {
        loading.style.display = 'none';
        let heading = document.createElement('h3');
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggetion = document.createElement('span');
            suggetion.classList.add('suggested');
            suggetion.innerText = element;
            notFound.appendChild(suggetion)
        })
        return;
    }

//   Result found
  loading.style.display = 'none';
   let defination = data[0].shortdef[0];

   defBox.innerText = defination

//    Sound
    const soundName = data[0].hwi.prs[0].sound.audio;
    if(soundName) {
        renderSound(soundName)
    }


    console.log(data)
}

function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11

    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${API_KEY}`;
    
    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);

}