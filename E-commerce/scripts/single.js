let url = 'https://fakestoreapi.com/products'
let pTitle = document.querySelector('#title'),
    pImg = document.querySelector('#img'),
    pRating = document.querySelector('#rating'),
    pPrice = document.querySelector('#price'),
    pDesc = document.querySelector('#desc');
let main05 = document.querySelector('.main05')

async function getSingleProduct(id) {
    let myid = parseInt(id)
    if(myid) {
        try {
            const response = await fetch(`${url}/${myid}`);
            let data = await response.json()
            if(data) {
                let {id, title, description, price, image, category, rating} = data;
               pImg.setAttribute('src', image)
               pTitle.innerHTML = title
               pPrice.innerHTML = `&dollar; ${price}`
               pRating.innerText = rating.count
               pDesc.innerHTML = description


               let related = fetch(`${url}/category/${category}`);
               related.then(rawValues => rawValues.json())
               .then(relatedProducts => {
                let rps = relatedProducts.slice(0,4).filter(item => item.id !== myid) 

                    rps.map(product => {
                        let nID = product.id
                        let divPro  = document.createElement('div')
                        divPro.classList.add("pro3")
                        let imgPro = document.createElement('img');
                        imgPro.setAttribute('src', product.image)
                        divPro.appendChild(imgPro)
                        let divPro1 = document.createElement('div')
                        let h6Pro = document.createElement('h6')
                        divPro1.classList.add("text3")
                        h6Pro.innerHTML = `${product.title} <br> &dollar; ${product.price} ${product.price.toString().strike()}`;
                        divPro1.appendChild(h6Pro)
                        divPro.appendChild(divPro1)
                        let divPro2 = document.createElement('div'),
                            a1 = document.createElement('a'),
                            a2 = document.createElement('a')
                            a1.innerHTML = '<i class="fa-solid fa-eye"></i>View Detail';
                            a2.innerHTML = '<i class="fa-solid fa-cart-shopping"></i>Add to cart';
                            let myLink = `./single-product.html?product=${nID}`
                            a1.setAttribute('href', myLink)
                            a2.setAttribute('href', ``)
                            divPro2.classList.add('ii')
                            divPro2.appendChild(a1)
                            divPro2.appendChild(a2)
                            divPro.appendChild(divPro2)                        
                            main05.appendChild(divPro)
                            
                    })
               })
            }
        } catch (error) {
            console.log(error.message)
        }
    }

}
// let currentUrl = window.location.href;
// // let useValue = currentUrl.split('?')[1].split('=')[1];
// if(useValue) {

//     try {
//         getSingleProduct(useValue)
//     } catch (error) {
//         console.log(error)
//     }
// }

let quantity = document.getElementById('quantity')
let cart = document.getElementById('cart')
let add_quantity = ()=>{
    cart.value ++;
    quantity.value ++ ;
    
}
let remove_quantity = ()=>{
    quantity.value > 0 ? quantity.value -- : quantity.value = 0;
    cart.value > 0 ? cart.value -- : cart.value = 0;
    // quantity.value -- ;
}
