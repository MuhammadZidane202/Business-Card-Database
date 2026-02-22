const API_URL = "https://script.google.com/macros/s/AKfycbx9WvT0mwdnNkDtPzowLYJ3CjsHZsO1itqHZ48qSBfXYP_M5WW8lJF-nk1X8r8HiQzq/exec";

let contacts = [];

async function fetchData(){
  const res = await fetch(API_URL);
  contacts = await res.json();
  renderTable(contacts);
}

function renderTable(data){
  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  data.forEach(c=>{
    table.innerHTML += `
      <tr>
        <td>${c.nama}</td>
        <td>${c.perusahaan}</td>
        <td>${c.jabatan}</td>
        <td>${c.kota}</td>
        <td>${c.no_hp}</td>
        <td>${c.email}</td>
        <td>${c.kategori}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="edit('${c.id}')">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="removeData('${c.id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

document.getElementById("contactForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const data = {
    id: contactId.value,
    nama: nama.value,
    perusahaan: perusahaan.value,
    jabatan: jabatan.value,
    kota: kota.value,
    no_hp: no_hp.value,
    email: email.value,
    kategori: kategori.value
  };

  await fetch(API_URL,{
    method:"POST",
    body: JSON.stringify(data)
  });

  this.reset();
  contactId.value="";
  fetchData();
});

function edit(id){
  const c = contacts.find(x=>x.id==id);

  contactId.value=c.id;
  nama.value=c.nama;
  perusahaan.value=c.perusahaan;
  jabatan.value=c.jabatan;
  kota.value=c.kota;
  no_hp.value=c.no_hp;
  email.value=c.email;
  kategori.value=c.kategori;
}

async function removeData(id){
  if(!confirm("Hapus data?")) return;

  await fetch(API_URL,{
    method:"POST",
    body: JSON.stringify({action:"delete", id:id})
  });

  fetchData();
}

fetchData();
