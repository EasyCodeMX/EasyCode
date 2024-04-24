document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
      email: document.getElementById('email').value,
      nombre: document.getElementById('username').value,
      password: document.getElementById('password').value,
      nivel: document.getElementById("nivel").value
    };
    axios.post('http://127.0.0.1:5000/registrar', formData)
    .then(response => {
      console.log(response.data);
      console.log("EXITO");
      window.location.href = "index.html"; // Redirigir a VER
    })
    .catch(error => {
      console.error(error);
      if (error.response) {
       // Error de respuesta del servidor
       if (error.response.status === 400) {
         alert("El correo electrónico ya está registrado");
         document.getElementById('email').value = '';
       } else {
         alert("Error interno del servidor");
       }
     } else {
       // Error de red o error no manejado
       alert("Error de red o error no manejado");
     }
      console.log("NADA");
    });
   }); 