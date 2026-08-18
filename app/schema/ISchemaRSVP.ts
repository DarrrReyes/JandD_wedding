import * as y from 'yup';

export const schemaRSVP = y.object({
    name: y.string().required("Full name is required"),
    attendance: y.string().oneOf(["attending", "declining"]).required(),
    remarks: y.string(),
  });

export type RSVPFormValues = y.InferType<typeof schemaRSVP>;