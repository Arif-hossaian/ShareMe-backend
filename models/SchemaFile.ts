import mongoose, { Document } from "mongoose";

interface ISchemFile extends Document {
  fileName: string;
  secureUrl: string;
  formate: string;
  sizeInBytes: string;
  sender?: string;
  reciver?: string;
}
const Schema = mongoose.Schema;
const fileSchema = new Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    secureUrl: {
      type: String,
      required: true,
    },
    formate: {
      type: String,
      required: true,
    },
    sizeInBytes: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
    },
    reciver: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISchemFile>("SchemaFile", fileSchema);
