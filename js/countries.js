const loadCountry = async () => {
    document.getElementById('showButton').classList.add('hidden');
    const url = `https://restcountries.com/v3.1/all`;
    const response = await fetch(url);
    const data = await response.json();
    document.getElementById('showButton').classList.remove('hidden');
    showCountry(data.slice(0, 9));
}

const showCountry = (allCountry) => {
    const getCountry = document.getElementById('showAllCountry');
    getCountry.innerHTML = '';
    allCountry.forEach(country => {
        const div = document.createElement('div');
        div.innerHTML = ' ';
        div.innerHTML = `
        <div class="card bg-base-100 shadow-2xl h-96">
            <figure class="px-10 pt-10">
               <img src="${country.flags.png}" alt="Shoes" class="rounded-xl" />
            </figure>
             <div class="card-body items-center text-center">
                <h2 class="card-title">${country.name.common}</h2>
                <p>${country.flags.alt ? "country.flags.alt" : "No details Found"}</p>
               <div class="card-actions">
                <label onclick="detailsModal('${country.cca3}')" for="my-modal-3" class="btn">Details</label>
               </div>
            </div>
        </div>
        `
        getCountry.appendChild(div);
    });
}

const detailsModal = (code) => {
    const url = `https://restcountries.com/v2/alpha/${code}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showModal(data))
}

const showModal = (modalData) => {
    console.log(modalData);
    const getDetails = document.getElementById('showDetailsById');
    const div = document.createElement('div');
    getDetails.innerHTML = '';
    div.innerHTML = `
      <div id="displayModal" class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <h3 class="text-lg font-bold">${modalData.name}</h3>
        <h4>${modalData.capital}</h4>
        <img src="${modalData.flags.png}" alt="">
        <h4>${modalData.altSpellings[2]}</h4>
        <h4>population : ${modalData.population}</h4>
      </div>
    `
    getDetails.appendChild(div);
    
}

const showAllButton = async () => {
    const url = `https://restcountries.com/v3.1/all`;
    const response = await fetch(url);
    const data = await response.json();
    showCountry(data);
    document.getElementById('showButton').classList.add('hidden');
    document.getElementById('spinner').classList.remove('hidden');
}

loadCountry();

