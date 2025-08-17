# Cumplenda
Cumplenda es una aplicación web diseñada para resolver un problema simple pero universal: no olvidar nunca más el cumpleaños de un ser querido. En un mundo lleno de notificaciones y distracciones, Cumplenda ofrece un espacio centralizado, privado y enfocado. Permite a los usuarios crear una cuenta segura para registrar y gestionar las fechas de nacimiento de amigos, familiares y colegas. Su principal ventaja es la simplicidad: una interfaz limpia que muestra los próximos cumpleaños de forma ordenada, ayudando al usuario a planificar con antelación y a mantener vivas sus relaciones importantes.

# La arquitectura del frontend
La arquitectura del frontend está construida con React y sigue un diseño modular que separa claramente las responsabilidades, facilitando su mantenimiento y escalabilidad.

* components: Contiene piezas de UI reutilizables como formularios y la barra de navegación.
* pages: Define las vistas completas de la aplicación, como la página de inicio (Home) o la de autenticación (Auth).
* context: Gestiona el estado global. AuthContext es clave, ya que controla la información de sesión del usuario para toda la aplicación.
* routes: Protege las rutas de la aplicación. PrivateRoute asegura que solo los usuarios autenticados puedan acceder a ciertas páginas.
* services: Centraliza toda la comunicación con el backend. Aquí se definen las funciones para hacer login, registrarse y gestionar los cumpleaños.
* utils: Incluye funciones de ayuda reutilizables, como la que muestra notificaciones (Toast).

