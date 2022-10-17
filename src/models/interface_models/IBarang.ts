import mongoose from "mongoose";
interface IBarang extends mongoose.Document {
  kodeBarang: string;
  image: string;
  idCloudinary: string;
  name: string;
  kategori: {
    _id: any;
    name: string;
  };
  hpp: number;
  hargaJual: number;
  stok: number;
  deskripsi: string;
}

export default IBarang;
