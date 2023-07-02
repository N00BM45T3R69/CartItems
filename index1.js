import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase,ref,push,onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://microproject-357b1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)

const cartDB = ref(database,"cart")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const cartEl = document.getElementById("shopping-list")

let st = ""

onValue(cartDB,function(snapshot){
    let arr = Object.values(snapshot.val())
    clearCartEl()
    for(let i=0;i<arr.length;i++){
        appendCartEl(arr[i])
        // console.log(arr[i])
    }
    cartEl.innerHTML=st
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if(inputValue!=""){
    push(cartDB,inputValue)
    }
    inputFieldEl.value=""
})

function clearCartEl() {
    st=""
    cartEl.innerHTML = ""
}

function appendCartEl(cartValue) {
    st += `<li>${cartValue}</li>`
}