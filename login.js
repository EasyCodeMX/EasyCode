document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    axios.post('http://127.0.0.1:5000/login', formData)
      .then(response => {
        if (response.data.user) {
          //document.getElementById('nombre de usuario').innerText = `Bienvenido, ${response.data.user.username}!`;
          const niv = response.data.user.nivel;
            localStorage.setItem('id', JSON.stringify(response.data.user.id)); // Guardar los datos del usuario en localStorage
            // Resto del código para redireccionar
          switch (niv) {
            case 'basico':
              window.location.href = "basic.html"; // Redirigir a index
              break;
            case 'intermedio':
              window.location.href = "intermedio.html"; // Redirigir a index
              break;
            case 'avanzado':
              window.location.href = "avanzado.html"; // Redirigir a index
              break;
            default:
              window.location.href = "index.html"; // Redirigir a index
              break;
          }
        } else {
          // Si la respuesta no contiene datos del usuario
          console.error('No se recibieron datos del usuario en la respuesta');
          alert('No se pudieron obtener los datos del usuario');
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response) {
          alert(error.response.data.error);
        } else {
          alert("Error de red o error no manejado");
        }
      });
  });
