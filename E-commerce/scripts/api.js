// let url = 'https://api.escuelajs.co/api/v1/products?offset=0&limit=20'
let url = 'https://fakestoreapi.com/products'
let loader = document.getElementById('loader');
showLoader();
let products = fetch(url)
let container = document.getElementsByClassName('main')[0],
    curPage = parseInt(localStorage.getItem('id')) || 1,
    pageDiv = document.getElementById('paginate');
    
products.then(raw => raw.json())
.then(productList => {
    let resultCount = total(productList)
    console.log(resultCount)
    let pagination = new Paginator(resultCount, curPage, 6);
    console.log(pagination)
    pageDiv.appendChild(pagination.createPagination())

let allLinks = document.querySelectorAll('.pagination a');
allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        let currentPage = parseInt(e.target.getAttribute('href').split('?')[1].split('=')[1]);
        localStorage.setItem('id', currentPage)
        window.location.href = e.target.getAttribute('href');
        
    })
})

    let useProducts = getDataFromResult(productList,curPage);
    container.innerHTML = '';
    hideLoader()
    useProducts.map(product => {

        let {id, title , price , image} = product
        let div = document.createElement('div'),
            sect = document.createElement('section'),
            img = document.createElement('img');
            img.setAttribute('loading', 'lazy');
            divBody = document.createElement('div'),
            h6 = document.createElement('h6'),
            p = document.createElement('p')
            span = document.createElement('span')
            a1 = document.createElement('a')
            a2 = document.createElement('a')
            sect.setAttribute('class', 'img-wrapper')

            img.setAttribute('src', image)
            sect.appendChild(img)
        div.setAttribute('class', 'pro3')
        div.appendChild(sect)
        h6.innerText = title
        p.innerHTML = `&dollar;${price}`
        a1.innerHTML = '<i class="fa-solid fa-eye"></i> view details'
        a1.setAttribute('href', `single-product.html?product=${id}`)
        a2.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add to cart'
        span.appendChild(a1)
        span.appendChild(a2)
        divBody.appendChild(h6)
        divBody.appendChild(p)
        divBody.appendChild(span)
        div.appendChild(divBody)
        container.appendChild(div)
        
    })

}).catch(err => {
    console.log(err)
})

// let xhr = new XMLHttpRequest()

// xhr.open('GET', url, true)
// xhr.onreadystatechange = () => {
//     if(xhr.readyState == 4 && xhr.status == 200) {
//         let res = JSON.parse(xhr.responseText)

//         res.map(product => {
//             let {id, title , price , image} = product
//             let div = document.createElement('div'),
//                 sect = document.createElement('section'),
//                 img = document.createElement('img');
//                 img.setAttribute('loading', 'lazy');
//                 divBody = document.createElement('div'),
//                 h6 = document.createElement('h6'),
//                 p = document.createElement('p')
//                 span = document.createElement('span')
//                 a1 = document.createElement('a')
//                 a2 = document.createElement('a')
//                 sect.setAttribute('class', 'img-wrapper')
    
//                 img.setAttribute('src', image)
//                 sect.appendChild(img)
//             div.setAttribute('class', 'pro3')
//             div.appendChild(sect)
//             h6.innerText = title
//             p.innerHTML = `&dollar;${price}`
//             a1.innerHTML = '<i class="fa-solid fa-eye"></i> view details'
//             a1.setAttribute('href', `./single-product.html?product=${id}`)
//             a2.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add to cart'
//             span.appendChild(a1)
//             span.appendChild(a2)
//             divBody.appendChild(h6)
//             divBody.appendChild(p)
//             divBody.appendChild(span)
//             div.appendChild(divBody)
//             container.appendChild(div)
//         })
//     }
// }
// xhr.send()

function getDataFromResult(data, pg=1){
    if(!Array.isArray(data)) {
        throw new Error("The data should be an array");
    } else {

        let perPage = 6; 
        start = (pg - 1) * perPage,
        end = start + perPage;
        return data.slice(start, end)
    }
    
}
function total(data){
    if(!Array.isArray(data)) {
        throw new Error("The data should be an array");
    }
    return data.length;
}

function Paginator(totalElements, page=1, pp=10){
    let total =  Math.ceil(parseInt(totalElements) / parseInt(pp));
    console.log(total)
    this.totalElements = totalElements,
    this.pp = pp;
    this.createPagination = function(){
        let ul = document.createElement('ul')
        ul.classList.add('pagination');
            if(hasPrev()) {
                let li = document.createElement('li'),
                a = document.createElement('a');
                a.innerHTML = '&laquo; Prev';
                a.setAttribute('href', '?pg=' + prev())
                li.appendChild(a)
                ul.appendChild(li)
            }

        for(let i = 1; i <= total; i++) {
            let li = document.createElement('li'),
                a = document.createElement('a');
                aText = document.createTextNode(i)

                a.appendChild(aText)
                a.setAttribute('href', '?pg='+i)
            li.appendChild(a)
            if(page === i) {
                li.classList.toggle('active')
            }
            ul.appendChild(li)
        }


    
        if(hasNext()) {
            let li = document.createElement('li'),
            a = document.createElement('a');
            a.innerHTML = 'Next &raquo;';
            a.setAttribute('href', '?pg=' + next())
            li.appendChild(a)
            ul.appendChild(li)
        }
        return ul;
    }
    function hasNext(){
        return (page < total) ? true : false
    }
    function hasPrev(){
        return (page > 1) ? true : false
    }
    function next(){
        return (page + 1)
    }
    function prev(){
        return (page - 1)
    }
    Object.defineProperty(this, 'totalPages', {
        get: () => parseInt(total),
    })
}

function hideLoader() {
    loader.classList.add("hide")
}
function showLoader() {
    loader.classList.remove("hide")
}

{/* <div id="btn">
                <button><i class="fa-solid fa-minus"></i></button>
                <p>1</p>
                <button><i class="fa-solid fa-plus"></i></button>
            </div> */}


let quality = document.getElementById('quality')
let btn = document.getElementById('btn')
let btn1 = document.createElement('button')
let i = document.createElement('<i class="fa-solid fa-minus"></i>')
let btn2 = document.createElement('button')
let i2 = document.createElement('<i class="fa-solid fa-plus"></i>')
btn1.appendChild(i)
btn2.appendChild(i2)
btn.appendChild(i)
btn.appendChild(i2)
quality.appendChild(btn)

// function name() {
    
// }
// fetch('https://jsonplaceholder.typicode.com/posts')
//             .then(res=>res.json())
//             .then(json=> {
//                 let recCount = total(json)
//                 let pg2 = new Paginator(recCount, 1, 4)
//                 console.log(pg2.createPagination())
//                 console.log(pg2.totalPages)
//                 console.log(pg2.totalElements)
//             })