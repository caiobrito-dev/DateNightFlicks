async function carregarImagens() {
  const input = document.getElementById("input_film")
  const galeria = document.getElementById('galeria');


  if(input.value != ""){

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
            <h2>${imagem.name}</h2>     
            <p>Ano de Lançamento: ${imagem.date}</p>    
            <p>Duração: ${imagem.time}Min</p>    
            <p>Genero: ${imagem.genero}</p>    
          </div>
        `
        filmData.classList.add("filmData")
        galeria.appendChild(filmData)
        galeria.style.display = "flex"

      });

      
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }

  }  else{
      galeria.innerHTML = ""
      galeria.style.display = "none"
    } 
}

function filtro(){
  
}