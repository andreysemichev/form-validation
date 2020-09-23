module.exports = {
    pagination: (data) => { // Дефолтная пагинация
        let str = '';
        let currentPage = data.currentPage || 1;
        let pageCount = data.pageCount || 1;
        const words = {
            next: 'Вперед',
            firstPage: 'Первая страница',
            prev: 'Назад',
            lastPage: 'Последняя страница'
        }

        str += '<div class="pagination__control-btn">';
        if (currentPage !== 1) { // Prev, First Page
            str += `<a class="pagination__number" href="/?page=${1}">${words.firstPage}</a>`;
            str += `<a class="pagination__number" href="/?page=${currentPage-1}">${words.prev}</a>`;

        } else {
            str += `<a class="pagination__number pagination__number--disable" href="/?page=${pageCount}">${words.firstPage}</a>`;
            str += `<a class="pagination__number pagination__number--disable" href="/?page=${currentPage-1}">${words.prev}</a>`;
        }
        str += '</div>';

        if (pageCount <= 7) { // Если 7 страниц или меньше
            for (let i = 1; i <= pageCount; i++) {
                if (currentPage === i) {
                    str += `<a class="pagination__number pagination__number--selected" href="/?page=${i}">${i}</a>`;

                } else {
                    str += `<a class="pagination__number" href="/?page=${i}">${i}</a>`;
                }
            }

            if (currentPage !== pageCount) { // Next, Last Page
                str += `<a class="pagination__number" href="/?page=${currentPage+1}">${words.next}</a>`;
                str += `<a class="pagination__number" href="/?page=${pageCount}">${words.lastPage}</a>`;

            } else {
                str += `<a class="pagination__number pagination__number--disable" href="/?page=${currentPage+1}">${words.next}</a>`;
                str += `<a class="pagination__number pagination__number--disable" href="/?page=${pageCount}">${words.lastPage}</a>`;
            }

            return str;
        }

        if (currentPage <= 3) { // Начало
            str += '<div class="pagination__links">'
            for (let i = 1; i <= 6 && i <= pageCount; i++) {
                if (currentPage === i) {
                    str += `<a class="pagination__number pagination__number--selected" href="/?page=${i}">${i}</a>`;

                } else {
                    str += `<a class="pagination__number" href="/?page=${i}">${i}</a>`;
                }
            }

            if (pageCount === 7) {
                str += `<a class="pagination__number " href="/?page=${7}">${7}</a>`;
            } else {
                str += `<a class="pagination__number pagination__number--dots" href="/">...</a>`;
            }

        } else if (currentPage >= pageCount-2) { // Конец
            str += '<div class="pagination__links">'
            str += `<a class="pagination__number pagination__number--dots" href="/">...</a>`;

            for (let i = pageCount-5; i <= pageCount; i++) {
                if (currentPage === i) {
                    str += `<a class="pagination__number pagination__number--selected" href="/?page=${i}">${i}</a>`;

                } else {
                    str += `<a class="pagination__number" href="/?page=${i}">${i}</a>`;
                }
            }

        } else { // Середина
            str += '<div class="pagination__links">'
            str += `<a class="pagination__number pagination__number--dots" href="/">...</a>`;

            for (let i = currentPage-2; i <= pageCount && i < currentPage+3; i++) {
                if (currentPage === i) {
                    str += `<a class="pagination__number pagination__number--selected" href="/?page=${i}">${i}</a>`;
                } else {
                    str += `<a class="pagination__number" href="/?page=${i}">${i}</a>`;
                }
            }

            str += `<a class="pagination__number pagination__number--dots" href="/">...</a>`;
        }

        str += '</div>'
        str += '<div class="pagination__control-btn">';
        if (currentPage !== pageCount) { // Next, Last Page
            str += `<a class="pagination__number" href="/?page=${currentPage+1}">${words.next}</a>`;
            str += `<a class="pagination__number" href="/?page=${pageCount}">${words.lastPage}</a>`;

        } else {
            str += `<a class="pagination__number pagination__number--disable" href="/?page=${currentPage+1}">${words.next}</a>`;
            str += `<a class="pagination__number pagination__number--disable" href="/?page=${pageCount}">${words.lastPage}</a>`;
        }
        str += '</div>';

        return str;
    }
}