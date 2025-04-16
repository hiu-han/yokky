const grid = document.getElementById('grid');
const viewportBox = document.getElementById('viewportBox');
const selectedIndexSpan = document.getElementById('selectedIndex');
const useNamedAreas = document.getElementById('useNamedAreas');

const inputs = {
  columns: document.getElementById('columns'),
  rows: document.getElementById('rows'),
  gap: document.getElementById('gap'),
  justifyItems: document.getElementById('justifyItems'),
  alignItems: document.getElementById('alignItems'),
  autoFlow: document.getElementById('autoFlow'),
  itemCount: document.getElementById('itemCount'),
  itemColumn: document.getElementById('itemColumn'),
  itemRow: document.getElementById('itemRow'),
  itemArea: document.getElementById('itemArea'),
  viewportWidth: document.getElementById('viewportWidth'),
};

let selectedItem = null;

function updateGridStyle() {
  grid.classList.toggle('with-named-areas', useNamedAreas.checked);
  grid.style.gridTemplateColumns = inputs.columns.value;
  grid.style.gridTemplateRows = inputs.rows.value;
  grid.style.gap = inputs.gap.value;
  grid.style.justifyItems = inputs.justifyItems.value;
  grid.style.alignItems = inputs.alignItems.value;
  grid.style.gridAutoFlow = inputs.autoFlow.value;
}

function updateViewport() {
  viewportBox.style.width = inputs.viewportWidth.value + 'px';
}

function renderItems() {
  grid.innerHTML = '';
  const count = parseInt(inputs.itemCount.value, 10);
  for (let i = 1; i <= count; i++) {
    const item = document.createElement('div');
    item.className = 'grid-item';
    item.textContent = i;
    item.dataset.index = i;

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = '';
    item.appendChild(document.createElement('br'));
    item.appendChild(label);

    item.addEventListener('click', () => {
      document
        .querySelectorAll('.grid-item')
        .forEach((el) => el.classList.remove('selected'));
      item.classList.add('selected');
      selectedItem = item;
      selectedIndexSpan.textContent = `#${i}`;
      inputs.itemColumn.value = item.style.gridColumn || '';
      inputs.itemRow.value = item.style.gridRow || '';
      inputs.itemArea.value = item.dataset.area || '';
    });

    grid.appendChild(item);
  }
}

function applyItemStyles() {
  if (selectedItem) {
    const col = inputs.itemColumn.value;
    const row = inputs.itemRow.value;
    const area = inputs.itemArea.value;

    selectedItem.style.gridColumn = col;
    selectedItem.style.gridRow = row;
    selectedItem.dataset.area = area;
    selectedItem.setAttribute('data-area', area);

    const label = selectedItem.querySelector('.label');
    label.textContent = `${col ? `col: ${col} ` : ''}${
      row ? `row: ${row} ` : ''
    }${area ? `area: ${area}` : ''}`;
  }
}

Object.values(inputs).forEach((input) => {
  input.addEventListener('input', () => {
    updateGridStyle();
    updateViewport();
    if (input === inputs.itemCount) renderItems();
    if ([inputs.itemColumn, inputs.itemRow, inputs.itemArea].includes(input))
      applyItemStyles();
  });
});

useNamedAreas.addEventListener('change', updateGridStyle);

updateGridStyle();
updateViewport();
renderItems();

// 저장 관련
const layoutList = document.getElementById('layoutList');
const saveButton = document.getElementById('saveLayout');
const layoutNameInput = document.getElementById('layoutName');

function getCurrentLayoutData() {
  const items = Array.from(document.querySelectorAll('.grid-item'));
  return {
    name: layoutNameInput.value.trim() || new Date().toLocaleString(),
    columns: inputs.columns.value,
    rows: inputs.rows.value,
    gap: inputs.gap.value,
    justifyItems: inputs.justifyItems.value,
    alignItems: inputs.alignItems.value,
    autoFlow: inputs.autoFlow.value,
    itemCount: inputs.itemCount.value,
    useNamedAreas: useNamedAreas.checked,
    items: items.map((item) => ({
      gridColumn: item.style.gridColumn || '',
      gridRow: item.style.gridRow || '',
      gridArea: item.dataset.area || '',
    })),
  };
}

function saveLayout() {
  let saved = JSON.parse(localStorage.getItem('gridLayouts') || '[]');
  const layout = getCurrentLayoutData();
  saved.push(layout);
  if (saved.length > 10) saved.shift();
  localStorage.setItem('gridLayouts', JSON.stringify(saved));
  layoutNameInput.value = '';
  renderLayoutList();
}

function renderLayoutList() {
  const saved = JSON.parse(localStorage.getItem('gridLayouts') || '[]');
  layoutList.innerHTML = '';
  saved.forEach((layout, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${layout.name}</span>
        <span>
          <button onclick="loadLayout(${index})">불러오기</button>
          <button onclick="deleteLayout(${index})">삭제</button>
        </span>`;
    layoutList.appendChild(li);
  });
}

function loadLayout(index) {
  const saved = JSON.parse(localStorage.getItem('gridLayouts') || '[]');
  const layout = saved[index];
  inputs.columns.value = layout.columns;
  inputs.rows.value = layout.rows;
  inputs.gap.value = layout.gap;
  inputs.justifyItems.value = layout.justifyItems;
  inputs.alignItems.value = layout.alignItems;
  inputs.autoFlow.value = layout.autoFlow;
  inputs.itemCount.value = layout.itemCount;
  useNamedAreas.checked = layout.useNamedAreas;
  updateGridStyle();
  updateViewport();
  renderItems();
  layout.items.forEach((itemData, i) => {
    const item = grid.children[i];
    if (item) {
      item.style.gridColumn = itemData.gridColumn;
      item.style.gridRow = itemData.gridRow;
      item.dataset.area = itemData.gridArea;
      item.setAttribute('data-area', itemData.gridArea);
      const label = item.querySelector('.label');
      label.textContent = `${
        itemData.gridColumn ? `col: ${itemData.gridColumn} ` : ''
      }${itemData.gridRow ? `row: ${itemData.gridRow} ` : ''}${
        itemData.gridArea ? `area: ${itemData.gridArea}` : ''
      }`;
    }
  });
}

function deleteLayout(index) {
  let saved = JSON.parse(localStorage.getItem('gridLayouts') || '[]');
  saved.splice(index, 1);
  localStorage.setItem('gridLayouts', JSON.stringify(saved));
  renderLayoutList();
}

saveButton.addEventListener('click', saveLayout);
window.addEventListener('DOMContentLoaded', renderLayoutList);

const toggleBtn = document.getElementById('togglePreview');
const codeBox = document.getElementById('codeBox');
const cssPreview = document.getElementById('cssPreview');

toggleBtn?.addEventListener('click', () => {
  const visible = codeBox.style.display === 'block';
  codeBox.style.display = visible ? 'none' : 'block';
  toggleBtn.textContent = visible ? '💻 코드 미리보기' : '🔽 코드 닫기';
  if (!visible) updatePreviewCode();
});

function updatePreviewCode() {
  if (!cssPreview || typeof inputs === 'undefined') return;
  let css = '.grid-container {\n';
  css += `  display: grid;\n`;
  css += `  grid-template-columns: ${inputs.columns.value};\n`;
  css += `  grid-template-rows: ${inputs.rows.value};\n`;
  css += `  gap: ${inputs.gap.value};\n`;
  if (inputs.justifyItems.value)
    css += `  justify-items: ${inputs.justifyItems.value};\n`;
  if (inputs.alignItems.value)
    css += `  align-items: ${inputs.alignItems.value};\n`;
  if (inputs.autoFlow.value)
    css += `  grid-auto-flow: ${inputs.autoFlow.value};\n`;
  if (useNamedAreas && useNamedAreas.checked) {
    css += `  grid-template-areas: \n    \"header header header\",\n    \"sidebar content content\",\n    \"footer footer footer\";\n`;
  }
  css += `}\n\n`;

  const items = document.querySelectorAll('.grid-item');
  items.forEach((item, index) => {
    const col = item.style.gridColumn;
    const row = item.style.gridRow;
    const area = item.dataset.area;
    if (col || row || area) {
      css += `.grid-item:nth-child(${index + 1}) {\n`;
      if (col) css += `  grid-column: ${col};\n`;
      if (row) css += `  grid-row: ${row};\n`;
      if (area) css += `  grid-area: ${area};\n`;
      css += `}\n\n`;
    }
  });

  cssPreview.textContent = css.trim();
}

function copyPreview() {
  navigator.clipboard
    .writeText(cssPreview.textContent)
    .then(() => alert('코드가 복사되었습니다!'))
    .catch(() => alert('복사에 실패했습니다.'));
}
