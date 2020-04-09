let data = `{
    "accounts": [
        {
            "title": "Test One",
            "img": "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png"
        },
        {
            "title": "Test Two",
            "img": "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png"
        },
        {
            "title": "Test Three",
            "img": "https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659651_960_720.png"
        }
    ]
}`

let dataObj = JSON.parse(data)
const dataAccountsArr = dataObj.accounts
let userAccountArr = dataAccountsArr.map((num) => num)
const main = document.querySelector("main")
let numberElement = 0

function createDomElement(tag, className, domElement) {
    let element = document.createElement(tag)
    element.classList.add(className)
    if (!!domElement) {
        domElement.appendChild(element)
    }
    return element
}


// __________________ create First Screen_____________________

function createAccountsItems(targetArr, domElement) {
    for (let i = 0; i < targetArr.length; i++) {
        let accountItem = createDomElement("div", "accountItem", domElement)
        accountItem.setAttribute("tabindex", "0")
        createDomElement("img", "accountItemImg", accountItem).setAttribute("src", targetArr[i].img)
        createDomElement("div", "accountItemTitle", accountItem).innerText = targetArr[i].title
    }
}

function createAccountItemsList() {
    let accountItemsList = document.querySelectorAll(".accountItem")
    accountItemsList[numberElement].focus()
    return accountItemsList
}

function createFirstScreen(targetArr) {
    let firstScreen = createDomElement("section", "firstScreen")
    let accountsContainer = createDomElement("div", "accounts", firstScreen)

    createAccountsItems(targetArr, accountsContainer)

    let btnFirstScreenAdd = createDomElement("button", "btnFirstScreenAdd", firstScreen)
    btnFirstScreenAdd.innerText = "ADD"
    main.appendChild(firstScreen)

    let accountItemsList = createAccountItemsList()

    // ________________navigation first screen_____________________

    firstScreen.addEventListener("keydown", event => {
        if (document.activeElement === accountItemsList[numberElement]) {
            if (event.key === "ArrowDown" && numberElement !== accountItemsList.length - 1) {
                numberElement++
                accountItemsList[numberElement].focus()
            } else if (event.key === "ArrowUp" && numberElement !== 0) {
                numberElement--
                accountItemsList[numberElement].focus()
            } else if (event.key === "ArrowRight") {
                btnFirstScreenAdd.focus()
            } else if (event.key === "ArrowLeft") {
                for (let element of accountItemsList) {
                    accountsContainer.removeChild(element)
                }
                createAccountsItems(dataAccountsArr, accountsContainer)
                numberElement = 0
                accountItemsList = createAccountItemsList()
            }
        } else if (document.activeElement === btnFirstScreenAdd) {
            if (event.key === "Enter") {
                main.removeChild(firstScreen)
                createSecondScreen()
            } else if (event.key === "ArrowLeft") {
                accountItemsList[numberElement].focus()
            }
        }
    })
}

//__________________create second screen________________

function createSecondScreen() {
    let secondScreen = createDomElement("section", "secondScreen")
    let userInput = createDomElement("input", "userInput", secondScreen)
    let btnContainer = createDomElement("div", "secondScreenBtnContainer", secondScreen)
    let secondScreenBtnAdd = createDomElement("button", "secondScreenBtn", btnContainer)
    secondScreenBtnAdd.innerText = "ADD"
    let secondScreenBtnCancel = createDomElement("button", "secondScreenBtn", btnContainer)
    secondScreenBtnCancel.innerText = "Cancel"
    main.appendChild(secondScreen)

    userInput.focus()
    let secondScreenBtnList = document.querySelectorAll(".secondScreenBtn")
    let numBtn = 0

    // ________________navigation second screen_____________________

    secondScreen.addEventListener("keydown", event => {
        if (document.activeElement === userInput) {
            if (event.key === "ArrowDown") {
                secondScreenBtnList[numBtn].focus()
            }
        } else if (document.activeElement === secondScreenBtnList[numBtn]) {
            if (event.key === "ArrowRight" && document.activeElement === secondScreenBtnList[0]) {
                numBtn++
                secondScreenBtnList[numBtn].focus()
            } else if (event.key === "ArrowLeft" && document.activeElement === secondScreenBtnList[secondScreenBtnList.length - 1]) {
                numBtn--
                secondScreenBtnList[numBtn].focus()
            } else if (event.key === "ArrowUp") {
                userInput.focus()
            } else if (event.key === "Enter") {
                if (document.activeElement === secondScreenBtnList[0]) {
                    let targetObj = {
                        title: "",
                        img: ""
                    }
                    targetObj.title = userInput.value
                    targetObj.img = dataAccountsArr[0].img
                    userAccountArr.push(targetObj)
                    main.removeChild(secondScreen)
                    createFirstScreen(userAccountArr)
                } else if (document.activeElement === secondScreenBtnList[secondScreenBtnList.length - 1]) {
                    userInput.value = ""
                    main.removeChild(secondScreen)
                    createFirstScreen(userAccountArr)
                }
            }
        }
    })
}

// _________________ task manager __________________________

function taskManager() {
    createFirstScreen(userAccountArr)
}

taskManager()