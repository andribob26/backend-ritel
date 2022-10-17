import mongoose from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import IKategori from "./interface_models/IKategori";

const kategoriSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
kategoriSchema.plugin(mongoosePagination);

const Kategori: Pagination<IKategori> = mongoose.model<
  IKategori,
  Pagination<IKategori>
>("Kategori", kategoriSchema);

export default Kategori;
