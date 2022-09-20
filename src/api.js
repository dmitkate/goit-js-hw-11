import axios from 'axios'
export { runFetches }
// function runFetches(query, page) {
//     return fetch(`https://pixabay.com/api/?key=29731703-4e8659812dd82e74a79e4fb84&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`)
//         .then(response => {
          
//             return response.json()
//         })
       

// }



axios.defaults.baseURL = 'https://pixabay.com/api/'
const KEY = '29789050-3a37d910b2887f0c3de072442'

async function runFetches(query, page) {
  const response = await axios.get(
    `?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`,
  )
  return response
}