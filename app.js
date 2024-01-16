// document.getElementById("EksekusiInput").onclick = function() { // Addrow berdasarkan angkat inputan
//   hitungLegth();
// };

class Produk_PagidanMalam {
  constructor(txtSaldoIrs, txtSaldoP114, txtSaldoPL, txtSaldoEM, txtSaldoDn) {
    this.txtSaldoIrs = document.getElementById("txtSaldoIrs")
    this.txtSaldoP114 = document.getElementById("txtSaldoP114")
    this.txtSaldoPL = document.getElementById("txtSaldoPL")
    this.txtSaldoEM = document.getElementById("txtSaldoEM")
    this.txtSaldoDn = document.getElementById("txtSaldoDn") 
  };
}

class Produk_Siang {
  constructor(txtSaldoBima, txtSaldoTeleanjar, txtSaldoDelima, txtSaldoDJI, txtSaldoBigFlip, txtSaldoPluslinkMF, txtSaldoMitracom, txtSaldoGSP, txtSaldoPTPOS, txtArtaJasaMBA, txtArtaJasaVSI, txtArindo, txtLinkQU, txtOvo) {
    this.txtSaldoBima = document.getElementById("txtSaldoBima")
    this.txtSaldoTeleanjar = document.getElementById("txtSaldoTeleanjar")
    this.txtSaldoDelima = document.getElementById("txtSaldoDelima")
    this.txtSaldoDJI = document.getElementById("txtSaldoDJI")
    this.txtSaldoBigFlip = document.getElementById("txtSaldoBigFlip")
    this.txtSaldoPluslinkMF = document.getElementById("txtSaldoPluslinkMF")
    this.txtSaldoMitracom = document.getElementById("txtSaldoMitracom")
    this.txtSaldoGSP = document.getElementById("txtSaldoGSP")
    this.txtSaldoPTPOS = document.getElementById("txtSaldoPTPOS")
    this.txtArtaJasaMBA = document.getElementById("txtArtaJasaMBA")
    this.txtArtaJasaVSI = document.getElementById("txtArtaJasaVSI")
    this.txtArindo = document.getElementById("txtArindo")
    this.txtLinkQU = document.getElementById("txtLinkQU")
    this.txtOvo = document.getElementById("txtOvo")
  };
} 

var WaktuBanding = new Date().getHours();
const eleVoucher = document.querySelectorAll(".voucher");
let wbpagi = 9;
let wbsiang = 17;
let pesan;

// perbandingan 
if (WaktuBanding < wbpagi) {
  for (var wb = 0; wb < eleVoucher.length; wb++) {
    eleVoucher[wb].style.display = "block";
    pesan = "Pagi";
  }
} else if (WaktuBanding > wbpagi && WaktuBanding < wbsiang) {
  for (var wbp = 0; wbp < eleVoucher.length; wbp++) {
    eleVoucher[wbp].style.display = "none";
    pesan = "Siang";
  }
} else {
  for (var wbM = 0; wbM < eleVoucher.length; wbM++) {
    eleVoucher[wbM].style.display = "block";
    pesan = "Malam";
  }
}
// End Perbandingan

const rupiah = document.querySelectorAll(".form-control");

for (let i = 0; i < rupiah.length; i++) {
  rupiah[i].addEventListener("keyup", function (e) {
    rupiah[i].value = formatRupiah(this.value, "Rp. ");
  });
}

function formatRupiah(angka, prefix) {
  var number_string = angka.replace(/[^,\d,]/g, "").toString(),
    split = number_string.split("."),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{1,3}/g);

  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] != undefined ? rupiah + "." + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

// untuk Pagi
function underPagi() {
  const UnderPagi = new Produk_PagidanMalam();
  const UnderSiang = new Produk_Siang();
  var today = new Date();
  var tanggal = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  data =
    "Assalamu'alaikum Warahmatullahi Wabarakatuh\nUpdate Info Saldo " + pesan + " ini Per Tgl " + tanggal + "\n \n" +
    "*" + "Saldo IRS - Voucher :" + "*" + "\n" +
    UnderPagi.txtSaldoIrs.value +
    "\n\n" +
    "*" + "Saldo Pulsa-114 - Voucher :" + "*" + "\n" +
    UnderPagi.txtSaldoP114.value +
    "\n\n" +
    "*" + "Saldo Plus Link - Voucher :" + "*" + "\n" +
    UnderPagi.txtSaldoPL.value +
    "\n\n" +
    "*" + "Saldo E-Money - Voucher :" + "*" + "\n" +
    UnderPagi.txtSaldoEM.value +
    "\n\n" +
    "*" + "Saldo Dana - Voucher :" + "*" + "\n" +
    UnderPagi.txtSaldoDn.value +
    "\n\n" +
    "*" + "Saldo Bimasakti - PDAM  :" + "*" + "\n" +
    UnderSiang.txtSaldoBima.value +
    "\n\n" +
    "*" + "Saldo Teleanjar - PDAM :" + "*" + "\n" +
    UnderSiang.txtSaldoTeleanjar.value +
    "\n\n" +
    "*" + "Saldo DELIMA - BPJS-Kes & PayTV :" + "*" + "\n" +
    UnderSiang.txtSaldoDelima.value +
    "\n\n" +
    "*" + "Saldo DJI - FIF :" + "*" + "\n" +
    UnderSiang.txtSaldoDJI.value +
    "\n\n" +
    "*" + "Saldo Big Flip - Transfer Uang :" + "*" + "\n" +
    UnderSiang.txtSaldoBigFlip.value +
    "\n\n" +
    "*" + "Saldo Pluslink - MF :" + "*" + "\n" +
    UnderSiang.txtSaldoPluslinkMF.value +
    "\n\n" +
    "*" + "Saldo Mitracom - PBB :" + "*" + "\n" +
    UnderSiang.txtSaldoMitracom.value +
    "\n\n" +
    "*" + "Saldo GSP :" + "*" + "\n" +
    UnderSiang.txtSaldoGSP.value +
    "\n\n" +
    "*" + "Saldo PT POS - PDAM :" + "*" + "\n" +
    UnderSiang.txtSaldoPTPOS.value +
    "\n\n" +
    "*" + "Saldo Artajasa - MBA :" + "*" + "\n" +
    UnderSiang.txtArtaJasaMBA.value +
    "\n\n" +
    "*" + "Saldo Artajasa - VSI :" + "*" + "\n" +
    UnderSiang.txtArtaJasaVSI.value +
    "\n\n" +
    "*" + "Saldo Arindo - PDAM :" + "*" + "\n" +
    UnderSiang.txtArindo.value +
    "\n\n" +
    "*" + "Saldo LinkQU - Transfer Uang :" + "*" + "\n" +
    UnderSiang.txtLinkQU.value +
    "\n\n" +
    "*" + "Saldo OVO :" + "*" + "\n" +
    UnderSiang.txtOvo.value +
    "\n\n" +
    "Demikian\nWassalammu'alaikum Warahmatullahi Wabarakatuh.";

  // Convert the text to BLOB.
  const textToBLOB = new Blob([data], {
    type: "text/plain",
  });
 
  var DateFile = new Date().getDate();
  const NamaFile = "Saldo Biller Tgl " + DateFile + ".txt"; // The file to save the data.
  let newLink = document.createElement("a");
  newLink.download = NamaFile;
  const Array_underPagi=["txtSaldoIrs", "txtSaldoP114", "txtSaldoPL", "txtSaldoEM", "txtSaldoDn", "txtSaldoBima", "txtSaldoTeleanjar", "txtSaldoDelima", "txtSaldoDJI", "txtSaldoBigFlip", "txtSaldoPluslinkMF", "txtSaldoMitracom", "txtSaldoGSP", "txtSaldoPTPOS", "txtArtaJasaMBA", "txtArtaJasaVSI" , "txtArindo", "txtLinkQU","txtOvo"];

  if (window.webkitURL != null) {
    newLink.href = window.webkitURL.createObjectURL(textToBLOB); 
    for (var y = 0; y < Array_underPagi.length; y++) {
      document.getElementById(Array_underPagi[y]).value = "";
    }
  } else {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }
  newLink.click();
}

// SIANG HARI
function underSiang() {
  const UnderPagi = new Produk_PagidanMalam();
  const UnderSiang = new Produk_Siang();

  var today = new Date();
  var tanggal = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  data =
    "Assalamu'alaikum Warahmatullahi Wabarakatuh\nUpdate Info Saldo " + pesan + " ini Per Tgl " + tanggal + "\n \n" +
    "*" + "Saldo Dana - Voucher :" + "*" + "\n" +
    UnderPagi.txtSaldoDn.value +
    "\n\n" +
    "*" + "Saldo Bimasakti - PDAM  :" + "*" + "\n" +
    UnderSiang.txtSaldoBima.value +
    "\n\n" +
    "*" + "Saldo Teleanjar - PDAM :" + "*" + "\n" +
    UnderSiang.txtSaldoTeleanjar.value +
    "\n\n" +
    "*" + "Saldo DELIMA - BPJS-Kes & PayTV :" + "*" + "\n" +
    UnderSiang.txtSaldoDelima.value +
    "\n\n" +
    "*" + "Saldo DJI - FIF :" + "*" + "\n" +
    UnderSiang.txtSaldoDJI.value +
    "\n\n" +
    "*" + "Saldo Big Flip - Transfer Uang :" + "*" + "\n" +
    UnderSiang.txtSaldoBigFlip.value +
    "\n\n" +
    "*" + "Saldo Pluslink - MF :" + "*" + "\n" +
    UnderSiang.txtSaldoPluslinkMF.value +
    "\n\n" +
    "*" + "Saldo Mitracom - PBB :" + "*" + "\n" +
    UnderSiang.txtSaldoMitracom.value +
    "\n\n" +
    "*" + "Saldo GSP :" + "*" + "\n" +
    UnderSiang.txtSaldoGSP.value +
    "\n\n" +
    "*" + "Saldo PT POS - PDAM :" + "*" + "\n" +
    UnderSiang.txtSaldoPTPOS.value +
    "\n\n" +
    "*" + "Saldo Artajasa - MBA :" + "*" + "\n" +
    UnderSiang.txtArtaJasaMBA.value +
    "\n\n" +
    "*" + "Saldo Artajasa - VSI :" + "*" + "\n" +
    UnderSiang.txtArtaJasaVSI.value +
    "\n\n" +
    "*" + "Saldo Arindo - PDAM :" + "*" + "\n" +
    UnderSiang.txtArindo.value +
    "\n\n" +
    "*" + "Saldo LinkQU - Transfer Uang :" + "*" + "\n" +
    UnderSiang.txtLinkQU.value +
    "\n\n" +
    "*" + "Saldo Ovo :" + "*" + "\n" +
    UnderSiang.txtOvo.value +
    "\n\n" +
    "Demikian\nWassalammu'alaikum Warahmatullahi Wabarakatuh.";

  // Convert the text to BLOB.
  const textToBLOB = new Blob([data], {
    type: "text/plain",
  });

  var DateFile = new Date().getDate();
  const NamaFile = "Saldo Biller Tgl " + DateFile + ".txt"; // The file to save the data.
  let newLink = document.createElement("a");
  newLink.download = NamaFile;

  if (window.webkitURL != null) {
    newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    const Array_underSiang=["txtSaldoDn", "txtSaldoBima", "txtSaldoTeleanjar", "txtSaldoDelima", "txtSaldoDJI", "txtSaldoBigFlip", "txtSaldoPluslinkMF", "txtSaldoMitracom", "txtSaldoGSP", "txtSaldoPTPOS", "txtArtaJasaMBA", "txtArtaJasaVSI", "txtArindo", "txtLinkQU", "txtOvo"];
      for (var x = 0; x < Array_underSiang.length; x++) {
      document.getElementById(Array_underSiang[x]).value = "";
    }

  } else {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }
  newLink.click();
}


// function saveFile() {
//   if (WaktuBanding < wbpagi) {
//     underPagi();
//   } else if (WaktuBanding > wbpagi && WaktuBanding < wbsiang) {
//     underSiang();
//   } else {
//     underPagi();
//   }
// };


// fungsi btn savefile
let saveFile = () => {
  if (WaktuBanding < wbpagi) {
    underPagi();
  } else if (WaktuBanding > wbpagi && WaktuBanding < wbsiang) {
    underSiang();
  } else {
    underPagi();
  }
};