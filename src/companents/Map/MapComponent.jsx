import React, { useState } from 'react'
import './MapComponent.css'


const MapComponent = () => {
  const [showReviewForm, setShowReviewForm] = useState(false)

  const handleMapClick = () => {
    setShowReviewForm(true)
  }

  const handleCloseForm = () => {
    setShowReviewForm(false)
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const review = {
      rating: formData.get('rating'),
      comment: formData.get('comment'),
      author: formData.get('author')
    }
    alert(`Отзыв отправлен!\nОценка: ${review.rating}\nКомментарий: ${review.comment}`)
    handleCloseForm()
  }

  return (
    <div className="map-container">
      {/* Простая заглушка вместо карты */}
      <div 
        className="map-placeholder" 
        onClick={handleMapClick}
        style={{ cursor: 'pointer' }}
      >
        <h3>🗺️ КАРТА БУДЕТ ЗДЕСЬ</h3>
        <p>Нажмите на эту область, чтобы оставить отзыв о карте</p>
        <div className="click-hint">👆 Кликните здесь</div>
      </div>

      {/* Форма для отзыва */}
      {showReviewForm && (
        <div className="review-modal-overlay" onClick={handleCloseForm}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseForm}>×</button>
            <h3>Оставить отзыв о карте</h3>
            <form className="review-form" onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Ваше имя:</label>
                <input 
                  type="text" 
                  name="author" 
                  placeholder="Как вас зовут?" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Оценка карты:</label>
                <select name="rating" required>
                  <option value="">Выберите оценку</option>
                  <option value="5">⭐️⭐️⭐️⭐️⭐️ Отлично</option>
                  <option value="4">⭐️⭐️⭐️⭐️ Хорошо</option>
                  <option value="3">⭐️⭐️⭐️ Нормально</option>
                  <option value="2">⭐️⭐️ Плохо</option>
                  <option value="1">⭐️ Ужасно</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Ваш отзыв:</label>
                <textarea 
                  name="comment" 
                  placeholder="Что вам нравится в нашей карте? Что можно улучшить?" 
                  rows="4"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Отправить отзыв
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MapComponent