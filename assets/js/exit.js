document.querySelector("#exitWorkSpace").addEventListener("click", () => {
    const loginInfo = []
    localStorage.setItem("login", JSON.stringify(loginInfo))
    localStorage.setItem("funcioInfos", JSON.stringify(loginInfo))
    localStorage.setItem("eventCalendar", JSON.stringify(loginInfo))
    localStorage.setItem("EventFuncio", JSON.stringify(loginInfo))
    localStorage.setItem("solicitacoesInfos", JSON.stringify(loginInfo))
})
