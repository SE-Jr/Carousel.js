export function left(model) {
  model.prevPage = model.currentPage;
  model.currentPage = model.prevPage - 1;
}

export function right(model) {
  model.prevPage = model.currentPage;
  model.currentPage = model.prevPage + 1;
}

export function updateCurrentPage(model, page) {
  model.currentPage = page;
}

export function canMove(model, config) {
  if (model.currentPage >= config.slideCount - 1) {
    model.currentPage = config.slideCount - 1;
    return {
      direction: "right",
      on: false,
    };
  }

  if (model.currentPage <= 0) {
    model.currentPage = 0;
    return {
      direction: "left",
      on: false,
    };
  }
  return {
    on: true,
  };
}

