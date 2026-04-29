// =================== DATA STORE ===================
const DEFAULT_BRANDS = [
  { id: 'porsche', name: 'Porsche', slug: 'PR' },
  { id: 'ferrari', name: 'Ferrari', slug: 'FE' },
  { id: 'lamborghini', name: 'Lamborghini', slug: 'LB' },
  { id: 'audi', name: 'Audi', slug: 'AU' },
];

const DEFAULT_CARS = [
  {
    id: 'c1', brandId: 'porsche',
    name: 'Porsche 911 Turbo (930)',
    desc: "O lendário 'Widowmaker' dos anos 70/80. Um carro que exige respeito e habilidade pura do motorista. O turbo sem intercooler criava um atraso brutal seguido de um power band explosivo.",
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: { motor: '3.3L Flat-6 Turbo', power: '300 cv', speed: '5.2s', year: '1975–1989' }
  },
  {
    id: 'c2', brandId: 'ferrari',
    name: 'Ferrari F40',
    desc: 'Criada para celebrar os 40 anos da Scuderia, é considerada por muitos a melhor experiência de direção visceral do mundo. Sem assistências, sem concessões — pura Ferrari.',
    images: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1000&q=80'
    ],
    specs: { motor: '2.9L V8 Twin-Turbo', power: '478 cv', speed: '4.1s', year: '1987–1992' }
  },
  {
    id: 'c3', brandId: 'lamborghini',
    name: 'Lamborghini Countach LP500S',
    desc: 'O pôster dos anos 80. Design de Gandini que desafiou toda convenção automotiva da época. Um carro que redefiniu o que uma supercar poderia parecer.',
    images: [
      'https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1000&q=80',
    ],
    specs: { motor: '4.8L V12 N/A', power: '375 cv', speed: '5.6s', year: '1982–1988' }
  },
  {
    id: 'c4', brandId: 'audi',
    name: 'Audi Quattro Ur',
    desc: 'O carro que revolucionou o Rally e depois chegou às ruas. O Quattro original provou que tração integral e desempenho podiam coexistir de forma brutal.',
    images: [
      'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1000&q=80',
    ],
    specs: { motor: '2.1L 5-cilindros Turbo', power: '200 cv', speed: '7.1s', year: '1980–1991' }
  },
  {
    id: 'c5', brandId: 'porsche',
    name: 'Porsche 959',
    desc: 'O carro mais tecnologicamente avançado do mundo em 1986. Tração integral inteligente, suspensão adaptativa e turbo sequencial. Uma obra-prima de engenharia.',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1000&q=80',
    ],
    specs: { motor: '2.8L Flat-6 Biturbo', power: '450 cv', speed: '3.7s', year: '1986–1988' }
  },
  {
    id: 'c6', brandId: 'ferrari',
    name: 'Ferrari Testarossa',
    desc: 'Símbolo máximo dos anos 80. As entradas laterais icônicas, o motor boxer 12 cilindros e o rugido inconfundível fizeram deste carro um ícone pop cultural eterno.',
    images: [
      'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1000&q=80',
    ],
    specs: { motor: '4.9L Flat-12 N/A', power: '385 cv', speed: '5.8s', year: '1984–1996' }
  },
];

function loadData() {
  const brands = localStorage.getItem('gl_brands');
  const cars = localStorage.getItem('gl_cars');
  return {
    brands: brands ? JSON.parse(brands) : JSON.parse(JSON.stringify(DEFAULT_BRANDS)),
    cars: cars ? JSON.parse(cars) : JSON.parse(JSON.stringify(DEFAULT_CARS)),
  };
}

function saveData(brands, cars) {
  localStorage.setItem('gl_brands', JSON.stringify(brands));
  localStorage.setItem('gl_cars', JSON.stringify(cars));
}

let db = loadData();

// =================== AUTH ===================
const USERS = {
  'user': { pass: '1234', role: 'user', display: 'Visitante' },
  'admin': { pass: 'admin123', role: 'admin', display: 'Administrador' }
};

let currentUser = null;

function doLogin() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value;
  if (USERS[u] && USERS[u].pass === p) {
    currentUser = { username: u, ...USERS[u] };
    document.getElementById('loginError').style.display = 'none';
    showMainSite();
  } else {
    document.getElementById('loginError').style.display = 'block';
  }
}

document.getElementById('loginPass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
document.getElementById('loginUser').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

function doLogout() {
  currentUser = null;
  document.getElementById('loginPage').style.display = 'flex';
  document.getElementById('mainSite').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
}

function showMainSite() {
  document.getElementById('loginPage').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('mainSite').style.display = 'block';
  document.getElementById('userNameDisplay').textContent = currentUser.display;
  const isAdmin = currentUser.role === 'admin';
  document.getElementById('adminBadge').style.display = isAdmin ? 'inline' : 'none';
  document.getElementById('goAdminBtn').style.display = isAdmin ? 'inline-block' : 'none';
  renderSite();
}

function goToAdmin() {
  document.getElementById('mainSite').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'block';
  renderAdmin();
}

function goToSite() {
  document.getElementById('adminPanel').style.display = 'none';
  document.getElementById('mainSite').style.display = 'block';
  renderSite();
}

// =================== SITE RENDER ===================
let activeBrandId = null;

function renderSite() {
  db = loadData();
  renderBrands();
  renderBrandExpand();
  renderCatalog();
}

function renderBrands() {
  const grid = document.getElementById('brandsGrid');
  grid.innerHTML = '';
  db.brands.forEach(brand => {
    const count = db.cars.filter(c => c.brandId === brand.id).length;
    const isActive = activeBrandId === brand.id;
    const pill = document.createElement('div');
    pill.className = 'brand-pill' + (isActive ? ' active' : '');
    pill.innerHTML = `
      <div class="brand-icon">${brand.slug}</div>
      <span class="brand-name">${brand.name}</span>
      <span class="brand-count">${count}</span>
    `;
    pill.onclick = () => toggleBrand(brand.id);
    grid.appendChild(pill);
  });
}

function toggleBrand(id) {
  activeBrandId = activeBrandId === id ? null : id;
  renderBrands();
  renderBrandExpand();
}

function renderBrandExpand() {
  const section = document.getElementById('brandExpand');
  if (!activeBrandId) {
    section.classList.add('hidden');
    return;
  }
  const brand = db.brands.find(b => b.id === activeBrandId);
  const cars = db.cars.filter(c => c.brandId === activeBrandId);
  document.getElementById('brandExpandTitle').textContent = brand.name.toUpperCase();
  document.getElementById('brandExpandCount').textContent = cars.length + ' carro' + (cars.length !== 1 ? 's' : '');
  document.getElementById('brandExpandGrid').innerHTML = cars.length
    ? cars.map(c => carCardHTML(c, brand)).join('')
    : '<div class="no-cars">Nenhum carro cadastrado nesta marca.</div>';
  section.classList.remove('hidden');
  section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  if (!db.cars.length) {
    grid.innerHTML = '<div class="no-cars">Nenhum carro no catálogo ainda.</div>';
    return;
  }
  grid.innerHTML = db.cars.map(c => {
    const brand = db.brands.find(b => b.id === c.brandId);
    return carCardHTML(c, brand);
  }).join('');
}

function carCardHTML(car, brand) {
  const img = car.images && car.images[0] ? car.images[0] : 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80';
  return `
    <div class="car-card" onclick="openModal('${car.id}')">
      <div class="car-card-img-wrap">
        <img class="car-card-img" src="${img}" alt="${car.name}" loading="lazy">
        <div class="car-card-overlay"><span class="car-card-overlay-text">Ver Detalhes</span></div>
      </div>
      <div class="car-card-info">
        <div class="car-card-brand">${brand ? brand.name : ''}</div>
        <h3>${car.name}</h3>
        <div class="car-card-specs">
          <div class="car-mini-spec"><span class="label">Motor</span><span class="value">${car.specs.motor || '—'}</span></div>
          <div class="car-mini-spec"><span class="label">Potência</span><span class="value">${car.specs.power || '—'}</span></div>
          <div class="car-mini-spec"><span class="label">Ano</span><span class="value">${car.specs.year || '—'}</span></div>
        </div>
      </div>
    </div>`;
}

// =================== MODAL ===================
let modalCar = null;
let modalImgIdx = 0;

function openModal(carId) {
  modalCar = db.cars.find(c => c.id === carId);
  if (!modalCar) return;
  modalImgIdx = 0;
  const brand = db.brands.find(b => b.id === modalCar.brandId);
  document.getElementById('modalBrand').textContent = brand ? brand.name : '';
  document.getElementById('modalTitle').textContent = modalCar.name;
  document.getElementById('modalDesc').textContent = modalCar.desc;
  document.getElementById('specMotor').textContent = modalCar.specs.motor || '—';
  document.getElementById('specPower').textContent = modalCar.specs.power || '—';
  document.getElementById('specSpeed').textContent = modalCar.specs.speed || '—';
  document.getElementById('specYear').textContent = modalCar.specs.year || '—';
  updateModalImg();
  renderDots();
  document.getElementById('carModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function updateModalImg() {
  const imgs = modalCar.images || [];
  const src = imgs[modalImgIdx] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1000&q=80';
  const el = document.getElementById('modalImg');
  el.style.opacity = '0';
  setTimeout(() => { el.src = src; el.style.opacity = '1'; }, 150);
}

function renderDots() {
  const dots = document.getElementById('galleryDots');
  const imgs = modalCar.images || [];
  if (imgs.length <= 1) { dots.innerHTML = ''; return; }
  dots.innerHTML = imgs.map((_, i) =>
    `<div class="gallery-dot ${i === modalImgIdx ? 'active' : ''}" onclick="jumpImg(${i})"></div>`
  ).join('');
}

function changeImg(dir) {
  const imgs = modalCar.images || [];
  if (!imgs.length) return;
  modalImgIdx = (modalImgIdx + dir + imgs.length) % imgs.length;
  updateModalImg();
  renderDots();
}

function jumpImg(i) {
  modalImgIdx = i;
  updateModalImg();
  renderDots();
}

function closeModal() {
  document.getElementById('carModal').classList.remove('active');
  document.body.style.overflow = '';
}

function handleModalClick(e) {
  if (e.target === document.getElementById('carModal')) closeModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// =================== ADMIN ===================
function renderAdmin() {
  db = loadData();
  renderAdminBrands();
  renderAdminCars();
  populateBrandSelect();
}

function switchAdminTab(tab) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-panel-section').forEach(s => s.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('tab-' + tab).classList.add('active');
}

function renderAdminBrands() {
  const list = document.getElementById('adminBrandsList');
  if (!db.brands.length) { list.innerHTML = '<div class="empty-state">Nenhuma marca cadastrada.</div>'; return; }
  list.innerHTML = db.brands.map(b => {
    const count = db.cars.filter(c => c.brandId === b.id).length;
    return `<li class="admin-list-item">
      <div>
        <div class="item-name">${b.name}</div>
        <div class="item-meta">${count} carro${count !== 1 ? 's' : ''} · sigla: ${b.slug}</div>
      </div>
      <div class="item-actions">
        <button class="btn-danger" onclick="deleteBrand('${b.id}')">Excluir</button>
      </div>
    </li>`;
  }).join('');
}

function addBrand() {
  const name = document.getElementById('newBrandName').value.trim();
  const slug = document.getElementById('newBrandSlug').value.trim().toUpperCase();
  if (!name || !slug) { alert('Preencha nome e sigla da marca.'); return; }
  db.brands.push({ id: 'b_' + Date.now(), name, slug: slug.substring(0, 3) });
  saveData(db.brands, db.cars);
  document.getElementById('newBrandName').value = '';
  document.getElementById('newBrandSlug').value = '';
  showSuccess('brandSuccess');
  renderAdminBrands();
  populateBrandSelect();
}

function deleteBrand(id) {
  if (!confirm('Excluir esta marca? Os carros associados também serão removidos.')) return;
  db.brands = db.brands.filter(b => b.id !== id);
  db.cars = db.cars.filter(c => c.brandId !== id);
  saveData(db.brands, db.cars);
  renderAdminBrands();
  renderAdminCars();
  populateBrandSelect();
}

function populateBrandSelect() {
  const sel = document.getElementById('newCarBrand');
  sel.innerHTML = db.brands.map(b => `<option value="${b.id}">${b.name}</option>`).join('');
}

function renderAdminCars() {
  const list = document.getElementById('adminCarsList');
  if (!db.cars.length) { list.innerHTML = '<div class="empty-state">Nenhum carro cadastrado.</div>'; return; }
  list.innerHTML = db.cars.map(car => {
    const brand = db.brands.find(b => b.id === car.brandId);
    const thumb = car.images && car.images[0] ? car.images[0] : '';
    const photosHTML = (car.images || []).map((url, i) =>
      `<div class="photo-thumb-wrap">
        <img src="${url}" alt="">
        <button class="photo-thumb-del" onclick="deletePhoto('${car.id}', ${i})" title="Remover foto">✕</button>
      </div>`
    ).join('');
    return `
      <div class="admin-car-item">
        <div class="admin-car-header" onclick="toggleCarExpand('${car.id}')">
          <div class="admin-car-header-left">
            ${thumb ? `<img class="admin-car-thumb" src="${thumb}" alt="">` : '<div class="admin-car-thumb" style="background:var(--bg4)"></div>'}
            <div>
              <div class="admin-car-name">${car.name}</div>
              <div class="admin-car-brand-badge">${brand ? brand.name : 'Sem marca'}</div>
            </div>
          </div>
          <div class="item-actions">
            <button class="btn-danger" onclick="event.stopPropagation(); deleteCar('${car.id}')">Excluir</button>
            <button class="btn-sm" onclick="event.stopPropagation(); toggleCarExpand('${car.id}')">Fotos ▾</button>
          </div>
        </div>
        <div class="admin-car-expand" id="expand_${car.id}">
          <p style="font-family:var(--font-ui);font-size:0.78rem;color:var(--text3);margin-top:12px;margin-bottom:4px;text-transform:uppercase;letter-spacing:1px;">Fotos (${(car.images||[]).length})</p>
          <div class="photos-grid">${photosHTML}</div>
          <div class="add-photo-form">
            <input type="text" id="photoUrl_${car.id}" placeholder="URL da nova foto...">
            <button class="btn-primary" onclick="addPhoto('${car.id}')">+ Adicionar</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function toggleCarExpand(id) {
  const el = document.getElementById('expand_' + id);
  el.classList.toggle('open');
}

function addCar() {
  const brandId = document.getElementById('newCarBrand').value;
  const name = document.getElementById('newCarName').value.trim();
  const desc = document.getElementById('newCarDesc').value.trim();
  const motor = document.getElementById('newCarMotor').value.trim();
  const power = document.getElementById('newCarPower').value.trim();
  const speed = document.getElementById('newCarSpeed').value.trim();
  const year = document.getElementById('newCarYear').value.trim();
  const imgUrl = document.getElementById('newCarImg').value.trim();
  if (!name || !brandId) { alert('Nome e marca são obrigatórios.'); return; }
  const car = {
    id: 'car_' + Date.now(),
    brandId, name, desc,
    images: imgUrl ? [imgUrl] : [],
    specs: { motor, power, speed, year }
  };
  db.cars.push(car);
  saveData(db.brands, db.cars);
  ['newCarName','newCarDesc','newCarMotor','newCarPower','newCarSpeed','newCarYear','newCarImg'].forEach(id => {
    document.getElementById(id).value = '';
  });
  showSuccess('carSuccess');
  renderAdminCars();
}

function deleteCar(id) {
  if (!confirm('Excluir este carro?')) return;
  db.cars = db.cars.filter(c => c.id !== id);
  saveData(db.brands, db.cars);
  renderAdminCars();
}

function addPhoto(carId) {
  const input = document.getElementById('photoUrl_' + carId);
  const url = input.value.trim();
  if (!url) return;
  const car = db.cars.find(c => c.id === carId);
  if (!car) return;
  if (!car.images) car.images = [];
  car.images.push(url);
  saveData(db.brands, db.cars);
  input.value = '';
  renderAdminCars();
  // re-open expand
  setTimeout(() => {
    const el = document.getElementById('expand_' + carId);
    if (el) el.classList.add('open');
  }, 50);
}

function deletePhoto(carId, idx) {
  const car = db.cars.find(c => c.id === carId);
  if (!car || !car.images) return;
  car.images.splice(idx, 1);
  saveData(db.brands, db.cars);
  renderAdminCars();
  setTimeout(() => {
    const el = document.getElementById('expand_' + carId);
    if (el) el.classList.add('open');
  }, 50);
}

function showSuccess(id) {
  const el = document.getElementById(id);
  el.style.display = 'block';
  setTimeout(() => el.style.display = 'none', 3000);
}

// =================== SCROLL HELPERS ===================
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
function scrollToBrands() { document.getElementById('brandsSection').scrollIntoView({ behavior: 'smooth' }); }
function scrollToCatalog() { document.getElementById('catalogSection').scrollIntoView({ behavior: 'smooth' }); }
