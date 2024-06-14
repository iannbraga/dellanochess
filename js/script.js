document.addEventListener("DOMContentLoaded", function () {
  // URL do JSON contendo as informações das imagens
  const jsonUrl = '/js/json/imagens.json';

  // Função para carregar as imagens na galeria
  function carregarImagensGaleria(imagens, gridId) {
    const imageGrid = document.getElementById(gridId);
    imageGrid.classList.add('mt-5')

    imagens.forEach(image => {
      const gridItem = document.createElement('div');
      gridItem.classList.add('grid-item', 'p-1');

      const imgElement = document.createElement('img');
      imgElement.classList.add('img-fluid', 'rounded-2');
      imgElement.style.height = '400px';
      imgElement.src = image.src;
      imgElement.alt = image.nome || ''; // Adiciona um alt vazio se não houver nome

      gridItem.appendChild(imgElement);
      imageGrid.appendChild(gridItem);
    });

    // Certificar-se de que as imagens estão totalmente carregadas antes de inicializar o Masonry
    const allImages = imageGrid.querySelectorAll('img');
    let imagesLoaded = 0;

    allImages.forEach(img => {
      img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === allImages.length) {
          // Inicializar Masonry após todas as imagens terem sido carregadas
          var msnry = new Masonry(imageGrid, {
            itemSelector: '.grid-item',
            columnWidth: 25
          });
        }
      };
      img.onerror = () => {
        imagesLoaded++;
        if (imagesLoaded === allImages.length) {
          // Inicializar Masonry mesmo se algumas imagens falharem ao carregar
          var msnry = new Masonry(imageGrid, {
            itemSelector: '.grid-item',
            columnWidth: 25
          });
        }
      };
    });
  }

  // Função para buscar o JSON e carregar as imagens
  function fetchAndLoadImages(url, gridId) {
    fetch(url)
      .then(response => response.json())
      .then(data => carregarImagensGaleria(data, gridId))
      .catch(error => console.error('Erro ao carregar o JSON de imagens:', error));
  }

  // Carregar as imagens na galeria ao carregar a página
  fetchAndLoadImages(jsonUrl, 'galeriaBioGrid');
});
