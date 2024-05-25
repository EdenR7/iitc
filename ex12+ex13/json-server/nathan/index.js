const elemFormCreate = document.querySelector("#formCreate");
// const elemInputTitle = elemFormCreate.querySelectorAll("input")[0];
// const elemInputViews = elemFormCreate.querySelectorAll("input")[1];
const elemPostsLength = document.querySelector("#postLength");
const elemFormDelete = document.querySelector("#formDelete");
const elemInputIdToDelete = elemFormDelete.querySelector("input");

const baseUrl = "http://localhost:8001";
const elemSuccess = document.querySelector("#success");
const elemFailure = document.querySelector("#failure");
const urlPosts = `${baseUrl}/posts`;

elemFormCreate.addEventListener("submit", (event)=>{
  event.preventDefault(); // Prevent the default form submission
  const formData = new FormData(elemFormCreate);
  clearStatus();
  axios
    .post(urlPosts, getFormData(formData))
    .then(function (response) { //then() make sure that we first see the response
      getLength();
      console.log(response);
      setSuccess();
    })
    .catch(function (error) {
      console.log(error);
      setFailure();
    });
});
elemFormDelete.addEventListener("submit", (event)=>{
  clearStatus();
  event.preventDefault();
  const url = `${urlPosts}/${elemInputIdToDelete.value}`;
  try {
    axios.delete(url)
    .then(res=>{
      setSuccess();
    })
    .catch(err=>{
      setFailure();
    })
  } catch (error) {
    setFailure();
  }
})

function getLength() {
  axios
    .get(urlPosts)
    .then(function (response) {
      const posts = response.data;
      elemPostsLength.innerText = posts.length;
      setSuccess();
    })
    .catch(function (error) {
      setFailure();
    });
}

function setSuccess() {
  elemSuccess.innerText = "success";
}

function clearStatus() {
  elemFailure.innerText = "";
  elemSuccess.innerText = "";
}

function setFailure() {
  elemFailure.innerText = "failure";
}

function getFormData(formDataElement) {
  const data ={}
  for (let pair of formDataElement.entries()) {
    console.log(pair);
    data[pair[0]] = pair[1]
    console.log(pair[0] + ': ' + pair[1]);
  }
  return data
}