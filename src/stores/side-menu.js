import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/",
        title: "Dashboard",
      },

      // MODUL ADMIN
      {
        icon: "Database",
        title: "Modul Admin",
        subMenu: [
          {
            icon: "",
            pathname: "/daftar-box",
            title: "Daftar Box",
          },
          {
            icon: "",
            pathname: "/daftar-produk",
            title: "Daftar Produk",
          },
          {
            icon: "",
            pathname: "/daftar-rekening",
            title: "Daftar Rekening",
          },
          {
            icon: "",
            pathname: "/daftar-staff",
            title: "Daftar Staff",
          },
          {
            icon: "",
            pathname: "/daftar-talang",
            title: "Daftar Talang",
          },
          {
            icon: "",
            pathname: "/daftar-user",
            title: "Daftar User",
          },
        ],
      },

      // MODUL STOK
      {
        icon: "Layers",
        title: "Modul Stok",
        subMenu: [
          {
            icon: "",
            pathname: "/stok",
            title: "Stok",
          },
          {
            icon: "Unlock",
            pathname: "/registrasi-produk",
            title: "Registrasi Produk",
          },
        ],
      },

      // JUAL BELI
      {
        icon: "Coins",
        title: "Modul Jual/Beli",
        subMenu: [
          {
            pathname: "/barang-beli",
            title: "Barang Dibeli",
          },
          {
            pathname: "/pembelian",
            title: "Pembelian",
          },
          {
            pathname: "/penjualan",
            title: "Penjualan",
          },
          {
            pathname: "/pesanan",
            title: "Pesanan",
          },
          {
            pathname: "/pinjaman",
            title: "Pinjaman",
          },
        ],
      },


      {
        icon: "ArrowLeftRight",
        title: "Box/Talang",
        subMenu: [
          {
            icon: "",
            pathname: "/talang-box",
            title: "Talang Ke Box",
          },
          {
            icon: "",
            pathname: "/box-talang",
            title: "Box Ke Talang",
          },
        ],
      },

      // TIMBANG
      {
        icon: "Scale",
        title: "Timbang",
        subMenu: [
          {
            icon: "",
            pathname: "/timbang-pagi",
            title: "Timbang Pagi",
          },
          {
            icon: "",
            pathname: "/timbang-sore",
            title: "Timbang Sore",
          },
          {
            icon: "",
            pathname: "/timbang-history",
            title: "Riwayat Timbang",
          },
        ],
      },

      // RIWAYAT
      {
        icon: "History",
        title: "Modul Riwayat",
        subMenu: [
          {
            icon: "",
            pathname: "/riwayat-box",
            title: "Riwayat Box",
          },
          {
            icon: "",
            pathname: "/riwayat-talang",
            title: "Riwayat Talang",
          },
          {
            icon: "",
            pathname: "/riwayat-modal",
            title: "Riwayat Modal",
          },
          {
            icon: "",
            pathname: "/riwayat-aktifitas",
            title: "Log Aktivitas",
          },
        ],
      },
        // LAPORAN
        {
          icon: "Flag",
          pathname: "/modul-laporan",
          title: "Modul Laporan",
        },
        // KEUANGAN
        {
          icon: "Wallet",
          pathname: "/modul-keuangan",
          title: "Modul Keuangan",
        },

    
    ],
  },
});

export { sideMenu };
