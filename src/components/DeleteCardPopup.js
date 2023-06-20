function DeleteCardPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    
  }
  return (
    <PopupWithForm name="delete-card" submitButtonText="Да" onSubmit={handleSubmit} />
  )
}
