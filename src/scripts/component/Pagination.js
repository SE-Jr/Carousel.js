import EventEmitter from "../EventEmitter";
import { CLASSNAMES } from "../Consts";

class Pagination {
    constructor(config, state) {
        this.eventEmitter = new EventEmitter();
        this._config = config;
        this._state = state;
        this._tadaWrapper = config.wrapper;
    }

    move(direction) {
        this.moveTo(this._state.currentPage);
        this.eventEmitter.emit(direction);
    }

    moveTo(page) {
        this._tadaWrapper.querySelector(`.${CLASSNAMES.paginationButton}.active`).classList.remove("active");
        const paginationButton = this._tadaWrapper.querySelector(`button[data-slide-index="${page}"]`);
        paginationButton.classList.add("active");
    }

    render() {
        const pagination = this._createPaginationWrapper();
        for (let i = 0; i < this._config.slideCount; i += 1) {
            const paginationItem = this._createPaginationItem(i);
            pagination.appendChild(paginationItem);
        }
        this._tadaWrapper.appendChild(pagination);
        this.elem = pagination;
    }

    _createPaginationWrapper() {
        const pagination = document.createElement("ul");
        pagination.classList.add(CLASSNAMES.pagination, `pagination-${this._config.paginationShape}`);

        return pagination;
    }

    _createPaginationItem(index) {
        const paginationButton = this._createPaginationButton(index);
        this._setCurrentActivatedButton(index, paginationButton);
        const paginationItem = document.createElement("li");
        paginationItem.classList.add(CLASSNAMES.paginationItem);
        paginationItem.appendChild(paginationButton);
        paginationItem.setAttribute("data-slide-index", `${index}`);

        return paginationItem;
    }

    _createPaginationButton(index) {
        const paginationButton = document.createElement("button");
        paginationButton.classList.add(CLASSNAMES.paginationButton);
        paginationButton.setAttribute("data-slide-index", `${index}`);

        return paginationButton;
    }

    _setCurrentActivatedButton(index, button) {
        if (index === 0) {
            button.classList.add("active");
        }
    }
}

export default Pagination;
