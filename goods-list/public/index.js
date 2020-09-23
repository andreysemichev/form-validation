let goodsAddForm = document.getElementsByClassName('goods__add-form')[0];
let priceAddBtn = document.getElementsByClassName('price__add-btn')[0];
let goodsAddName = document.getElementsByClassName('goods__add-name')[0];
let priceAddPrice = document.getElementsByClassName('price__add-price')[0];
let closeBtn = document.getElementsByClassName('closeBtn');
let changeBtn = document.getElementsByClassName('changeBtn');
let deleteBtn = document.getElementsByClassName('deleteBtn');
let changeName = document.getElementsByClassName('changeName');
let changePrice = document.getElementsByClassName('changePrice');
let nameText = document.getElementsByClassName('nameText');
let priceText = document.getElementsByClassName('priceText');

const regexp = /page=([^&]+)/i;
let page = '' || 0;

if (!!regexp.exec(document.location.search)) {
    page = regexp.exec(document.location.search)[1];
}

for (let i = 0; i < changeBtn.length; i++) {
    changeBtn[i].onclick = event => {
        event.preventDefault();

        if (changeBtn[i].parentNode.style.disable) {
            return;
        }

        if (closeBtn[i].style.display === 'inline') {
            changeBtn[i].parentNode.style.disable = true;
            changeBtn[i].parentNode.style.opacity = '0.3';

            let tr = changeBtn[i].parentNode.parentNode;

            const data = {
                changeName: tr.getElementsByClassName('changeName')[0].value,
                changePrice: tr.getElementsByClassName('changePrice')[0].value,
                id: changeBtn[i].getAttribute('data-change')
            };

            axios.put('/', data).then(result => { // PUT - UPDATE
                if (!result.data.ok) {
                    alert(result.data.description);
                    return;
                }

                if (parseInt(page) >= 1) {
                    document.location.href = `/?page=${page}`;
                }
    
                document.location.href = `/`;
            });
        }

        closeBtn[i].style.display = 'inline';
        changeName[i].setAttribute('type', 'text');
        changePrice[i].setAttribute('type', 'text');
        nameText[i].style.display = 'none';
        priceText[i].style.display = 'none';
    }

    closeBtn[i].onclick = event => {
        event.preventDefault();

        closeBtn[i].style.display = 'none';
        changeName[i].setAttribute('type', 'hidden');
        changePrice[i].setAttribute('type', 'hidden');
        nameText[i].style.display = 'inline';
        priceText[i].style.display = 'inline';
    }

    deleteBtn[i].onclick = event => {
        event.preventDefault();

        deleteBtn[i].disable = true;
        deleteBtn[i].style.opacity = '0.3';

        let id = deleteBtn[i].getAttribute('data-delete');

        axios.delete(`/${id}`).then(result => { // DELETE
            if (!result.data.ok) {
                alert(result.data.description);
                return;
            }

            if (parseInt(page) > 1) {
                if (document.querySelectorAll('tr').length === 2) {
                    document.location.href = `/?page=${page-1}`;
                } else {
                    document.location.href = `/?page=${page}`;
                }
            } else {
                document.location.href = `/`;

            }
        });
    }
}

goodsAddForm.onsubmit = event => {
    event.preventDefault();

    if (priceAddBtn.disable) {
        return;
    }

    priceAddBtn.disable = true;
    priceAddBtn.style.opacity = '0.3';

    let formData = new FormData();
    formData.append('goodsAddName', goodsAddName.value);
    formData.append('priceAddPrice', priceAddPrice.value);

    axios.post('/', formData).then(result => { // POST - CREATE
        priceAddBtn.disable = false;
        priceAddBtn.style.opacity = '1';

        if (!result.data.ok) {
            alert(result.data.description);
            return;
        }

        document.location.href = `/`;
    });
}