module.exports = { Layout, Table, AddProductForm };

function Layout({ title, content }) {
  return /*html*/ `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>${styles}</style>
      </head>
      <body>
        <div class="layout">
          <nav>
            <ul>
              <li>
                <a href="/">Products</a>
                <ul>
                  <li><a href="/search">Search</a></li>
                  <li><a href="/new">Add new</a></li>
                </ul>
              </li>
            </ul>
          </nav>
          <main>
            ${content}
          </main>
        </div>
      </body>
    </html>
  `;
}

function Table({ caption, data }) {
  const keys = Object.keys(data[0]);
  return /*html*/ `
    <div class="table-wrapper">
      <table>
        <caption>${caption} <small>(${data.length})</small></caption>
        <thead>
          <tr>
            ${keys.map((key) => `<th>${key}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${data.map(Row).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function Row(entry) {
  return /*html*/ `
    <tr>
      ${Object.values(entry)
        .map((val) => `<td>${val}</td>`)
        .join("")}
    </tr>
  `;
}

function AddProductForm({ title, categories, errors = {} }) {
  const options = categories.map(
    (cat) => `<option value="${cat.id}">${cat.name}</option>`
  );
  return /*html*/ `
    <h1>${title}</h1>
    <form method="POST">
      <p>
        <label for="name">Name</label>
        <input name="name" id="name">
        ${validation(errors.name)}
      </p>
      <p>
        <label for="qty">Quantity per unit</label>
        <input name="quantity_per_unit" id="qty">
        ${validation(errors.qty)}
      </p>
      <p>
        <label for="price">Unit price</label>
        <input name="unit_price" id="price" type="number" step="0.01">
        ${validation(errors.price)}
      </p>
      <p>
        <label>Category</label>
        <select name="category_id">
          ${options.join("")}
        </select>
      </p>
      <button>Create &plus;</button>
    </form>
`;
}

function validation(message) {
  if (message) {
    return `<span style="color: red">${message}</span>`;
  } else {
    return "";
  }
}

const styles = /*css*/ `
  html {
    --hue: 280;
    --text-dark: hsl(var(--hue), 10%, 15%);
    --text-light: hsl(var(--hue), 10%, 96%);
    --bg-dark: hsl(var(--hue), 25%, 12%);
    --bg-light: hsl(var(--hue), 25%, 98%);
    --bg-dim: hsl(var(--hue), 10%, 95%);
    accent-color: hsl(var(--hue), 50%, 50%);
  }

  body {
    margin: 0;
    font-family: system-ui, sans-serif;
    color: var(--text);
    background-color: var(--bg-light);
  }

  .layout {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 20ch 1fr;
  }

  nav {
    display: grid;
    gap: 1rem;
    align-content: start;
    padding: 2rem;
    color: var(--text-light);
    background-color: var(--bg-dark);
  }

  nav ul {
    list-style: none;
    padding-inline-start: 0;
    font-size: 1.25rem;
  }

  nav ul ul {
    padding-inline-start: 1.5em;
  }

  nav a {
    color: inherit;
    text-decoration: none;
  }

  main {
    padding: 2rem;
  }

  .table-wrapper {
    --border: 1px solid var(--bg-dim);
    border: var(--border);
    text-align: left;
    background-color: white;
    font-variant-numeric: tabular-nums;

  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  caption {
    border-bottom: var(--border);
    padding: 1rem;
    background-color: white;
    font-weight: bold;
    text-transform: uppercase;
  }

  thead {
    border-bottom: var(--border);
  }

  th,
  td {
    padding: 0.5rem 1rem;
  }

  tr:nth-child(even) {
    background-color: var(--bg-dim);
  }
`;
