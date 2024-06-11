async function carregarImagens() {
  const input = document.getElementById("input_film")
  const galeria = document.getElementById('galeria');

    try {
      const response = await fetch('http://localhost:3000/imagens');

      if (!response.ok) {
        throw new Error(`Erro HTTP! status: ${response.status}`);
      }

      const imagens = await response.json();

      if(input.value != ""){

        imagens.forEach(imagem => {

          const filmData = document.createElement("div")
          const info = document.createElement("div")
          const titulo = document.createElement('h2');
          const img = document.createElement('img');

          titulo.textContent = imagem.name;
          img.src = imagem.url;
          img.style.width = "100px"
  
  
  
          info.appendChild(titulo);
          filmData.appendChild(img);
          filmData.appendChild(info)
          filmData.classList.add("filmData")
          galeria.appendChild(filmData)
          galeria.style.display = "flex"
  
        });

      } else{
        galeria.innerHTML = ""
        galeria.style.display = "none"
      } 

    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    }
  }
