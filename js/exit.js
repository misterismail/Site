document.querySelector("#exitWorkSpace").addEventListener("click", () => {
    const loginInfo = []
    localStorage.setItem("login", JSON.stringify(loginInfo))
})