"use server";

import prisma from "@/lib/prisma";

export async function createGuest(values: {
  name: string;
  remarks?: string;
  isAttending: boolean;
}) {
  try {
    const guest = await prisma.guest.create({
      data: {
        name: values.name,
        remarks: values.remarks,
        isAttending: values.isAttending,
      },
    });

    return {
      status: 201,
      data: guest,
    };
  } catch (error) {
    console.error(error);

    return {
      status: 500,
      data: null,
    };
  }
}
