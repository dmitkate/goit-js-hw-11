export {runFetches}
function runFetches(query, page) {
    return fetch(`https://pixabay.com/api/?key=29731703-4e8659812dd82e74a79e4fb84&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
        .then(response => {
          
            return response.json()
        })
       

}
