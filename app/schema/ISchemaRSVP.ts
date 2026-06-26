import * as y from 'yup';

export const schemaRSVP = y.object({
    name: y.string().required("Full name is required"),
    attendance: y.string().oneOf(["attending", "declining"]).required(),
    dietary: y.string(),
  });

export type RSVPFormValues = y.InferType<typeof schemaRSVP>;