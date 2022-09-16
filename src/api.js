export function runFetches() {
    return fetch(`https://pixabay.com/api/?key=29731703-4e8659812dd82e74a79e4fb84&q=cat&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => response.json())
        

}
