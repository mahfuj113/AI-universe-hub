const loadData = async (seeMore) => {
    toggleSpinner(true)
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools")
    const data = await res.json()
    const tools = data.data.tools
    displayData(tools, seeMore)
}
const displayData = (tools, seeMore) => {
    const cardContainer = document.getElementById("card-container")
    cardContainer.textContent = ''
    const seeMoreBtn = document.getElementById("see-more-btn")
    if (tools.length > 6 && !seeMore) {
        seeMoreBtn.classList.remove("hidden")
    }
    else {
        seeMoreBtn.classList.add("hidden")
    }
    if (!seeMore) {
        tools = tools.slice(0, 6)
    }
    tools.forEach(tool => {
        const div = document.createElement("div")
        div.classList = "card card-compactbg-base-100 shadow-xl"
        div.innerHTML = `
        <div onclick = "showDetails('${tool.id}')">
        <figure><img src="${tool.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">Features</h2>
            <ul class="list-decimal ml-4">
               <li>${tool.features[0]}</li>
               <li>${tool.features[1]}</li>
               <li>${tool.features[2]}</li>
            </ul
            <div class="card-actions border-t">
               <h4 class="text-lg font-semibold">${tool.name}</h4>
               <p>${tool.published_in}</p>
            </div>
        </div>
        </div>
        `
        cardContainer.appendChild(div)
        toggleSpinner(false)
    });
}
// search text 
const handleSort = (seeMore) => {
    loadData(seeMore)
}
// see more button click
const handleSeeMore = () => {
    handleSort(true)
}
// toggle spinner
const toggleSpinner = (isLoading) => {
    const toggleSpinner = document.getElementById("toggle")
    if (isLoading) {
        toggleSpinner.classList.remove("hidden")
    }
    else {
        toggleSpinner.classList.add("hidden")
    }
}
// get modal data by id
const showDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await res.json();
    const tool = data.data
    modalsShow(tool)
}
// modal show
const modalsShow = (tool) => {
    const modalContainer = document.getElementById("tools-details")
    modalContainer.innerHTML = `
                <div class = "card lg:card-side bg-base-100 shadow-xl">
                   <div class="card-body">
                   <h4 class="font-semibold">${tool.description}</h4>
                        <div class="flex gap-3 m-3">
                            <p class="font-semibold bg-gray-100 flex justify-center items-center p-2 rounded-lg">${tool.pricing[0].price} </br> ${tool.pricing[0].plan}</p>
                            <p class="font-semibold bg-gray-100 flex justify-center items-center p-2 rounded-lg">${tool.pricing[1].price} </br> ${tool.pricing[1].plan}</p>
                            <p class="font-semibold bg-gray-100 flex justify-center items-center p-2 rounded-lg">${tool.pricing[2].price} </br> ${tool.pricing[2].plan}</p>
                        </div>
                   <div class="flex">
                      <div>
                      <h4 class="font-bold my-2">Features</h4>
                        <ul class="list-disc">
                            <li class="font-semibold">${tool.features[1]?.feature_name}</li>
                             <li class="font-semibold">${tool.features[2]?.feature_name}</li>
                             <li class="font-semibold">${tool.features[3]?.feature_name}</li>
                        </ul>
                      </div>
                      <div>
                      <h4 class="font-bold my-2">Integrations</h4>
                        <ul class="list-disc ml-4">
                          <li class="font-semibold">${tool.integrations[0]}</li>
                           <li class="font-semibold">${tool.integrations[1]}</li>
                           <li class="font-semibold">${tool.integrations[2]}</li>
                        </ul>
                      </div>
                   </div>
                   </div>
                        <figure class="w-3/4">
                        <img class="w-100%" src="${tool.image_link[0] || tool.image_link[1] }" alt="Album">
                        </figure>
                </div>
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    `
    my_modal_3.showModal()
}
loadData()