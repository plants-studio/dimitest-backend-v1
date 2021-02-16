import { createSchema, Type, typedModel } from 'ts-mongoose';

const BanSchema = createSchema(
  {
    ip: Type.string({ required: true, unique: true }),
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const Ban = typedModel('Ban', BanSchema);

export default Ban;
