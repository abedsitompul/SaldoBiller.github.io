
// ===== Helper untuk ambil element banyak sekaligus =====
const get = id => document.getElementById(id);

// ===== Class Dinamis (lebih pendek) =====
class Produk_PagidanMalam {
  constructor() {
    [
      "txtSaldoP114", "txtSaldoEM", "txtSaldoDn", "txtSaldoKws",
      "txtSaldoMMI", "txtSaldoPPM"
    ].forEach(id => this[id] = get(id));
  }
}

class Produk_Siang {
  constructor() {
    [
      "txtSaldoBima", "txtSaldoTeleanjar", "txtSaldoDelima", "txtSaldoDJI",
      "txtSaldoPluslinkMF", "txtSaldoMitracom", "txtSaldoAJN", "txtSaldoPamIndramayu",
      "txtSaldoGSP", "txtSaldoPTPOS", "txtArtaJasaMBA", "txtArtaJasaVSI",
      "txtArindo", "txtLinkQU", "txtOvo", "txtTokpedGopay"
    ].forEach(id => this[id] = get(id));
  }
}


// Another Func
// ===== Format Rupiah =====
document.querySelectorAll(".form-control").forEach(e => {
  e.addEventListener("keyup", () => {
    e.value = formatRupiah(e.value, "Rp. ");
  });
});

function formatRupiah(num, prefix) {
  let n = num.replace(/[^\d]/g, "").split(".");
  let sisa = n[0].length % 3;
  let rupiah = n[0].substr(0, sisa);
  let ribuan = n[0].substr(sisa).match(/\d{1,3}/g);

  if (ribuan) rupiah += (sisa ? "." : "") + ribuan.join(".");
  return prefix + (n[1] ? rupiah + "." + n[1] : rupiah);
}


// ===== Reset banyak input =====
function clearFields(arr) {
  arr.forEach(id => get(id).value = "");
}

// ===== Template Generator =====
function blok(judul, val) {
  return `*${judul}:*\n${val}\n\n`;
}


// ===== Display voucher otomatis =====
const today = new Date();
const hour = today.getHours();  // 24 jam (0–23)
const pesan = hour < 9 ? "Pagi" : hour < 17 ? "Siang" : "Malam";


const eleVoucher = document.querySelectorAll(".input-SBiller");
let wbpagi = 9;
let wbsiang = 17;
if (hour < wbpagi) {
  for (var wb = 0; wb < eleVoucher.length; wb++) {
    eleVoucher[wb].style.display = "block";
  }
} else if (hour > wbpagi && hour < wbsiang) {
  for (var wbp = 0; wbp < eleVoucher.length; wbp++) {
    eleVoucher[wbp].style.display = "none";
  }
} else {
  for (var wbM = 0; wbM < eleVoucher.length; wbM++) {
    eleVoucher[wbM].style.display = "block";
  }
}

// END Another Func



// ===== Waktu =====
const timeNow = `${String(today.getHours()).padStart(2,"0")}:${String(today.getMinutes()).padStart(2,"0")}`;
const tanggal = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;

// ===== Download File =====
function saveText(filename, text) {
  let blob = new Blob([text], {
    type: "text/plain"
  });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// ===== Pagi & Malam =====
function underPagi() {
  const P = new Produk_PagidanMalam();
  const S = new Produk_Siang();
  
  txtSaldoP114.value = "Rp. 1.127.884";

  let data =
    `Assalamu'alaikum Warahmatullahi Wabarakatuh
Update Info Saldo ${pesan}, Tanggal ${tanggal} Pukul ${timeNow}

` +
    blok("Saldo Pulsa-114 - Voucher", P.txtSaldoP114.value) +
    blok("Saldo Kuwais - Voucher", P.txtSaldoKws.value) +
    blok("Saldo MMI - Voucher", P.txtSaldoMMI.value) +
    blok("Saldo PPM - Voucher", P.txtSaldoPPM.value) +
    blok("Saldo E-Money - Voucher", P.txtSaldoEM.value) +
    blok("Saldo Ewallet - Dana", P.txtSaldoDn.value) +
    blok("Saldo Bimasakti - PDAM", S.txtSaldoBima.value) +
    blok("Saldo Teleanjar - PDAM", S.txtSaldoTeleanjar.value) +
    blok("Saldo DELIMA - BPJS & PayTV", S.txtSaldoDelima.value) +
    blok("Saldo DJI - FIF", S.txtSaldoDJI.value) +
    blok("Saldo Pluslink - MF", S.txtSaldoPluslinkMF.value) +
    blok("Saldo Mitracom - PBB", S.txtSaldoMitracom.value) +
    blok("Saldo AJN - PDAM", S.txtSaldoAJN.value) +
    blok("Saldo PDAM Indramayu", S.txtSaldoPamIndramayu.value) +
    blok("Saldo GSP", S.txtSaldoGSP.value) +
    blok("Saldo PT POS - PDAM", S.txtSaldoPTPOS.value) +
    blok("Saldo Artajasa - MBA", S.txtArtaJasaMBA.value) +
    blok("Saldo Artajasa - VSI", S.txtArtaJasaVSI.value) +
    blok("Saldo Arindo - PDAM", S.txtArindo.value) +
    blok("Saldo LinkQU - Transfer Uang", S.txtLinkQU.value) +
    blok("Saldo Ewallet - Ovo", S.txtOvo.value) +
    blok("Saldo Tokopedia - Gopay", S.txtTokpedGopay.value) +
    `Demikian
Wassalammu'alaikum Warahmatullahi Wabarakatuh.`;

  saveText(`Saldo Biller ${pesan} Tgl ${today.getDate()}.txt`, data);

  clearFields([
    "txtSaldoP114", "txtSaldoKws", "txtSaldoMMI", "txtSaldoPPM", "txtSaldoEM", "txtSaldoDn",
    "txtSaldoBima", "txtSaldoTeleanjar", "txtSaldoDelima", "txtSaldoDJI", "txtSaldoPluslinkMF",
    "txtSaldoMitracom","txtSaldoAJN", "txtSaldoPamIndramayu", "txtSaldoGSP", "txtSaldoPTPOS", "txtArtaJasaMBA",
    "txtArtaJasaVSI", "txtArindo", "txtLinkQU", "txtOvo", "txtTokpedGopay"
  ]);
}

// ===== Siang =====
function underSiang() {
  const P = new Produk_PagidanMalam();
  const S = new Produk_Siang();

  let data =
    `Assalamu'alaikum Warahmatullahi Wabarakatuh
Update Info Saldo ${pesan}, Tanggal ${tanggal} Pukul ${timeNow}

` +
    blok("Saldo Ewallet - Dana", P.txtSaldoDn.value) +
    blok("Saldo Bimasakti - PDAM", S.txtSaldoBima.value) +
    blok("Saldo Teleanjar - PDAM", S.txtSaldoTeleanjar.value) +
    blok("Saldo DELIMA - BPJS & PayTV", S.txtSaldoDelima.value) +
    blok("Saldo DJI - FIF", S.txtSaldoDJI.value) +
    blok("Saldo Pluslink - MF", S.txtSaldoPluslinkMF.value) +
    blok("Saldo Mitracom - PBB", S.txtSaldoMitracom.value) +
    blok("Saldo AJN - PDAM", S.txtSaldoAJN.value) + 
    blok("Saldo PDAM Indramayu", S.txtSaldoPamIndramayu.value) +
    blok("Saldo GSP", S.txtSaldoGSP.value) +
    blok("Saldo PT POS - PDAM", S.txtSaldoPTPOS.value) +
    blok("Saldo Artajasa - MBA", S.txtArtaJasaMBA.value) +
    blok("Saldo Artajasa - VSI", S.txtArtaJasaVSI.value) +
    blok("Saldo Arindo - PDAM", S.txtArindo.value) +
    blok("Saldo LinkQU - Transfer Uang", S.txtLinkQU.value) +
    blok("Saldo Ewallet - Ovo", S.txtOvo.value) +
    blok("Saldo Tokopedia - Gopay", S.txtTokpedGopay.value) +
    `Demikian
Wassalammu'alaikum Warahmatullahi Wabarakatuh.`;

  saveText(`Saldo Biller ${pesan} Tgl ${today.getDate()}.txt`, data);

  clearFields([
    "txtSaldoDn", "txtSaldoBima", "txtSaldoTeleanjar", "txtSaldoDelima", "txtSaldoDJI",
    "txtSaldoPluslinkMF", "txtSaldoMitracom", "txtSaldoAJN","txtSaldoPamIndramayu", "txtSaldoGSP",
    "txtSaldoPTPOS", "txtArtaJasaMBA", "txtArtaJasaVSI", "txtArindo", "txtLinkQU",
    "txtOvo", "txtTokpedGopay"
  ]);
}

// ===== Tombol Save =====
const saveFile = () => (pesan === "Siang" ? underSiang() : underPagi());