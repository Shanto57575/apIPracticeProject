const memeLoader = () => {
    const url = `https://meme-api.com/gimme/50`;
    fetch(url)
        .then(response => response.json())
        .then(data => showMeme(data.memes))
}

const showMeme = allMeme => {
    const getMeme = document.getElementById('showAllMeme');
    allMeme.forEach(meme => {
        console.log(meme);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 h-72 glass">
        <figure><img src="${meme.url}"/></figure>
        </div>
      `
      getMeme.appendChild(div);
    }); 
}
memeLoader();