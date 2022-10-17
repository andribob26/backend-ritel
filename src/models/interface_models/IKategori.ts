import mongoose from "mongoose";

interface IKategori extends mongoose.Document {
  name: string;
}

export default IKategori;
