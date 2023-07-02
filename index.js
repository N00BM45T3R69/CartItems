import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://microproject-357b1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const cartDB = ref(database,"cart")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const cartEl = document.getElementById("shopping-list")



onValue(cartDB,function(snapshot){
    if(snapshot.exists()){
    let arr = Object.entries(snapshot.val())
    clearCartEl()
    for(let i=0;i<arr.length;i++){
        appendCartEl(arr[i])
    }
}
else{
    cartEl.innerHTML=`<p>Empty Cart!</p>`
}
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if(inputValue!=""){
        push(cartDB,inputValue)
    }
    inputFieldEl.value=""
})

function clearCartEl() {
    cartEl.innerHTML = ""
}

function appendCartEl(item) {
    let itemVal  = item[1]
    let itemID  = item[0]
    console.log(itemVal)
    let li = document.createElement("li")
    li.textContent=itemVal
    li.addEventListener("click",function(){
        let del = ref(database,`cart/${itemID}`)
        remove(del)
        // console.log(itemID)
    })
    cartEl.append(li)
}