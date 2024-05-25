async function axios_01(url) {
    try {
        const repos = await axios.get(url);
        repos.data.forEach(repo => {
            console.log(repo.name);
        });
        
    } catch (error) {
        console.log(error);
    }
}
axios_01('https://api.github.com/users/NathanKr/repos');

async function axios_015(url) {
    const names = [];
    try {
        const perPage = 100; // this is the maximum
        let page = 1;
        const requestParmaeters = {
            params: {
                per_page: perPage,
                page: page
              },
              headers: {
                'Authorization': `token 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`
              }
        }
        while (true) {
            requestParmaeters.params.page = page; // update the page parameter each loop 
            const repos = await axios.get(url, requestParmaeters);
            if (repos.data.length === 0){ // there isnt more repos found, no need to request
                break;
            }
            repos.data.forEach(repo => {
                names.push({
                    id: repo.id,
                    name : repo.name
                })
                // console.log(repo.name);
            });
            page ++;
        }
    } catch (error) {
        console.log(error);
    }
    return names
}
axios_015('https://api.github.com/users/NathanKr/repos')


function axios_02() {
    const ulElement = document.getElementById("ul-element");
    axios_015('https://api.github.com/users/NathanKr/repos')
        .then((data) => {
            const dataArray = Array.from(data);
            dataArray.forEach(element => {
                ulElement.innerHTML += `<li>${element.name}</li>`
            });
            document.getElementById("repo-counter").innerText = `(Total ${data.length})`
        })
        .catch()
}
function axios_03() {
    const tableElement = document.getElementById("table-element");
    axios_015('https://api.github.com/users/NathanKr/repos')
        .then((data) => {
            const dataArray = Array.from(data);
            dataArray.forEach(element => {
                tableElement.innerHTML +=
                 `<tr>
                    <td>${element.id}</td>
                    <td>${element.name}</td>
                </tr>`
            });
        })
        .catch();
}
axios_02();
axios_03();