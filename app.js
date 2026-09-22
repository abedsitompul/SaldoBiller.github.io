(() => {
  "use strict";

  // Aplikasi ini hanya memproses data di browser.
  // Tidak ada fetch(), AJAX, redirect, cookie, localStorage,
  // atau pengiriman data ke server.

  const get = (id) => document.getElementById(id);

  const PAGI_MALAM = [
    "txtSaldoP114",
    "txtSaldoEM",
    "txtSaldoDn",
    "txtSaldoMMI",
    "txtSaldoPPM"
  ];

  const SIANG = [
    "txtJatelindo",
    "txtSaldoBima",
    "txtSaldoTeleanjar",
    "txtSaldoDelima",
    "txtSaldoDJI",
    "txtSaldoPluslinkMF",
    "txtSaldoMitracom",
    "txtSaldoAJN",
    "txtSaldoGSP",
    "txtSaldoPTPOS",
    "txtArtaJasaMBA",
    "txtArtaJasaVSI",
    "txtArindo",
    "txtLinkQU",
    "txtOvo",
    "txtTokpedGopay"
  ];

  const ALL_FIELDS = [...PAGI_MALAM, ...SIANG];

  function formatRupiah(value) {
    const digits = String(value ?? "").replace(/\D/g, "");

    if (!digits) {
      return "";
    }

    const formatted = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `Rp. ${formatted}`;
  }

  function formatInput(event) {
    const input = event.currentTarget;

    if (!input.disabled) {
      input.value = formatRupiah(input.value);
    }
  }

  document.querySelectorAll(".form-control").forEach((input) => {
    input.addEventListener("input", formatInput);
  });

  function setVoucherVisibility(hour) {
    const voucherFields = document.querySelectorAll(".input-SBiller");

    // 09:00-16:59 = Siang; selain itu = Pagi/Malam.
    const isSiang = hour >= 9 && hour < 17;

    voucherFields.forEach((element) => {
      element.style.display = isSiang ? "none" : "block";
    });

    return isSiang;
  }

  function getPeriod(hour) {
    if (hour >= 9 && hour < 17) {
      return "Siang";
    }

    return hour < 9 ? "Pagi" : "Malam";
  }

  function getCurrentInfo() {
    const now = new Date();

    return {
      now,
      hour: now.getHours(),
      period: getPeriod(now.getHours()),
      time: `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
      date: `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`
    };
  }

  function blok(judul, value) {
    return `*${judul}:*\n${value || "-"}\n\n`;
  }

  function saveText(filename, text) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    link.remove();

    // Bersihkan object URL setelah digunakan.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function setValue(id, value) {
    const element = get(id);
    if (element) {
      element.value = value;
    }
  }

  function clearFields(ids) {
    ids.forEach((id) => {
      const element = get(id);
      if (element && !element.disabled) {
        element.value = "";
      }
    });
  }

  function createReport() {
    const { now, period, time, date } = getCurrentInfo();

    // Nilai default yang sebelumnya memang ditetapkan oleh aplikasi.
    if (period !== "Siang") {
      setValue("txtSaldoP114", "Rp. 1.127.884");
      setValue("txtSaldoPPM", "Rp. 30.448.200");
      setValue("txtSaldoEM", "Rp. 14.361.843");
    }

    setValue("txtArindo", "Rp. 58.785.913");

    let data =
      `Assalamu'alaikum Warahmatullahi Wabarakatuh\n` +
      `Update Info Saldo ${period}, Tanggal ${date} Pukul ${time}\n\n`;

    if (period !== "Siang") {
      data +=
        blok("Saldo Pulsa-114 - Voucher", get("txtSaldoP114")?.value) +
        blok("Saldo PPM - Voucher", get("txtSaldoPPM")?.value) +
        blok("Saldo MMI - Voucher", get("txtSaldoMMI")?.value) +
        blok("Saldo E-Money - Voucher", get("txtSaldoEM")?.value);
    }

    data +=
      blok("Saldo Ewallet - Dana", get("txtSaldoDn")?.value) +
      blok("Saldo JATELINDO - PLN", get("txtJatelindo")?.value) +
      blok("Saldo Bimasakti - PDAM", get("txtSaldoBima")?.value) +
      blok("Saldo Teleanjar - PDAM", get("txtSaldoTeleanjar")?.value) +
      blok("Saldo DELIMA - BPJS & PayTV", get("txtSaldoDelima")?.value) +
      blok("Saldo DJI - FIF", get("txtSaldoDJI")?.value) +
      blok("Saldo Pluslink - MF", get("txtSaldoPluslinkMF")?.value) +
      blok("Saldo Mitracom - PBB", get("txtSaldoMitracom")?.value) +
      blok("Saldo AJN - PDAM", get("txtSaldoAJN")?.value) +
      blok("Saldo GSP", get("txtSaldoGSP")?.value) +
      blok("Saldo PT POS - PDAM", get("txtSaldoPTPOS")?.value) +
      blok("Saldo Artajasa - MBA", get("txtArtaJasaMBA")?.value) +
      blok("Saldo Artajasa - VSI", get("txtArtaJasaVSI")?.value) +
      blok("Saldo LinkQU - Transfer Uang", get("txtLinkQU")?.value) +
      blok("Saldo Ewallet - Ovo", get("txtOvo")?.value) +
      blok("Saldo Tokopedia - Gopay", get("txtTokpedGopay")?.value) +
      blok("Saldo Arindo - PDAM", get("txtArindo")?.value) +
      `Demikian\nWassalammu'alaikum Warahmatullahi Wabarakatuh.`;

    saveText(
      `Saldo Biller ${period} Tgl ${now.getDate()}.txt`,
      data
    );

    clearFields(ALL_FIELDS);
  }

  // Atur tampilan awal.
  const initialInfo = getCurrentInfo();
  setVoucherVisibility(initialInfo.hour);

  // Tombol menggunakan event listener, bukan inline onclick.
  const button = get("btnSave");
  if (button) {
    button.addEventListener("click", createReport);
  }
})();
