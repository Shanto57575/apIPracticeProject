const loader = () =>{
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response =>  response.json())
    .then(data => showData(data))
    .catch((error)=>{
        console.log(error);
    })
}

const showData = (allData) =>{
   const getPost = document.getElementById('postTittle');
   for(const data of allData.slice(0,5)){
    console.log(data.title);
     const div = document.createElement('div');
     div.innerHTML = `
     <h1 class=" text-3xl text-center">${data.title}</h1>
     `
     getPost.appendChild(div);
   }
}
loader();