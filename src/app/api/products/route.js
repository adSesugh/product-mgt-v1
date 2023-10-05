import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function GET() {
  try {
    const products = await prisma.product.findMany({});
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const {
    name,
    price,
    description,
    barcode,
    expiry,
    qty,
    reorder_level,
    qty_sold,
    min_qty,
    picture,
  } = await req.json();
  console.log(picture);
  const formattedPrice = parseInt(price);
  const qtySold = parseInt(qty_sold);
  const minQty = parseInt(min_qty);
  const reorderLevel = parseInt(reorder_level);
  const formattedQty = parseInt(qty);
  const formattedExpiry = new Date(expiry);

  try {
    const product = await prisma.product.create({
      data: {
        name,
        price: formattedPrice,
        description,
        barcode,
        qty: formattedQty,
        reorder_level: reorderLevel,
        qty_sold: qtySold,
        min_qty: minQty,
        expiry: formattedExpiry,
        picture,
      },
    });
    return NextResponse.json(
      { product, message: "Product created!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error,
      },
      { status: 500 }
    );
  }
}
