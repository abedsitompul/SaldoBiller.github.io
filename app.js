// Start Perbanding
var WaktuBanding = new Date().getHours();
let wbpagi = 8;
let wbsiang = 18;
let pesan;

// perbandingan
if (WaktuBanding < wbpagi) {
  document.getElementsByClassName("voucher")[0].style.visibility = "show";
  pesan = "Pagi";
} else if (WaktuBanding > wbpagi && WaktuBanding < wbsiang) {
  document.getElementsByClassName("voucher")[0].style.visibility = "hidden";
  document.getElementById("ExVoucher").style.margin = "0px 0px -20px -350px";
  document.getElementById("JudulExVoucher").style.margin = "0px 0px 20px -280px";
  pesan = "Siang";
} else {
  document.getElementsByClassName("voucher")[0].style.visibility = "show";
  pesan = "Malam";
}

// End Perbandingan

const rupiah = document.querySelectorAll(".form-control");

for (let i = 0; i < rupiah.length; i++) {
  rupiah[i].addEventListener("keyup", function(e) {
    rupiah[i].value = formatRupiah(this.value, "Rp. ");
  });
}

function formatRupiah(angka, prefix) {
  // var number_string = angka.replace(/[^,\d]/g, "").toString(),
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

// fungsi btn savefile
let saveFile = () => {
  //   VOucher
  const txtSaldoIrs = document.getElementById("txtSaldoIrs");
  const txtSaldoP114 = document.getElementById("txtSaldoP114");
  const txtSaldoPL = document.getElementById("txtSaldoPL");
  const txtSaldoEM = document.getElementById("txtSaldoEM");

  //   Ex Voucher
  const txtSaldoBima = document.getElementById("txtSaldoBima");
  const txtSaldoTeleanjar = document.getElementById("txtSaldoTeleanjar");
  const txtSaldoDelima = document.getElementById("txtSaldoDelima");
  const txtSaldoDJI = document.getElementById("txtSaldoDJI");
  const txtSaldoBigFlip = document.getElementById("txtSaldoBigFlip");
  const txtSaldoPluslinkMF =
    document.getElementById("txtSaldoPluslinkMF");

  const txtSaldoMitracom = document.getElementById("txtSaldoMitracom");
  const txtSaldoGSP = document.getElementById("txtSaldoGSP");
  const txtSaldoPTPOS = document.getElementById("txtSaldoPTPOS");


  var today = new Date();
  var tglnya = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  // This variable stores all the data.
  let data =
    "Assalamu'alaikum Warahmatullahi Wabarakatuh\nUpdate Info Saldo " +
    pesan +
    " ini Per Tgl " +
    tglnya +
    "\n \n" +
    "Saldo IRS - Voucher :\n" +
    txtSaldoIrs.value +
    "\n\n" +
    "Saldo Pulsa-114 - Voucher :\n" +
    txtSaldoP114.value +
    "\n\n" +
    "Saldo Plus Link - Voucher :\n" +
    txtSaldoPL.value +
    "\n\n" +
    "Saldo E-Money - Voucher :\n" +
    txtSaldoEM.value +
    "\n\n" +
    "Saldo Bimasakti - PDAM  :\n" +
    txtSaldoBima.value +
    "\n\n" +
    "Saldo Teleanjar - PDAM:\n" +
    txtSaldoTeleanjar.value +
    "\n\n" +
    "Saldo DELIMA - BPJS-Kes & PayTV :\n" +
    txtSaldoDelima.value +
    "\n\n" +
    "Saldo DJI - FIF :\n" +
    txtSaldoDJI.value +
    "\n\n" +
    "Saldo Big Flip - Transfer Uang :\n" +
    txtSaldoBigFlip.value +
    "\n\n" +
    "Saldo Pluslink - MF :\n" +
    txtSaldoPluslinkMF.value +
    "\n\n" +
    "Saldo Mitracom - PBB :\n" +
    txtSaldoMitracom.value +
    "\n\n" +
    "Saldo GSP :\n" +
    txtSaldoGSP.value +
    "\n\n" +
    "Saldo PT POS - PDAM :\n" +
    txtSaldoPTPOS.value +
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
    document.getElementById("txtSaldoIrs").value = "";
    document.getElementById("txtSaldoP114").value = "";
    document.getElementById("txtSaldoPL").value = "";
    document.getElementById("txtSaldoEM").value = "";

    document.getElementById("txtSaldoBima").value = "";
    document.getElementById("txtSaldoTeleanjar").value = "";
    document.getElementById("txtSaldoDelima").value = "";
    document.getElementById("txtSaldoDJI").value = "";
    document.getElementById("txtSaldoBigFlip").value = "";
    document.getElementById("txtSaldoPluslinkMF").value = "";
    document.getElementById("txtSaldoMitracom").value = "";
    document.getElementById("txtSaldoGSP").value = "";
    document.getElementById("txtSaldoPTPOS").value = "";
  } else {
    newLink.href = window.URL.createObjectURL(textToBLOB);
    newLink.style.display = "none";
    document.body.appendChild(newLink);
  }
  newLink.click();
};