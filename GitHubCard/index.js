import axios from "axios"
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
const anchorContainer = document.querySelector('.cards')

function createCard(gitUserName){
  axios.get(`https://api.github.com/users/${gitUserName}`)
    .then((response)  => {
      anchorContainer.appendChild(createCardInner(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
}

createCard('micherre')

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

function pullFollowers(){
  axios.get('https://api.github.com/users/micherre/followers')
    .then((response) => {
      response.data.forEach((follower) => {
        createCard(follower.login)
      })
    })
    .catch((error) => {
      console.log(error)
    })
}

pullFollowers()

// const followersArray = ["AndyWatts712", "TimRexJeff", "zavier-lambda", "beaadelrosario", "dustinmyers"];

// followersArray.forEach(createCard)

// followersArray.forEach((userName) => {
//   axios.get(`https://api.github.com/users/${userName}`)
//     .then((response)  => {
//       anchorContainer.appendChild(createCardInner(response.data))
//     })
//     .catch((error) => {
//       console.log(error)
//     })
// })
/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function createCardInner(obj){
  const containerDiv = document.createElement('div')
  containerDiv.classList.add('card')

  const userImg = document.createElement('img')
  userImg.setAttribute('src', obj.avatar_url)
  containerDiv.appendChild(userImg)

  const bodyDiv = document.createElement('div')
  bodyDiv.classList.add('card-info')
  containerDiv.appendChild(bodyDiv)

  const usersName = document.createElement('h3')
  usersName.classList.add('name')
  usersName.textContent = obj.name
  bodyDiv.appendChild(usersName)

  const usersLogin = document.createElement('p')
  usersLogin.classList.add('username')
  usersLogin.textContent = obj.login 
  bodyDiv.appendChild(usersLogin)

  const usersLocation = document.createElement('p')
  usersLocation.textContent = `Location: ${obj.location}` 
  bodyDiv.appendChild(usersLocation)

  const profile = document.createElement('p')
  profile.textContent = 'Profile:'
  bodyDiv.appendChild(profile)

  const githubAddress = document.createElement('a')
  githubAddress.setAttribute('href', obj.url)
  githubAddress.textContent = obj.url
  profile.appendChild(githubAddress)

  const followerCount = document.createElement('p')
  followerCount.textContent = `Followers: ${obj.followers_url}`
  bodyDiv.appendChild(followerCount)
  
  const followingCount = document.createElement('p')
  followingCount.textContent = `Following: ${obj.following_url}`
  bodyDiv.appendChild(followingCount)
  
  const userBio = document.createElement('p')
  userBio.textContent = `Bio: ${obj.bio}`
  bodyDiv.appendChild(userBio)
  
  return containerDiv
}

// .foreach((item) => {
//   const newCard = cardMaker(item)
//   anchorContainer.appendChild(newCard)
// })
/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
