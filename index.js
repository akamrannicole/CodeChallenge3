// Your code here

const apiURL = 'https://my-json-server.typicode.com/brianchege2k/code-challenge-3/films'

fetch(`${apiURL}`,{
    method: 'GET',
    headers:{
        'Content-Type': 'application/json'
    }
})

.then((response) => response.json())
.then((data) => {

    const allMovieTitles = document.querySelector('#films')
    allMovieTitles.innerHTML = ''
    data.forEach((title, index)=> {
        const movieTitlesList = document.createElement('li')
        movieTitlesList.innerText = title.title
        
        const deleteFilm = document.createElement('button')
        deleteFilm.innerText =  'Delete'
        deleteFilm.addEventListener('click', () =>{
          deleteTitle(title.id) 
          movieTitlesList.remove()
        })
        movieTitlesList.append(deleteFilm)

        
        movieTitlesList.addEventListener('click', () =>{
          showTitleInfo(title)
        })
        
        allMovieTitles.append(movieTitlesList)
        
        if(index === 0){
          showTitleInfo(title)
        }
    });
})

function showTitleInfo(title){
  
  document.querySelector('#title').innerText = title.title
  document.querySelector('#runtime').innerText = title.runtime
  document.querySelector('#film-info').innerText = title.description
  document.querySelector('#showtime').innerText = title.showtime
  document.querySelector('#ticket-num').innerText = `${title.capacity - title.tickets_sold}`
  document.querySelector('#poster').src = title.poster
}


document.querySelector("#buy-ticket").addEventListener('click', () => {
  
  const allAvailableTickets = document.querySelector('#ticket-num')
  let availableTickets = parseInt(allAvailableTickets.textContent)

  if(!isNaN(availableTickets) && availableTickets > 0){
    availableTickets --;
    
    allAvailableTickets.innerText = availableTickets;

  }
  if (availableTickets === 0){
    document.querySelector('#buy-ticket').innerText = 'Sold Out'
  }

})
 
function deleteTitle(id){
  fetch(`${apiURL}/${id}`, {
    method:'DELETE'
  })
  .then(resp => {
    if(resp.ok){
      alert('Title Deleted Successfullly.');
    }else{
      alert('Error deleting Title')
    }
  })
}
  