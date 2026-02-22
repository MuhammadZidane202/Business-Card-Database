const API_URL = "https://script.google.com/macros/s/AKfycbyW1dGaCZDnbgLa3q_Mr1cR4vJ7uQrwTI34ZjGxL5zCv2w48RDcr4GuTe2Gk6vKegTm/exec";

let contacts = [];

async function fetchData() {
  const res = await fetch(API_URL);
  contacts = await res.json();
  renderTable(contacts);
}

function renderTable(data) {
  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  data.forEach(item => {
    table.innerHTML += `
      <tr>
        <td>${item.nama}</td>
        <td>${item.perusahaan}</td>
        <td>${item.kota}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editContact('${item.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteContact('${item.id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

document.getElementById("contactForm").addEventListener("submit", async (e)=>{
  e.preventDefault();

  const id = document.getElementById("contactId").value;

  const data = {
    id: id,
    nama: document.getElementById("nama").value,
    perusahaan: document.getElementById("perusahaan").value,
    kota: document.getElementById("kota").value
  };

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });

  resetForm();
  fetchData();
});

function editContact(id){
  const contact = contacts.find(c => c.id == id);

  document.getElementById("contactId").value = contact.id;
  document.getElementById("nama").value = contact.nama;
  document.getElementById("perusahaan").value = contact.perusahaan;
  document.getElementById("kota").value = contact.kota;
}

async function deleteContact(id){
  if(!confirm("Yakin hapus?")) return;

  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({action:"delete", id:id})
  });

  fetchData();
}

function resetForm(){
  document.getElementById("contactId").value = "";
  document.getElementById("contactForm").reset();
}

document.getElementById("search").addEventListener("input", function(){
  const keyword = this.value.toLowerCase();
  const filtered = contacts.filter(c =>
    c.nama.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
});

fetchData();
