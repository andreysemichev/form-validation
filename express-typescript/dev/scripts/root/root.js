let numberWithSpaces = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

const allPrice = document.querySelectorAll(".root__table-price");

if (allPrice) {
  for (let i = 0; i < allPrice.length; i++) {
    const currentPriceNode = allPrice[i];
    const currentPriceInner = currentPriceNode.innerHTML;

    currentPriceNode.innerHTML = numberWithSpaces(currentPriceInner);
  }
}

const modal = document.querySelector(".root__modal");

modal.addEventListener("click", event => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

const setModalField = (name, price, description, isNew = false) => {
  const modalName = modal.querySelector("#modal-name");
  const modalDescription = modal.querySelector("#modal-description");
  const modalPrice = modal.querySelector("#modal-price");

  modalName.value = "";
  modalDescription.innerHTML = "";
  modalPrice.value = ""

  if (isNew) {
    return;
  }

  modalName.value = name;
  modalDescription.innerHTML = description;
  modalPrice.value = price
}

const onpenModal = target => {
  modal.style.display = "flex";

  if (!target) {
    setModalField("", "", "", true);
    return;
  }

  const currentTr = target.parentNode.parentNode.parentNode;

  const currentName = currentTr.querySelector(".root__table-name").innerHTML;
  const currentPrice = currentTr.querySelector(".root__table-price").innerHTML.replace(/\s/g, '');
  const currentDescription = currentTr.querySelector(".root__table-description").innerHTML;

  setModalField(currentName, currentPrice, currentDescription);
}









