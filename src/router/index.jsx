import { useRoutes } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import Dashboard from "../views/dashboard/Index";
import SideMenu from "../layouts/side-menu/Main";

import TalangKeBox from "../views/box-talang/TalangKeBox";
import BoxKeTalang from "../views/box-talang/BoxKeTalang";

import TimbangPagi from "../views/timbang/TimbangPagi";
import TimbangSore from "../views/timbang/TimbangSore";
import TimbangHistory from "../views/timbang/TimbangHistory";
import Login from "../views/auth/Login";
import Error404Page from "../views/error-page/404";

// MODULE ADMIN
import ListUser from "../views/modul-admin/user/Index";
import ListBox from "../views/modul-admin/box/Index";
import DetailBox from "../views/modul-admin/box/Detail";
import ListTalang from "../views/modul-admin/talang/Index";
import DetailTalang from "../views/modul-admin/talang/Detail";
import ListStaff from "../views/modul-admin/staff/Index";
import ListRekening from "../views/modul-admin/rekening/Index";
import ListProduk from "../views/modul-admin/produk/Index";
import Stok from "../views/modul-stok/stok/Index";
import RegistrasiProduk from "../views/modul-stok/registrasi-produk/Index";
import RiwayatBox from "../views/modul-riwayat/RiwayatBox";
import RiwayatAktifitas from "../views/modul-riwayat/RiwayatAktifitas";
import RiwayatModal from "../views/modul-riwayat/RiwayatModal";
import RiwayatTalang from "../views/modul-riwayat/RiwayatTalang";
import ModulKeuangan from "../views/modul-keuangan/Index";
import ModulLaporan from "../views/modul-laporan/Index";

import BarangBeli from "../views/modul-jualbeli/BarangBeli/Index";
import Pembelian from "../views/modul-jualbeli/Pembelian/Index";
import CreatePembelian from "../views/modul-jualbeli/Pembelian/Create";
import Penjualan from "../views/modul-jualbeli/Penjualan/Index";
import CreatePenjualan from "../views/modul-jualbeli/Penjualan/Create";
import Pinjaman from "../views/modul-jualbeli/Pinjaman/Index";
import CreatePinjaman from "../views/modul-jualbeli/Pinjaman/Create";
import Pesanan from "../views/modul-jualbeli/Pesanan/Index";
import CreatePesanan from "../views/modul-jualbeli/Pesanan/Create";
import DetailPesanan from "../views/modul-jualbeli/Pesanan/Detail";

function Router() {
  const routes = [
    {
      path: "/",
      element: (
        // <RequireAuth>
        <SideMenu />
        // </RequireAuth>
      ),

      children: [
        {
          path: "/",
          element: (
            <RequireAuth>
              {" "}
              <Dashboard />
            </RequireAuth>
          ),
        },

        // MODUL ADMIN
        {
          path: "/daftar-user",
          element: (
            <RequireAuth>
              <ListUser />
            </RequireAuth>
          ),
        },
        {
          path: "/daftar-box",
          element: (
            <RequireAuth>
              <ListBox />
            </RequireAuth>
          ),
        },
        {
          path: "/daftar-box/:id",
          element: (
            <RequireAuth>
              <DetailBox />
            </RequireAuth>
          ),
        },
        {
          path: "/daftar-talang",
          element: (
            <RequireAuth>
              <ListTalang />
            </RequireAuth>
          ),
        },
        {
          path: "/daftar-talang/:id",
          element: (
            <RequireAuth>
              <DetailTalang />
            </RequireAuth>
          ),
        },
        {
          path: "/daftar-staff",
          element: (
            <RequireAuth>
              <ListStaff />
            </RequireAuth>
          ),
        },
        {
          path: "/daftar-rekening",
          element: (
            <RequireAuth>
              <ListRekening />
            </RequireAuth>
          ),
        },
        {
          path: "/daftar-produk",
          element: (
            <RequireAuth>
              <ListProduk />
            </RequireAuth>
          ),
        },

        // MODUL TIMBANG
        {
          path: "/timbang-pagi",
          element: (
            <RequireAuth>
              <TimbangPagi />
            </RequireAuth>
          ),
        },
        {
          path: "/timbang-sore",
          element: (
            <RequireAuth>
              <TimbangSore />
            </RequireAuth>
          ),
        },
        {
          path: "/timbang-history",
          element: (
            <RequireAuth>
              <TimbangHistory />
            </RequireAuth>
          ),
        },
        // MODUL STOK
        {
          path: "/stok",
          element: (
            <RequireAuth>
              <Stok />
            </RequireAuth>
          ),
        },

        {
          path: "/barang-beli",
          element: (
            <RequireAuth>
              <BarangBeli />
            </RequireAuth>
          ),
        },
        {
          path: "/pembelian",
          element: (
            <RequireAuth>
              <Pembelian />
            </RequireAuth>
          ),
        },
        {
          path: "/pembelian/create",
          element: (
            <RequireAuth>
              <CreatePembelian />
            </RequireAuth>
          ),
        },
        {
          path: "/penjualan",
          element: (
            <RequireAuth>
              <Penjualan />
            </RequireAuth>
          ),
        },
        {
          path: "/penjualan/create",
          element: (
            <RequireAuth>
              <CreatePenjualan />
            </RequireAuth>
          ),
        },

        {
          path: "/pinjaman",
          element: (
            <RequireAuth>
              <Pinjaman />
            </RequireAuth>
          ),
        },
        {
          path: "/pinjaman/create",
          element: (
            <RequireAuth>
              <CreatePinjaman />
            </RequireAuth>
          ),
        },
        {
          path: "/pesanan",
          element: (
            <RequireAuth>
              <Pesanan />
            </RequireAuth>
          ),
        },
        {
          path: "/pesanan/:id",
          element: (
            <RequireAuth>
              <DetailPesanan />
            </RequireAuth>
          ),
        },
        {
          path: "/pesanan/create",
          element: (
            <RequireAuth>
              <CreatePesanan />
            </RequireAuth>
          ),
        },

        {
          path: "/registrasi-produk",
          element: (
            <RequireAuth>
              <RegistrasiProduk />
            </RequireAuth>
          ),
        },
        {
          path: "/talang-box",
          element: (
            <RequireAuth>
              <TalangKeBox />
            </RequireAuth>
          ),
        },
        {
          path: "/box-talang",
          element: (
            <RequireAuth>
              <BoxKeTalang />,
            </RequireAuth>
          ),
        },
        {
          path: "/riwayat-box",
          element: (
            <RequireAuth>
              <RiwayatBox />,
            </RequireAuth>
          ),
        },
        {
          path: "/riwayat-talang",
          element: (
            <RequireAuth>
              <RiwayatTalang />,
            </RequireAuth>
          ),
        },
        {
          path: "/riwayat-aktifitas",
          element: (
            <RequireAuth>
              <RiwayatAktifitas />,
            </RequireAuth>
          ),
        },
        {
          path: "/riwayat-modal",
          element: (
            <RequireAuth>
              <RiwayatModal />,
            </RequireAuth>
          ),
        },
        {
          path: "/modul-keuangan",
          element: (
            <RequireAuth>
              <ModulKeuangan />,
            </RequireAuth>
          ),
        },
        {
          path: "/modul-laporan",
          element: (
            <RequireAuth>
              <ModulLaporan />,
            </RequireAuth>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Error404Page />,
    },
  ];

  return useRoutes(routes);
}

export default Router;
