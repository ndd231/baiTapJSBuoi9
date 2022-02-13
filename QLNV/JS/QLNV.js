var dsnv = [];
var dsnvJson = localStorage.getItem("dsnvLocal");

if (dsnvJson) {
  var dsnvLocal = JSON.parse(dsnvJson);

  dsnv = dsnvLocal.map(function (sv) {
    return new nhanVien(sv.ma, sv.ten, sv.email, sv.chucVu);
  });
  renderTable(dsnv);
}

function luuDataLocal() {
  var dsnvJson = JSON.stringify(dsnv);
  localStorage.setItem("dsnvLocal", dsnvJson);
}

function themNV() {
  var ma = document.getElementById("txtMaNV").value;
  var ten = document.getElementById("txtTenNV").value;
  var email = document.getElementById("txtEmail").value;
  var chucVu = document.getElementById("txtChucVu").value;

  var NhanVien = new nhanVien(ma, ten, email, chucVu);
  console.log("NhanVien", NhanVien);
  dsnv.push(NhanVien);
  renderTable(dsnv);
  luuDataLocal;
}

function timKiemNV(maNV) {
  for (var index = 0; index < dsnv.length; index++) {
    if (dsnv[index].ma * 1 === maNV * 1) {
      return index;
    }
  }
}

function suaNV(maNV) {
  var index = timKiemNV(maNV);
  var nv = dsnv[index];

  document.getElementById("txtMaNV").value = nv.ma;
  document.getElementById("txtTenNV").value = nv.ten;
  document.getElementById("txtEmail").value = nv.email;
  document.getElementById("txtChucVu").value = nv.chucVu;
}

function xoaNV(maNV) {
  var index = timKiemNV(maNV);
  console.log(index);
  dsnv.splice(index, 1);
  renderTable(dsnv);
}

function capNhatNV() {
  var ma = document.getElementById("txtMaNV").value;
  var ten = document.getElementById("txtTenNV").value;
  var email = document.getElementById("txtEmail").value;
  var chucVu = document.getElementById("txtChucVu").value;
  var NhanVien = new nhanVien(ma, ten, email, chucVu);
  var index = timKiemNV(ma);
  dsnv[index] = NhanVien;
  renderTable(dsnv);
}

function renderTable(array) {
  var contentHTML = "";
  for (var index = 0; index < array.length; index++) {
    var nv = array[index];
    contentHTML += `
    <tr>
    <td>${nv.ma}</td>
    <td>${nv.ten}</td>
    <td>${nv.email}</td>
    <td>${nv.chucVu}</td>
    <td>
    <button class="btn btn-success" onclick="suaNV(${nv.ma})">Sửa</button>
    <button class="btn btn-danger" onclick="xoaNV(${nv.ma})">Xóa</button>
    </td>
    </tr>
    `;
  }
  document.getElementById("tbodyNhânVien").innerHTML = contentHTML;
}
