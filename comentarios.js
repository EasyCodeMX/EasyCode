document.addEventListener('DOMContentLoaded', function() {
  // Realiza una solicitud GET al servidor para obtener los textos
  const userId = localStorage.getItem('id');
  if(!userId){
    window.location.href = 'index.html';
  }
  axios.get('http://127.0.0.1:5000/datos')
    .then(response => {
      // Maneja la respuesta del servidor
      const textos = response.data;
      // Itera sobre los textos recibidos
      console.log(response.data)
      textos.forEach(texto => {
        // Crea un contenedor para el comentario
        const comentarioElement = document.createElement('div');
        comentarioElement.classList.add('mensaje');

        // Crea elementos HTML para el nombre de usuario, el texto del comentario y la fecha
        const usuarioElement = document.createElement('div');
        usuarioElement.classList.add('usuario');
        const textoElement = document.createElement('div');
        textoElement.classList.add('texto');
        const fechaElement = document.createElement('div');
        fechaElement.classList.add('fecha');
        const regex = /\d{4}-\d{2}-\d{2}/;
        // Aplica la expresión regular al texto para obtener la fecha
        const fecha = texto.fecha.match(regex)[0];
        usuarioElement.textContent = `${texto.usuario}: `;
        textoElement.textContent = `${texto.texto}`;
        fechaElement.textContent = `${fecha}`;

        // Agrega los elementos al contenedor del comentario
        comentarioElement.appendChild(usuarioElement);
        comentarioElement.appendChild(textoElement);
        textoElement.appendChild(fechaElement);

        // Agrega el comentario al contenedor de comentarios en tu HTML
        document.getElementById('comentarios-container').appendChild(comentarioElement);

      });
    })
    .catch(error => {
      console.error(error);
      console.log("NO JALA")
      // Maneja los errores en caso de que la solicitud falle
    });
});


document.getElementById('commentForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const userId = localStorage.getItem('id');
  if(userId){
    formData = {
      texto: document.getElementById('cuadro-texto').value,
      id:userId
    };
  }else{
    console.error('No se encontró el ID del usuario en el almacenamiento local');
    alert('No se pudo encontrar el ID del usuario');
    window.location.href = 'index.html';
  }
  axios.post('http://127.0.0.1:5000/datos', formData)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert("Error de red o error no manejado");
      }
    });
    location.reload();
});

document.getElementById('cerrar').addEventListener('click', function() {
  localStorage.clear();
  window.location.href = 'index.html';
});




