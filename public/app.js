const image = {
  src:
    'https://images.unsplash.com/photo-1494022299300-899b96e49893?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  alt: 'Image to manipulate',
}

function renderImage() {
  let container = document.querySelector('.container')
  container.innerHTML = ''
  for (i = 0; i < 4; i++) {
    let div = document.createElement('div')
    div.innerHTML = `
    <i class="fas fa-caret-up" onClick="flip(${i},'v')"></i>
    <i class="fas fa-caret-left" onClick="flip(${i}, 'h')"></i>
    <img id="i${i}" src=${image.src} alt=${image.src}/>
    <i class="fas fa-caret-right" onClick="flip(${i},'h')"></i>
    <i class="fas fa-caret-down" onClick="flip(${i}, 'v')"></i>
    `
    container.append(div)
  }
}
document.querySelector('#imageSelect').addEventListener('submit', async (e) => {
  e.preventDefault()
  document.querySelector('#message').classList.add('hidden')
  try {
    await axios.get(e.target.imageURL.value)
    image.src = e.target.imageURL.value
    renderImage()
  } catch (err) {
    document.querySelector('#message').classList.remove('hidden')
  }
})

window.onload = (e) => {
  renderImage()
}

function flip(i, direction) {
  let image = document.querySelector('#i' + i)
  if (image.classList.contains('h')) {
    if (direction === 'v') {
      image.classList.remove('h')
      image.classList.add('vh')
    } else {
      image.classList.remove('h')
    }
  } else if (image.classList.contains('v')) {
    if (direction === 'v') {
      image.classList.remove('v')
    } else {
      image.classList.remove('v')
      image.classList.add('vh')
    }
  } else if (image.classList.contains('vh')) {
    if (direction === 'v') {
      image.classList.remove('vh')
      image.classList.add('h')
    } else {
      image.classList.remove('vh')
      image.classList.add('v')
    }
  } else {
    if (direction === 'v') {
      image.classList.toggle('v')
    } else {
      image.classList.toggle('h')
    }
  }
}
