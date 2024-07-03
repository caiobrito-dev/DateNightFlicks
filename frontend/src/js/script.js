let contador = 0
let Filmes_Selecionados = []
function AdicionarFilme(film, url){

  if(Filmes_Selecionados.some((obj) => obj.Name == film)){
    alert("Ja tem")
  }else{
    Filmes_Selecionados.push({
      Name: film,
      Url: url
    })
  }  
  
  const divSelecionados = document.getElementById("select_films")

  /* Filmes_Selecionados.forEach((filme) =>{
    const Filme_atual = document.createElement("div")
    Filme_atual.innerHTML = `
      <img src="${filme.Url}">
    `
  }) */

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
              <button class="add_film" onclick="AdicionarFilme('${imagem.name, imagem.url}')">Adicionar filme</button> 
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

