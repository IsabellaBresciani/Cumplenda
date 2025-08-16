import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/offcanvas';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Importa Link para la navegación
import Toast from '../utils/Toast';
import registerService from '../services/register'; // Renombrado para claridad

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // 2. Función de validación del lado del cliente
  const validateForm = () => {
    const { first_name, last_name, email, password, confirmPassword } = formData;
    if (!first_name || !last_name || !email || !password) {
      Toast({ icon: 'warning', title: 'Campos Incompletos', text: 'Por favor, rellena todos los campos obligatorios.' });
      return false;
    }
    if (password !== confirmPassword) {
      Toast({ icon: 'error', title: 'Contraseñas no coinciden', text: 'Asegúrate de que ambas contraseñas sean iguales.' });
      return false;
    }
    if (password.length < 6) {
      Toast({ icon: 'warning', title: 'Contraseña Débil', text: 'La contraseña debe tener al menos 6 caracteres.' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // 3. Ejecuta la validación antes de enviar

    setLoading(true);
    try {
      // Prepara los datos para el backend (sin confirmPassword)
      const { confirmPassword, ...registerData } = formData;
      await registerService(registerData);
      Toast({ icon: 'success', title: 'Usuario Registrado', text: 'Se ha creado tu cuenta con éxito. Ahora puedes iniciar sesión.' });
      // Opcional: limpiar el formulario o redirigir
      setFormData({ first_name: '', last_name: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      // 4. Muestra el error específico del backend
      Toast({ icon: 'error', title: 'Error en el Registro', text: error.message || 'Ha ocurrido un error inesperado.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div className="mb-4">
        <p className="text-muted mb-1" style={{ fontSize: '0.9rem' }}>EMPECEMOS</p>
        <h2 className="mb-1" style={{ fontSize: '2rem' }}>Crear Cuenta</h2>
      </div>
      
      {/* ... (el resto del JSX de tus inputs es correcto) ... */}
      <div className="d-flex gap-2 mb-3">
          <input type="text" className="form-control" style={inputStyle} placeholder="Nombre" name='first_name' value={formData.first_name} onChange={handleChange} required/>
          <input type="text" className="form-control" style={inputStyle} placeholder="Apellido" name='last_name' value={formData.last_name} onChange={handleChange} required/>
      </div>
      <div className="d-flex gap-2 mb-3">
          <input type="email" className="form-control" style={inputStyle} placeholder="Correo electrónico" name='email' value={formData.email} onChange={handleChange} required/>
      </div>
      <div className="d-flex gap-2 mb-3">
          <input type="password" className="form-control" style={inputStyle} placeholder="Contraseña" name='password' value={formData.password} onChange={handleChange} required/>
          <input type="password" className="form-control" style={inputStyle} placeholder="Repetir Contraseña" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required/>
      </div>
      
      <button type="submit" className="btn" style={buttonStyle} disabled={loading}>
        {/* 5. Muestra un spinner o texto diferente cuando está cargando */}
        {loading ? 'REGISTRANDO...' : 'REGISTRARSE'}
      </button>

      <div className="text-center mt-2">
        <span className="text-muted" style={{ fontSize: '0.8rem' }}>¿Ya eres miembro? </span>
        {/* 6. Usa Link para la navegación interna */}
        <Link to="/login" className="text-decoration-none" style={{ fontSize: '0.8rem' }}>INICIA SESIÓN</Link>
      </div>
      {/* ... (resto del JSX) ... */}
    </form>
  );
}

const formStyle = {
    backgroundColor: "white",
    padding: "2.5rem",
    borderRadius: "25px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "500px"
}

const inputStyle = {
    padding: "0.5rem",
    marginBottom: "0.1  rem",
    borderRadius: "12px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    fontSize: "0.7rem"
}

const buttonStyle = {
    width: "100%",
    padding: "0.8rem",
    borderRadius: "12px",
    backgroundColor: "#030D59",
    border: "none",
    color: "white",
    fontWeight: "500",
    marginTop: "1rem",
    fontSize: "0.9rem" 
}

export default RegisterForm;