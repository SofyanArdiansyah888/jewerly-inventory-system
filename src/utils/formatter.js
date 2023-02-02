export function formatRupiah(angka, prefix = "Rp.") {
  if(angka){
    const  tempAngka = angka.toString()
    var number_string = tempAngka.replace(/[^,\d]/g, "").toString(),
      split = number_string.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  
    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
  
    rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
    return `${prefix} ${rupiah}`
  }else{
    return `${prefix} 0`
  }
  

  // return prefix == undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
}

export function formatGram(angka, prefix = "Gram") {
  if(angka){
    const  tempAngka = parseFloat(angka).toFixed(3).toString()
    let temp = tempAngka.replace(/[^.,\d]/g, "").toString()
    temp = temp.replace('.',',')
    return `${temp} ${prefix} `
  }else{
    return `0 ${prefix}`
  }
}

export function sanitizeNumber(input = ""){
  const reg = /\D/g;
  return input.replace(reg,'')
}

export function secondToHourMinute(seconds){
    const hour = Math.floor(seconds / 3600)
    const minute = Math.floor((seconds % 3600) / 60)
    return `${hour} Jam ${minute} Menit`
    
}
