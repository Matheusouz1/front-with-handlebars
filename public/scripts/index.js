var container = document.querySelector('h1')

axios.get('http://localhost:3333/loja-tenis03')
.then(function(response){
    console.log(response);
    container.innerHTML=response.data.store_name
})
.catch( function(error){
    console.warn(error);
})