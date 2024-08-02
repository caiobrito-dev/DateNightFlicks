let contador = 0
let Filmes_Selecionados = []

function AdicionarFilme(film, url){

  if(Filmes_Selecionados.some((obj) => obj.name == film)){
    alert("Ja tem")
  }else{
    Filmes_Selecionados.push({
      name: film,
      url: url
    })
    MostraSelecionados(true)
  }  
}

function RemoverFilme(filme){
  const index = Filmes_Selecionados.findIndex(film => film.name == filme)
  if (index !== -1) {
    Filmes_Selecionados.splice(index, 1);
  }

  MostraSelecionados()
}

function MostraSelecionados(scroll){
  let cont = 0
  const contFilmes = document.getElementById("contador")
  contFilmes.innerText = `Total de Filmes = ${Filmes_Selecionados.length}`
  const DivPrincipal = document.getElementById("your_list")
  const divSelecionados = document.getElementById("select_films")
  divSelecionados.innerHTML = ""

  Filmes_Selecionados.forEach((filme) =>{
    const filmeAtual = document.createElement("div")
    filmeAtual.innerHTML = `
    <div class="select_data">
      <img src="${filme.url}">
      <p>${filme.name}</p>
    </div>
    <button class="exclude_film" onclick="RemoverFilme('${filme.name}')" ><i class="fa-solid fa-trash-can"></i></button>
    `
    filmeAtual.classList.add("filme_selecionado")
    divSelecionados.appendChild(filmeAtual)
    let total = divSelecionados.querySelectorAll
    console.log(total)

    let before = 0
    let after = 0
    for(i=0; i < total.length; i++){
      nome = total.tagName
      console.log(nome)
    }
    if(scroll){
      divSelecionados.scrollTo({
        top: filmeAtual.scrollHeight,
        behavior: "smooth"
      })
    }
    DivPrincipal.style.display = "flex"
  })
}

async function carregarImagens() {
  const input = document.getElementById("input_film")
  const galeria = document.getElementById('galeria');

  if (contador == 0){
    contador++
    try {
    
      const response = await fetch('http://localhost:3000/imagens');
  
      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }
      
      const imagens = await response.json();
      
      console.log(imagens)
  
  
      imagens.forEach(imagem => {
        const filmData = document.createElement("div")
        filmData.innerHTML = `
            <img src="${imagem.url}" alt="">
            <div class="info">
              <div class="data">
                <h2>${imagem.name}</h2>     
                <p>Lançamento: ${imagem.date}</p>    
                <p>Duração: ${imagem.time}Min</p>    
                <p>Genero: ${imagem.genero}</p>   
              </div>
            </div>
            <div class="div_button">
              <button class="add_film" onclick="AdicionarFilme('${imagem.name}','${imagem.url}')">Adicionar filme</button> 
            </div>
        `
        if(imagem.name.length > 15){
          filmData.classList.add("big")
        }
        filmData.classList.add("filmData")
        galeria.appendChild(filmData)
        galeria.style.display = "flex"
        filmData.style.display = "flex"
  
  
      });
  
      
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }
  }
  

}

function Filtrar(){
    var input,
      filter,
      galeria,
      films,
      title,
      txtValue,
      cont = 0

  input = document.getElementById("input_film")
  galeria = document.getElementById("galeria")

  galeria.style.display = "flex"
  filter = input.value.toUpperCase()

  films = document.getElementsByClassName("filmData")

  for (i = 0; i < films.length; i++){
    title = films[i].getElementsByTagName("h2")[0]
    txtValue = title.textContent || title.innerText
    if( txtValue.toLocaleUpperCase().indexOf(filter) > -1){
      films[i].style.display = "flex"
      cont++
    }
    else{
      films[i].style.display = "none"
    }
  }
  
}

function Sortear(qtd){

  const selects = document.getElementById("qtd_filmes")
  const qtdDesejada = selects.selectedIndex + 1
  if (qtdDesejada > 1){
    let sorteados = []
    for(let i = 0; i < qtdDesejada; i++){
      const randomIndex = Math.floor(Math.random() * Filmes_Selecionados.length)
      alert(Filmes_Selecionados[randomIndex].name)
    }
  }

  const randomIndex = Math.floor(Math.random() * Filmes_Selecionados.length)
  alert(Filmes_Selecionados[randomIndex].name)
}