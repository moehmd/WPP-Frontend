import { createRef } from 'react';

export let textInput = createRef();

let categoryIds = [];
let formatIds = [];

let requestBody = {
  "pageIndex": 1,
  "pageSize": 6,
  "search": "",
  "categories": [],
  "formats":  []
};

export let categoryFilter = (category) => {
    if (category.target.checked) {
      categoryIds = [...categoryIds, Number(category.target.id)];
    } else {
      categoryIds = categoryIds.filter(categoryIds => categoryIds !== Number(category.target.id));
    };
    requestBody.categories = categoryIds;
};

export let formatFilter = (format) => {
    if (format.target.checked) {
        formatIds = [...formatIds, Number(format.target.id)];
    } else {
        formatIds = formatIds.filter(formatIds => formatIds !== Number(format.target.id));
    };
    requestBody.formats = formatIds;
};

export let selectPage = (page) => {
  requestBody.pageIndex = Number(page);
};

export let handleClick = () => {
  requestBody.search = textInput.current.value;
};

export let callFilter = () => {
  return requestBody;
};

export let populateSearchResult = () => {
  return requestBody.search;
};