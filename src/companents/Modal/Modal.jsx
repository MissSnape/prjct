import React, { useState, useEffect } from 'react'
import './Modal.css'

const Modal = ({ isOpen, onClose, type, title, onSwitchModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (type === 'search') {
      alert(`Поиск: ${formData.name}`)
    } else if (type === 'login') {
      alert(`Вход с email: ${formData.email}`)
    } else if (type === 'register') {
      alert(`Регистрация: ${formData.name}, ${formData.email}`)
    }
    onClose()
    setFormData({ name: '', email: '', password: '', confirmPassword: '' })
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSwitchModal = (newModalType) => {
    onClose()
    // Используем setTimeout чтобы дать время закрыться текущей модалке
    setTimeout(() => {
      if (onSwitchModal) {
        onSwitchModal(newModalType)
      }
    }, 100)
  }

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{title}</h2>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          {type === 'search' && (
            <input
              type="text"
              name="name"
              placeholder="Введите запрос..."
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          )}

          {(type === 'login' || type === 'register') && (
            <>
              {type === 'register' && (
                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              {type === 'register' && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              )}
            </>
          )}

          <button type="submit">
            {type === 'search' ? 'Найти' : 
             type === 'login' ? 'Войти' : 'Зарегистрироваться'}
          </button>

          {/* Ссылки для переключения между формами */}
          {type === 'login' && (
            <div className="form-footer">
              <span>Еще не зарегистрированы?</span>
              <a href="#" onClick={(e) => {
                e.preventDefault()
                handleSwitchModal('register')
              }}>
                Регистрация
              </a>
            </div>
          )}

          {type === 'register' && (
            <div className="form-footer">
              <span>Уже есть аккаунт?</span>
              <a href="#" onClick={(e) => {
                e.preventDefault()
                handleSwitchModal('login')
              }}>
                Войти
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Modal