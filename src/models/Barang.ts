import mongoose from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import IBarang from "./interface_models/IBarang";

const barangSchema = new mongoose.Schema(
  {
    kodeBarang: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: false,
    },
    idCloudinary: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    kategori: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    hpp: {
      type: Number,
      required: true,
    },
    hargaJual: {
      type: Number,
      required: true,
    },
    stok: {
      type: Number,
      required: false,
    },
    deskripsi: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
barangSchema.plugin(mongoosePagination);

const Barang: Pagination<IBarang> = mongoose.model<
  IBarang,
  Pagination<IBarang>
>("Barang", barangSchema);

export default Barang;
