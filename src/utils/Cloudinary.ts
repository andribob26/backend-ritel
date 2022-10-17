import Config from "../config/Config";
import cloudinary, { UploadApiResponse } from "cloudinary";
import { Pagination } from "mongoose-paginate-ts";
import { HydratedDocument } from "mongoose";

cloudinary.v2.config({
  cloud_name: Config.cloudinary.cloudName,
  api_key: Config.cloudinary.apiKey,
  api_secret: Config.cloudinary.apiSecret,
});

interface IResultCloud {
  idCloudinary: string;
}

class Cloudinary {
  static async upload<T>(
    model: Pagination<T>,
    data: any,
    file: any,
    callback: Function
  ): Promise<any> {
    try {
      await cloudinary.v2.uploader.upload(
        file,
        {
          folder: "ritel",
        },
        async (error, resultCloud) => {
          if (!error) {
            data.image = resultCloud!.secure_url;
            data.idCloudinary = resultCloud!.public_id;
            const resultData = await new model(data).save();
            if (resultData) {
              return callback(null, resultData);
            }
          }
        }
      );
    } catch (error) {
      return callback(error, null);
    }
  }

  static async update<T>(
    model: Pagination<T>,
    id: any,
    data: any,
    file: any,
    callback: Function
  ): Promise<any> {
    try {
      await cloudinary.v2.uploader.upload(
        file,
        {
          folder: "ritel",
        },
        async (error, resultCloud) => {
          if (!error) {
            data.image = resultCloud!.secure_url;
            data.idCloudinary = resultCloud!.public_id;
            const beforeData: HydratedDocument<IResultCloud, {}, {}> | null =
              await model.findById(id);
            const resultData = await model.findByIdAndUpdate(id, data);
            if (resultData) {
              await cloudinary.v2.uploader.destroy(beforeData!.idCloudinary);
              callback(null, resultData);
            }
          }
        }
      );
    } catch (error) {
      return callback(error, null);
    }
  }

  static async delete<T>(
    model: Pagination<T>,
    id: any,
    callback: Function
  ): Promise<any> {
    try {
      const resultData: HydratedDocument<IResultCloud, {}, {}> | null =
        await model.findByIdAndDelete(id);
      if (resultData) {
        await cloudinary.v2.uploader.destroy(resultData!.idCloudinary);
        callback(null, resultData);
      }
    } catch (error) {
      return callback(error, null);
    }
  }
}

export default Cloudinary;
